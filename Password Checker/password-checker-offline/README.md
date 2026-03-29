# Offline Password Checker

Diese Version ist absichtlich komplett lokal gebaut.

## Sicherheitsziel

- Keine externen Skripte
- Keine externen Stylesheets
- Keine CDN-Abfragen
- Keine Passwort-Übertragung
- Keine Speicherung der Eingabe

## Technische Maßnahmen

- `index.html` lädt nur `style.css` und `script.js` aus dem gleichen Ordner.
- Die `Content-Security-Policy` setzt `connect-src 'none'` und verbietet damit aktive Netzwerkverbindungen aus der Seite.
- Es gibt keinen Code mit `fetch`, `XMLHttpRequest`, `sendBeacon`, Formular-Submit oder Storage-Nutzung.
- Die Passwortbewertung läuft vollständig in `script.js` im Browser.

## Bewertung

Die Bewertung ist deutlich brauchbarer als ein einfacher Regex-Check, bleibt aber eine lokale Heuristik.
Sie achtet unter anderem auf:

- Länge
- Zeichentypen
- Anteil unterschiedlicher Zeichen
- Passphrase-Struktur
- häufige Passwörter
- Sequenzen wie `1234` oder `abcd`
- Tastaturmuster wie `qwerty`
- Wiederholungen und wiederholte Blöcke

Für produktive Anwendungen ist ein Passwortmanager plus lange, einzigartige Passphrasen weiterhin die bessere Praxis.
