# Csendes szalon – tipográfiai ellenőrzés

Forrás: design-system.md. Hatókör: koncepcio-1-csendes-szalon.html teljes oldala.

A végső, elnevezett eliza-typography stílusblokk központilag érvényesíti a skálát. A korábbi szakaszonként eltérő méretek nem írhatják felül.

| Szerep | Betű / vastagság | Desktop | Mobil | Sorköz |
|---|---|---|---|---|
| H1 | Playfair Display 400 | 60px | 38px | 1,3 |
| H2 | Playfair Display 400 | 40px | 30px | 1,3 |
| H3 | Playfair Display 400 | 28px | 24px | 1,3 |
| H4 (jelenleg nincs) | Montserrat 600 | 24px | 20px | 1,3 |
| Alcím / GYIK-kérdés | Libre Baskerville 500 | 20px | 16px | 1,3 |
| Body, űrlap, képaláírás, vélemény | Montserrat 400 | 16px | 16px | 1,6 |
| Gomb | Lora 600, nagybetűs | 16px | 14px | 1,3 |

Chrome számított stílusokkal ellenőrizve, asztali 1536px és mobil 375px nézetben: 1 H1, 8 H2, 12 H3, 49 szöveg/űrlap/képaláírás elem, 12 alcím/GYIK elem, 10 gomb. Mindkét nézetben a 92 ellenőrzött elemnél nulla eltérés a betűcsalád, méret, vastagság és sormagasság tekintetében.

A 375, 768 és 1536px nézetekben nem volt vízszintes túlcsordulás. Mobilon a folyamat egy oszlopba, a lábléc egy oszlopba rendeződik, a számok szükség esetén új sorba törnek, a képfelirat a kép alatt marad. Az arculati logó és a koncepcióválasztó technikai sávja külön szerep, nem body-szöveg.

A Google Fonts CSS-válasza tartalmazza mind a négy kért betűcsaládot és a 400/500/600 vastagságokat. A tényleges megjelenést képernyőképeken is ellenőriztük. Ez nem teljes akadálymentességi vagy teljesítmény-audit.

## Képes véleménykártyák ellenőrzése

A két teljes vendégvélemény törtfehér (#FBF9F6) kártyába került: 16px saroksugár, finom barna keret, árnyék nélkül. Desktopon 32px belső térköz és 24px oszlopköz; mobilon 24px belső térköz. Kör alakú, 80px (mobilon 64px) illusztratív stockképek a meglévő forrásjegyzékből, külön megjegyzéssel, hogy nem tényleges vendégportrék.

Chrome számított stílusokkal ellenőrizve: H2 Playfair Display 400, desktop40/mobil30; alcím Libre Baskerville500, desktop20/mobil16; idézetek Montserrat400, mindkét nézetben16px és25,6px sormagasság. A teljes eredeti idézetek és magyar idézőjeleik megmaradtak. Mobilon 20px oldalsó margó és nulla vízszintes túlcsordulás. A fotók betöltődtek. A 8px térközrendszer és a kijelölt arculati színek érvényesülnek.
