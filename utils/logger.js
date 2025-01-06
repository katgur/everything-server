import morgan from "morgan";

morgan.token("response-body", (_, res) =>
    res.statusCode === 200 ? null : JSON.stringify(res.__custombody__)
);

const logger = () =>
    morgan(":method :url :status :response-body :response-time ms");

export default logger;
