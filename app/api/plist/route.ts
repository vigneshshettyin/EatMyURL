import { NextRequest } from "next/server";
import { getRecords } from "@/lib/services/rgenerate";

export async function POST(req: NextRequest) {
  const form_data: FormData = await req.formData();
  const short_code_list = form_data.getAll("short_code_list") as string[];

  try {
    const records = await getRecords(short_code_list);
    return Response.json(
      {
        records,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (e) {
    return Response.json(
      {
        error: "Internal Server Error",
        moreinfo: JSON.stringify(e),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
}
