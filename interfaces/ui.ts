
export interface LinkCardProps {
    id: number;
    title: string;
    shortLink: string;
    longLink: string;
}

export interface LinkCardData {
    data: LinkCardProps[];
}