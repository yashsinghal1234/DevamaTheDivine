/** Topic labels for the /faq hub sidebar and section eyebrows. */
export const FAQ_TOPICS: { id: string; label: string }[] = [
  { id: "choosing", label: "Choosing your piece" },
  { id: "authenticity", label: "Authenticity information" },
  { id: "care", label: "Care & materials" },
  { id: "orders", label: "Orders & tracking" },
  { id: "gift", label: "Gift offer" },
  { id: "shipping", label: "Shipping information" },
  { id: "refunds", label: "Refunds & policies" },
];

export function faqTopicLabel(id?: string): string {
  return FAQ_TOPICS.find((t) => t.id === id)?.label ?? "Choosing your piece";
}
