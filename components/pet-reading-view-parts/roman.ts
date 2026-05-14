const ROMAN = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
];

export function toRoman(index: number): string {
  return ROMAN[index] ?? String(index + 1);
}
