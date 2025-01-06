import morgan from 'morgan';

morgan.token('response-body', (_, res) =>
    res.statusCode === 200 ? null : JSON.stringify(res.__custombody__)
);

export default morgan;
