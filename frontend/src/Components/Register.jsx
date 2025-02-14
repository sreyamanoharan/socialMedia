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
import { Toaster, toast } from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [Err, setErr] = useState(null);

    const navigate = useNavigate();

    // Validation regex
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    const nameRegex = /^[a-zA-Z]+$/;

    const clearForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErr(null);
    };

    const validate = (e) => {
        e.preventDefault(); // Prevent form submission

        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setErr('Fill all the fields');
            toast.error('Fill all the fields');
            return;
        }
        if (!nameRegex.test(name)) {
            setErr('Invalid name format. Only letters are allowed.');
            toast.error('Invalid name format. Only letters are allowed.');
            return;
        }
        if (!passwordRegex.test(password)) {
            setErr('Use a stronger password (at least 6 characters, 1 letter & 1 number)');
            toast.error('Use a stronger password');
            return;
        }
        if (password !== confirmPassword) {
            setErr('Passwords do not match');
            toast.error('Passwords do not match');
            return;
        }

        setErr(null); // Clear error
        handleSubmit();
    };

    const handleSubmit = () => {
        Axios.post('/register', { name, email, password })
            .then((res) => {
                if (res.data?.message) {
                    toast.success(res.data.message);
                } else {
                    toast.success('Registration successful!');
                }
                clearForm();
                navigate('/');
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || 'Something went wrong');
            });
    };

    return (
        <>
            <Toaster toastOptions={{ duration: 3000 }} />
            <CssBaseline />
            <Sheet
                sx={{
                    width: 300,
                    mx: 'auto',
                    my: 15,
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
                    <Typography level="body-sm">Register Here</Typography>
                </div>
                <form onSubmit={validate}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            name="name"
                            type="text"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            name="email"
                            type="email"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            name="confirmPassword"
                            type="password"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </FormControl>
                    <Button type="submit" sx={{ mt: 1 }}>
                        Sign up
                    </Button>
                </form>
                <Typography endDecorator={<Link href="/">Login</Link>} sx={{ fontSize: 'sm', alignSelf: 'center' }}>
                    Already have an account?
                </Typography>
            </Sheet>
        </>
    );
};

export default Register;
