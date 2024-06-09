import express, { Application } from 'express';

import { secretKeyValidator } from './middleware.js';
import router from './router.js';
import log from './services/redis/worker.js'

const app: Application = express();

app.use(secretKeyValidator);

app.use(express.urlencoded({ extended: true }));

app.get('/', async (_req, res) => {
  res.status(200).json({
    message: 'Welcome to the Analytics API',
  });
});



app.use('/api', router);

console.log(log());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
