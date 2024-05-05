import { z } from "zod";

const urlSchema = z.object({
  long_url: z.string().url(),
});

export { urlSchema };
