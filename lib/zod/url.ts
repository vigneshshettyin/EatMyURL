import { z } from "zod";

const urlSchema = z.object({
  long_url: z.string().url(),
  short_id_length: z.number().int().positive().min(1000000).max(100000000000),
});

export { urlSchema };
