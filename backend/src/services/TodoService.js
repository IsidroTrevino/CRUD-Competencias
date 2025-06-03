const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @typedef {Object} TodoData
 * @property {string} title - The title of the todo
 * @property {string} [description] - Optional description
 * @property {boolean} [is_complete] - Whether the todo is complete
 */

class TodoService {
    static instance;

    constructor() {}

    static getInstance() {
        if (!TodoService.instance) {
            TodoService.instance = new TodoService();
        }
        return TodoService.instance;
    }

    async getAll() {
        return prisma.todo_items.findMany();
    }

    async getById(id) {
        return prisma.todo_items.findUnique({
            where: { id }
        });
    }

    /**
     * @param {TodoData} data
     */
    async create(data) {
        return prisma.todo_items.create({
            data
        });
    }

    /**
     * @param {number} id
     * @param {Partial<TodoData>} data
     */
    async update(id, data) {
        return prisma.todo_items.update({
            where: { id },
            data
        });
    }

    async remove(id) {
        return prisma.todo_items.delete({
            where: { id }
        });
    }

    async markComplete(id, isComplete = true) {
        return prisma.todo_items.update({
            where: { id },
            data: { is_complete: isComplete }
        });
    }
}

module.exports = TodoService.getInstance();