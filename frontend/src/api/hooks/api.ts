const API_URL = 'http://localhost:3000/api/todos';

/**
 * Fetches all todos from the API
 * @returns {Promise<Array>} List of todo items
 */
export async function fetchTodos() {
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
 * @param {Object} todoData - The todo data
 * @returns {Promise<Object>} The created todo
 */
export async function createTodo(todoData) {
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
 * @param {Object} todoData - Updated todo data
 * @returns {Promise<Object>} The updated todo
 */
export async function updateTodo(id, todoData) {
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
 */
export async function deleteTodo(id) {
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
 * @returns {Promise<Object>} The updated todo
 */
export async function toggleTodoComplete(id, isComplete) {
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