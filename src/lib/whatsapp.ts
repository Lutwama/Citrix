/** Builds a wa.me deep link. `number` is international digits, e.g. 256700000000. */
export function whatsappLink(number: string, message?: string) {
  const digits = number.replace(/\D/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export function telLink(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export const DEFAULT_WA_MESSAGE =
  "Hello Citrix Solutions! I'd like to find out more about your services.";
