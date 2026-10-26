# Eliza Beauty Salon

## Netlify publikálás

Közzétett bemutató: https://elizabeautysalon.netlify.app/

A publikálható fájlok a `public/` mappában találhatók: öt végleges oldal, 22 WebP-fotó, a közös CSS és JavaScript, az SVG-logó és a favicon SVG/PNG változata. Munkaanyagok és korábbi koncepciók nem kerülnek bele.

Újragenerálás: `node .webprojekt/build-site.cjs` majd `node .webprojekt/prepare-public.cjs`. A `public/` generált kimenet: ne szerkeszd kézzel. A forrásokat a gyökérmappában és a `.webprojekt/` alatt kell módosítani. A `netlify.toml` automatikusan beállítja a build parancsot és a `public` publish directory értéket. Kézi feltöltésnél csak a `public/` mappát kell átadni a Netlifynak.

A bemutató továbbra is noindex. Az időpontkérő űrlapok a Netlify Formsba küldik az üzeneteket, és sikeres küldés után popupot mutatnak. A kisokos-feliratkozás és az automatikus visszaigazoló e-mail még nincs bekötve.

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

- Az időpontkérő űrlap Netlify Forms fogadása és sikeres popupja működik; egy technikai próbaüzenet ellenőrzött beküldésként megjelent a Netlifyban. A beküldő automatikus e-mail-visszaigazolásához még levélküldő szolgáltatás és feladó beállítása szükséges. A kisokos űrlapja nem továbbít adatot és nem ad letöltést.
- Az elkészült, személyre szabott adatkezelési tájékoztató véglegesítése a hiányzó vállalkozói adatokkal, éles szolgáltatókkal és megőrzési időkkel.
- Saját végleges logó és favicon exportja.
- A briefben szereplő fiktív elérhetőségek véglegesítése; a stock képek illusztrációk.
- Netlify-élesítés, végleges SEO-beállítások és a fejlesztés alatti noindex eltávolítása.

A GitHub-repó privát. PageSpeed-mérés és teljes akadálymentességi audit még nem történt.
