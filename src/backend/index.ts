// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import { register, login } from './controllers/authController';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/register', register);
app.post('/api/login', login);

app.listen(3001, () => console.log('Backend running on port 3001'));
