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