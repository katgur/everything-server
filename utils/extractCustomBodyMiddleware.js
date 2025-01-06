export function extractCustomBodyMiddleware() {
    return function (_, res, next) {
        const originalSend = res.app.response.send;
        res.app.response.send = function sendWithCustomBody(body) {
            originalSend.call(this, body);
            this.__custombody__ = body;
        };

        next();
    };
}
