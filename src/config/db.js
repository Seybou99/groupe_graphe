import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Logs pour vérifier si les variables sont chargées
console.log('NEO4J_URI:', process.env.NEO4J_URI);
console.log('NEO4J_USERNAME:', process.env.NEO4J_USERNAME);
console.log('NEO4J_PASSWORD:', process.env.NEO4J_PASSWORD);

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

export default driver;
