import driver from './config/db.js';

async function testConnection() {
  const session = driver.session();
  try {
    const result = await session.run('RETURN "Connection successful" AS message');
    console.log(result.records[0].get('message'));
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await session.close();
    await driver.close();
  }
}

testConnection();
