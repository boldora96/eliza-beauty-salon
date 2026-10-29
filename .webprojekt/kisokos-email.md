# Arcápolási Kisokos - kézbesítés

## Elkészült

- Háromoldalas, arculati PDF: downloads/eliza-arcapolasi-kisokos.pdf; a letöltés a sikeres feliratkozás popupjában érhető el.
- Feliratkozások: Netlify Forms / arcapolasi-kisokos.
- Tulajdonosi értesítés: Netlifyban ellenőrizve, boldora96@gmail.com címre minden új űrlapbeküldésről.
- Aktív Brevo-kézbesítés: netlify/functions/submission-created.mjs. Csak a hitelesített Kisokos-űrlap beküldésekor, a két hozzájárulás megléte esetén küld. Az időpontkérő űrlaphoz nem nyúl.
- E-mail: névre szóló, olívazöld-krém megjelenés; PDF-melléklet és letöltőlink.

## Aktiválás és teszt: kész, 2026. október 27.

1. A fióktulajdonos létrehoz egy Brevo-fiókot, elfogadja a szolgáltatás feltételeit és elvégzi az e-mail-ellenőrzést. Ingyenes csomag: napi 300 küldés, Brevo-jelöléssel; a feltételek változhatnak.
2. A Brevóban igazolni kell a tényleges feladócím használatát; lehetőleg saját, hitelesített domainnel. A brief fiktív e-mail-címe nem használható igazolás nélkül. A tranzakciós levélküldést a Brevónak engedélyeznie kell.
3. A Brevo API-kulcsot a Netlify környezeti változóiban, bizalmas értékként kell tárolni: BREVO_API_KEY. A hozzá tartozó, igazolt feladócím: BREVO_SENDER_EMAIL. A kulcs nem kerülhet Gitbe, HTML-be vagy a böngészőbe.
4. Új deploy után valós tesztcímre próba-feliratkozás szükséges: Netlify-beérkezés, Brevo-küldési napló, tényleges beérkezett levél és megnyitható PDF ellenőrzése.
5. Az adatkezelési tájékoztatót a ténylegesen bekapcsolt szolgáltatáshoz kell véglegesíteni. A jelenlegi szöveg az aktív Brevo-küldést és az adattovábbítás tényleges célját ismerteti.

A hiányzó konfiguráció nem akadályozza a Netlify-beküldést és a helyszíni letöltést; az e-mail-függvény nem küld levelet. A korábbi beküldéseket nem küldi visszamenőleg újra. A levél szolgáltatói elfogadása nem bizonyítja a címzett postaládájába érkezést.

Források:
- https://docs.netlify.com/build/functions/trigger-on-events/
- https://developers.brevo.com/docs/send-a-transactional-email
- https://help.brevo.com/hc/en-us/articles/208580669-FAQs-What-are-the-limits-of-the-Free-plan


## Bizonyított éles működés

- Kulcs: Eliza Netlify - Kisokos; Restricted, Transactional email All. Lejárat: 2027. október 27.; a szolgáltató 90 napos inaktivitás esetén is lejárathatja.
- Netlify: BREVO_API_KEY titkos, egyetlen értékkel a Production kontextusban. A csomagban elérhető Secret-scope Builds/Functions/Runtime; Post processing és helyi fejlesztés nem kapja meg a kulcsot.
- BREVO_SENDER_EMAIL az igazolt boldora96@gmail.com feladócímre állítva. A megjelenített feladónév Eliza Beauty Salon; a tesztben a Brevo brevosend.com címre írta át a technikai feladót.
- Éles teszt: Eliza kézbesítési próba 2026-10-27T21:53:59. A Netlify-függvény 22:54:02-kor sikeres szolgáltatói elfogadást naplózott, a levél 22:54-kor megérkezett a tesztpostaládába. A levélből letöltött PDF háromoldalas és SHA-256 szerint egyezik az eredetivel.
- A Netlify-értesítés is megérkezett a tulajdonosi postaládába, a névvel, e-mail-címmel, beküldési idővel és hozzájárulásokkal.
- Sem a kulcs, sem az ellenőrző kód nem kerül a repóba. A próba e-mailes és PDF-es bizonyítékai a figyelmen kívül hagyott .webprojekt/qa mappában vannak.
## Levelezés és leiratkozás – 2026. október 29.

- Mindkét űrlap ügyfél- és tulajdonosi levele közös, reszponzív olívazöld–krém sablont használ (`netlify/email.mjs`).
- A kapcsolatfelvételi visszaigazolás tartalmazza a nevet, a témát, az üzenetet és a budapesti beküldési időpontot. Nem jelent hírlevél-feliratkozást.
- A Kisokos-feliratkozás a Brevo „Eliza – Arcápolási Kisokos” listájába kerül (ID: 3; `BREVO_NEWSLETTER_LIST_ID`). A kulcs kontaktkezelési jogosultsága is szükséges; kizárólag szerveroldalon használható.
- A Kisokos-levél személyes, AES-GCM-mel hitelesített/titkosított leiratkozási hivatkozást tartalmaz. Az URL nem tartalmaz olvasható e-mail-címet. A token kulcsa a szerveren tárolt küldési kulcsból származik; annak cseréje a régi linkeket érvényteleníti.
- GET csak megerősítő oldalt mutat, hogy a levélbiztonsági szkennerek ne módosítsanak feliratkozást. POST: Brevo `emailBlacklisted=true`, eltávolítás a 3-as listáról, arculati tulajdonosi értesítés, majd sikeroldal. A tranzakciós tiltólistát nem módosítjuk, ezért a külön kért kapcsolatfelvételi levelek elérhetők maradnak.
- Az újra beküldött űrlap nem oldja fel a korábbi leiratkozást. Újbóli feliratkozáshoz külön, igazolt hozzájárulási folyamat szükséges.
- Hiba esetén nincs hamis sikerjelzés. Tulajdonosi levélhiba esetén a leiratkozás mentve marad, a látogató erről tájékoztatást kap; ismételt POST újrakísérli az értesítést (emiatt ismételt kattintással több értesítés érkezhet).
- Az adatok eredeti Netlify Forms-beküldése megmarad mint előzmény; az aktuális hírlevél-jogosultság forrása a Brevo. A régi beküldéseket nem importáljuk automatikusan.
