import 'dotenv/config';

import { json } from 'express';
import app from './app.js';
import link from './controllers/link.js';
import cors from 'cors';
import morgan from './utils/morgan.js';
import { extractCustomBodyMiddleware } from './utils/extractCustomBodyMiddleware.js';

app.use(cors());
app.use(json());
app.use(extractCustomBodyMiddleware());
app.use(morgan(':method :url :status :response-body :response-time ms'));

app.use('/link', link);
