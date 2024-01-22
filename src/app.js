import express from 'express';
import cors from 'cors'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))// this is also contain a object

app.use(express.json({limit:"16kb"}))
// get data from user in terms of form or in header or pass value throgh postman
app.use(express.urlencoded({extended:true,limit:"16kb"}))// like if we getting url with %% than this will encode it


  
// routes import

import userRouter from './routes/user.routes.js'



//routes declaration

app.use("/users", userRouter)




export {app}