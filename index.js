import 'dotenv/config'

import express from 'express';
import database from './database.js';
import link from './controllers/link.js';
import cors from 'cors';
import morgan from 'morgan';

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status - :response-time ms'));

app.use('/link', link)

function startHandler() {
  console.log(`Server listening on port ${PORT}`);
  database.connect();
}

async function exitHandler() {
  await database.disconnect();
  process.exit();
}

app.listen(PORT, startHandler);
process.on('SIGINT', exitHandler.bind(null));
process.on('uncaughtException', exitHandler.bind(null));