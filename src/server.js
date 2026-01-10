import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';
import helmet from 'helmet';
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);



// src/server.js




// Логування часу
app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

// Маршрут
app.get('/notes', (req, res) => {
  res.status(200).json({ "message": "Retrieved all notes"});
});

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ id: noteId, message: `Retrieved note with ID: ${noteId}` });
});


app.get('/test-error', (req, res) => {
  // Штучна помилка для прикладу
  throw new Error('Simulated server error');
});



// Middleware 404 (після всіх маршрутів)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});
// Middleware для парсингу JSON
app.use(express.json());

app.post('/users', (req, res) => {
  console.log(req.body); // тепер тіло доступне як JS-об’єкт
  res.status(201).json({ message: 'User created' });
});

// Маршрут для тестування middleware помилки
app.get('/test-error', (req, res) => {
  // Штучна помилка для прикладу
  throw new Error('Something went wrong');
});
// Глобальний обробник помилок
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message,
  });
});





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

