const driver = require('../config/db');

// Créer un noeud
const createNode = async (req, res) => {
  const session = driver.session();
  const { id, name, type } = req.body;

  try {
    const result = await session.run(
      'CREATE (n:Node {id: $id, name: $name, type: $type}) RETURN n',
      { id, name, type }
    );
    const node = result.records[0].get('n').properties;

    res.status(201).json({
      message: 'Node created successfully',
      data: node,
    });
  } catch (error) {
    console.error('Error creating node:', error);
    res.status(500).json({ message: 'Error creating node', error: error.message });
  } finally {
    await session.close();
  }
};

// Récupérer tous les noeuds
const getNodes = async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run('MATCH (n:Node) RETURN n');
    const nodes = result.records.map(record => record.get('n').properties);

    res.status(200).json({
      message: 'Nodes fetched successfully',
      data: nodes,
    });
  } catch (error) {
    console.error('Error fetching nodes:', error);
    res.status(500).json({ message: 'Error fetching nodes', error: error.message });
  } finally {
    await session.close();
  }
};

// Mettre à jour un noeud
const updateNode = async (req, res) => {
  const session = driver.session();
  const { id } = req.params;
  const { name, type } = req.body;

  try {
    const result = await session.run(
      'MATCH (n:Node {id: $id}) SET n.name = $name, n.type = $type RETURN n',
      { id, name, type }
    );

    if (result.records.length === 0) {
      return res.status(404).json({ message: `Node with ID ${id} not found` });
    }

    const updatedNode = result.records[0].get('n').properties;

    res.status(200).json({
      message: `Node with ID ${id} updated successfully`,
      data: updatedNode,
    });
  } catch (error) {
    console.error('Error updating node:', error);
    res.status(500).json({ message: 'Error updating node', error: error.message });
  } finally {
    await session.close();
  }
};

// Supprimer un noeud
const deleteNode = async (req, res) => {
  const session = driver.session();
  const { id } = req.params;

  try {
    const result = await session.run(
      'MATCH (n:Node {id: $id}) DELETE n RETURN COUNT(n) AS deletedCount',
      { id }
    );

    const deletedCount = result.records[0].get('deletedCount').toNumber();

    if (deletedCount === 0) {
      return res.status(404).json({ message: `Node with ID ${id} not found` });
    }

    res.status(200).json({
      message: `Node with ID ${id} deleted successfully`,
    });
  } catch (error) {
    console.error('Error deleting node:', error);
    res.status(500).json({ message: 'Error deleting node', error: error.message });
  } finally {
    await session.close();
  }
};

module.exports = {
  createNode,
  getNodes,
  updateNode,
  deleteNode,
};
