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
        const duplicated = await Link.findOne({ link: body.link });
        if (duplicated) {
            throw ({
                code: 400,
                message: "Duplicated link",
            });
        }

        const link = new Link({ id: crypto.randomUUID(), link: body.link, title: body.title, timestamp: Date.now() });
        await link.save();
        res.status(200);
    } catch (error) {
        if (error.code) {
            res.status(error.code);
            res.send(JSON.stringify({ message: error.message}));
        } else {
            console.log(error);
            res.status(500);
        }
    } finally {
        res.end();
    }
})

export default router;