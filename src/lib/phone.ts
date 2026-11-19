import { parsePhoneNumberFromString } from "libphonenumber-js/mobile";

/**
 * The first message goes out over WhatsApp (Superchat), so the form only takes
 * numbers that can carry one: mobile numbers. `libphonenumber-js/mobile` knows
 * only mobile ranges, so a landline, a too short or a made up number fails.
 * Without a country code the number counts as German. Guessing Austria or
 * Switzerland instead is a trap: German landlines like 069 … read as Austrian
 * mobiles, so visitors from there type +43 / +41.
 */
export function mobileE164(raw: string): string | null {
  const input = raw.trim().replace(/^00/, "+");
  if (!input) return null;
  const parsed = parsePhoneNumberFromString(input, "DE");
  return parsed?.isValid() ? parsed.number : null;
}
