# PageSpeed-javítások – 2026. október 27.

Az élő oldal: https://elizabeautysalon.netlify.app/

## Mért eredmények

A mérés helyi Chrome headless böngészőben, Lighthouse 13.5.0 eszközzel, az élő Netlify URL-en történt. A mobilos mérések azonos alapbeállításokkal készültek. A Google PageSpeed API kvótahibát (429) adott, ezért ezek nem a távoli PageSpeed Insights új pontszámai. A mérési környezet és a hálózat változása miatt az eredmények eltérhetnek.

| Mutató | Saját mobilos mérés előtte | Mobil utána | Asztali utána |
|---|---:|---:|---:|
| Teljesítmény | 71 | 100 | 100 |
| Akadálymentesség | 100 | 100 | 100 |
| Bevált módszerek | 100 | 100 | 100 |
| SEO | 69 | 100 | 100 |
| FCP | 4.4 s | 1.0 s | 0.4 s |
| LCP | 4.4 s | 1.8 s | 0.4 s |
| CLS | 0.000 | 0.001 | 0.003 |

A felhasználó eredeti távoli PageSpeed-mérésében a mobil teljesítmény 74 volt; az eltérő mérési környezet miatt ezt nem közvetlenül azonos futásként hasonlítjuk.

## Elvégzett változtatások

- A négy meglévő arculati betűcsalád helyi WOFF2 formátumban töltődik, magyar ékezetekkel és a szükséges súlyokkal. A betűkészletek összesített mérete kb. 94 KiB, az eredeti jelentés kb. 255 KiB Google Fonts forgalmával szemben. Két alapbetűkészlet előtöltést kapott; a licenceket megőriztük.
- A közös stílus közvetlenül az oldalak HTML-jében van: nincs külön megjelenítést blokkoló CSS- vagy Google Fonts-kérés. Az assets/site.css továbbra is előáll, de az oldalak betöltése nem függ egy újabb CSS-kéréstől.
- Az eredeti, jóváhagyott fotók megmaradtak. A böngésző srcset/sizes alapján kisebb WebP-változatot választhat; a nagyítható galéria az eredeti fotót használja.
- Az első tartalmi kép és a fejléc logója korai betöltést kapott, a lábléc logója késleltetett betöltést. A hajtás alatti képek továbbra is késleltetve töltődnek.
- Netlify gyorsítótárazási fejlécek a fontokhoz és reszponzív képekhez; alapvető X-Content-Type-Options, X-Frame-Options, COOP és részleges CSP-védelem. Ez nem teljes biztonsági audit és nem teljes XSS elleni CSP.
- A felhasználó külön kérésére mind az öt publikált oldalon index,follow szerepel. Az indexelés engedélyezése nem garantálja a Google-ben való megjelenést.
- Az adatkezelési tájékoztató betűtípusokra vonatkozó technikai leírása a helyi betöltéshez igazítva.

## Ellenőrzések és korlátok

A négy főoldal/aloldal 390 és 1440 px nézetben böngészős próbán nem lógott ki vízszintesen, a négy betűcsalád betöltődött, nem keletkezett JavaScript-kivétel. A csomag témájának előválasztása és a galéria megnyitása/lapozó felülete megmaradt. Az üres, még meg nem nyitott galériakép helyőrző nem hiányzó fotó.

A szöveg-, link-, csomagár-, egyedi kép- és témaválasztó-ellenőrzések sikeresek. A Netlify saját HUD/badge scriptjének rövid cache-élettartamát nem írtuk felül; ez a szolgáltató által hozzáadott erőforrás. A Lighthouse nem helyettesít valós felhasználói Core Web Vitals adatot vagy teljes akadálymentességi és biztonsági auditot.

## Hivatalos háttér

- https://web.dev/articles/optimize-lcp
- https://web.dev/articles/serve-responsive-images
- https://docs.netlify.com/manage/routing/headers/
