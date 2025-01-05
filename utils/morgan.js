import morgan from 'morgan';

morgan.token('response-body', (_req, res) =>
  JSON.stringify(res.__custombody__),
)

export default morgan;