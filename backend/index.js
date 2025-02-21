import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoute from './Routes/UserRoute.js'

const app=express()
app.use(express.json())
app.use(cors())
app.use('/',userRoute)

app.listen(3000,()=>{
    console.log('server is running');
    
})

mongoose.connect('mongodb://localhost:27017/socialMedia').then((res)=>{
  console.log('db connected');
  
})