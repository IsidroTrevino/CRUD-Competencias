'use client';
import { useState, useEffect } from 'react';

import {
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodoComplete
} from '../api/hooks/api';
import { Todo, TodoFormData } from '../types/todo';

import Toast from './Toast';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

type ToastData = {
    message: string;
    type: 'success' | 'error' | 'info';
} | null;

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [toast, setToast] = useState<ToastData>(null);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await fetchTodos();
            setTodos(data);
        } catch (error) {
            setError('Failed to load todos. Please try again later.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
        setToast({ message, type });
    };

    const handleCreateTodo = async (todoData: TodoFormData) => {
        try {
            setError('');
            const newTodo = await createTodo(todoData);
            setTodos([...todos, newTodo]);
            showToast('Todo created successfully!', 'success');
        } catch (error) {
            if (error instanceof Error) {
                setError(`Failed to create todo: ${error.message}`);
                showToast(`Failed to create todo: ${error.message}`, 'error');
            } else {
                setError('Failed to create todo');
                showToast('Failed to create todo', 'error');
            }
            console.error(error);
        }
    };

    const handleUpdateTodo = async (id: number, todoData: TodoFormData) => {
        try {
            setError('');
            const updatedTodo = await updateTodo(id, todoData);
            setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
            showToast('Todo updated successfully!', 'success');
        } catch (error) {
            if (error instanceof Error) {
                setError(`Failed to update todo: ${error.message}`);
                showToast(`Failed to update todo: ${error.message}`, 'error');
            } else {
                setError('Failed to update todo');
                showToast('Failed to update todo', 'error');
            }
            console.error(error);
        }
    };

    const handleDeleteTodo = async (id: number) => {
        if (!confirm('Are you sure you want to delete this todo?')) return;

        try {
            setError('');
            await deleteTodo(id);
            setTodos(todos.filter(todo => todo.id !== id));
            showToast('Todo deleted successfully!', 'success');
        } catch (error) {
            if (error instanceof Error) {
                setError(`Failed to delete todo: ${error.message}`);
                showToast(`Failed to delete todo: ${error.message}`, 'error');
            } else {
                setError('Failed to delete todo');
                showToast('Failed to delete todo', 'error');
            }
            console.error(error);
        }
    };

    const handleToggleComplete = async (id: number, isComplete: boolean) => {
        try {
            setError('');
            const updatedTodo = await toggleTodoComplete(id, isComplete);
            setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
            showToast(`Todo marked as ${isComplete ? 'complete' : 'incomplete'}`, 'info');
        } catch (error) {
            if (error instanceof Error) {
                setError(`Failed to update todo status: ${error.message}`);
                showToast(`Failed to update todo status: ${error.message}`, 'error');
            } else {
                setError('Failed to update todo status');
                showToast('Failed to update todo status', 'error');
            }
            console.error(error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">My Tasks</h1>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex justify-between items-center">
                    <span>{error}</span>
                    <button
                        onClick={() => setError('')}
                        className="text-red-700 font-bold"
                    >
                        ×
                    </button>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                <section>
                    <TodoForm onSubmit={handleCreateTodo} />
                </section>

                <section>
                    {loading ? (
                        <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-md">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : todos.length > 0 ? (
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                            {todos.map(todo => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    onUpdate={handleUpdateTodo}
                                    onDelete={handleDeleteTodo}
                                    onToggleComplete={handleToggleComplete}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg shadow-md border border-dashed border-gray-300">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p className="mt-2 text-gray-500">No tasks yet. Create your first one!</p>
                        </div>
                    )}
                </section>
            </div>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}