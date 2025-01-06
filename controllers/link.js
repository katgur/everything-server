import { Router } from "express";
import { ServerError } from "../utils/error.js";
import database from "../database.js";

const router = Router();

router.post("/", async function (req, _, next) {
    const { body } = req;

    const duplicated = await database.query(
        async ({ Link }) => await Link.findOne({ link: body.link }),
        next
    );
    if (duplicated) {
        next(ServerError(400, "Duplicated link"));
        return;
    }

    const result = await database.query(async ({ Link }) => {
        const link = new Link({
            link: body.link,
            title: body.title,
            timestamp: Date.now()
        });
        return await link.save();
    }, next);

    res.send(JSON.stringify({ message: "OK" }));
});

router.get("/", async function (_, res, next) {
    const all = await database.query(async ({ Link }) => {
        return await Link.find({});
    }, next);

    res.send(JSON.stringify(all));
});

export default router;
