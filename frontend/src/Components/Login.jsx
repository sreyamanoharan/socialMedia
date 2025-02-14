import React, { useState } from 'react'
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

const navigate=useNavigate()

const handleSubmit=(e)=>{
  e.preventDefault()
   console.log('hiii',email);
   
  Axios.post('/login',{email,password}).then((res)=>{
    console.log(res.data.message,'jjjjjjjjj');
    console.log(res.data.user_id);
    localStorage.setItem('userId',res.data.user_id)
    navigate('/feed')
    
  })

}


  return (
    <>
  <CssBaseline />
      <Sheet
        sx={{
          width: 300,
          mx: 'auto', // margin left & right
          my: 19, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
        <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            // html input attribute
            name="email"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            // html input attribute
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </FormControl>
        <Button type='submit' sx={{ mt: 1 /* margin top */ }}>Login</Button>

        </form>
        <Typography
          endDecorator={<Link href="/register">Sign up</Link>}
          sx={{ fontSize: 'sm', alignSelf: 'center' }}
        >
          Don&apos;t have an account?
        </Typography>
      </Sheet>  
   </>
  )
}

export default Login