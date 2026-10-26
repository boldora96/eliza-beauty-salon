# A teljes oldal ellenőrzése – 2026. október 26.

A Csendes szalon kiválasztott irányából közös CSS-sel és navigációval elkészült a Főoldal, Kezelések, Rólunk és Kapcsolat.

## Chrome-ellenőrzés

Mind a négy oldal asztali és 375 × 812 px mobilnézetben ellenőrizve. A Kezelések 768 × 1024 px méreten is megfelelt.

- A számított stílusok szerint H1/H2/H3: Playfair Display 400, asztali 60/40/28 px, mobil 38/30/24 px.
- Body és űrlapmezők: Montserrat 400, 16 px.
- Alcímek és GYIK: Libre Baskerville 500, 20/16 px.
- Gombok: Lora 600, 16/14 px; másodlagos gombok átlátszó háttérrel és zöld kerettel.
- A vizsgált elemek között nem volt betűcsalád-, méret- vagy vastagságeltérés.
- Nincs vízszintes túlcsordulás; a betöltött képek megjelentek.
- Mobilmenü, oldalváltás, időpontkérő horgonyok ellenőrizve.
- A helyi próbaűrlap helyesen jelzi, hogy az üzenet nem lett elküldve.
- A hosszú bemutatkozó szöveg olvasható bekezdésekre bontva; az oldalak közös térköz- és kártyaszabályokat használnak.

## Automatikus szerkezeti ellenőrzés

A check-site.cjs sikeresen lefutott: oldalanként egy H1, nincs ismétlődő azonosító, hiányzó helyi kép/fájl/oldal vagy belső horgony. A négy főoldalon egy-egy kapcsolati űrlap, az adatkezelési helyőrzőn nincs. Mindhárom forrás szerinti csomagár és mind az öt érték szerepel.

## Határok

Ez megjelenési és működési ellenőrzés, nem teljes akadálymentességi audit vagy PageSpeed-mérés. A valódi üzenetküldés, adatkezelési tájékoztató, végleges logó és Netlify-élesítés még hátravan. A noindex megmaradt a fejlesztési változatban.
