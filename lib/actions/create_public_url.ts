"use server";

import { HTTP_STATUS } from "../constants";
import { invokeRedis } from "../services/rgenerate";
import { urlSchema } from "../zod/url";

const REDIRECT_URL = process.env.REDIRECT_URL || "";

const createPublicUrl = async (formData: FormData) => {
  const longUrl: any = formData.get("long_url");

  const errors = urlSchema.safeParse({
    long_url: longUrl,
  });

  if (!errors.success) {
    return {
      shortUrl : "",
      status: HTTP_STATUS.BAD_REQUEST
    };
  }

  try {
    const res = await invokeRedis(longUrl);
    return {
      shortUrl : `${REDIRECT_URL}/${res}`,
      status : HTTP_STATUS.OK
    } 
    ;
  } catch (e) {
    return {
      shortUrl : "",
      status : HTTP_STATUS.INTERNAL_SERVER_ERROR
    };
  }
};

export default createPublicUrl;
