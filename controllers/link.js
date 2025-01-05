import { Schema, model } from "mongoose";
import { Router } from "express";
import { ServerError } from "../utils/error.js";

const router = Router();

const linkSchema = new Schema({
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
            throw ServerError(400, 'Duplicated link');
        }

        const link = new Link({ link: body.link, title: body.title, timestamp: Date.now() });
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

router.get('/', async function(_, res) {
    try {
        const all = await Link.find({});
        res.send(JSON.stringify(all));
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