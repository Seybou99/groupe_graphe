import express from 'express';
import { createNode, getNodes, updateNode, deleteNode } from '../controllers/nodeController.js';

const router = express.Router();

router.post('/nodes', createNode);
router.get('/nodes', getNodes);
router.put('/nodes/:id', updateNode);
router.delete('/nodes/:id', deleteNode);

export default router;
