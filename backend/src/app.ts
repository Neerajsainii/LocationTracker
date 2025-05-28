import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router as apiRouter } from './routes';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', apiRouter);

export default app; 