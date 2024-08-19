import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFoundRoute from './app/Middleware/noRouteFound';
import globalErrorHandler from './app/Middleware/globalErrorHandler';
import router from './app/Routes';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use('/', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to SportFlex E-commerce website');
});

app.use(globalErrorHandler);
app.use(notFoundRoute);
export default app;
