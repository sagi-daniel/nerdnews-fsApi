# nerdnews

## 1. Alkalmazás leírása

### Célja:

### Egy weboldal létrehozása a projekt gazda által kedvelt híroldalak híreinek és a közelgő mozifilmek összegzésére, megjelenítésére, illetve ezekhez kapcsolodó funkciók, interakciók

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

- A lokálisan elindított swagger eléréshez az alábbi URL-t kell beírni a böngészőbe: http://localhost:8000/api-docs/
- Az éles oldal swagger dokuentáció eléréséhez az alábbi URL-t kell beírni a böngészőbe: https://nerdnews.hu/api-docs/

## 5. Alkalmazás tesztek futtatása

### Egység tesztek futtatása:

- A terminálon be kell lépni a root mappába és ki kell adni az `npm run test` parancsot.

## 6. Entitások

### User:

A felhasználói entitás tárolja a rendszerben lévő felhasználók adatait. Ez az entitás tartalmazza az alapvető információkat, valamint a felhasználó által mentett híreket és filmeket.

- id: Egyedi azonosító (string) – A MongoDB által generált egyedi azonosító, amely azonosítja a felhasználót.
- role: Szerepkör (string) – A felhasználó szerepköre az alkalmazásban, például adminisztrátor, felhasználó stb.
- userName: Felhasználónév (string) – A felhasználó által választott név, amely egyedi az alkalmazásban.
- email: Email cím (string) – A felhasználó email címe, amely szintén egyedi a rendszerben.
- userNews: Mentett hírek (NewsModel[]) – A felhasználó által mentett hírek listája. Minden elem a hírek entitását reprezentálja.
- userMovies: Mentett filmek (MovieModel[]) – A felhasználó által mentett filmek listája. Minden elem a filmek entitását reprezentálja.
- createdAt: Létrehozás dátuma (string) – A felhasználó regisztrációjának dátuma ISO 8601 formátumban.
- updatedAt: Módosítás dátuma (string) – Az utolsó módosítás dátuma ISO 8601 formátumban.

Ezek az adatok biztosítják a felhasználó nyomon követését az alkalmazáson belül, valamint lehetővé teszik a mentett tartalmak kezelését.

### News:

A hírek entitás az alkalmazás híreinek adatait tárolja. Ez az entitás tartalmazza a hír címét, tartalmát, és egyéb kapcsolódó információkat.

- id: Egyedi azonosító (string) – A MongoDB által generált egyedi azonosító, amely azonosítja a hírt.
- release: Közzététel dátuma (string) – A hír megjelenésének dátuma ISO 8601 formátumban.
- source: Forrás (SourceModel) – A hír forrása, amely a SourceModel entitást reprezentálja. Tartalmazza a hírt közzétevő szervezet nevét és URL-jét.
- category: Kategória (CategoryModel) – A hír kategóriája, amely a CategoryModel entitást reprezentálja. Tartalmazza a kategória nevét és leírását.
- title: Cím (string) – A hír címe.
- link: Hivatkozás (string) – A hír teljes szövegéhez vezető URL vagy link.
- content: Tartalom (string) – A hír teljes szövege.
- imageUrl: Kép URL (string) – A hírhez kapcsolódó kép URL-je.
- createdAt: Létrehozás dátuma (string, opcionális) – A hír létrehozásának dátuma ISO 8601 formátumban. Ez az adat opcionális, ha a hír az adatbázisba való belépéskor nem - rendelkezik létrehozási dátummal.
- updatedAt: Módosítás dátuma (string, opcionális) – Az utolsó módosítás dátuma ISO 8601 formátumban. Ez az adat opcionális, ha a hír az adatbázisba való belépéskor nem rendelkezik módosítási dátummal.

Ez a modell segít a hírek szervezésében, kezelésében és megjelenítésében az alkalmazáson belül, biztosítva a releváns és naprakész információk megjelenítését.

### Movie:

A filmek entitás az alkalmazásban lévő filmek adatait tárolja. Ez az entitás tartalmazza a filmek alapvető információit és azok értékeléseit.

- id: Egyedi azonosító (string) – A MongoDB által generált egyedi azonosító, amely azonosítja a filmet.
- tmdb_id: TMDB azonosító (number) – A film egyedi azonosítója a The Movie Database (TMDb) szolgáltatásban.
- release: Megjelenés dátuma (string) – A film megjelenésének dátuma ISO 8601 formátumban.
- title: Cím (string) – A film címe.
- overview: Áttekintés (string) – A film rövid leírása vagy összefoglalója.
- poster: Poszter URL (string) – A film poszterének URL-je.
- genre: Műfaj(ok) (FilterName[]) – A film műfajainak listája. A FilterName típusú értékek tartalmazzák a film műfaját (pl. akció, dráma, vígjáték).
- voteAverage: Átlagos értékelés (number) – A film átlagos értékelése, amelyet általában 1-től 10-ig terjedő skálán mérnek.
- voteCount: Értékelések száma (number) – Az értékelések összesített száma, amelyet a film kapott.
- createdAt: Létrehozás dátuma (string) – A film adatainak adatbázisba történő mentésének dátuma ISO 8601 formátumban.
- updatedAt: Módosítás dátuma (string) – Az utolsó módosítás dátuma ISO 8601 formátumban.

Ez a modell biztosítja a filmek részletes és pontos nyilvántartását, lehetővé téve a felhasználók számára, hogy hozzáférjenek a filmek alapvető információihoz és értékeléseikhez az alkalmazásban.

### Source:

A forrás entitás az alkalmazásban használt híroldalakat vagy tartalomszolgáltatókat tárolja. Ez az entitás tartalmazza a forrás alapvető adatait és kategóriáját.

- id: Egyedi azonosító (string) – A MongoDB által generált egyedi azonosító, amely azonosítja a forrást.
- sourceName: Forrás neve (string) – A forrás neve, például a híroldal neve vagy a tartalomszolgáltató neve.
- sourceType: Forrás típusa (string) – A forrás típusa, például híroldal, blog, magazin stb. Ez segít kategorizálni a forrást az alkalmazásban.
- sourceLink: Forrás link (string) – A forrás weboldalának URL-je, ahol a felhasználók hozzáférhetnek a tartalomhoz.
- category: Kategória (CategoryModel) – A forrás kategóriája, amely a CategoryModel entitást reprezentálja. Tartalmazza a kategória nevét és leírását, amely segít a - források rendszerezésében.
- comment: Megjegyzés (string, opcionális) – Opcionális mező, amely lehetőséget ad extra megjegyzések hozzáadására a forráshoz, például a forrás specifikus jellemzőire - vonatkozóan.
- createdAt: Létrehozás dátuma (string) – A forrás adatainak adatbázisba történő mentésének dátuma ISO 8601 formátumban.
- updatedAt: Módosítás dátuma (string) – Az utolsó módosítás dátuma ISO 8601 formátumban.

Ez a modell lehetővé teszi a híroldalak és tartalomszolgáltatók hatékony nyilvántartását és kezelését az alkalmazáson belül, biztosítva, hogy a források megfelelően kategorizálva és könnyen elérhetőek legyenek.

### Category:

A kategória entitás az alkalmazásban lévő hírek és filmek kategóriáit tárolja. Ez az entitás segít az adatok rendszerezésében és a felhasználói élmény javításában.

- id: Egyedi azonosító (string) – A MongoDB által generált egyedi azonosító, amely azonosítja a kategóriát.
- categoryName: Kategória neve (FilterName | string) – A kategória neve. Ez lehet egy előre definiált szűrőnév (FilterName típus) vagy szöveges érték (string), amely az adott kategóriát azonosítja.
- createdAt: Létrehozás dátuma (string) – A kategória adatainak adatbázisba történő mentésének dátuma ISO 8601 formátumban.
- updatedAt: Módosítás dátuma (string) – Az utolsó módosítás dátuma ISO 8601 formátumban.

Ez a modell segít a hírek és filmek kategorizálásában, lehetővé téve a felhasználók számára, hogy könnyen szűrjék és megtalálják az érdeklődési körüknek megfelelő tartalmakat.

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
