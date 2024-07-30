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

- A terminálon be kell lépni a root mappába és ki kell adni az `npm run test` parancsot.

## 6. Entitások

### User:

A felhasználó entitás az alkalmazás legfontosabb eleme, amely a felhasználók adatainak tárolására szolgál.

- ID: Egyedi azonosító (MongoDB ObjectId)
- userName: Felhasználónév, amely egyedi a rendszerben
- email: Felhasználó email címe, egyedi
- password: Titkosított jelszó
- userNews: Hivatkozások a felhasználó által mentett hírekre
- userMovies: Hivatkozások a felhasználó által mentett filmekre
- role: Felhasználó szerepkörei (pl. admin, user)
- active: User entitást nem lehet törölni, csak inaktiválni
- createdAt: Regisztráció dátuma
- updatedAt: Utolsó módosítás dátuma

### News:

### Movie:

### Source:

### Category:

## 8. Képernyők

### Főoldal /home

Funkciók:
Áttekintést nyújt a legfrissebb hírekről és filmekről
Hírek és filmek gyors elérése, ajánlások
Felhasználói navigációs lehetőségek
Komponensek: Hírek listája, filmek listája, keresőmező, ajánlások

### Hírek /news

Funkciók:
Hírek listájának megjelenítése
Kategóriák szerinti szűrés
Keresési lehetőség hírek között
Komponensek: Hírek lista, szűrők, keresőmező, hír részletei link

### Filmek /movies

Funkciók:
Filmek listájának megjelenítése
Műfajok szerinti szűrés
Keresési lehetőség filmek között
Komponensek: Filmek lista, szűrők, keresőmező, film részletei link

### Felhasználói fiók /myAccount

Funkciók:
Felhasználói profil információk megtekintése és szerkesztése
Jelszó módosítása
Komponensek: Profil adatok, jelszó módosító űrlap, mentett hírek és filmek hozzáférés

### Felhasználó mentett hírek /myNews

Funkciók:
A felhasználó által mentett hírek listája
Hírek törlése a mentett listából
Komponensek: Mentett hírek lista, törlés gombok

### Felhasználó mentett filmek /myMovies

Funkciók:
A felhasználó által mentett filmek listája
Filmek törlése a mentett listából
Komponensek: Mentett filmek lista, törlés gombok

### Regisztráció /signup

Funkciók:
Új felhasználó regisztrálása
Adatok megadása (felhasználónév, email, jelszó)
Komponensek: Regisztrációs űrlap, hibaüzenetek

### Bejelentkezés /login

Funkciók:
Felhasználó bejelentkezése
Email és jelszó megadása
Komponensek: Bejelentkezési űrlap, hibaüzenetek

### Elfelejtett jelszó /forgetPassword

Funkciók:
Jelszó helyreállítási kérelem
Email cím megadása
Komponensek: Email űrlap, sikerüzenet, hibaüzenetek

### Jelszó frissítése /resetPassword/:resetToken

Funkciók:
Új jelszó megadása a reset token alapján
Komponensek: Új jelszó űrlap, hibaüzenetek

### NotFound

Funkciók:
404-es hibaoldal, ha a keresett oldal nem található
Komponensek: Hibaüzenet, navigációs lehetőségek

### Forbidden /unauthorized

Funkciók:
403-as hibaoldal, ha a felhasználónak nincs hozzáférése az adott oldalhoz
Komponensek: Hibaüzenet, navigációs lehetőségek

### Admin oldalak

A "Admin oldalak" szekcióban az adminisztrátori felületet és annak funkcióit részletezzük. Ezek az oldalak az adminisztrátorok számára lehetővé teszik az alkalmazás tartalmának és felhasználóinak kezelését. Íme a részletesebb leírás

### Felhasználók létrehozása és szerkesztése /editUsers

Funkciók:

- Felhasználó létrehozása: Új felhasználók hozzáadása az alkalmazáshoz. Az adminisztrátor megadhatja a felhasználó nevét, email címét, jelszavát és szerepköreit.
- Felhasználó szerkesztése: Meglévő felhasználói adatok módosítása, mint például név, email cím, szerepkörök és egyéb profilbeállítások.
- Felhasználók listázása: A rendszerben lévő felhasználók megtekintése és keresése.
- Felhasználó törlése: A felhasználók eltávolítása a rendszerből.

Komponensek:

- Felhasználói lista
- Létrehozó és szerkesztő űrlap
- Törlés, szerkesztés gombok

### Hírek létrehozása és szerkesztése /editNews

Funkciók:

- Hír létrehozása: Új hírek hozzáadása, beleértve a cím, tartalom, szerző, közzététel dátuma, forrás és kategória megadását.
- Hír szerkesztése: Meglévő hírek módosítása. A szerkesztés során az adminisztrátor változtathatja a hírek címét, tartalmát, forrást, kategóriát és egyéb részleteket.
- Hírek listázása: A hírek megtekintése és keresése.
- Hír törlése: Hírek eltávolítása a rendszerből.

Komponensek:

- Hírek lista
- Létrehozó és szerkesztő űrlap
- Keresőmező
- Törlés gombok
- Szűrők és rendezési lehetőségek

### Filmek létrehozása és szerkesztése /editMovies

Funkciók:

- Film létrehozása: Új filmek hozzáadása, beleértve a cím, leírás, megjelenési dátum, műfaj, rendező, szereplők és poszter URL megadását.
- Film szerkesztése: Meglévő filmek módosítása. Az adminisztrátor szerkesztheti a filmek címét, leírását, megjelenési dátumát, műfaját, szereplőit és egyéb adatait.
- Filmek listázása: A filmek megtekintése és keresése.
- Film törlése: Filmek eltávolítása a rendszerből.

Komponensek:

- Filmek lista
- Létrehozó és szerkesztő űrlapok
- Keresőmező
- Törlés gombok
- Szűrők és rendezési lehetőségek

### Források létrehozása és szerkesztése /editSources

Funkciók:

- Forrás létrehozása: Új híroldalak vagy tartalomszolgáltatók hozzáadása, beleértve a neveket és URL-eket.
- Forrás szerkesztése: Meglévő források módosítása, beleértve a név és URL változtatását.
- Források listázása: A források megtekintése és keresése.
- Forrás törlése: Források eltávolítása a rendszerből.

Komponensek:

- Források lista
- Létrehozó és szerkesztő űrlapok
- Törlés gombok

### Kategóriák létrehozása és szerkesztése /EditCategories

Funkciók:

- Kategória létrehozása: Új kategóriák hozzáadása a hírek és filmek számára. Az adminisztrátor megadhatja a kategória nevét és leírását.
  - Kategória szerkesztése: Meglévő kategóriák módosítása, beleértve a név és leírás változtatását.
  - Kategóriák listázása: A kategóriák megtekintése és keresése.
- Kategória törlése: Kategóriák eltávolítása a rendszerből.

Komponensek:

- Kategóriák lista
- Létrehozó és szerkesztő űrlapok
- Törlés gombok

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
