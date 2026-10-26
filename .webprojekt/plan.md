# Weboldal-generálási terv

Állapot: az alábbi konkrét koncepcióirányok jóváhagyásra várnak. A brand brief jóváhagyva.

## Brand brief összefoglaló

Az Eliza Beauty Salon személyre szabott kozmetikai kezeléseket mutat be; elsődleges cél az időpontkérés. Szakmai tapasztalat, személyes diagnosztika és nyugodt szalonkörnyezet építi a bizalmat. Három különböző főoldali kompozíció készül, ugyanazzal a saját arculattal és kész tartalommal, hogy az elrendezést és az első benyomást lehessen összevetni.

## Közös arculat

Olívazöld #4F6045, krém #F8F5F0, mélybarna #40302B, törtfehér #FBF9F6. Playfair Display címsor, Montserrat törzsszöveg, Libre Baskerville alcím, Lora gombfelirat. Az arculatból nem következik három új paletta: a különbséget a kompozíció, képhasználat, felületarányok és tartalmi hangsúlyok adják.

## Koncepció irányok

### 1. Csendes szalon

- **Leírás:** tágas, világos felépítés. A nyitóképernyő bal oldalán balra zárt cím és időpontkérő gomb, jobb oldalán nagy, 20px sarokkal lekerekített kezelési fotó. Alatta váltakozó kép–szöveg szakaszok és visszafogott szolgáltatási ízelítő.
- **Színarány:** krém dominancia, olívazöld címek és gombok, mélybarna törzsszöveg; a törtfehér tagolja a tartalmat.
- **Tipográfia:** finom, következetes hierarchia; H1 legfeljebb 60px az arculat szerint.
- **Bizalomépítés:** két kiemelt vendégvélemény és az ötalkalmas kúra megadott garanciája.
- **Miért illik:** a saját terv nyugalmához kapcsolódik; könnyen követhető viszonyítási alap az AI-os összehasonlításhoz.
- **Vázlat:** fejléc → kétoszlopos hero → előnyök → kezelések → bemutatkozás → folyamat → vélemények → garancia → GYIK → kisokos → űrlap → lábléc.
- **Fájl:** koncepcio-1-csendes-szalon.html.

### 2. Bőrápolási magazin

- **Leírás:** széles, hangulati kezelési fotó nyitja az oldalt; a címet külön krémszínű mező tartja olvashatóan. A további részek aszimmetrikus képkompozíciókból és rövid, szerkesztett szövegblokkokból épülnek fel, eltérő szélességekkel.
- **Színarány:** több törtfehér, nagy képfelületek, egy olívazöld kiemelő szakasz világos szöveggel; a krém köti össze a részeket.
- **Tipográfia:** hangsúlyos, legfeljebb 60px címek, rövidebb szövegoszlopok; a szöveg nem kerül mozgalmas fotórészletre.
- **Bizalomépítés:** a kezelési tudnivalók és a személyre szabás kapják a fő hangsúlyt; az eredeti két vendégvélemény megmarad.
- **Miért illik:** a természetes bőrápolás anyagait és hangulatát mutatja meg; látványosan eltér a Figma kétoszlopos nyitásától.
- **Vázlat:** fejléc → széles fotó és elkülönülő címmező → személyre szabás → aszimmetrikus kezelési bemutató → folyamat → bemutatkozás → garancia → vélemények → GYIK → kisokos → űrlap → lábléc.
- **Fájl:** koncepcio-2-borapolasi-magazin.html.

### 3. Személyes törődés

- **Leírás:** középre zárt, szövegközpontú nyitás, két kisebb, eltolt fotóval keretezve. A bemutatkozás és a négy lépéses konzultációs folyamat hamarabb jelenik meg. A szolgáltatások szerkesztett listában szerepelnek, ismétlődő kártyarács helyett.
- **Színarány:** törtfehér alap, olívazöld bemutatkozó sáv, krémszínű kapcsolati felület; barna szöveg.
- **Tipográfia:** középre rendezett főcím, balra zárt hosszabb szövegek; kiegyensúlyozottabb sűrűség és rövidebb szakaszközök.
- **Bizalomépítés:** Eliza saját bemutatkozó szövege, szakmai mérföldkövek és a megadott tapasztalati számok; stockportré nem jelenhet meg Eliza valódi fotójaként.
- **Miért illik:** az egyéni szakemberrel való személyes kapcsolatot teszi első helyre, különösen az első alkalom előtt bizonytalan vendégeknek.
- **Vázlat:** fejléc → szövegközpontú hero → bemutatkozás → folyamat → előnyök → kezelési lista → vélemények → garancia → GYIK → kisokos → űrlap → lábléc.
- **Fájl:** koncepcio-3-szemelyes-torodes.html.

## Mi készül el

- Statikus HTML-projekt Tailwind CSS-sel; a végleges kiadáshoz helyben előállított CSS.
- Három önálló, reszponzív kezdőoldal-prototípus és egy index.html választóoldal.
- Stockfotók forrásjegyzékkel; megadott ügyféladatok és eredeti oldalszövegek.
- Az első körben az űrlapok megjelenését lehet összevetni; éles levélküldés és kisokos-feliratkozás csak a későbbi bekötés után működik. Ezt az előnézet egyértelműen jelzi.
- Minden irány tartalmazza a brief főoldali tartalmi egységeit, a szövegek indokolt rövidítésével.
- Párhuzamos készítés irányonként külön alügynökkel a generálás skill szerint, közös minőségi ellenőrzéssel.
- Mentés a már létező privát GitHub-repóba. Ebben a körben helyi előnézet; a beadandó éles oldal Netlify-ra kerül a kiválasztás és a teljes négyoldalas építés után.

## Hogyan nézd meg a prototípusokat

Az index.html választóoldalról mindhárom irány megnyitható. Chrome-ban asztali és mobilos nézetben is ellenőrizzük. Elsősorban az első benyomást, olvashatóságot, fotók és szövegek arányát, valamint az időpontkérés egyértelműségét hasonlítsd össze. A kiválasztott változat elemei később keverhetők.
