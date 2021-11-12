import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import connectDB from './config/db.js';
import contentRoutes from './routes/contentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errHandler, notFound } from './middleware/error.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  })
);

app.get('/', (req, res) => {
  res.send('Geutda API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/contents', contentRoutes);

// custom handler for error
app.use(notFound);
app.use(errHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    colors.magenta.bold(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  )
);

export default server;
