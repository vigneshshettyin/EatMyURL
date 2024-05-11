import { base62_encode } from "@/lib/services/base62";
import { urlSchema } from "@/lib/zod/url";
import { NextRequest } from "next/server";

import getPrisma from "@/lib/services/pg_connect";
import incrementCounter from "@/lib/services/counter";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "../auth/[...nextauth]/route";

import { ISessionType } from "@/interfaces/url";


const validate_request = async (req: NextRequest) => {
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
    };
  }
};

// For Testing
// export async function GET(req: NextRequest) { 

//   const session : ISessionType | null = await getServerSession(NEXT_AUTH_CONFIG)

//   const prisma = getPrisma();

//   if (session?.user){
//     const crate_link = await prisma.links.create({
//       data:{
//         long_url: "https://google.com",
//         short_code: "123",
//         created_at: new Date(),
//         user : {
//           connect:{
//             id: parseInt(session.user.sub)
//           }
        
//         }
//       }
//     })

//     console.log(crate_link)
//   }

//   return Response.json(
//     {
//       data : session
//     },
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       status: 200,
//     }
//   );
// }

export async function POST(req: NextRequest) {
  const prisma = getPrisma();
  const { long_url, status, msg } = await validate_request(req);
  const session : ISessionType | null = await getServerSession(NEXT_AUTH_CONFIG)

  if (!status && !long_url) {
    return Response.json(
      {
        error: "Invalid input",
        moreinfo: msg,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      }
    );
  }

  if (!session?.user){
    return Response.json(
      {
        error: "Unauthorized",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 401,
      }
    );
  }

  const short_id_length = await incrementCounter();
  const short_id = base62_encode(short_id_length);

  try{
    await prisma.links.create({
      data:{
        long_url : long_url as string,
        short_code: short_id,
        created_at: new Date(),
        user : {
          connect:{
            id: parseInt(session.user.sub)
          }
        
        }
      }
    })
    return Response.json(
      {
        short_url: short_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 201,
      }
    )
  
  }
  catch(e){
    return Response.json(
      {
        error: "Internal Server Error",
        msg : JSON.stringify(e)
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
