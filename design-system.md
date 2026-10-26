# Eliza Beauty Salon – saját design system

> A saját Figma-arculat alapján. Ez a projekt érvényes arculati forrása; az eredeti kurzusanyag a design-system-eredeti.md fájlban maradt meg.
> Referencia: https://www.figma.com/design/NyCB6ZFimSUEeA0Ak5AUMQ/

A színeket és betűtípusokat a Figma arculati táblájából vettük át. Az alább külön jelölt webes kiegészítések az oldal megvalósításához szükséges döntések, nem a Figma-terv pontos másolatai.

## Hangulat

Természetes, nyugodt, elegáns, nőies és barátságos. Levegős elrendezés, meleg fényű fotók, olívazöld részletek, krémszínű felületek, finom természetes textúrák és visszafogott növényi motívumok.

**Ne legyen:** harsány, túldíszített, csillogó, neon, erős színátmenetes vagy technológiai startup hangulatú. A fotókat ne nyomják el a dekorációk.

## Színek

| Szerep | Név | Hex | Mire |
|---|---|---|---|
| Elsődleges | Olívazöld | `#4F6045` | Elsődleges gombok, címsorok, linkek, ikonok |
| Háttér | Krém | `#F8F5F0` | Az oldal alap háttere |
| Szöveg és sötét felület | Mélybarna | `#40302B` | Törzsszöveg, sötét szakaszok |
| Világos felület | Törtfehér | `#FBF9F6` | Kártyák, űrlapmezők, váltakozó szakaszok; sötét gombokon felirat |

Webes kiegészítés: hoverre az olívazöld gomb mélybarna legyen. Vonalakhoz a mélybarna 20%-os áttetszősége használható. Ne vezessünk be rózsafás vagy púderrózsaszín kiemeléseket.

A Figma táblája a zöld–krém párosra 6,25:1, a barna–krém párosra 11,52:1 kontrasztot jelöl. A megvalósítás tényleges színpárjait ellenőrizni kell, különösen áttetsző elemeknél.

## Betűtípusok

- **H1–H3:** Playfair Display Regular (400).
- **Törzsszöveg és H4:** Montserrat Regular (400), illetve SemiBold (600).
- **Alcím:** Libre Baskerville Medium (500).
- **Gomb:** Lora SemiBold (600), nagybetűs.

Ezek a saját Figma-arculat betűi. Csak a valóban használt vastagságok és a magyar ékezeteket tartalmazó karakterkészlet töltődjön be. A négy betűcsalád teljesítményhatását a webes ellenőrzésnél vizsgáljuk; egyszerűsítés csak egyeztetés után.

### Méretskála (desktop / mobil)

A desktop értékek a Figma arculati táblájából származnak; a mobilértékek webes kiindulási javaslatok.

| Elem | Betű | Desktop | Mobil | Sormagasság |
|---|---|---|---|---|
| H1 | Playfair Display 400 | 60px | 38px | 1,3 |
| H2 | Playfair Display 400 | 40px | 30px | 1,3 |
| H3 | Playfair Display 400 | 28px | 24px | 1,3 |
| H4 | Montserrat 600 | 24px | 20px | 1,3 |
| Alcím | Libre Baskerville 500 | 20px | 16px | 1,3 |
| Törzs | Montserrat 400 | 16px | 16px | 1,6 |
| Gomb | Lora 600, nagybetűs | 16px | 14px | 1,3 |

## Térközök és elrendezés

- A Figma asztali tervének szélessége 1440px, a tartalomé jellemzően 1260px.
- A mobilos főoldal referenciája 375px széles.
- Webes kiegészítés: legfeljebb 1260px tartalomszélesség, mobilon legalább 20px oldalsó margó, folyó szövegnél körülbelül 680px maximális szélesség.
- Webes kiegészítés: 8px alapú térközrendszer; szakaszok között desktopon 80–120px, mobilon 48–64px kiindulási térköz.
- Levegős kép–szöveg párok, világos hierarchia, mobilon egymás alá rendezett tartalom. Az elrendezés a tartalomhoz igazodhat, nem kell lemásolni a Figma-tervet.

## Komponensek

- **Elsődleges gomb:** olívazöld háttér, törtfehér felirat, Lora 600, nagybetűs; visszafogott, enyhén lekerekített forma. Webes kiindulás: 16px × 24px belső térköz, 4px sarok, legalább 44px magasság.
- **Másodlagos gomb:** átlátszó háttér, olívazöld keret és felirat; az elsődlegessel azonos méretezés.
- **Kártya:** világos felület, finom vagy elhagyott keret, erős árnyék nélkül.
- **Képek:** meleg, természetes fény, krém és bézs környezet, bőrápolás és nyugodt szalonhangulat. A főoldali hero képének Figma-sugara 20px; ez legyen a fő képek kiindulása.
- **Űrlapmező:** világos háttér, finom barna keret, jól látható címke; fókuszra olívazöld jelzés. Ez webes kiegészítés.
- **Ikonok:** vékony vonalas, egységes stílus, olívazöld vagy barna.
- **Interakció:** látható billentyűzetes fókusz, egyértelmű hiba- és sikerüzenetek; a mozgás visszafogott és csökkenthető legyen.

## Logó

A saját Figma-arculati táblában szereplő logót és favicont használjuk. A kurzuscsomag logo/ mappájának fájljai az eredeti arculathoz tartoznak; használat előtt ellenőrizni kell őket, nem tekinthetők automatikusan a saját logónak.

A saját logó és favicon webes exportja még hátravan. SVG az elsődleges formátum; szükség szerint világos és sötét háttérhez külön változat készül. A saját logót ne helyettesítsük észrevétlenül más betűvel vagy az eredeti kurzuslogóval.

## Jóváhagyott felhasználói finomítások

- Másodlagos CTA: 0,5 px-es, 50%-os olívazöld keret, átlátszó háttér. Hover: mélybarna háttér és keret, krémszínű szöveg. A betű és belső térköz változatlan.
- Fejléc- és láblécmenü, adatkezelési link, CTA-k: aláhúzás nélkül. A szöveges menülinkek hoverre olívazöldek; billentyűzetes fókusz megmarad.
- A főoldali fotó feliratán 0,5 px-es, a képkerettel egyező áttetsző olívazöld keret.
- Statisztikai számok: Playfair Display 400, desktop 60 px, mobil 38 px, 1,3 sorköz. Az animált belső elem ezt örökli.
- A kisokos gombja teljes fedettségű olívazöld; az űrlap kitölthető, a tényleges feliratkozás és letöltés bekötése külön feladat.
- A lábléc növényi dísze elhagyva.

- A Rólunk oldal szerkesztettebb szakaszritmusa a felhasználói finomítások alapján desktopon 64px, mobilon 48px; ez tudatos kivétel az általános szakasztérköz-ajánlás alól.
- A galéria képaláírása mobilon is a 16px / 1,6 body skálát követi.
