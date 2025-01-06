export const errorHandlingMiddleware = () => (error, _, res, next) => {
    if (error.type === "server") {
        res.status(error.code).send(JSON.stringify({ message: error.message }));
    } else if (error.type === "database") {
        console.error("Database error", error);
        res.status(500).send(
            JSON.stringify({ message: "Internal Server Error" })
        );
    } else {
        console.error(error.message);
        res.status(500).send(
            JSON.stringify({ message: "Internal Server Error" })
        );
    }
    next(error);
};
