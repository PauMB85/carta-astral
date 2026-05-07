export function formatBirthDate(iso: string): string {
  if (!iso) return "";
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTime(value: string): string {
  if (!value) return "";
  return value;
}

export function formatPlace(value: string): string {
  return value.trim();
}
