import { base62_encode } from "@/lib/services/base62";
import { urlSchema } from "@/lib/zod/url";
import { NextRequest } from "next/server";

import getPrisma from "@/lib/services/pg_connect";
import incrementCounter from "@/lib/services/counter";

const validate_request = async (req: NextRequest) => {
  try {
    const form_data: FormData = await req.formData();
    const long_url = form_data.get("long_url");

    const errors = urlSchema.safeParse({
      long_url,
    });
    return { long_url, status: errors.success, msg: errors.error };
  } catch (e) {
    return {
      long_url: "",
      status: false,
    };
  }
};

export async function POST(req: NextRequest) {
  const prisma = getPrisma();
  const { long_url, status, msg } = await validate_request(req);

  if (!status) {
    return Response.json(
      {
        error: "Invalid input",
        moreinfo: msg,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      }
    );
  }

  const short_id_length = await incrementCounter();
  const short_id = base62_encode(short_id_length);

  //TODO: Save the URL to the database

  return Response.json(
    {
      long_url,
      short_id,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    }
  );
}
