import 'dotenv/config'

import express from 'express';
import database from './database.js';
import link from './controllers/link.js';
import cors from 'cors';

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

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