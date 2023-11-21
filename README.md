# rent-a-car-demo

<h2>
  Wtyczka rezerwacji dla wypożyczalni samochodów 
</h2>

<p>
 Jak dodać kalendarz rezerwacji na własnej stronie internetowej? To proste – załóż konto w <a href="https://caldis.pl">systemie rezerwacji caldis.pl</a>, a następnie przeprowadź integrację samodzielnie, z pomocą naszego zespołu lub osoby, która tworzyła Twoją stronę internetową.
</p>

<p>
  Projekt ten zawiera kody źródłowe pokazujące, jak skorzystać można z REST API systemu CALDIS, w celu dodawania rezerwacji. Przykład integracji możesz zobaczyć na <a href="https://demo-car-rental-2.caldis.pl">STRONIE DEMO</a>. Oczywiście jest to tylko szablon, a całą koncepcję integracji możesz przeprowadzić według 
  własnej wizji i pomysłów – przede wszystkim ze względu na wygląd graficzny.
</p>

<h2>
  Czym jest system rezerwacji online dla wypożyczalni samochodów?
</h2>

<p>
  To nowoczesne narzędzie ułatwiające Twoją codzienną prace w wypożyczalni. Zyskujesz porządek oraz czas na inne zadania, nie tracąc czasu na podstawowe zakresy obsługi rezerwacji, ale i podstawowe zakresy zarządzania Twoimi pojazdami. 
</p>

<p>
  W caldis.pl możesz:
</p>

<ul>
  <li>
    prowadzić przejrzyste kalendarze rezerwacji dla każdego samochodu
  </li>
  <li>
    generować dwoma kliknięciami umowy lub protokoły (za pomocą systemu wgrać możesz szablony własnych dokumentów)
  </li>
  <li>
    generować dwoma kliknięciami fakturę lub rachunek
  </li>
  <li>
    korzystać z karty pojazdu – automatycznych powiadomień związanych z przeglądami, serwisami oraz płatnościami za ubezpieczenie Twoich samochodów
  </li>
  <li>
    używać powiadomień SMS – w tym m.in. automatycznych przypomnień o nadchodzącej i kończącej się rezerwacji czy podziękowań 
  </li>
  <li>
     korzystać z aplikacji mobilnych dla systemów Android oraz iOS
  </li>
  <li>
    tworzyć konta użytkowników dla swoich współpracowników
  </li>
</ul>

<p>
  System rezerwacji online dla wypożyczalni samochodów od caldis.pl umożliwia więc nowoczesną, prostą i szybką obsługę dla Twojego klienta. Nie tracisz czasu, zawsze masz porządek w kalendarzu dla każdego pojazdu. I już nigdy nie zapominasz o konieczności przeglądu 
  lub zapłaty ubezpieczenia.
</p>

<p>
  Dzięki integracji z API, możesz umożliwić swoim klientom dokonywanie rezerwacji online bezpośrednio z Twojej strony www! Szybka integracja dla Ciebie, prosta rezerwacja dla klienta. Co więcej, możesz skorzystać z dostępnej w ramach programu dla wypożyczalni 
  samochodów możliwości pobierania opłat od klientów, tworząc kompatybilne konto w znanym i bezpiecznym serwisie płatności Przelewy 24. 
</p>

<p>
  Wprowadź swoją wypożyczalnię samochodów na kolejny krok rozwoju. Ciesz się wygodą swoją i klientów. Poznaj nas na <a href="https://caldis.pl"> caldis.pl</a>. 
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
  Kody źródłowe z repozytorium, pokazują w jaki sposób wykonać zapytania REST – jak pobrać kalendarze, jak sprawdzić czy są dostępne terminy oraz jak dokonać rezerwacji.	Jeśli masz jakiekolwiek wątpliwości lub pytania, napisz do nas: <a href="mailto:pomoc@caldis.pl">pomoc@caldis.pl</a>. 
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
