# Geek HUB

## 1. Alkalmazás leírása

### Célja:

### _Egy weboldal létrehozása a projekt gazda által kedvelt híroldalak híreinek és a közelgő mozifilmek összegzésére, megjelenítésére, illetve ezekhez kapcsolodó funkciók, interakciók _

Az alkalmazás feladata, hogy a egy hír és film tartalmakat megjelenítő weboldal szerepét betöltse és a felhasználóknak egy könnyen kezelhhessék, és jó felhasználó élményt nyújtson.

### Technikai követelmények és előírások:

- Az alkalmazás REACT Vite alapú, model-service-component architectúra jelemzi
- A megjelenés kinézetéért a Tailwind, React-icon és CSS felel
- MongoDB alapú, NoSQL adatbázissal rendelkezik
- NodeJS API: saját API végpontok szolgálják ki a frontendet
- Minden API végponthoz tartozik egy saját unit teszt
- Az API-hoz Swagger alapú dokumentáció tartozik
- A felület bizonyos oldalai csak bejelntkezés után elérhetők (JWT autentikáció)

#### Megjelenése:

- Az alkalmazás egy fejléces navigációval rendelkezik, amivel az egyes oldalak között lehet navigálni
- Teljesen reszponzív, mobile-first szemlélet
- Az alkalmazott színeket, betűtípusokat és az előre meghatárzott stílus osztályokat a styles/base mappa tárolja, és a base.css fájl gyűjti össze.

## 2. Az alkalmazás telepítése

- Forkolni kell az adott GitHub repository tartalmát:
  https://github.com/dsagi727/nerdnews-fsApi.git

- A célgépre le kell klónozni az adott GitHub repository tartalmát
  `git clone https://github.com/dsagi727/nerdnews-fsApi.git`

- Telepíteni kell az alkalmazás függőségeit:
  -- api:
  A terminálon be kell lépni a root mappába és futtatni az npm i parancsot.
  -- Frontend:
  A terminálon be kell lépni a /frontend mappába és futtatni az npm i parancsot.

- A terminálon be kell lépni a root mappába és ki kell adni az `npm start:dev` parancsot.
- A terminálon be kell lépni a /frontend mappába és ki kell adni az `npm run dev` parancsot.

## 3. Az alkalmazás konfigurálása

A root mappában létre kell hozni, egy config.env fájlt és be kell állítani a nélkülözhetetlen környezeti változókat. Ehhez a projekt tartalmaz egy exampleConfig.env fájlt a root mappában, ami már tartalmazza a szükséges változók egy részét és már csak egy mongo adatbázishoz tartozó adatokkal kell kiegészíteni.

## 4. A végpontok dokumentációja

Swagger

- Az alábbi URL-t kell beírni a böngészőbe: http://localhost:8000/api-docs/

## 5. Alkalmazás tesztek futtatása

### Egység tesztek futtatása:

## 6. Entitások

### User:

### News:

### Movie:

### Source:

### Category:

## 7. User Story lista

Aloldalak szerinti user story

## 8. Képernyők

### Főoldal /home

### Hírek /news

### Filmek /movies

### Felhasználói fiók /myAccount

### Felhasználó mentett hírek /myNews

### Felhasználó mentett filmek /myMovies

### Regisztráció /signup

### Bejelentkezés /login

### Jelszó frissítése /

### NotFound

### Forbidden

## 9. Projekt egyéb adatai:

### Piorítás:

Első számú piorítás egy olyan esztétikus portfolió oldal elkészítése, ami közel áll egy production weboldalhoz és naprakész valós tartalmakat jelenít meg automatizált módon.

### A megvalósítás időtartama:

Backend: Hozzávetőlegesen 2 hónap, bruttó 80 óra
frontend: Hozzávetőlegesen 3 hónap, bruttó 120 óra

### Tovább fejlesztési lehetőségek:

- Filmekhez köthető további adatokkal való bővítése, lehetőség szerint backendről külső adatszolgáltató nyílt API bevonsáával, amik a filmek előzeteseivel, szereplőinek adataival tudnák kiegészíteni a meglévő adatokat.
- Emlékeztető funkció a mentett filmekről.
- Saját testreszabható hírlevél a mentett hírekről.
- Oldal bővítése egyénileg létrehozható Quiz funkcióval.

### Nehézségek:

- Frontend arculatának elkészítése, ui/ux tervezése.
- A teljes frontend authentikáció megvalósítása React-ban és a különböző szerepkörök kezelése.
- Hírek és filmek oldalakon a komplex összefüggő lekérdezések létrehozása és azok összekötése a backend-el.
- Hírek és filmek mentésének műveletei, az ezzel összefűggő invalidációk meghtarázása react query-vel.
- Backend cron job-ok létrehozása. Külső hírek és filmek API forrásainak automatikus beolvasása és betöltése az adatbázisba automatizált módon, elkerülve a redundanciát.
