import mongoose from "mongoose";
import { DatabaseError } from "./utils/error.js";

const linkSchema = new mongoose.Schema({
    link: String,
    title: String,
    timestamp: Number
});

const Link = mongoose.model("Link", linkSchema);

const models = { Link };

const database = {
    connect: async () => {
        console.log("Connecting to database...");
        await mongoose
            .connect(process.env.DB_URL)
            .then(() => {
                console.log("Connected to database successfully");
            })
            .catch((error) => {
                console.log(
                    "Error while connecting to database",
                    error.message
                );
            });
    },
    disconnect: async () => {
        console.log("Disconnecting from database...");
        await mongoose
            .disconnect()
            .then(() => {
                console.log("Disconnected from database successfully");
            })
            .catch((error) => {
                console.log(
                    "Error while disconnecting from database",
                    error.message
                );
            });
    },
    query: async (fn, next) => {
        try {
            return await fn(models);
        } catch (error) {
            next(DatabaseError(error));
        }
    }
};

export default database;
