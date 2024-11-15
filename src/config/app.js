import express from 'express';
import bodyParser from 'body-parser';
import routes from '../routes/index.js';

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api', routes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
