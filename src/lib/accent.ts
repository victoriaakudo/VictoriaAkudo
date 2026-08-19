export function onAccent(hex: string): string {
  const c = hex.replace("#", "");
  if (c.length < 6) return "#000000";
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#000000" : "#F5F8DE";
}
