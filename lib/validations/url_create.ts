import { NextRequest } from "next/server";
import { urlSchema } from "../zod/url";

import { IUrlCreateReq } from "@/interfaces/url";

const validateURLCreateReq = async (req: NextRequest) : Promise<IUrlCreateReq> => {
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
        msg : JSON.stringify(e)
      };
    }
  };


export default validateURLCreateReq;