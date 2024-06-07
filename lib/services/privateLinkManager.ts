import { base62_encode } from "@/lib/services/base62";

import incrementCounter from "@/lib/services/counter";
import { getServerSession } from "next-auth";
import z from 'zod'
import { ISessionType } from "@/interfaces/url";
import authOptions from "@/lib/authOptions";
import validateURLCreateReq from "@/lib/validations/url_create";
import PrismaClientManager from "@/lib/services/pgConnect";
import { HTTP_STATUS } from "@/lib/constants";
import { linkType } from "@/interfaces/types";

const alphabetOnlySchema = z.string().regex(/^[a-zA-Z]+$/);

export async function createPrivateLink(formdata : FormData) {

  const posgresInstance = PrismaClientManager.getInstance();
  const prisma = posgresInstance.getPrismaClient();
  const { title,long_url, status } =  await validateURLCreateReq(formdata);
  const session: ISessionType | null = await getServerSession(authOptions);

  let custom_short_code:string = formdata.get('short_code') as string

  if(long_url?.toString().includes("eurl.dev")){
      return {
        status: HTTP_STATUS.NOT_ACCEPTABLE,
      }
  }

  // if custom short code exists
  if(custom_short_code){

      // check if duplicate
      const link: linkType | null = await prisma.links.findFirst({
        where: {
          short_code:custom_short_code
        }
      })

      if(link) return {
        status: HTTP_STATUS.CONFLICT
      }

      // checking its regex 
      const res = alphabetOnlySchema.safeParse(custom_short_code);

      if(!res.success || custom_short_code.startsWith("app")){
        return {
          status: HTTP_STATUS.BAD_REQUEST
        }
      }
  }

  if (!status) {
    return {
        status: HTTP_STATUS.BAD_REQUEST
      }
  }

  if (!session?.user) {
    return {
        status: HTTP_STATUS.UNAUTHORIZED
      }
  }

  const shortIdLength:number = await incrementCounter();

  if(!custom_short_code)
    custom_short_code = base62_encode(shortIdLength);

  try {
    await prisma.links.create({
      data: {
        title : title as string,
        long_url: long_url as string,
        short_code: custom_short_code,
        created_at: new Date(),
        user: {
          connect: {
            id: parseInt(session.user.sub),
          },
        },
      },
    });
    return {
        short_url: custom_short_code,
        status: HTTP_STATUS.CREATED
      }

  } catch (e) {
    return {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR
      }
      
  }
}

export async function updatePrivateLink(formdata : FormData){
    const prisma = PrismaClientManager.getInstance().getPrismaClient();

    const title: string = formdata.get('title') as string
    const shortcode: string = formdata.get('short_code') as string
    const linkId: number = Number.parseInt(formdata.get('linkId') as string)

    try{
      const link = await prisma.links.findFirst({
        where:{
          short_code:shortcode
        }
      })

      if(link && link.id != linkId){
        return {status: HTTP_STATUS.CONFLICT}
      }

      await prisma.links.update({
        where:{
          id: linkId
        },
        data:{
          title:title,
          short_code:shortcode
        }
      })

      return {
        status: HTTP_STATUS.OK
      }

    }
    catch(e){
      return {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR
      }
    }
}

export async function getTutorialStatus(){
  const prisma = PrismaClientManager.getInstance().getPrismaClient();
  const session: ISessionType | null = await getServerSession(authOptions);

  const TutorialStatus = {
      createLink : false,
      clickLink : false,
      checkAnalytics:false
  }

  if (!session?.user) {
    return {
        status: HTTP_STATUS.UNAUTHORIZED
      }
  }

  const link:linkType | null = await prisma.links.findFirst({});

  if(link){
    TutorialStatus.createLink = true;
  }

  // If engagement then check
  // If checked Analytics thenc check

}