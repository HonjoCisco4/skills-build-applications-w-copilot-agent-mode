import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import './config/database.js';
import apiRouter from './routes/api.js';
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
});
app.listen(port, () => {
    const codespaceName = process.env.CODESPACE_NAME;
    const baseUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${port}`;
    console.log(`OctoFit backend listening at ${baseUrl}`);
});
