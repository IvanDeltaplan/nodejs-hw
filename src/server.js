import express from 'express';
import cors from 'cors';

import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';

import helmet from "helmet";
// import { Movie } from './models/movie.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import { errors } from "celebrate";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

// Підключення до MongoDB
await connectMongoDB();

const app = express();
const PORT = process.env.PORT || 3000;
// Глобальні middleware
app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
}));

app.use(authRoutes);

app.use(notesRoutes);

app.use(errors());
app.use(notFoundHandler);
app.use(errorHandler);


// Запуск сервера

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
