import express from 'express';
import cors from 'cors';
import { register, login } from '@/backend/controllers/authController';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

app.listen(3001, () => console.log('Backend running on port 3001'));
