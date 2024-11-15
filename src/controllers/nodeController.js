import { createNode as createNodeService, getNodes as getNodesService, updateNode as updateNodeService, deleteNode as deleteNodeService } from '../service/nodeService.js';

// Créer un noeud
export const createNode = async (req, res) => {
  const { id, name, type } = req.body;
  try {
    const node = await createNodeService(id, name, type);
    res.status(201).json({
      message: 'Node created successfully',
      data: node,
    });
  } catch (error) {
    console.error('Error creating node:', error);
    res.status(500).json({ message: 'Error creating node', error: error.message });
  }
};

// Récupérer tous les noeuds
export const getNodes = async (req, res) => {
  try {
    const nodes = await getNodesService();
    res.status(200).json({
      message: 'Nodes fetched successfully',
      data: nodes,
    });
  } catch (error) {
    console.error('Error fetching nodes:', error);
    res.status(500).json({ message: 'Error fetching nodes', error: error.message });
  }
};

// Mettre à jour un noeud
export const updateNode = async (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;
  try {
    const updatedNode = await updateNodeService(id, name, type);
    if (!updatedNode) {
      return res.status(404).json({ message: `Node with ID ${id} not found` });
    }
    res.status(200).json({
      message: `Node with ID ${id} updated successfully`,
      data: updatedNode,
    });
  } catch (error) {
    console.error('Error updating node:', error);
    res.status(500).json({ message: 'Error updating node', error: error.message });
  }
};

// Supprimer un noeud
export const deleteNode = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCount = await deleteNodeService(id);
    if (deletedCount === 0) {
      return res.status(404).json({ message: `Node with ID ${id} not found` });
    }
    res.status(200).json({
      message: `Node with ID ${id} deleted successfully`,
    });
  } catch (error) {
    console.error('Error deleting node:', error);
    res.status(500).json({ message: 'Error deleting node', error: error.message });
  }
};
