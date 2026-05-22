import type { z } from "zod";

export interface LLMStreamRequest<TSchema extends z.ZodTypeAny> {
  system: string;
  prompt: string;
  schema: TSchema;
  onFinish?: (result: {
    object: z.infer<TSchema>;
    text: string;
  }) => void | Promise<void>;
}

export interface LLMStreamPort {
  streamObject<TSchema extends z.ZodTypeAny>(
    req: LLMStreamRequest<TSchema>,
  ): Promise<Response>;
}
