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
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {

const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

const navigate=useNavigate()

const handleSubmit=(e)=>{
  e.preventDefault()
   console.log('hiii',email);
   
  Axios.post('/login',{email,password}).then((res)=>{
    console.log(res.data.message,'jjjjjjjjj');
    toast.error(res.data.message,'jjjjjjjjj');

    console.log(res.data.user._id);
    localStorage.setItem('userId',res.data.user._id)
    navigate('/feed')
    
  })

}


  return (
    <>
    <Toaster toastOptions={{duration:3000}}/>
  <CssBaseline />
      <Sheet
        sx={{
          width: 300,
          mx: 'auto', 
          my: 19, 
          py: 3, 
          px: 2, 
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
        <Button type='submit' sx={{ mt: 1}}>Login</Button>

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