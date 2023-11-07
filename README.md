# rent-a-car-demo

<h2>
  Wtyczka rezerwacji dla wypożyczalni samochodów
</h2>

<p>
  Jak dodąć kalendarz rezerwacji na własnej stronie internetowej? To proste - załóż konto w a href="https://caldis.pl">systemie rezerwacji caldis.pl</a>, a następnie przeprowadź integrację samodzielnie, lub z pomocą naszego zespołu lub osoby która tworzyła Twoją stronę www.
</p>

<p>
  Projekt ten zawiera kody źródłowe, które pokazują jak można skorzystać z REST API systemu CALDIS, w celu dodawania rezerwacji. Przykład integracji możesz zobaczyć na <a href="http://demo-car-rental-2.caldis.pl/">STRONIE DEMO</a>. 
  Naturalnie jest to tylko szablon, a całą koncepcję integracji możesz przeprowadzić według własnej wizji.
</p>

<h2>
  Jak przeprowadzić integrację?
</h2>

<ol>
  <li>
    Zarejestruj konto w systemie caldis.pl
  </li>
  <li>
    Postępuj według instrukcji, w celu skonfigurowania kalendarzy
  </li>
  <li>
    W ustawieniach i na kalendarzach uruchom rezerwacje online
  </li>
  <li>
    W ustawieniach wygeneruj klucz API oraz skonfiguruj zabezpieczenia (HTTP referers dla klientów frontendowych / adresy IP dla klientów serwerowych)
  </li>
  <li>
    Gotowe, możesz przystąpić do prac programistycznych w celu integracji systemów
  </li>
</ol>


<h2>
  Klient API
</h2>

<p>
  Kody źródłowe z repozytorium, pokazuja w jaki sposób wykonać zapytania REST - jak pobrać kalendarze, jak sprawdzić czy są dostępne terminy oraz jak dokonać rezerwacji.
</p>

<h3>
  Pobieranie rezerwacji
</h3>

```js
var filters = {
    DateFrom: new Date("2024-01-01 15:00"),
    DateTo: new Date("2024-01-04 15:00"),
};

caldisApi.getCalendars(filters)
    .then((calendars) => {
        console.log(calendars)
    })
    .catch((reason) => {
        console.log(reason)
    })
```

<h3>
  Pobieranie danych kalendarza
</h3>


```js
var json =  {
    Id: "00000000-0000-0000-0000-000000000000",
    DateFrom: new Date("2024-01-01 15:00"),
    DateTo: new Date("2024-01-04 15:00"),
};

app.loader.show();
caldisApi.getCalendar(json)
    .then((calendar) => {
        console.log(calendar);
    })
    .catch((reason) => {
        console.log(reason)
    })
```

<h3>
  Sprawdzanie dostępności kalendarza
</h3>

```js
var json =  {
    Id: "00000000-0000-0000-0000-000000000000",
    DateFrom: new Date("2024-01-01 15:00"),
    DateTo: new Date("2024-01-04 15:00"),
};

caldisApi.isCalendarAvailable(json)
    .then((calendar) => {
        console.log(calendar);
    })
    .catch((reason) => {
        console.log(reason)
    })

```

<h3>
  Dodawanie rezerwacji
</h3>

```js
var json = form.formToJson();
caldisApi.addReservation(json).then((response) => {
    console.log(response);
})
.catch((reason) => {
    console.log(reason)
})
```
