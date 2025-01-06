import express from "express";
import database from "./database.js";

const PORT = process.env.PORT;

const app = express();

function startHandler() {
    console.log(`Server listening on port ${PORT}`);
    database.connect();
}

app.listen(PORT, startHandler);

export default app;
