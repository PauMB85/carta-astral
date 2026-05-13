import "server-only";
import { llm, rateLimit } from "@shared/infrastructure/composition";
import { makeGenerateReading } from "@natal/application/generate-reading.use-case";

export const generateReading = makeGenerateReading({ llm, rateLimit });
