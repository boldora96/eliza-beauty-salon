# Arcápolási Kisokos - kézbesítés

## Elkészült

- Háromoldalas, arculati PDF: downloads/eliza-arcapolasi-kisokos.pdf; a letöltés a sikeres feliratkozás popupjában érhető el.
- Feliratkozások: Netlify Forms / arcapolasi-kisokos.
- Tulajdonosi értesítés: Netlifyban ellenőrizve, boldora96@gmail.com címre minden új űrlapbeküldésről.
- Előkészített Brevo-kézbesítés: netlify/functions/submission-created.mjs. Csak a hitelesített Kisokos-űrlap beküldésekor, a két hozzájárulás megléte esetén küld. Az időpontkérő űrlaphoz nem nyúl.
- E-mail: névre szóló, olívazöld-krém megjelenés; PDF-melléklet és letöltőlink.

## Aktiválás: még nincs bekapcsolva

1. A fióktulajdonos létrehoz egy Brevo-fiókot, elfogadja a szolgáltatás feltételeit és elvégzi az e-mail-ellenőrzést. Ingyenes csomag: napi 300 küldés, Brevo-jelöléssel; a feltételek változhatnak.
2. A Brevóban igazolni kell a tényleges feladócím használatát; lehetőleg saját, hitelesített domainnel. A brief fiktív e-mail-címe nem használható igazolás nélkül. A tranzakciós levélküldést a Brevónak engedélyeznie kell.
3. A Brevo API-kulcsot a Netlify környezeti változóiban, bizalmas értékként kell tárolni: BREVO_API_KEY. A hozzá tartozó, igazolt feladócím: BREVO_SENDER_EMAIL. A kulcs nem kerülhet Gitbe, HTML-be vagy a böngészőbe.
4. Új deploy után valós tesztcímre próba-feliratkozás szükséges: Netlify-beérkezés, Brevo-küldési napló, tényleges beérkezett levél és megnyitható PDF ellenőrzése.
5. Az adatkezelési tájékoztatót a ténylegesen bekapcsolt szolgáltatáshoz kell véglegesíteni. A mostani szöveg jelzi, hogy a Brevo-küldés még inaktív.

A hiányzó konfiguráció nem akadályozza a Netlify-beküldést és a helyszíni letöltést; az e-mail-függvény nem küld levelet. A korábbi beküldéseket nem küldi visszamenőleg újra. A levél szolgáltatói elfogadása nem bizonyítja a címzett postaládájába érkezést.

Források:
- https://docs.netlify.com/build/functions/trigger-on-events/
- https://developers.brevo.com/docs/send-a-transactional-email
- https://help.brevo.com/hc/en-us/articles/208580669-FAQs-What-are-the-limits-of-the-Free-plan
