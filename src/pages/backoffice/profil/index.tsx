import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, Avatar, Button, IconButton, InputAdornment, Snackbar, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { RiLockLine, RiUserSettingsLine } from '@remixicon/react';
import { useEffect, useRef, useState } from 'react';
import { Edit } from 'react-iconly';
import { useRecoilState } from 'recoil';
import moment, { Moment } from 'moment';
import Layout from '../../../components/Layout';
import { snackbarType } from '../../../interfaces/snackbar.interface';
import { showConfirmationNewPasswordState, showNewPasswordState, showPasswordState } from '../../../utils/recoil-state.util';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useGetUserMutation, useUpdateUserMutation, useUpdateUserPasswordMutation } from '../../../api/setting.api';


const Profil = () => {
    const [isChangePassword, setIsChangePassword] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [selectedFile, setSelectedFile] = useState()
    const [avatar, setAvatar] = useState('')
    const imageRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<any>()
    const [showSnackbar, setShowSnackbar] = useState<snackbarType>({
        isOpen: false,
        message: '',
        status: 'success'
    });

    const handleChangeImage = (event: any) => {
        const fileObject = event.target.files[0];
        setSelectedFile(fileObject)
    };
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const [user] = useGetUserMutation();
    const showOpenFileDialog = () => {
        imageRef.current?.click();
    };
    const getProfil = () => user().unwrap().then((data: any) => {
        setName(data.data.name ?? '')
        setEmail(data.data.email ?? '')
        setAvatar(data.data.image_path ?? '')
    }).catch((error: any) => {
        if (error.data.message) {
            setShowSnackbar({
                isOpen: true,
                message: error.data.message,
                status: 'error'
            })
        } else {
            setShowSnackbar({
                isOpen: true,
                message: 'Server error',
                status: 'error'
            })
        }
    })

    const [updateUser, { isLoading }] = useUpdateUserMutation();
    const onSubmit = async () => {
        try {
            const data = new FormData();
            data.append('name', name);
            data.append('email', email);
            await updateUser(data).unwrap();
            await getProfil()
            setShowSnackbar({
                isOpen: true,
                message: "Berhasil mengubah data",
                status: 'success'
            })
        } catch (error: any) {
            await getProfil()
            if (error.data.message) {
                setShowSnackbar({
                    isOpen: true,
                    message: error.data.message,
                    status: 'error'
                })
            } else {
                setShowSnackbar({
                    isOpen: true,
                    message: 'Server error',
                    status: 'error'
                })
            }
        }
    };


    const [updatePassword] = useUpdateUserPasswordMutation();
    const onSubmitChangePassword = async () => {
        try {
            const data = {
                old_password: oldPassword,
                new_password: newPassword,
                password_confirmation: passwordConfirmation,
            }
            await updatePassword(data).unwrap();
            setShowSnackbar({
                isOpen: true,
                message: "Berhasil mengubah data",
                status: 'success'
            })
        } catch (error: any) {
            if (error.data.message) {
                setShowSnackbar({
                    isOpen: true,
                    message: error.data.message,
                    status: 'error'
                })
            } else {
                setShowSnackbar({
                    isOpen: true,
                    message: 'Server error',
                    status: 'error'
                })
            }
        }
    };

    const [showPassword, setShowPassword] = useRecoilState(showPasswordState('password'));
    const [showNewPassword, setShowNewPassword] = useRecoilState(showNewPasswordState('password'));
    const [showConfirmationNewPassword, setShowConfirmationNewPassword] = useRecoilState(showConfirmationNewPasswordState('password'));

    useEffect(() => {
        getProfil()
    }, [])

    return (
        <Layout>
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
            <Grid2 container justifyContent={'space-between'}>
                <Grid2 container alignContent={'center'}>
                    <Typography className="text-3xl font-semibold text-base-dark mt-[-2px] md:mt-1 md:text-4xl">
                        Profil Saya
                    </Typography>
                </Grid2>
            </Grid2>

            <Grid2 container marginTop={3}>
                <Grid2 className="bg-base-white rounded-lg py-[30px]" xs={12} container>
                    <Grid2 container justifyContent={'center'} className='w-3/12 h-32 hidden md:flex'>
                        <Grid2 container justifyContent={'center'} className='w-full'>
                            {selectedFile || avatar
                                ?
                                <Grid2 className="relative rounded-full h-[150px] w-[150px] overflow-hidden">
                                    <img
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
                                        src={preview ?? avatar}
                                    />
                                </Grid2>
                                : <Avatar sx={{ bgcolor: '#EBFFFD', color: '#3c7d21', zIndex: '0' }} className='font-semibold w-[150px] h-[150px] text-5xl'>{name!.split(' ').map((val, index) => { if (index < 2) return val.charAt(0).toUpperCase() })}</Avatar>

                            }
                        </Grid2>
                        <Typography className='mt-6 font-semibold text-2xl text-base-dark w-full text-center'>{name}</Typography>
                        <Typography className='mt-1 font-normal text-sm text-general-500 w-full text-center break-words px-6'>{email}</Typography>

                        <Button className={`${!isChangePassword ? 'bg-primary-600 text-base-white hover:bg-primary-600' : 'bg-base-white text-general-500 hover:bg-base-white'} w-full rounded-lg h-16 mx-6 gap-2 mt-6`} onClick={() => setIsChangePassword(false)
                        }>
                            <RiUserSettingsLine /> Pengaturan Profil
                        </Button>

                        <Button className={`${isChangePassword ? 'bg-primary-600 text-base-white hover:bg-primary-600' : 'bg-base-white text-general-500 hover:bg-base-white'} w-full rounded-lg h-16 mx-6 gap-2 mt-6`} onClick={() => setIsChangePassword(true)
                        }>
                            <RiLockLine /> Ubah Password
                        </Button>
                    </Grid2>
                    <Grid2 container justifyContent={'center'} className='w-full pt-[30px] px-6 md:hidden'>
                        <Grid2 container justifyContent={'center'} className='w-full'>
                            {selectedFile || avatar
                                ? <Grid2 className="relative rounded-full h-[150px] w-[150px] overflow-hidden">
                                    <img
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
                                        src={preview ?? avatar}
                                    />
                                </Grid2>
                                : <Avatar sx={{ bgcolor: '#EBFFFD', color: '#3c7d21', zIndex: '0' }} className='font-semibold w-[150px] h-[150px] text-5xl'>{name!.split(' ').map((val, index) => { if (index < 2) return val.charAt(0).toUpperCase() })}</Avatar>
                            }
                        </Grid2>
                        <Typography className='mt-6 font-semibold text-2xl text-base-dark w-full text-center'>{name}</Typography>
                        <Typography className='mt-1 font-normal text-sm text-general-500 w-full text-center'>{email}</Typography>

                        <Button className={`${!isChangePassword ? 'bg-primary-600 text-base-white hover:bg-primary-600' : 'bg-base-white text-general-500 hover:bg-base-white'} w-full rounded-lg h-16 mx-6 gap-2 mt-6`} onClick={() => setIsChangePassword(false)
                        }>
                            <RiUserSettingsLine /> Pengaturan Profil
                        </Button>

                        <Button className={`${isChangePassword ? 'bg-primary-600 text-base-white hover:bg-primary-600' : 'bg-base-white text-general-500 hover:bg-base-white'} w-full rounded-lg h-16 mx-6 gap-2 mt-6`} onClick={() => setIsChangePassword(true)
                        }>
                            <RiLockLine /> Ubah Password
                        </Button>
                        <Typography className='font-semibold text-2xl text-base-dark w-full hidden md:flex'>Pengaturan Profil</Typography>
                        <Grid2 container justifyContent={'center'} className='w-full hidden md:flex'>
                            <Avatar sx={{ bgcolor: '#EBFFFD', color: '#3c7d21' }} className='font-semibold w-[150px] h-[150px] text-5xl'>{name!.split(' ').map((val, index) => { if (index < 2) return val.charAt(0).toUpperCase() })}</Avatar>
                        </Grid2>
                    </Grid2>
                    <Grid2 hidden={isChangePassword} container justifyContent={'center'} className='w-full md:w-9/12 pt-[30px] px-6'>
                        <Typography className='font-semibold text-2xl text-base-dark w-full'>Pengaturan Profil</Typography>
                        <Grid2 container justifyContent={'center'} className='w-full mt-6'>
                            <Grid2>
                                {selectedFile || avatar
                                    ? <Grid2 className="relative rounded-full h-[150px] w-[150px] overflow-hidden">
                                        <img
                                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
                                            src={preview ?? avatar}
                                        />
                                    </Grid2>
                                    : <Avatar sx={{ bgcolor: '#EBFFFD', color: '#3c7d21', zIndex: '0' }} className='font-semibold w-[150px] h-[150px] text-5xl'>{name!.split(' ').map((val, index) => { if (index < 2) return val.charAt(0).toUpperCase() })}</Avatar>

                                }
                                <input
                                    ref={imageRef}
                                    type="file"
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    onChange={handleChangeImage}
                                />
                            </Grid2>
                        </Grid2>
                        <Grid2 container className='w-full mt-6'>
                            <Typography className="text-base-dark w-full">Nama Lengkap <span className='text-danger-600'>*</span></Typography>
                            <TextField value={name} onChange={(data) => setName(data.target.value)} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Nama Lengkap'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container className='w-full mt-6'>
                            <Typography className="text-base-dark w-full">Email <span className='text-danger-600'>*</span></Typography>
                            <TextField value={email} disabled variant="outlined" className='mt-2 w-full' placeholder='Masukkan Email'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        {!isLoading && (
                            <Button className={"w-36 bg-primary-600 text-base-white rounded-lg hover:bg-primary-600 h-16 mx-6 gap-2 mt-6"} onClick={async () => await onSubmit()}>
                                Ubah Profil
                            </Button>
                        )}
                        {isLoading && (
                            <div className='mt-6'>
                                <LoadingButton
                                    loading
                                    loadingIndicator='Loading...'
                                    variant="outlined"
                                    className='w-36 rounded-lg h-16 mx-6 gap-2"'
                                >Loading...</LoadingButton>
                            </div>
                        )}
                    </Grid2>
                    <Grid2 hidden={!isChangePassword} container justifyContent={'center'} className='w-full md:w-9/12 pt-[30px] px-6'>
                        <Typography className='font-semibold text-2xl text-base-dark w-full hidden md:flex'>Ubah Password</Typography>
                        <Grid2 container className='w-full mt-6'>
                            <Typography className="text-base-dark w-full">Password Lama <span className='text-danger-600'>*</span></Typography>
                            <TextField onChange={(data) => setOldPassword(data.target.value)} type={showPassword ? "text" : "password"} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Password Lama'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    },
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
                                }} />
                        </Grid2>
                        <Grid2 container className='w-full mt-6'>
                            <Typography className="text-base-dark w-full">Password Baru <span className='text-danger-600'>*</span></Typography>
                            <TextField onChange={(data) => setNewPassword(data.target.value)} type={showNewPassword ? "text" : "password"} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Password Baru'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => {
                                                    setShowNewPassword(!showNewPassword);
                                                }}
                                            >
                                                {showNewPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }} />
                        </Grid2>
                        <Grid2 container className='w-full mt-6'>
                            <Typography className="text-base-dark w-full">Konfirmasi Password Baru <span className='text-danger-600'>*</span></Typography>
                            <TextField onChange={(data) => setPasswordConfirmation(data.target.value)} type={showConfirmationNewPassword ? "text" : "password"} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Konfirmasi Password Baru'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => {
                                                    setShowConfirmationNewPassword(!showConfirmationNewPassword);
                                                }}
                                            >
                                                {showConfirmationNewPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }} />
                        </Grid2>
                        {!isLoading && (
                            <Button className={"w-36 bg-primary-600 text-base-white rounded-lg hover:bg-primary-600 h-16 mx-6 gap-2 mt-6"} onClick={async () => await onSubmitChangePassword()}>
                                Ubah Password
                            </Button>
                        )}
                        {isLoading && (
                            <div className='mt-6'>
                                <LoadingButton
                                    loading
                                    loadingIndicator='Loading...'
                                    variant="outlined"
                                    className='w-36 rounded-lg h-16 mx-6 gap-2'
                                >Loading...</LoadingButton>
                            </div>
                        )}
                    </Grid2>
                </Grid2>
            </Grid2>
        </Layout>
    );
};

export default Profil;
