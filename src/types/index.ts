export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export type ApiResponse<T> = {
    data: T;
    message?: string;
    error?: boolean;
};