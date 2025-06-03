import { Todo, TodoInput, TodoUpdateInput } from '../../types/todo';

const API_URL = 'https://crud-api-competencias.vercel.app/api/todos';

/**
 * Fetches all todos from the API
 * @returns {Promise<Todo[]>} List of todo items
 */
export async function fetchTodos(): Promise<Todo[]> {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch todos');
        return await response.json();
    } catch (error) {
        throw new Error(`Error fetching todos: ${error.message}`);
    }
}

/**
 * Creates a new todo
 * @param {TodoInput} todoData - The todo data
 * @returns {Promise<Todo>} The created todo
 */
export async function createTodo(todoData: TodoInput): Promise<Todo> {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todoData),
        });
        if (!response.ok) throw new Error('Failed to create todo');
        return await response.json();
    } catch (error) {
        throw new Error(`Error creating todo: ${error.message}`);
    }
}

/**
 * Updates an existing todo
 * @param {number} id - Todo ID
 * @param {TodoUpdateInput} todoData - Updated todo data
 * @returns {Promise<Todo>} The updated todo
 */
export async function updateTodo(id: number, todoData: TodoUpdateInput): Promise<Todo> {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todoData),
        });
        if (!response.ok) throw new Error('Failed to update todo');
        return await response.json();
    } catch (error) {
        throw new Error(`Error updating todo: ${error.message}`);
    }
}

/**
 * Deletes a todo
 * @param {number} id - Todo ID
 * @returns {Promise<boolean>} Success status
 */
export async function deleteTodo(id: number): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete todo');
        return true;
    } catch (error) {
        throw new Error(`Error deleting todo: ${error.message}`);
    }
}

/**
 * Toggles todo completion status
 * @param {number} id - Todo ID
 * @param {boolean} isComplete - Completion status
 * @returns {Promise<Todo>} The updated todo
 */
export async function toggleTodoComplete(id: number, isComplete: boolean): Promise<Todo> {
    try {
        const response = await fetch(`${API_URL}/${id}/complete`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_complete: isComplete }),
        });
        if (!response.ok) throw new Error('Failed to update todo status');
        return await response.json();
    } catch (error) {
        throw new Error(`Error updating todo status: ${error.message}`);
    }
}