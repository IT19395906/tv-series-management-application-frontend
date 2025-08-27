export interface SubmitDto {
    category: string;
    status: string;
    title: string;
    language: string;
    description: string;
    releasedDate: string;
    seasons: number;
    episodes: number;
    img: File;
    trailer: string;
}

export interface SearchDto {
    category: string;
    title: string;
    releasedDateFrom: string;
    releasedDateTo: string;
    addedDateFrom: string;
    addedDateTo: string;
    quality: string;
}