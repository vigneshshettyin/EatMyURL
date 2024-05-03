import { base62_encode } from "@/lib/services/base62";
import { NextRequest } from "next/server";

// import getPrisma from "@/lib/services/pg_connect";
// import getRedis from "@/lib/services/redis_connect";

import { z } from "zod";

// write a validation schema for url

const urlSchema = z.object({
  long_url: z.string().url(),
  short_id_length: z.number().int().positive(),
});

export async function POST(req: NextRequest) {
  const form_data = await req.formData();

  const long_url = form_data.get("long_url");
  const short_id_length: number = parseInt(
    form_data.get("short_id_length") as string
  );

  const errors = urlSchema.safeParse({
    long_url,
    short_id_length,
  });

  if (errors.success === false) {
    return Response.json(errors.error, {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }

  const short_id = base62_encode(short_id_length);

  const resp = {
    long_url,
    short_id_length,
    short_id,
  };

  return Response.json([resp], {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
