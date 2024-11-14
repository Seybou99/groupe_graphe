const express = require('express');
const { createNode, getNodes, updateNode, deleteNode } = require('../controllers/nodeController');
const router = express.Router();

// Routes CRUD
router.post('/nodes', createNode);      // Create
router.get('/nodes', getNodes);         // Read
router.put('/nodes/:id', updateNode);   // Update
router.delete('/nodes/:id', deleteNode);// Delete

module.exports = router;
