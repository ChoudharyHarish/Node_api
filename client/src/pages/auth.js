import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField, InputAdornment, IconButton } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";


const initialState = { firstName: '', lastName: '', phoneNumber: '', password: '', confirmPassword: '' };



const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={name === 'password' ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            } : null}
        />
    </Grid>
);


const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);
    const navigate = useNavigate();
    // const   = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (isSignup) {
            try {
                const res = await axios.post('https://node-api17.vercel.app/api/v1/user/add-user',{...form,name : form.firstName + " " + form.lastName})
                if(res.data?.msg){
                    console.log(res);
                    alert(res.data.msg);
                    return;
                }
                localStorage.setItem('profile', res?.data.token);
                localStorage.setItem('user', JSON.stringify({name:res?.data.name}));
              } catch (e) {
                console.log(e)
                alert(e?.response.data.msg)
                return;
              }
        } else {
            try {
                const res = await axios.post('https://node-api17.vercel.app/api/v1/user/login-user',{...form,name : form.firstName + " " + form.lastName})
                if(res.data?.msg){
                    alert(res.data.msg);
                    return;
                }
                localStorage.setItem('profile', res?.data.token);
                localStorage.setItem('user', JSON.stringify({name:res?.data.name}));
              } catch (e) {
                alert(e?.response.data.msg)
                return
              }
        }
        navigate("/home");
    };




    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <Container className='h-screen items-center mt-4' component="main" maxWidth="xs" style={{ display: "flex", justifyContent: "center" }}  >
            <Paper className='flex flex-col justify-center items-center p-8' elevation={6}>
                <Avatar className='my-2' style={{ backgroundColor: '#6c7ae0' }} >
                    <LockOutlinedIcon className='' />
                </Avatar>
                <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                <form className='mt-4' onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="phoneNumber" label="Your Phone Number" handleChange={handleChange} type="text" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" className='mt-4' style={{marginTop:'1rem',  backgroundColor: '#6c7ae0' }}  >
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode} style={{ color: '#6c7ae0', marginTop:'1rem' }} >
                                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;