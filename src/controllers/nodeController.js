const driver = require('../config/db'); // Connexion à Neo4j

// Create
const createNode = async (req, res) => {
  const { label, properties } = req.body;
  const session = driver.session();
  
  try {
    const result = await session.run(
      `CREATE (n:${label} $properties) RETURN n`,
      { properties }
    );
    res.status(201).send({ message: 'Node created', node: result.records[0].get('n') });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to create node' });
  } finally {
    await session.close();
  }
};

// Read
const getAllNodes = async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(`MATCH (n) RETURN n`);
    const nodes = result.records.map(record => record.get('n').properties);
    res.status(200).send({ nodes });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to fetch nodes' });
  } finally {
    await session.close();
  }
};

// Update
const updateNode = async (req, res) => {
  const { id } = req.params;
  const { properties } = req.body;
  const session = driver.session();

  try {
    const result = await session.run(
      `MATCH (n) WHERE id(n) = $id SET n += $properties RETURN n`,
      { id: parseInt(id), properties }
    );
    res.status(200).send({ message: 'Node updated', node: result.records[0].get('n') });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to update node' });
  } finally {
    await session.close();
  }
};

// Delete
const deleteNode = async (req, res) => {
  const { id } = req.params;
  const session = driver.session();

  try {
    await session.run(`MATCH (n) WHERE id(n) = $id DELETE n`, { id: parseInt(id) });
    res.status(200).send({ message: 'Node deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to delete node' });
  } finally {
    await session.close();
  }
};

module.exports = { createNode, getAllNodes, updateNode, deleteNode };
