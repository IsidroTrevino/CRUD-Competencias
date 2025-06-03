const { Router } = require('express');
const {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
    markTodoComplete
} = require('../controllers/TodoControllers');

const router = Router();

router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.patch('/:id/complete', markTodoComplete);

module.exports = router;