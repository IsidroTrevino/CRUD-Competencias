const todoService = require('../services/TodoService');

const getAllTodos = async (req, res, next) => {
    try {
        const todos = await todoService.getAll();
        return res.json(todos);
    } catch (error) {
        next(error);
    }
};

const getTodoById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const todo = await todoService.getById(id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        return res.json(todo);
    } catch (error) {
        next(error);
    }
};

const createTodo = async (req, res, next) => {
    try {
        const todoData = req.body;
        const newTodo = await todoService.create(todoData);
        return res.status(201).json(newTodo);
    } catch (error) {
        next(error);
    }
};

const updateTodo = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const todoData = req.body;
        const updatedTodo = await todoService.update(id, todoData);

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        return res.json(updatedTodo);
    } catch (error) {
        next(error);
    }
};

const deleteTodo = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        await todoService.remove(id);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const markTodoComplete = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { is_complete = true } = req.body;
        const updatedTodo = await todoService.markComplete(id, is_complete);

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        return res.json(updatedTodo);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
    markTodoComplete
};