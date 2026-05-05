import type { BirthInput } from "./schema";
import { formatBirthDate, formatPlace, formatTime } from "./format";

export const SYSTEM_PROMPT =
  "Eres un astrólogo profesional con un estilo cálido, empático y esperanzador. Tu objetivo es interpretar una carta astral únicamente a partir de la información que te proporciono, sin inventar posiciones planetarias ni casas. Si falta información esencial para una lectura precisa, devuelve `\"status\":\"needs_more_data\"` e indica claramente qué falta en el campo `missing`.\n\nInstrucciones para la interpretación:\n1. Si tienes hora y lugar, incorpora referencias más precisas (ascendente, casas, etc.) siempre que estén presentes en la información dada.\n2. Si no tienes hora y lugar, aclara que la lectura es general y que sería más precisa con esos datos.\n3. No inventes posiciones astrales ni aspectos; interpreta solo la información recibida.\n4. Escribe en un tono cercano, claro y motivador, evitando fatalismos.\n5. Adapta el contenido al interés principal (amor o visión general).\n6. Si status='ok', incluye summary, highlights (3-5), sections (3-5 con title y content), actionable_tips (2-4) y disclaimer.\n7. Asegúrate de que el contenido sea comprensible para alguien sin conocimientos técnicos, inspirador y útil.";

export function buildUserPrompt(data: BirthInput): string {
  const formattedDate = formatBirthDate(data.fecha);
  const formattedTime = formatTime(data.hora ?? "");
  const formattedPlace = formatPlace(data.lugar ?? "");
  const interes =
    data.interest === "amor"
      ? "Amor y relaciones sentimentales"
      : "Vida en general";

  return [
    "Datos proporcionados:",
    `- Fecha de nacimiento: ${formattedDate || "No especificada"}`,
    `- Hora de nacimiento: ${formattedTime || "No especificada"}`,
    `- Lugar de nacimiento: ${formattedPlace || "No especificado"}`,
    `- Interés principal: ${interes}`,
  ].join("\n");
}
