'use client';
import { useState } from 'react';

import { Todo, TodoFormData } from '../types/todo';

interface TodoItemProps {
    todo: Todo;
    onUpdate: (id: number, data: TodoFormData) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
    onToggleComplete: (id: number, isComplete: boolean) => Promise<void>;
}

export default function TodoItem({ todo, onUpdate, onDelete, onToggleComplete }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTodo, setEditedTodo] = useState<TodoFormData>({
        title: todo.title,
        description: todo.description,
        is_complete: todo.is_complete
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedTodo({
            ...editedTodo,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editedTodo.title.trim()) return;

        setIsSubmitting(true);
        await onUpdate(todo.id, editedTodo);
        setIsSubmitting(false);
        setIsEditing(false);
    };

    const handleToggleComplete = async () => {
        await onToggleComplete(todo.id, !todo.is_complete);
    };

    if (isEditing) {
        return (
            <div className="p-4 bg-white rounded-lg shadow-md border border-indigo-100 transition-all">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={editedTodo.title}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <textarea
                        name="description"
                        value={editedTodo.description || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        rows={2}
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-4 py-2 ${
                                isSubmitting ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
                            } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all`}
                        >
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div
            className={`p-4 bg-white rounded-lg shadow-md transition-all transform hover:translate-y-[-2px] ${
                todo.is_complete
                    ? 'border-l-4 border-l-green-500 bg-green-50'
                    : 'border-l-4 border-l-indigo-500'
            }`}
        >
            <div className="mb-2">
                <div className="flex items-start justify-between">
                    <h3 className={`text-lg font-semibold ${todo.is_complete ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {todo.title}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full ml-2 inline-block bg-gray-100 text-gray-600">
            {new Date(todo.created_at).toLocaleDateString()}
          </span>
                </div>
                {todo.description && (
                    <p className={`mt-1 text-sm ${todo.is_complete ? 'text-gray-400' : 'text-gray-600'}`}>
                        {todo.description}
                    </p>
                )}
            </div>
            <div className="flex flex-wrap items-center justify-between mt-3 pt-2 border-t border-gray-100">
                <label className="flex items-center text-sm text-gray-700 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={todo.is_complete}
                        onChange={handleToggleComplete}
                        className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span>{todo.is_complete ? 'Completed' : 'Mark as complete'}</span>
                </label>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(todo.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}