import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import mainRoutes from './routes/mainRoutes';

dotenv.config();

const app = express();

app.use(mainRoutes);
app.use('/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`)
});