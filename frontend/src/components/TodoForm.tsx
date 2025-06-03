'use client';
import { useState } from 'react';

import { TodoFormData } from '../types/todo';

interface TodoFormProps {
    onSubmit: (data: TodoFormData) => Promise<void>;
    initialValues?: Partial<TodoFormData> & { id?: number };
}

export default function TodoForm({ onSubmit, initialValues = {} }: TodoFormProps) {
    const [formData, setFormData] = useState<TodoFormData>({
        title: initialValues.title || '',
        description: initialValues.description || '',
        is_complete: initialValues.is_complete || false
    });
    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.title.trim()) {
            setError('Title is required');
            return;
        }

        try {
            setIsSubmitting(true);
            await onSubmit(formData);

            if (!initialValues.id) {
                setFormData({
                    title: '',
                    description: '',
                    is_complete: false
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-indigo-700 border-b pb-3">
                {initialValues.id ? 'Edit Task' : 'Add New Task'}
            </h2>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                    Title <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="What needs to be done?"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Add some details (optional)"
                />
            </div>

            <div className="mb-6">
                <label className="flex items-center text-gray-700 cursor-pointer">
                    <input
                        type="checkbox"
                        name="is_complete"
                        checked={formData.is_complete}
                        onChange={handleChange}
                        className="mr-2 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-all"
                    />
                    <span>Mark as completed</span>
                </label>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 ${
                    isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
                ) : initialValues.id ? 'Update Task' : 'Add Task'}
            </button>
        </form>
    );
}