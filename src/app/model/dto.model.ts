export interface SubmitDto {
    category: string;
    status: string;
    title: string;
    language: string;
    quality: string;
    format: string;
    description: string;
    releasedDate: Date;
    tags:string[];
    imdb:number;
    ro:number;
    seasons: number;
    episodes: number;
    img: File;
    trailer: string;
}

export interface SearchDto {
    category: string;
    title: string;
    releasedDateFrom: string | null;
    releasedDateTo: string | null;
    addedDateFrom: string;
    addedDateTo: string;
    quality: string;
}