'use server'

import { updatePrivateLink } from "../services/privateLinkManager"

export async function updateLinkAction (formdata:FormData){
    const res = await updatePrivateLink(formdata);

    return res;
}