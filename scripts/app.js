$(function () {
    searchApp.init();
});

var ui = (function () {
    var getPhoto = function (car) {
        if (car.Photos?.length > 0) {
            car.MainPhoto = car.Photos[0].Url;
        } else {
            car.MainPhoto = "https://placehold.co/800x600";
        }
    };
    return {
        search: {
            getDateFrom: function () {
                return new Date($("#search_DateFrom").val());
            },
            getDateTo: function () {
                return new Date($("#search_DateTo").val());
            },
            setDateFrom: function (date) {
                $("#search_DateFrom").val(date.toISOString().slice(0, 16));
            },
            setDateTo: function (date) {
                $("#search_DateTo").val(date.toISOString().slice(0, 16));
            },
        },

        modal: {
            getDateFrom: function () {
                return new Date($("#DateFrom").val());
            },
            getDateTo: function () {
                return new Date($("#DateTo").val());
            },
            setDateFrom: function (date) {
                $("#DateFrom").val(date.toISOString().slice(0, 16));
            },
            setDateTo: function (date) {
                $("#DateTo").val(date.toISOString().slice(0, 16));
            },
        },

        clearCarList: function () {
            $("#carList").html("");
        },
        renderCarCard: function (car) {
            getPhoto(car);
            var template = Handlebars.compile($("#carCardTemplate").html());
            var html = template(car);
            var element = $(html);
            $("#carList").append(element);
        },
        renderModal: function (calendar) {
            var template = Handlebars.compile($("#modalTemplate").html());
            var html = template(calendar);
            var element = $(html);
            $("#bookingModal").remove();
            $("body").append(element);
            ui.modal.setDateFrom(ui.search.getDateFrom());
            ui.modal.setDateTo(ui.search.getDateTo());

            $("#bookingModal").modal("show");
        },
        fillModal: function(calendar) {
            $("#Days").val(calendar.Price.Days);
            $("#PriceGross").val(calendar.Price.PriceGross.toFixed(2));
            $("#TotalPriceGross").val(calendar.Price.TotalPriceGross.toFixed(2));

            var additionalMessage = $(
                `[data-additional-valmsg-for="DateTo"]`
            );
            additionalMessage.toggleClass(
                "d-none",
                calendar.IsAvailable
            );
        }
    };
})();


var app = (function () {
    return {
        loader: {
            show: function () {
                document
                    .getElementsByTagName("body")[0]
                    .classList.add("loading");
            },
            hide: function () {
                document
                    .getElementsByTagName("body")[0]
                    .classList.remove("loading");
            },
        },
    };
})();

var searchApp = (function () {
    var initInputs = function () {
        var startDate = new Date();
        startDate.setHours(startDate.getHours() + 2);
        startDate.setMinutes(0);

        var endDate = new Date();
        endDate.setDate(endDate.getDate() + 1);
        endDate.setHours(endDate.getHours() + 2);
        endDate.setMinutes(0);

        ui.search.setDateFrom(startDate);
        ui.search.setDateTo(endDate);
    };

    initDataBookCalendar = function () {
        $("[data-book-calendar]").on("click", function () {
            var idCalendar = $(this).data("book-calendar");
            modalApp.showModal(idCalendar);
        });
    };

    var search = function () {
        var filters = {
            DateFrom: ui.search.getDateFrom(),
            DateTo: ui.search.getDateTo(),
        };

        app.loader.show();
        caldisApi.getCalendars(filters)
            .then((calendars) => {
                ui.clearCarList();
                calendars.forEach((car) => {
                    ui.renderCarCard(car);
                });

                initDataBookCalendar();
            })
            .catch((reason) => {
                alertApp.show("danger", "Bład systemu")
            })
            .finally(() => {
                app.loader.hide();
            });
    };

    return {
        init: function () {
            initInputs();
            search();

            $("#search_DateFrom, #search_DateTo").on("change", function () {
                search();
            });
        },
    };
})();

var modalApp = (function () {
    var _idCalendar = null;

    var loadCalendar = function() {
        var json =  {
            Id: _idCalendar,
            DateFrom: ui.search.getDateFrom(),
            DateTo: ui.search.getDateTo(),
        };

        app.loader.show();
        caldisApi.getCalendar(json)
            .then((calendar) => {
                console.log(calendar);
                ui.renderModal(calendar);
                ui.fillModal(calendar);

                initValidation();
                initDateChange();
                initSubmitReservation();
            })
            .catch((reason) => {
                alertApp.show("danger", "Bład systemu")
            })
            .finally(() => {
                app.loader.hide();
            });
    }

    var getCalendarJson = function () {
        return {
            Id: _idCalendar,
            DateFrom: ui.modal.getDateFrom(),
            DateTo: ui.modal.getDateTo(),
        };
    };

    var initValidation = function () {
        $("#bookingForm").validate({
            errorElement: "span",
            errorClass: "field-validation-error",
            rules: {
                Fullname: {
                    required: true,
                },
                Email: {
                    required: true,
                    email: true,
                },
                Phone: {
                    required: true
                },
                AcceptTermsOfService: {
                    required: true
                },
                Agreement1: {
                    required: true
                },
                Agreement2: {
                    required: true
                }
                // Add more rules for other form fields if needed
            },
            messages: {
                required: "Pole wymagane.",
                Fullname: {
                    required: "Pole wymagane.",
                },
                Email: {
                    required: "Pole wymagane.",
                    email: "Podaj prawidłowy adres email.",
                },
                Phone: {
                    required: "Pole wymagane.",
                },
                AcceptTermsOfService: {
                    required: "Zgoda wymagana"
                },
                Agreement1: {
                    required: "Zgoda wymagana"
                },
                Agreement2: {
                    required: "Zgoda wymagana"
                }
            },
            errorPlacement: function (error, element) {
                // Check if the element is a checkbox and has the 'checkboxGroup' name
                debugger;
                if (element.is(':checkbox')) {
                    // Place the error message at the end of the parent container
                    error.appendTo(element.closest('.form-check'));
                } 
                else if(element.closest(".form-floating").length > 0){
                    error.appendTo(element.closest('.form-floating'));
                }
                else {
                    // For other elements, use the default placement
                    error.insertAfter(element);
                }
            },
            submitHandler: function (form) {
                // This function will be called when the form is valid and submitted
                // You can handle the form submission or other actions here
                console.log("Form is valid and submitted.");
            },
        });
    };

    var initDateChange = function () {
        $("#DateFrom, #DateTo").on("change", function () {
            var json = getCalendarJson();

            app.loader.show();
            caldisApi.isCalendarAvailable(json)
                .then((calendar) => {
                    ui.fillModal(calendar);
                })
                .catch((reason) => {
                    alertApp.show("danger", "Bład systemu")
                })
                .finally(() => {
                    app.loader.hide();
                });
        });
    };

    var initSubmitReservation = function () {
        $("#submitReservation").on("click", function () {
            var form = $("#bookingForm");

            var additionalValidationPassed = $("[data-additional-valmsg-for]:visible").length === 0;

            if (form.valid() && additionalValidationPassed) {
                app.loader.show();
                var json = form.formToJson();
                caldisApi.addReservation(json) .then((response) => {
                    console.log(response);
                    

                    var template = Handlebars.compile($("#bookingCompletedTemplate").html());
                    var html = template();
                    var element = $(html);
                    $("#bookingModal").find(".modal-body").html(element);
                    $("#bookingModal").find("#submitReservation").remove();
                    $("#bookingModal").find("#closeModal").html("Zamknij");
                    
                    
                })
                .catch((reason) => {
                    alertApp.show("danger", "Bład systemu")
                })
                .finally(() => {
                    app.loader.hide();
                });
                
            } else {
                // The form is not valid, you can display error messages or take appropriate action.
                alertApp.show("primary", "Formularz zawiera błędy")
            }
        });
    };

    return {
        showModal: function (idCalendar) {
            _idCalendar = idCalendar;
           loadCalendar(idCalendar);
        },
    };
})();


