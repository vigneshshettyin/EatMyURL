"use server"

import { publicLinkType } from "@/interfaces/types"
import { getRecords } from "../services/redisPublicGenerate"

const parsePublicRecords = async (publicLinks : string) => {
    // if public links are not present return no records
    if(!publicLinks) return [];
    const data: string[] = JSON.parse(publicLinks)    
    const response:publicLinkType[] = await getRecords(data) 
    return response;
}   


export default parsePublicRecords