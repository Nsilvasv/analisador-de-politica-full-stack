import express from 'express';
import { configDotenv } from 'dotenv';
configDotenv(); 

import cors from 'cors';

import rotasPolitica from './routes/politicaRouter.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/politicas', rotasPolitica);


app.listen(3000, () => {
  console.log('Server rodando na porta 3000');
});