import { linkType } from "@/interfaces/types";

export async function getEngagements(links: linkType[]) {
  for (let i = 0; i < links.length; i++) {
    links[i].engagements = 0;
  }

  return links;
}
