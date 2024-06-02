import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="p-6 text-content-light dark:text-content-dark dark:bg-border-dark rounded-md">
      <h1 className="text-2xl font-bold mb-4">Adatkezelési Tájékoztató</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">1. Az adatkezelő adatai</h2>
        <p>
          <strong>Az adatkezelő neve:</strong> Sági Dániel
        </p>
        <p>
          <strong>Székhely címe:</strong> 8991, Teskánd Vorhotai utca 9/C
        </p>
        <p>
          <strong>Kapcsolattartási e-mail címe:</strong> dsagi727@gmail.com
        </p>
        <p>
          <strong>Telefonszáma:</strong> +36304410078
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">2. Az adatkezelés céljai</h2>
        <p>Az adatkezelő az alábbi célokra gyűjt és kezel személyes adatokat:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Felhasználói fiókok létrehozása</li>
          <li>Bejelentkezések kezelése</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">3. A kezelt adatok köre</h2>
        <p>Az adatkezelő az alábbi személyes adatokat gyűjti és kezeli:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Név</li>
          <li>E-mail cím</li>
          <li>Felhasználónév</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">4. Adatmegőrzési idő</h2>
        <p>
          A személyes adatokat addig őrizzük meg, amíg a felhasználói fiók aktív. A fiók inaktiválását követően az
          adatokat további 90 napig őrizzük meg, majd véglegesen töröljük az adatbázisból.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">5. Adattovábbítás</h2>
        <p>Az adatkezelő nem továbbít személyes adatokat harmadik félnek.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">6. Biztonsági intézkedések</h2>
        <p>Az adatbiztonság érdekében az adatkezelő az alábbi technikai és szervezési intézkedéseket alkalmazza:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Titkosítás</li>
          <li>Jelszóvédelem</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">7. Az érintettek jogai</h2>
        <p>Az érintettek az alábbi jogokkal rendelkeznek a személyes adataikkal kapcsolatban:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Hozzáférés joga</li>
          <li>Helyesbítés joga</li>
          <li>Törlés joga</li>
        </ul>
        <p>A felhasználók a saját adataikat a felhasználói felületen módosíthatják.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Kapcsolatfelvétel és panaszkezelés</h2>
        <p>
          Ha kérdése van az adatkezeléssel kapcsolatban, vagy jogait szeretné gyakorolni, kérjük, lépjen kapcsolatba
          velünk a fent megadott e-mail címen vagy telefonszámon.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
