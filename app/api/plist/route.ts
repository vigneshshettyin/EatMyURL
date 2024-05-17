import { NextRequest } from "next/server";
import { getRecords } from "@/lib/services/redisPublicGenerate";
import { HTTP_STATUS, RESPONSE } from "@/lib/constants";

export async function POST(req: NextRequest) {
  const form_data: FormData = await req.formData();
  const shortCodeList = form_data.getAll("short_code_list") as string[];

  try {
    const records = await getRecords(shortCodeList);
    return RESPONSE(
      {
        records,
      },
      HTTP_STATUS.OK
    );
  } catch (e) {
    return RESPONSE(
      {
        error: "Internal Server Error",
        more_info: JSON.stringify(e),
      },
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
}
