# Netlify keretkímélő publikálás

2026. október 29-i, kezelőfelületen ellenőrzött helyzet:
- Havi keret: 300 kredit. Éles publikálás: 21 alkalom, 315 kredit.
- Adatforgalom: 0,9 kredit; webkérések: 0,5 kredit; compute: kevesebb mint 1 kredit.
- A megmaradt 29,1 működési kredit fenntartja az oldalt, de új éles publikálásra nem használható.
- A méretcsökkentés és a korábbi deployok törlése nem téríti vissza az elhasznált krediteket. A korábbi változatokat ezért nem töröljük.

Optimalizálások:
- `public/`: 116 helyett 115 fájl, 5 190 596 helyett 5 149 117 bájt. A HTML-be már beágyazott CSS külön, nem használt másolata kimaradt.
- A végleges képek, reszponzív képváltozatok, betűtípusok, PDF és az összes funkció megmaradt. Munkaanyag továbbra sem kerül a publikált mappába.
- `netlify.toml` ignore parancs: `.webprojekt/ignore-build.cjs`. Pusztán README, belső dokumentáció vagy teszt módosításakor kihagyja az új buildet. Ha a függvény, a weboldal, az adatvédelmi tartalom vagy valamely build-bemenet változik, elvégzi a buildet. Bizonytalanság esetén is buildel, nem hagy ki szükséges frissítést.
- A PDF és a logók böngészőoldali gyorsítótárazása csökkenti az ismételt adatforgalmat.

Munkamenet:
1. Módosítás és tesztelés helyben; a köztes commitok helyben maradhatnak.
2. A teljes, ellenőrzött változatot egyetlen alkalommal pusholjuk a main ágra.
3. A tisztán dokumentációs pushokat az ignore szűrő kihagyja. Az új szűrő csak akkor érvényesülhet, ha a Netlify eljut a build-ellenőrzésig.
4. Éles frissítést csak a publikálási keret visszaállása vagy felhasználó által választott csomagváltás után lehet kiadni. Előfizetést vagy fizetést nem módosítottunk.

Az előző levelezési feladat frissítései GitHubon elő vannak készítve; az új leiratkozást élesben még nem igazolta teszt, mert a Netlify az új deployt kihagyta. A legutóbb publikált commit: 392fb97.

Forrás: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/
