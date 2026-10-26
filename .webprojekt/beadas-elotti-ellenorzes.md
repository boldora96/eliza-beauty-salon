# Beadás előtti ellenőrzés – Eliza Beauty Salon

Dátum: 2026. október 26.

## Összértékelés

A négyoldalas terv és helyi működő felület elkészült, az időpontkérést támogató felépítéssel. A feladat teljes beadásra még nem kész: a nyilvános Netlify-oldal, a valódi üzenetküldés és a végleges adatkezelési tájékoztató hiányzik. A korábban jóváhagyott tartalmi rövidítéseket és Figma alapján kért cseréket megtartottuk; az oldalak nem a szovegek.md szó szerinti másolatai.

## Ellenőrzés és javítás

- Chrome: mind a négy oldal 1440, 375 és 320 px szélességen. Összesen 12 mérési eset, 0 betűcsalád/méret/vastagság/sorköz eltérés, 0 vízszintes kilógás a javítás után. A részletes adatok az audit-meresek.json fájlban vannak.
- A Rólunk galéria mobilos képaláírása 14 px helyett 16 px lett, a design system body skálája szerint.
- A Rólunk hero közvetlen időpontkérő CTA-t kapott, a brief fő céljának megfelelően; a szalongaléria másodlagos gombja megmaradt.
- A főoldali kisokos helye és szakaszsorrendje változatlan.
- A README és design system kisokosra vonatkozó elavult letiltási megjegyzése javítva.
- A nyitórészekről és a Rólunk bemutatkozásáról asztali, a négy oldalról mobilos képernyőképes ellenőrzés történt. A galéria képei a hozzájuk görgetéskor töltődnek be; a teljes oldalas screenshot nem alkalmas ennek ellenőrzésére. A mobilos galéria megnyitva és lapozva is ellenőrizve.
- A mobilmenü megnyílik, a megfelelő aloldalra navigál. A GYIK csukva indul. A kötelező űrlapmezők és az adatvédelmi jelölés hibái a megfelelő mezőnél jelennek meg, és megakadályozzák a továbblépést.
- Egyedi oldalcímek és meta descriptionök, oldalanként egy H1; a vizsgált képeknél nincs hiányzó alt attribútum. A szerkezeti ellenőrzés nem talált hiányzó helyi fájlt, ismétlődő azonosítót vagy törött helyi horgonyt.
- Valódi WebP képek: fájlonként kb. 44–144 KB; Pexels-források dokumentálva. A Figma-képek eredeti stockforrása és végleges felhasználása még tisztázandó.
- Fő színpárok számított kontrasztja: zöld/krém 6,25:1, barna/krém 11,52:1, zöld/törtfehér 6,46:1, barna/törtfehér 11,93:1. Ez a fő színpárok ellenőrzése, nem teljes akadálymentességi audit.

## Megfelelés a feladatnak és briefnek

| Követelmény | Állapot |
|---|---|
| Főoldal, Kezelések, Rólunk, Kapcsolat | Elkészült |
| Mobil és desktop megjelenés | A fenti méreteken ellenőrizve |
| Egy közös időpontkérő űrlap minden oldal alján | Elkészült; a négy oldalon ugyanaz a komponens |
| Teljes név, e-mail, üzenet, kötelező adatvédelmi jelölés | Elkészült, helyi ellenőrzéssel |
| Kezelések egy gyűjtőoldalon | Elkészült, külön kezelési aloldalak nélkül |
| Cím, telefon, e-mail, nyitvatartás | A brief mintaadatait követik |
| Csomagárak és garancia | A forrás szerinti 79 000 / 99 000 / 59 000 Ft és 5 alkalmas kúra / 50% szerepel |
| Verziókövetés | Git-repó, rendszeres commitok, GitHub remote és feltöltés |
| Netlify nyilvános link | Hiányzik |
| Valóban beérkező próbaüzenet | Hiányzik; jelenleg nincs hálózati adatküldés |
| Adatkezelési tájékoztató a kurzus sablonjából | Hiányzik; a link csak előkészítési oldalra vezet |
| SEO alapok | Title, description, H1 és alt megvan; jelenleg szándékos noindex van |
| WebP, megfelelő képméretek | A jelenlegi képek optimalizálva; végleges képkiválasztás még nyitott |
| Saját logó és favicon | Export és beillesztés még hiányzik |
| Figmás összehasonlítás 5–10 mondatban | Hiányzik; a tényleges időráfordítást a felhasználó adhatja meg |

## Mi maradt a kötelező beadáshoz?

1. Az időpontkérő űrlap bekötése valódi fogadó címre/szolgáltatásra; próbaüzenet beérkezésének igazolása. A brief fiktív e-mail-címe önmagában nem alkalmas ennek bizonyítására.
2. A kurzus adatkezelési sablonjának kitöltése a tényleges szolgáltatás és adatok szerint, az előkészítési oldal lecserélése.
3. Netlify-élesítés, majd az élő változat ellenőrzése és a nyilvános URL rögzítése. Az éles fájlok külön publikációs mappába rendezése ajánlott, hogy briefek és prototípusok ne kerüljenek ki.
4. A fejlesztési noindex eltávolítása az éles változatból; a végleges címhez kötődő SEO-elemek ellenőrzése. Canonical, Open Graph, sitemap és robots.txt a teljesebb átadáshoz javasolt, nem mind külön kötelező eleme a házinak.
5. Az élő oldal megnyitása valódi telefonon, próbaüzenet küldése.
6. Az élő Netlify-link, GitHub-link és a saját tapasztalatokon alapuló 5–10 mondatos összehasonlítás beadása.

## Saját arculat véglegesítése és opcionális feladatok

- A saját Figma-logó és favicon exportja, végleges képek kiválasztása, stockforrások rendezése. A képek cseréjét a felhasználó későbbre kérte, ezért nem történt új képkiválasztás.
- A brief szerint nincs közösségi média. A felhasználó által kért ikonok jelenleg dekoratív helyőrzők, nem működő profilhivatkozások; valódi címek esetén beköthetők.
- Kisokos: a főoldali űrlap kitölthető, de valódi feliratkozás és PDF-letöltés nincs. A háziban ez opcionális, a briefben szereplő plusz funkció.
- Mobil PageSpeed 90+: nem mértük; opcionális cél, élesítés után érdemes mérni. Nem állítjuk, hogy a jelenlegi oldal eléri a 90-et.
- A reszponzív emuláció nem helyettesíti a valódi telefonos ellenőrzést; teljes akadálymentességi audit nem történt.
