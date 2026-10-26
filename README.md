# Eliza Beauty Salon

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

- Az időpontkérő űrlap tényleges bekötése és a beérkező próbaüzenet ellenőrzése. Jelenleg nincs hálózati adatküldés, ezt az űrlap jelzi. A kisokos űrlapja kitölthető és ellenőrizhető, de még nem továbbít adatot és nem ad letöltést.
- Az elkészült, személyre szabott adatkezelési tájékoztató véglegesítése a hiányzó vállalkozói adatokkal, éles szolgáltatókkal és megőrzési időkkel.
- Saját végleges logó és favicon exportja.
- A briefben szereplő fiktív elérhetőségek véglegesítése; a stock képek illusztrációk.
- Netlify-élesítés, végleges SEO-beállítások és a fejlesztés alatti noindex eltávolítása.

A GitHub-repó privát. PageSpeed-mérés és teljes akadálymentességi audit még nem történt.
