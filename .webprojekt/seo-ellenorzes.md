# Eliza Beauty Salon – SEO-ellenőrzés Netlify-feltöltés előtt

Dátum: 2026. október 26. Hatókör: Főoldal, Kezelések, Rólunk, Kapcsolat és Adatkezelés; továbbá a gyökérmappában maradt korábbi koncepciók. A felhasználó ellenőrzést és javaslatokat kért: a SEO-beállításokat ez az audit nem módosítja.

## Eredmény

A Vikingo ellenőrző szkriptje 17 HIBA és 7 FIGYELEM jelzést adott. Az öt oldalon hiányzik az Open Graph, a canonical és a JSON-LD (15 jelzés); nincs sitemap.xml és robots.txt (2 jelzés). Az öt Twitter card, a főoldali title hossza és a kódban nem látható Search Console-hitelesítés további figyelmeztetés. Ezek ellenőrzőlista-jelzések, nem azonos súlyú rangsorolási hibák: például a közösségi előnézet és a jogi oldal strukturált adatának hiánya nem indexelési akadály.

A külön szerkezeti ellenőrzés sikeres: minden oldalon egy H1, nincs hibás helyi hivatkozás vagy ismétlődő azonosító; 22 különböző WebP-fotó. A title és a meta description minden oldalon egyedi. Magyar nyelv, viewport, képalternatívák és SVG/PNG favicon beállítva. A címsorszintek folytonosak. A főoldalon és a Kapcsolat oldalon már van GYIK.

## Első döntés: bemutató vagy kereshető üzleti oldal

A brief a telefonszámot és az e-mailt fiktív tananyagbeli adatnak nevezi. A weboldal minden oldala jelenleg `noindex,nofollow` jelölésű. Netlify-bemutatóhoz célszerű megtartani a noindexet. Valós ügyfélszerzéshez az adatok jóváhagyása után lehet engedélyezni az indexelést. Kitalált adatokból ne készüljön BeautySalon strukturált adat vagy Google Business Profile.

## Fontossági sorrend

1. **Publikálható mappa:** csak az öt végleges oldal, a hozzájuk szükséges képek, logók és assets kerüljenek Netlifyra. A briefek, adatvédelmi minták, korábbi képjelöltek és koncepciók maradjanak ki. A `koncepcio-1-csendes-szalon.html` a főoldal másolata, ne kapjon külön indexelhető címet. A gyökérmappa teljes feltöltése jelenleg nem ajánlott.
2. **Indexelési mód:** a bemutató maradjon noindex. Ha tényleges üzleti oldal lesz, a jóváhagyott végleges oldalakon távolítsuk el a tiltást; ez szükséges a Google-megjelenéshez, de önmagában nem garantál indexelést.
3. **Netlify URL:** a tényleges `https://…netlify.app` cím ismeretében kerüljenek be az abszolút canonical és og:url címek, valamint a sitemap. Egyféle URL-szerkezetet használjunk, a Netlify tiszta URL-kezelésével összhangban. A robots.txt megfelelő beállítása nem helyettesíti a noindexet.
4. **Közösségi előnézet:** oldalanként OG title, description, image, url, type és hu_HU locale; Twitter summary_large_image. A meglévő hero képből megfelelő fekvő előnézet készíthető. Ezek a megosztást segítik, nem helyettesítik a tartalmi SEO-t.
5. **Helyi információk:** valós, jóváhagyott adatok esetén BeautySalon JSON-LD a névvel, címmel, nyitvatartással és elérhetőségekkel; Rólunk oldalon indokolt Person kiegészítés. Értékelési csillagokat, ellenőrizetlen vendégadatokat és stockképen látható személyazonosságot ne jelöljünk meg valós bizonyítékként.
6. **Hero betöltése:** a Kezelések, Rólunk és Kapcsolat első fotója jelenleg lazy. Az első képernyőn látható hero kép legyen eager; a valószínű LCP-kép kaphat high prioritást. A hajtás alatti képek maradjanak lazy. Mobilhoz kisebb srcset-változatok is hasznosak. A legnagyobb használt fotó kb. 352 KiB; ez önmagában nem kritikus hiba.
7. **Főoldali title:** a mostani 70 karakter rövidíthető, és erősíthető benne a helyi keresési szándék. Javaslat: „Kozmetika Budapest IX. kerület | Eliza Beauty Salon”. A meta descriptionök egyediek és használhatók; nem kell pusztán karakterszámért meghosszabbítani őket.
8. **Tartalmi finomítás, külön jóváhagyással:** a kezelések időtartama, célcsoportja, várható menete, árai és korlátai segítik a választást. Az általános címsorok mellé természetesen kerülhet Budapest/IX. kerület/Ráday utca. Ne legyen kulcsszóhalmozás. A már meglévő GYIK megtartható, válaszai tömörek és közvetlenek legyenek.

## Élesítéshez kapcsolódó egyéb hiányok

Az időpontkérő és kisokos űrlap nem továbbít adatot. Az adatkezelési tájékoztató tesztverzió, hiányzó éles adatokkal. Ezek elsősorban működési és bizalmi kérdések, nem önálló technikai SEO-hibák.

A végleges Netlify-címen ellenőrizendő a HTTPS, átirányítások, valódi 404-válasz, indexelési fejlécek, mobilos PageSpeed/Lighthouse és a strukturált adatok. Élő URL hiányában nincs hiteles éles PageSpeed/Core Web Vitals eredmény. Az ellenőrzés most forráskód- és fájlszintű; új böngészős vizuális ellenőrzés nem történt. Search Console bekötése későbbi lépés; hiánya a kódban nem bizonyítja, hogy nincs DNS-es hitelesítés.

## AEO és elvárások

A GYIK schema nem ígér rendszeres Google FAQ-bővítményt egy kozmetikai szalonnak: a Google ezt elsősorban ismert kormányzati és egészségügyi oldalakra korlátozza. A közérthető, látható válaszok ettől még hasznosak. SEO-alapokkal sem garantált első helyezés vagy AI-válaszban szereplés.

## Hivatalos hivatkozások

- [Google: robots meta, noindex](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- [Google: canonical és duplikált URL-ek](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [web.dev: LCP-kép betöltése](https://web.dev/articles/optimize-lcp)
- [Google: FAQ találati megjelenés korlátozása](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
