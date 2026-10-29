# Eliza Beauty Salon

## Netlify publikálás

Közzétett bemutató: https://elizabeautysalon.netlify.app/

A publikálható fájlok a `public/` mappában találhatók: öt végleges oldal, 22 WebP-fotó, a közös CSS és JavaScript, az SVG-logó és a favicon SVG/PNG változata. Munkaanyagok és korábbi koncepciók nem kerülnek bele.

Újragenerálás: `node .webprojekt/build-site.cjs` majd `node .webprojekt/prepare-public.cjs`. A `public/` generált kimenet: ne szerkeszd kézzel. A forrásokat a gyökérmappában és a `.webprojekt/` alatt kell módosítani. A `netlify.toml` automatikusan beállítja a build parancsot és a `public` publish directory értéket. Kézi feltöltésnél csak a `public/` mappát kell átadni a Netlifynak.

A publikált oldalak indexelése engedélyezett (index,follow). Az időpontkérő űrlapok a Netlify Formsba küldik az üzeneteket, és sikeres küldés után popupot mutatnak. A kisokos-feliratkozás külön Netlify Forms űrlapba érkezik, sikeres popup visszajelzéssel. A háromoldalas Kisokos a sikeres feliratkozás után letölthető. Az automatikus Kisokos-küldés a Brevón keresztül aktív és valódi beérkezett levéllel tesztelve.

A kiválasztott Csendes szalon irányra épülő, négyoldalas statikus weboldal, saját olívazöld arculattal.

## Oldalak

- index.html: Főoldal
- kezelesek.html: kezelési irányok, eredmények, garancia és csomagárak
- rolunk.html: bemutatkozás, szakmai út, értékek és szalon
- kapcsolat.html: időpontkérés, elérhetőségek, megközelítés és GYIK
- adatkezeles.html: Elizára szabott, a tesztműködést leíró adatkezelési tájékoztató; az éles adatokkal még véglegesítendő

A korábbi főoldali változatok a koncepciok.html és koncepciok-elso-kor.html választóoldalakon maradtak elérhetők. A koncepcio-1-csendes-szalon.html a végleges főoldal másolata.

## Helyi megtekintés és szerkesztés

Előnézet: node .webprojekt/preview-server.cjs

Cím: http://127.0.0.1:4173/

Generálás: node .webprojekt/build-site.cjs

Szerkezeti ellenőrzés: node .webprojekt/check-site.cjs

A közös alap a .webprojekt/templates/csendes-base.html, az aloldalak összeállítása a build-site.cjs fájlban található. A közös kiegészítő stílusok a .webprojekt/site-additions.css fájlban szerkeszthetők; az assets/site.css generált eredmény. Az interakciókat az assets/site.js kezeli.

## Arculat és ellenőrzés

A design-system.md szabályai szerint egységes betűcsaládok, címméretek, színek és gombok. Közös fejléc és lábléc, működő oldallinkek és mobilmenü. Optimalizált helyi WebP képek, forrásjegyzék: images/forrasok.md. A négy oldal saját címet, meta leírást és egy H1-et kapott.

Asztali és 375 px mobilnézetben Chrome-ban ellenőrizve: tipográfia, képek, túlcsordulás, mobilmenü, oldallinkek, helyi próbaűrlap. A Kezelések oldal 768 px szélességen is ellenőrizve. Részletek: .webprojekt/teljes-oldal-ellenorzes.md.

## Élesítés előtt hátravan

- Az időpontkérő űrlap Netlify Forms fogadása és sikeres popupja működik; egy technikai próbaüzenet ellenőrzött beküldésként megjelent a Netlifyban. Az időpontkérő űrlap beküldőjének automatikus e-mail-visszaigazolása még nincs bekötve; a Brevo jelenleg kizárólag a Kisokos kézbesítését végzi. A kisokos űrlapja a Netlify Formsba továbbítja a feliratkozási kérelmeket; Sikeres beküldés után a háromoldalas PDF letölthető.
- Az elkészült, személyre szabott adatkezelési tájékoztató véglegesítése a hiányzó vállalkozói adatokkal, éles szolgáltatókkal és megőrzési időkkel.
- Saját végleges logó és favicon exportja.
- A briefben szereplő fiktív elérhetőségek véglegesítése; a stock képek illusztrációk.
- Opcionális közösségi előnézetek és strukturált adatok a végleges üzleti adatok alapján.

A GitHub-repó privát. PageSpeed-mérés és teljes akadálymentességi audit még nem történt.

## Teljesítményjavítás – 2026. október 27.

A négy arculati betűtípus helyben tárolt, magyar karaktereket tartalmazó WOFF2; licenceik az assets/fonts mappában vannak. A stílusok közvetlenül a HTML-ben szerepelnek, így nem blokkol külön CSS- vagy Google Fonts-kérés. A kiválasztott eredeti WebP-fotók megmaradtak; a böngésző srcset/sizes alapján kisebb változatot tölthet le az assets/images mappából. A galéria nagyítása az eredeti fájlokat használja. A képváltozatok jegyzéke: .webprojekt/responsive-images.json. A Netlify beállításai gyorsítótárazási és alapvető biztonsági fejlécekkel egészültek ki.

## Kisokos-feliratkozás – 2026. október 27.

Netlify Forms név: arcapolasi-kisokos. Kötelező mezők: név, e-mail, adatvédelmi jelölés és külön e-mail-fogadási hozzájárulás. A beküldés böngészőoldali időpontja és a hozzájárulási szöveg verziója is továbbítódik. A sikeres popup csak sikeres szerverválasz után jelenik meg; hibánál megmaradnak a kitöltött adatok. A technikai próba „Kisokos technikai teszt 20261027” néven megjelent a Netlify kezelőfelületén. A Kisokos PDF elkészült. A Brevo automatikus Kisokos-kézbesítése aktív. A kulcs Netlify Secret, kizárólag a Production kontextusban, a Brevóban csak tranzakciós e-mail-hozzáféréssel; a repó nem tartalmaz kulcsot.


A PDF végleges példánya: output/pdf/Eliza Beauty Salon - Arcapolasi Kisokos.pdf. Webes letöltés: downloads/eliza-arcapolasi-kisokos.pdf. Generáló forrás: .webprojekt/create-kisokos.py, a hozzátartozó fontok a .webprojekt/pdf-fonts mappában. Licencük: assets/fonts/*-OFL.txt. A tulajdonosi értesítés a Netlifyban minden formra beállítva; a cím boldora96@gmail.com. Aktiválási lépések: .webprojekt/kisokos-email.md.


2026. október 27. 22:54: a valós próba-feliratkozás után a névre szóló Kisokos-levél megérkezett a tesztpostaládába, PDF-melléklettel és letöltőlinkkel. A melléklet háromoldalas, SHA-256 alapján egyezik a publikált PDF-fel. A Netlify tulajdonosi értesítése is megérkezett. Az igazolt feladócím boldora96@gmail.com; saját hitelesített domain hiányában a Brevo a kézbesítésnél saját brevosend.com feladócímét alkalmazza, Eliza Beauty Salon megjelenített névvel. Ez az időpontkérő űrlap automatikus visszaigazoló levelezését nem módosítja.

## Egységes levelezés és leiratkozás

2026. október 29-től mindkét űrlaphoz elkészült az ügyfél-visszaigazolás és a tulajdonosi értesítés közös arculati sablonja. A Kisokos-feliratkozókat a Brevo 3-as, Eliza – Arcápolási Kisokos listája kezeli. A leiratkozási link megerősítést követően megszünteti a Brevo hírlevél-jogosultságot, eltávolítja a listatagságot és tulajdonosi értesítést küld. Részletek és működési korlátok: `.webprojekt/kisokos-email.md`. A korábbi, csak Kisokos-kézbesítést említő állapotleírások történeti tesztadatok.
