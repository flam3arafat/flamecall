import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import connectDB from './db/connect';
require('dotenv').config();

const router = express.Router();
import authRoutes from './routes/auth';
import contactRoutes from './routes/contact';


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader(
     'Access-Control-Allow-Methods',
     'OPTIONS, GET, POST, PUT, PATCH, DELETE'
   );
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
 });
 
 app.use('/auth', authRoutes);
 app.use('/crud', contactRoutes);
 
 app.use((error, req, res, next) => {
   console.log(error);
   const status = error.statusCode || 500;
   const message = error.message;
   const data = error.data;
   res.status(status).json({ message: message, data: data });
 });
 
 app.use("/", router);
 router.get('/', (req, res) => {
   res.json("PhoneApp server is listening...")
 });

const port = process.env.PORT || 3001;

const start = async () => {
    try {
       await connectDB(process.env.MONGO_URI)
      //  await connectDB(mongodb://mongodb:27017/docker-db)
       app.listen(port)
       console.log(`Server is listening on ${port}...`)
    } catch (error) {
       console.log(error) 
    }
}

start();