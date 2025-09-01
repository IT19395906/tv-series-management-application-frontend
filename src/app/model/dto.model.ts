export interface SubmitDto {
    category: string;
    status: string;
    title: string;
    language: string;
    quality: string;
    description: string;
    releasedDate: Date;
    seasons: number;
    episodes: number;
    img: File;
    trailer: string;
}

export interface SearchDto {
    category: string;
    title: string;
    releasedDateFrom: Date;
    releasedDateTo: Date;
    addedDateFrom: string;
    addedDateTo: string;
    quality: string;
}