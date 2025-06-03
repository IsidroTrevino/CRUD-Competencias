export interface Todo {
    id: number;
    title: string;
    description?: string;
    is_complete: boolean;
    created_at: string;
    updated_at: string;
}

export interface TodoFormData {
    title: string;
    description?: string;
    is_complete: boolean;
}