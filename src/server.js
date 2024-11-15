import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/index.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
