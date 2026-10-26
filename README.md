# Eliza Beauty Salon

Három főoldali koncepció a saját olívazöld arculattal. Jelen körben kizárólag főoldalak készültek, további aloldalak nélkül.

## Megtekintés

Nyisd meg az `index.html` fájlt Chrome-ban, vagy indítsd a helyi előnézetet:

```sh
node .webprojekt/preview-server.cjs
```

Cím: http://127.0.0.1:4173/

- `koncepcio-1-csendes-szalon.html`: levegős, kétoszlopos nyitás.
- `koncepcio-2-borapolasi-magazin.html`: széles fotó, aszimmetrikus szerkesztés.
- `koncepcio-3-szemelyes-torodes.html`: középre zárt nyitás, személyes bemutatkozás.

Mindegyik változat önálló HTML, saját stílusokkal és interakciókkal. A Google Fonts és a prototípusokhoz használt Tailwind Play CDN internetkapcsolatot igényel. A képek helyi, optimalizált WebP-k; forrásaik az `images/forrasok.md` fájlban találhatók.

## Állapot és korlátok

- Az űrlapok látványtervek: a kapcsolati űrlap kitölthető, de a beküldés csak egy helyi tájékoztató üzenetet jelenít meg, nincs hálózati adatküldés. A hírlevél-feliratkozás le van tiltva.
- A menü a főoldal megfelelő szakaszaihoz vezet.
- A saját végleges logó és favicon exportja még hátravan; a feliratok ideiglenesek.
- A képek stock illusztrációk, nem a tényleges szalonról vagy Elizáról készült fotók.
- Az ügyféljegyzetben található fiktív elérhetőségek mintaadatként szerepelnek.
- Az adatkezelési tájékoztató még nem készült el; a lábléc ezt egyértelműen jelzi.
- Élesítés, további oldalak, valós űrlapbekötés és végleges SEO-ellenőrzés a kiválasztott irány továbbépítésének része.

## Ellenőrzés

Chrome-ban ellenőrizve asztali és 375 × 812 px mobilnézetben: a három nyitóképernyő, vízszintes túlcsordulás, mobilmenük és szakaszlinkek. Mindhárom kapcsolati űrlap helyi próbaadataival ellenőrizve: a valós küldés hiányáról ad visszajelzést. A GYIK lenyitása működik. Az oldalak egy H1-et és négy GYIK-kérdést tartalmaznak. Ez prototípusellenőrzés, nem teljes élesítési audit vagy PageSpeed-mérés.

A repó privát marad. A későbbi éles weboldal célzott tárhelye Netlify.
