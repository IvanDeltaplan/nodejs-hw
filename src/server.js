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
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
      },
    },
  }),
);

// Routes
app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

app.get('/notes/:noteId', (req, res) => {
  res.status(200).json({ message: 'Retrieved note by id' });
});

app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});

// 404 handler (after routes)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler (last)
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
