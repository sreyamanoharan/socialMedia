import express from 'express'
import cors from 'cors'
import mysql from 'mysql'
import userRoute from './Routes/UserRoute.js'

const app=express()
app.use(express.json())
app.use(cors())
app.use('/',userRoute)

app.listen(3000,()=>{
    console.log('server is running');
    
})

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'sreya@345',
    database:'social'
});

db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err);
    } else {
      console.log('MySQL Database connected successfully!');
    }
  });
  
  export default db;