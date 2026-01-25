import express from 'express';
import cors from 'cors';

import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';


// import { Movie } from './models/movie.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import { errors } from "celebrate";

// Підключення до MongoDB
await connectMongoDB();

const app = express();
const PORT = process.env.PORT || 3000;
// Глобальні middleware
app.use(logger);         // 1. Логер першим — бачить усі запити
app.use(express.json()); // 2. Парсинг JSON-тіла
app.use(cors());         // 3. Дозвіл для запитів з інших доменів

// Маршрути для нотатков

//app.use('/notes', notesRoutes);

// app.get('/notes/:noteId', async (req, res) => {
//   const { studentId } = req.params;
//   const student = await Student.findById(studentId);

//   if (!student) {
//     return res.status(404).json({ message: 'Student not found' });
//   }

//   res.status(200).json(student);
// });



// app.get('/movies', async (req, res, next) => {
//   try {
//     const movies = await Movie.find().limit(1);
//     res.status(200).json(movies);
//   } catch (err) {
//     next(err);
//   }
// });


// // Маршрут
// app.get('/notes', (req, res) => {
//   res.status(200).json({ message: 'Retrieved all notes' });
// });

// app.get('/notes/:noteId', (req, res) => {
//   const { noteId } = req.params;
//   res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
// });

// Маршрут для тестування middleware помилки
// app.get('/test-error', (req, res) => {
//   // Штучна помилка для прикладу
//   throw new Error('Simulated server error');
// });

app.use(notesRoutes);
app.use(errors());

// Middleware 404 (після всіх маршрутів)
app.use(notFoundHandler);

// Глобальний обробник помилок (повинен бути останнім middleware)
app.use(errorHandler);

// Запуск сервера

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
