const express = require('express');
const { createNode, getAllNodes, updateNode, deleteNode } = require('../controllers/nodeController');
const router = express.Router();

// Définir les routes CRUD
router.post('/nodes', createNode);       // Create
router.get('/nodes', getAllNodes);       // Read
router.put('/nodes/:id', updateNode);    // Update
router.delete('/nodes/:id', deleteNode); // Delete

module.exports = router;
