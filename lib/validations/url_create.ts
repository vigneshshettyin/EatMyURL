import { NextRequest } from "next/server";
import { urlSchema } from "../zod/url";

import { IUrlCreateReq } from "@/interfaces/url";

const validateURLCreateReq =  (formdata: FormData) => {
    try {
      
      const long_url = formdata.get("longUrl");
      const title = formdata.get("title");
      
      // validation of title need to be done
      const errors = urlSchema.safeParse({
        long_url,
      });
      return { title,long_url, status: errors.success, msg: errors.error };
    } catch (e) {
      return {
        title: "",
        long_url: "",
        status: false,
        msg : JSON.stringify(e)
      };
    }
  };


export default validateURLCreateReq;