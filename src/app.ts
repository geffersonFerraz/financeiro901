import express from 'express';
import { appLogger, errorLogger } from './logger';
import router from './router';

import Telegram from './telegram';

const app = express();
const telegram = Telegram();

app.disable('etag');
app.use(express.json());
app.use(appLogger);
app.use(router);
app.use(errorLogger);

export default app;
