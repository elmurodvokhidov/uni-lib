interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    rating: number;
    totalCopies: number;
    availableCopies: number;
    coverColor: string;
    description?: string;
    coverUrl: string;
    videoUrl: string;
    summary: string;
    createdAt?: Date | null;
}