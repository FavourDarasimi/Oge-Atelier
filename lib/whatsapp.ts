/* Hallmark · data: whatsapp — single source for the WhatsApp number and deep links · tokens: Oge Atelier
 * replace WHATSAPP_NUMBER with the atelier's live line before launch
 */

const WHATSAPP_NUMBER = "2340000000000";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
