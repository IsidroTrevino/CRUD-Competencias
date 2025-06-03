export interface Todo {
    id: number;
    title: string;
    description?: string;
    is_complete: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface TodoInput {
    title: string;
    description?: string;
    is_complete?: boolean;
}

export interface TodoUpdateInput {
    title?: string;
    description?: string;
    is_complete?: boolean;
}

export interface TodoCompleteInput {
    is_complete: boolean;
}

export interface ApiError {
    message: string;
}