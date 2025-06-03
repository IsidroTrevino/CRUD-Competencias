const { Router } = require('express');
const todoRoutes = require('./TodoRoutes');

const router = Router();

router.use('/todos', todoRoutes);

module.exports = router;