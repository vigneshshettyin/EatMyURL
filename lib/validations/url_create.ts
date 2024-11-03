import { urlSchema } from "../zod/url";

const validateURLCreateReq = async (formdata: FormData) => {
  try {
    const long_url = formdata.get("longUrl");
    let title:any = "New Link";

    // validation of title need to be done
    const errors = urlSchema.safeParse({
      long_url,
    });

    return { title, long_url, status: errors.success, msg: errors.error };
  } catch (e) {
    return {
      title: "",
      long_url: "",
      status: false,
      msg: JSON.stringify(e),
    };
  }
};

export default validateURLCreateReq;
