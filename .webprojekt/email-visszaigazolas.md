# Beküldői visszaigazolás – előkészítés

A Netlify Forms fogadja a megkereséseket; a sikeres webes popup és a Netlifyban látható próbaüzenet ellenőrizve. A teszt nem valódi időpontkérés, címe a fenntartott example.com domainen van.

Az `email-visszaigazolas.cjs` sablon tartalmazza a beküldő nevét, teljes üzenetét és a beküldés időpontját Europe/Budapest időzónában. Az időpontot a Netlify által rögzített fogadási időből kell átadni, nem a látogató órájából. A HTML-be kerülő adatokat a sablon escape-eli; a szöveges változat is elkészül.

Az automatikus küldés még NINCS bekötve. Nem állítjuk, hogy kiment vagy megérkezett e-mail. A Netlify beépített értesítése a projekt kezelőjének szól, nem a beküldő személyre szabott visszaigazolása.

A folytatáshoz levélküldő szolgáltatás, az általa engedélyezett feladócím és valódi tesztcím kell. A szolgáltatói kulcs kizárólag a Netlify szerveroldali környezeti beállításaiba kerülhet; nem a böngészős kódba vagy a Git-repóba. Az e-mailt kizárólag hitelesített Netlify-beküldési esemény indítsa, ismételt eseményre ugyanaz az üzenet ne menjen ki kétszer.
