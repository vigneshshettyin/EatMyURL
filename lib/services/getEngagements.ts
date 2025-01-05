import { linkType } from "@/interfaces/types";
import axios from 'axios'

export async function getEngagements(links:linkType[]){
    const url = process.env.CLICKHOUSE_URL;
    const apiKey = process.env.CLICKHOUSE_API_KEY;

    for(let i = 0;i<links.length;i++){
        links[i].engagements = 0; 
    }

    return links;
}