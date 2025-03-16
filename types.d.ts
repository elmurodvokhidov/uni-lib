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

interface AuthCredentials {
    fullName: string;
    email: string;
    password: string;
    universityId: number;
    universityCard: string;
}