export interface SubmitDto {
    category: string;
    status: string;
    title: string;
    language: string;
    description: string;
    releasedDate: Date;
    seasons: number;
    episodes: number;
    img: Blob;
    trailer: string;
}