'use server'

import { ISessionType } from "@/interfaces/url";
import prisma from "../services/pgConnect";
import { getServerSession } from "next-auth";
import authOptions from "../authOptions";
import { HTTP_STATUS } from "../constants";
import { linkType } from "@/interfaces/types";

export async function getTutorialStatus() {
    const session: ISessionType | null = await getServerSession(authOptions);
  
    if (!session?.user) {
      return {
        status: HTTP_STATUS.UNAUTHORIZED,linkId:-1
      };
    }
  
    const link: linkType | null = await prisma.links.findFirst({
        where:{
            user_id: parseInt(session.user.sub)
        },
        include: {
            _count: true
        }
    });
  
    if(!link){
        return {status:HTTP_STATUS.NOT_FOUND,linkId:-1}
    }
  
    return {status:HTTP_STATUS.OK,linkId:link.id};
  }