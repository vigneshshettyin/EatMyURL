import { urlSchema } from "../zod/url";
import cheerio from 'cheerio';

const validateURLCreateReq = async (formdata: FormData) => {
  try {
    const long_url = formdata.get("longUrl");
    let title:any = formdata.get("title");

    // validation of title need to be done
    const errors = urlSchema.safeParse({
      long_url,
    });

    const urlHit: any = long_url;

    if (title?.toString().length == 0) {
        const response = await fetch(urlHit);
        const html = await response.text();
        const $ = cheerio.load(html);
        const newTitle = $('title').text();
        title = newTitle;
    }

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
