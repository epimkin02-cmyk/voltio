# Adstart 16.10.2026: was eingerichtet ist und was noch fehlt

Stand 19.10.2026.

## Eingerichtet

| Baustein | Wo | Zustand |
|---|---|---|
| Leadweg | Funnel Builder, Projekt „Voltio“, Funnel `voltio-ankauf` | live, Testanfrage angekommen |
| Vercel Web Analytics | Seitenaufrufe plus eigene Ereignisse, ohne Cookies | live, erste Daten am 03.10. angekommen |
| Kampagnen-Zuordnung | `utm_*`, `fbclid`, Einstiegsseite, auslösender Knopf je Anfrage | live |
| Cookie-Einwilligung | „Alle akzeptieren“ speichert die Zustimmung, Schalter starten aus | live |
| Meta Pixel | „Voltio Landingpage“ (ID 1426778795577295), PageView, AnfrageGestartet, Lead mit Kennung | live seit 19.10.2026, feuert erst nach Einwilligung |
| Leadmetrics | Journey-Skript (`LEADMETRICS_JOURNEY_ID`), Mehrdomain und Formularerkennung an, lädt erst nach Einwilligung „Marketing“; Lead wird per E-Mail und Telefon zugeordnet | live seit 19.10.2026 |
| Conversions API | läuft über Leadmetrics, nicht über den Funnel Builder | Meta-Schalter in Leadmetrics noch aus; Lead dort nicht ohne gleiche Ereignis-ID melden, sonst zählt Meta doppelt |
| Datenschutzerklärung | Formular-Dienstleister, Kampagnen-Angaben; Meta- und Leadmetrics-Abschnitt erscheinen mit ihrer ID | live |
| Make | Ordner „Voltio“, Szenario 9906455, Webhook 4411110 | angelegt, inaktiv |
| Webhook Funnel Builder → Make | im Projekt „Voltio“ eingetragen | ausgeschaltet |
| Facebook-Seite | Profilbild, Titelbild, Texte in `docs/facebook-seite/` | bereit zum Hochladen |

## Ereignisse in Vercel Analytics

Namen wie auf allen Agentur-Seiten (Revolution Academy, Anwalt Schwartz), damit
sich die Funnels im Vercel-Dashboard vergleichen lassen. Vercel Pro zeigt je
Ereignis nur die ersten zwei Eigenschaften, deshalb steht die wichtigste vorn.

| Ereignis | Wann | Eigenschaften (Reihenfolge) |
|---|---|---|
| `section_gesehen` | Section zu 30 % sichtbar, einmal je Besuch | `section` (hero, kategorien, pain, bewertungen, vorteile, zahlen, vergleich, ablauf, faq, anfrage …) |
| `scroll_tiefe` | Startseite zu 25, 50, 75, 100 % gelesen | `tiefe` |
| `verweildauer` | 30, 60, 120, 300 s sichtbar auf der Seite | `sekunden` |
| `faq_geoeffnet` | FAQ-Zeile aufgeklappt | `frage` |
| `einwilligung` | Cookie-Entscheidung | `wahl` (alle, notwendige, eigene), `marketing` |
| `kontakt_klick` | Telefon- oder E-Mail-Link getippt | `art` (telefon, email), `ort` (header, menue, footer) |
| `cta_klick` | Anfrage-Knopf gedrückt | `quelle`, `kanal`, `sekunden`, `scrolltiefe` |
| `optin_geoeffnet` | Anfrage-Popup offen | `cta_quelle`, `kanal`, utm |
| `optin_schritt` | erstes Feld angefasst: 1 Fahrzeug, 2 Kontakt | `schritt`, `cta_quelle`, `kanal`, utm |
| `optin_fehler` | Eingabe ungültig oder Speichern fehlgeschlagen | `art` (eingabe, senden), `cta_quelle`, `kanal`, utm |
| `optin_abgebrochen` | Popup ohne Absenden geschlossen | `schritt` (0, 1, 2), `cta_quelle`, `kanal`, utm |
| `optin_abgeschickt` | Absenden gedrückt | `cta_quelle`, `kanal`, utm |
| `lead` | Anfrage gespeichert | `cta_quelle`, `kanal`, `sekunden`, utm |

`kanal` kommt aus UTM, fbclid und Referrer: Meta Anzeige, Google Anzeige,
Organisch, Direkt usw.

Nie personenbezogen: keine Namen, E-Mails oder Telefonnummern in Ereignissen.
Vercel Analytics läuft ohne Cookies auf berechtigtem Interesse; wer „Statistik“
im Cookie-Dialog ausschaltet, wird ab dann nicht mehr gezählt.

## Kennungen

- Funnel Builder: Projekt `811b5e4d-72c4-4113-bc9f-137acda736ba`, Funnel `899bd479-f84c-4499-8425-f252f3424e0a`
- Make-Webhook: `https://hook.eu2.make.com/v6a6qluuhttsy86qa5uwns8mt4jds7eu`
- Feld-IDs der Anfrage: `marke`, `modell`, `fahrzeug_freitext`, `erstzulassung`, `kilometerstand`, `name`, `email`, `telefon`, `quelle`

## Einschalten, sobald die Angaben da sind

1. **Pixel**: erledigt am 19.10.2026, `NEXT_PUBLIC_META_PIXEL_ID=1426778795577295`
   im Vercel-Projekt `voltio` (Production und Preview). Offen: im Events Manager
   `voltiokauft.de` unter „Traffic-Berechtigungen“ zulassen und die Domain im
   Business-Portfolio verifizieren.
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
