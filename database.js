import mongoose, { disconnect } from "mongoose";

const database = {
    connect: async () => {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log('Connected to database successfully');
        })
        .catch((error) => {
            console.log("Error while connecting to database", error.message);
        })
    },
    disconnect: async () => {
        console.log('Disconnecting from database...');
        await mongoose.disconnect()
        .then(() => {
            console.log('Disconnected from database successfully');
        })
        .catch((error) => {
            console.log("Error while disconnecting from database", error.message);
        })
    }
}

export default database;