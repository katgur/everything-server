import express from 'express';
import database from './database.js';

const PORT = process.env.PORT;

const app = express();

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

export default app;