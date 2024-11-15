const express = require('express');
const { createNode, getNodes, updateNode, deleteNode } = require('../controllers/nodeController');
const router = express.Router();

router.post('/nodes', createNode);
router.get('/nodes', getNodes);
router.put('/nodes/:id', updateNode);
router.delete('/nodes/:id', deleteNode);

module.exports = router;
