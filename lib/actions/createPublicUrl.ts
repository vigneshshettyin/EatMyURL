"use server";

import { HTTP_STATUS } from "../constants";
import { invokeRedis } from "../services/redisPublicGenerate";
import { urlSchema } from "../zod/url";

const createPublicUrl = async (formData: FormData) => {
  const longUrl: string = formData.get("long_url") as string;

  const validation = urlSchema.safeParse({
    long_url: longUrl,
  });

  if (!validation.success) {
    return {
      status: HTTP_STATUS.BAD_REQUEST
    };
  }

  try {
    const res:string = await invokeRedis(longUrl);
    return {
      shortUrl : res,
      status : HTTP_STATUS.OK
    } 
    ;
  } catch (e) {
    return {
      status : HTTP_STATUS.INTERNAL_SERVER_ERROR
    }
  }
};

export default createPublicUrl;
