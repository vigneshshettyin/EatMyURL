"use server"

import { createPrivateLink } from "../services/privateLinkManager"

export async function createLinkAction (formdata:FormData){
    const response = await createPrivateLink(formdata)
    console.log(response)
    return response
    
}

