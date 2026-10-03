# Adstart 16.10.2026: was eingerichtet ist und was noch fehlt

Stand 03.10.2026.

## Eingerichtet

| Baustein | Wo | Zustand |
|---|---|---|
| Leadweg | Funnel Builder, Projekt „Voltio“, Funnel `voltio-ankauf` | live, Testanfrage angekommen |
| Vercel Web Analytics | Seitenaufrufe plus eigene Ereignisse, ohne Cookies | live, erste Daten am 03.10. angekommen |
| Kampagnen-Zuordnung | `utm_*`, `fbclid`, Einstiegsseite, auslösender Knopf je Anfrage | live |
| Cookie-Einwilligung | „Alle akzeptieren“ speichert die Zustimmung, Schalter starten aus | live |
| Meta Pixel | Code fertig: PageView, AnfrageGestartet, Lead mit Kennung | wartet auf die Pixel-ID |
| Conversions API | Funnel Builder meldet Leads serverseitig, nur mit Einwilligung | wartet auf Pixel-ID und Token |
| Datenschutzerklärung | Formular-Dienstleister, Kampagnen-Angaben; Meta-Abschnitt erscheint mit der Pixel-ID | live |
| Make | Ordner „Voltio“, Szenario 9906455, Webhook 4411110 | angelegt, inaktiv |
| Webhook Funnel Builder → Make | im Projekt „Voltio“ eingetragen | ausgeschaltet |
| Facebook-Seite | Profilbild, Titelbild, Texte in `docs/facebook-seite/` | bereit zum Hochladen |

## Ereignisse in Vercel Analytics

| Ereignis | Wann | Eigenschaften |
|---|---|---|
| `cta_klick` | ein Anfrage-Knopf wurde gedrückt, Popup offen | `quelle` (hero, pain, vorteile, vergleich, faq, anfrage, header, footer …) |
| `anfrage_begonnen` | erstes Feld im Formular angefasst | `quelle` |
| `anfrage_gesendet` | Anfrage gespeichert | `quelle`, `marke`, `modell`, `mit_telefon`, `utm_source`, `utm_campaign` |
| `anfrage_fehler` | Speichern fehlgeschlagen | `quelle` |
| `kontakt_klick` | Telefon- oder E-Mail-Link getippt | `art` (telefon, email), `ort` (header, menue, footer) |
| `faq_geoeffnet` | FAQ-Zeile aufgeklappt | `frage` |
| `einwilligung` | Cookie-Entscheidung | `auswahl` (alle, notwendige, eigene), `statistik`, `marketing` |
| `scrolltiefe` | Startseite zur Hälfte bzw. fast ganz gelesen | `tiefe` (50, 90) |

Nie personenbezogen: keine Namen, E-Mails oder Telefonnummern in Ereignissen.
Vercel Analytics läuft ohne Cookies auf berechtigtem Interesse; wer „Statistik“
im Cookie-Dialog ausschaltet, wird ab dann nicht mehr gezählt.

## Kennungen

- Funnel Builder: Projekt `811b5e4d-72c4-4113-bc9f-137acda736ba`, Funnel `899bd479-f84c-4499-8425-f252f3424e0a`
- Make-Webhook: `https://hook.eu2.make.com/v6a6qluuhttsy86qa5uwns8mt4jds7eu`
- Feld-IDs der Anfrage: `marke`, `modell`, `fahrzeug_freitext`, `erstzulassung`, `kilometerstand`, `name`, `email`, `telefon`, `quelle`

## Einschalten, sobald die Angaben da sind

1. **Pixel**: Pixel-ID als `NEXT_PUBLIC_META_PIXEL_ID` im Vercel-Projekt `voltio`
   setzen (Production) und neu deployen. Danach im Events Manager die Domain der
   Seite unter „Traffic-Berechtigungen“ zulassen.
2. **Conversions API**: Funnel Builder → Projekt „Voltio“ → Einstellungen →
   „Meta Conversions API“: Pixel-ID, Zugriffstoken, zuerst mit Test-Event-Code.
3. **Make**: im Szenario „Voltio · Anfrage → Leadtable + Leadmetrics“ die Module
   für Leadtable (Kampagne wählen) und Leadmetrics (Dashboard wählen, Metrik)
   ergänzen, Szenario aktivieren, dann den Webhook im Funnel Builder einschalten.
4. **Datenschutz**: Make, Leadtable und Leadmetrics als Empfänger ergänzen,
   sobald Schritt 3 aktiv ist. Platzhalter in `src/data/mocks/legal.ts` füllen
   (Firma, Anschrift, Dienstleister des Formularsystems).

## Im Funnel Builder liegt eine Testanfrage

Name „TEST Claude (bitte ignorieren)“, 02.10.2026. Kann im Dashboard gelöscht werden.
