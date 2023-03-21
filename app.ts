import express, { Application, Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import { config } from 'dotenv';
import messageRoutes from './src/routes/messageRutas';
import authRoutes from './src/routes/authRoutes';
import swagger from './swagger';
import http from 'http';

config();

const app: Application = express();
const { PORT = 3000 } = process.env;

app.use(json());
app.use('/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const server = http.createServer(app);
swagger(app);

server.on('error', (err: Error) => {
  console.error(`Error: ${err.message}`);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});