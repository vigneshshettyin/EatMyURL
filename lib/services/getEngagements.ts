import { linkType } from "@/interfaces/types";
import axios from 'axios'

export async function getEngagements(links:linkType[]){
    const url = process.env.CLICKHOUSE_URL;
    const apiKey = process.env.CLICKHOUSE_API_KEY;

    for(let i = 0;i<links.length;i++){
        const res = await axios.get(url+`total?code=${links[i].short_code}`,{
            headers:{
                'apikey':apiKey
            }
        })
        links[i].engagements = Number.parseInt(res.data[0].record_count); 
    }

    return links;
}