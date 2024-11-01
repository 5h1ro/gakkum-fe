import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";

import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Box, Button, Card, CardContent, Checkbox, FormControlLabel, IconButton, InputAdornment, Snackbar, Stack, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from "react";
import { snackbarType } from "../../interfaces/snackbar.interface";
import { useRecoilState } from "recoil";
import { showPasswordState } from "../../utils/recoil-state.util";

import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useLoginMutation } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [errorAccountMessage, setErrorAccountMessage] = useState<any>('');
    const [showPassword, setShowPassword] = useRecoilState(showPasswordState('password'));
    const [showSnackbar, setShowSnackbar] = useState<snackbarType>({
        isOpen: false,
        message: '',
        status: 'success'
    });
    const [loginAccount, { isLoading }] = useLoginMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/google', {
                token: credentialResponse.credential,
            });

            console.log(response.data.data);

            // Save token (e.g., in localStorage)
            // localStorage.setItem("token", response.data.token);
            alert("Login successful");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <GoogleOAuthProvider clientId="49338518240-h05l0si2q6kh1n6bbn2vrrai5mprrev0.apps.googleusercontent.com">

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={showSnackbar.isOpen} autoHideDuration={6000} onClose={() => setShowSnackbar({ isOpen: false, message: '', status: 'error' })}>
                <Alert
                    onClose={() => setShowSnackbar({ isOpen: false, message: '', status: 'error' })}
                    className={(showSnackbar.status === 'success' ? 'bg-success-500' : 'bg-danger-500') + ' w-[85vw] md:w-[496px]'}
                    variant="filled"
                >
                    {showSnackbar.message}
                </Alert>
            </Snackbar>
            <Box>
                <Grid container minHeight={'92vh'}>
                    <Grid container marginX={'auto'} marginY={'auto'}>
                        <Card sx={{ width: '750px', boxShadow: 'none' }} className='flex items-center justify-center md:h-[80.665vh]'>
                            <CardContent className='w-[78.668%]'>
                                <div className='w-full text-center'>
                                    <img
                                        src="/images/logo.png"
                                        alt="Psikotest"
                                        loading="lazy"
                                    />
                                </div>
                                <Typography align="center" className='text-[46px] font-semibold text-base-dark'>
                                    Masuk
                                </Typography>
                                <Typography align="center" className='text-base font-normal text-general-500'>
                                    Silahkan masukkan akun kamu disini
                                </Typography>
                                <Stack spacing={3}>
                                    <Alert onClose={() => setOpenAlert(false)} severity="error" sx={{ display: openAlert ? 'inherit' : 'none', boxShadow: 'none' }}>{errorAccountMessage}</Alert>
                                    <Stack>
                                        <Typography>
                                            Email <span className='text-danger-600'>*</span>
                                        </Typography>
                                        <TextField
                                            className='mt-2'
                                            autoFocus
                                            type="email"
                                            id="email"
                                            variant="outlined"
                                            placeholder='Masukkan Email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Stack>
                                    <Stack>
                                        <Typography>
                                            Password <span className='text-danger-600'>*</span>
                                        </Typography>
                                        <TextField
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            variant="outlined"
                                            placeholder='Masukkan Password'
                                            className='mt-2'
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => {
                                                                setShowPassword(!showPassword);
                                                            }}
                                                        >
                                                            {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Stack>
                                    <Grid container>
                                        <Grid>
                                            <FormControlLabel control={<Checkbox defaultChecked={isChecked} onChange={() => setIsChecked(!isChecked)} />} label="Simpan Password" />
                                        </Grid>
                                        <Grid mdOffset="auto" alignSelf={"center"} className='cursor-pointer' onClick={() => navigate('/lupa-password')}>
                                            <Typography className='text-primary-600' >
                                                Lupa Password?
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Button type="submit" className='text-lg text-base-white bg-primary-600 hover:bg-primary-700 font-medium rounded-xl p-4' variant="contained" onClick={() => navigate('/dashboard')}>
                                        Masuk
                                    </Button>

                                    <GoogleLogin
                                        onSuccess={handleGoogleLoginSuccess}
                                        onError={() => {
                                            console.log("Login Failed");
                                        }}
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container justifyContent={'center'} className='py-6 bg-base-white'>
                    <Typography fontSize={16} fontWeight={500} className='text-base-dark text-center px-2'>Copyright ©2024 Psikotes Gratis, All rights Reserved</Typography>
                </Grid>
            </Box>
        </GoogleOAuthProvider>
    );
}

export default Login