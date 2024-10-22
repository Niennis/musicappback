import express from 'express';
import routes from './routes/routes.js'
import cors from 'cors';
import 'dotenv/config';

const PORT = 3020

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', routes)

app.listen(PORT)
console.log(`Escuchando el puerto ${PORT}`);