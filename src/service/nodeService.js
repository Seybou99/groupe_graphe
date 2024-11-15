import driver from '../config/db.js';

// Function to create a node
export const createNode = async (id, name, type) => {
  const session = driver.session();
  try {
    const result = await session.run(
      'CREATE (n:Node {id: $id, name: $name, type: $type}) RETURN n',
      { id, name, type }
    );
    return result.records[0].get('n').properties;
  } finally {
    await session.close();
  }
};

// Function to get all nodes
export const getNodes = async () => {
  const session = driver.session();
  try {
    const result = await session.run('MATCH (n:Node) RETURN n');
    return result.records.map(record => record.get('n').properties);
  } finally {
    await session.close();
  }
};

// Function to update a node
export const updateNode = async (id, name, type) => {
  const session = driver.session();
  try {
    const result = await session.run(
      'MATCH (n:Node {id: $id}) SET n.name = $name, n.type = $type RETURN n',
      { id, name, type }
    );
    if (result.records.length === 0) return null;
    return result.records[0].get('n').properties;
  } finally {
    await session.close();
  }
};

// Function to delete a node
export const deleteNode = async (id) => {
  const session = driver.session();
  try {
    const result = await session.run(
      'MATCH (n:Node {id: $id}) DELETE n RETURN COUNT(n) AS deletedCount',
      { id }
    );
    return result.records[0].get('deletedCount').toNumber();
  } finally {
    await session.close();
  }
};
