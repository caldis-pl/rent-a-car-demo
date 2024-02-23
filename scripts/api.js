var caldisApi = (function () {
    const rootUrl =  "https://caldis.pl/api/v1";
    const apiKey =  "";

    if(!apiKey){
        console.warn("caldis-api-key is missing")
    }

    const commonOptions = {
        method: "POST",
        headers: {
            "ApiKey": apiKey,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    };

    const fetchWithCommonOptions = async (url, data) => {
        const response = await fetch(url, {
            ...commonOptions,
            body: JSON.stringify(data),
        });

        var responseJson = await response.json()
        if (!response.ok) {
            console.info(`ERROR RESPONSE:`)
            console.info(responseJson);
            throw new Error(`Failed to fetch data from ${url}.`);
        }

        return responseJson;
    };

    return {
        getCalendars: async (data) => {
            const url = `${rootUrl}/FlexReservation/GetAll`;
            return fetchWithCommonOptions(url, data);
        },
        getCalendar: async (data) => {
            const url = `${rootUrl}/FlexReservation/Get`;
            return fetchWithCommonOptions(url, data);
        },
        getCalendarsFiltered: async (data) => {
            const url = `${rootUrl}/FlexReservation/GetFiltered`;
            return fetchWithCommonOptions(url, data);
        },
        isCalendarAvailable: async (data) => {
            const url = `${rootUrl}/FlexReservation/IsCalendarAvailable`;
            return fetchWithCommonOptions(url, data);
        },
        addReservation:  async (data) => {
            const url = `${rootUrl}/FlexReservation/Add`;
            return fetchWithCommonOptions(url, data);
        },
        getCategories: async () => {
            const url = `${rootUrl}/Categories/GetAll`;
            return fetchWithCommonOptions(url, data);
        }      
    };
})();