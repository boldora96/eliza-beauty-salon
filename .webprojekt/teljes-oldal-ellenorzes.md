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

## Sorközök felülvizsgálata

2026. október 26.: mind az öt generált oldal 1536 és 375 px szélességen számított stílusokkal ellenőrizve. H1–H3, alcímek és gombok sormagassága 1,3; bekezdések, idézetek, listák és űrlapmezők 1,6. Nem volt eltérés vagy vízszintes túlcsordulás. Egységes cím- és bekezdésmargók; az évszámok álló, azonos magasságú számjegyekkel és 8 px címközzel jelennek meg. A 24 px mobil H3 számított sormagassága 31,2 px (a mérésben a lebegőpontos kerekítés figyelembe véve).

## Komponensek egységesítése

A jelenlegi öt generált oldal 1536, 768 és 375 px szélességen ellenőrizve. Gombok: Lora 600, 16/14 px, 1,3 sorköz, 16 × 24 px belső térköz, 4 px sarok. A menügomb ugyanezt követi. Mezők: törtfehér háttér, mélybarna szöveg, olívazöld fókusz. A vizsgált gombok, mezők és betűcsaládok között nincs eltérés; nincs vízszintes kilógás. Közös 8 px-es térközrendszer, 20 px-es szolgáltatásképek, teljes fedettségű megjegyzések. Sötét felületeken a gombok világos változatot használnak. A korábbi, archivált alternatív főoldalak változatlanok. Saját logó/favicon export továbbra is hátravan; a megfelelőség erre még nem teljes.

## Figma-szakaszok cseréje

A Rólunk oldal korábbi évszámsorát, értéklistáját és két hangulatképét a felhasználó kérésére a Figma 38327:238, 38327:271 és 38204:1161 szakaszai váltották fel. Négy szakmai blokk, három statisztikakártya és hat eredeti Figma-kép került az oldalba, helyi WebP formátumban. A 14+, 1300+, 350+ adatok a felhasználó tervéből származnak. Asztali geometria: 404 × 404 px galériaképek, az eredeti sorrendben; hét kép hibamentesen betöltődött. 376 px tényleges mobilnézetben egysoros galéria, H2 30 px, H3 24/31,2 px, nincs vízszintes kilógás. A Chrome képernyőképezése ebben a körben üres/hibás vásznat adott, ezért a teljes vizuális ellenőrzés nem igazolható; DOM-mérések és szerkezeti ellenőrzések sikeresek.

További designjavaslatok: saját Eliza-portré, végleges logó és favicon; hiteles vendégeredmények rövid történettel; a kezelések gyors összehasonlíthatósága; a hosszú oldalak ismételt időpontkérő szakaszainak ritkítása. A galéria kattintható nagyítása későbbi opcionális fejlesztés.

## Rólunk újraszerkesztése

A felhasználó visszajelzése alapján a Rólunk oldal négy részre egyszerűsödött: személyes bemutatkozás egy képpel, szakmai blokkok kompakt számsávval, hatképes galéria, időpontkérés. A külön ismételt történet és felhívás kikerült. A térközök desktopon 64 px, mobilon 48 px szakaszritmust követnek; a design system betűi és méretskálája maradtak. A képek ideiglenesek, végleges kiválasztásuk későbbi feladat.

A galéria hat képe gombként megnyitja a natív dialógust. Következő kép, képaláírás, Escape-es bezárás és görgetés feloldása Chrome-ban sikeresen tesztelve. A natív dialógus kezeli a fókuszt. 376 px tényleges mobilnézetben nincs kilógás, H1 38 px, a galéria egy oszlop. A szerkezeti ellenőrzés sikeres. A képernyőképezés továbbra is böngészőhibába futott, ezért teljes vizuális auditot ebben a körben sem állítunk.
