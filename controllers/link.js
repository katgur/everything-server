import { Schema, model } from "mongoose";
import { Router } from "express";

const router = Router();

const linkSchema = new Schema({
    id: String,
    link: String,
    title: String,
    timestamp: Number,
});
const Link = model('Link', linkSchema);

router.post('/', async function (req, res) {
    const { body } = req;

    try {
        const link = new Link({ id: crypto.randomUUID(), link: body.link, title: body.title, timestamp: Date.now() });
        await link.save();
        res.status(200);
    } catch (error) {
        console.log(error);
        res.status(500);
    } finally {
        res.end();
    }
})

export default router;