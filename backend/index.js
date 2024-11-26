//Packages 
import path from 'path';
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

//Utiles
import connectdb from './config/db.js';
import userRoutes from './routes/userRoutes.js'


dotenv.config();
const port = process.env.PORT || 8000;

connectdb()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended :true}))
app.use(cookieParser());


app.use("/api/users", userRoutes);

app.listen(port, ()=> console.log(`Server is running on port: ${port}`))