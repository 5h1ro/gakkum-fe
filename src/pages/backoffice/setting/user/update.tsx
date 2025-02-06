import { LoadingButton } from '@mui/lab';
import { Alert, Autocomplete, Button, Card, CardContent, IconButton, Snackbar, Stack, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { DatePicker, LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { RiArrowLeftLine, RiCloseLine } from '@remixicon/react';
import { Editor } from '@tinymce/tinymce-react';
import moment, { Moment } from 'moment';
import { Dispatch, useEffect, useRef, useState } from 'react';
import { Iconly } from 'react-iconly';
import { useNavigate, useParams } from 'react-router-dom';
import UseSwitchesCustom from '../../../../components/atoms/Switch';
import Layout from '../../../../components/Layout';
import { snackbarType } from '../../../../interfaces/snackbar.interface';
import { useGetDetailEmployeePengaturanQuery, useUpdateEmployeePengaturanMutation } from '../../../../api/setting.api';

interface updateEmployeeProps {
    showSnackBar: snackbarType
    setShowSnackbar: Dispatch<React.SetStateAction<snackbarType>>
}

export default function UpdateEmployee(props: updateEmployeeProps) {
    const [showSnackbarLocal, setShowSnackbarLocal] = useState<snackbarType>({
        isOpen: false,
        message: '',
        status: 'success'
    });
    const { showSnackBar, setShowSnackbar } = props;
    const navigate = useNavigate()
    const { employeeID } = useParams();
    const [isActive, setIsActive] = useState<boolean>(true)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [nip, setNIP] = useState('')
    const [phone, setPhone] = useState('')
    const [position, setPosition] = useState('')
    const [dob, setDOB] = useState<Moment | null>(null)
    const [pob, setPOB] = useState('')
    const [address, setAddress] = useState('')

    const [updateEmployee, { isLoading }] = useUpdateEmployeePengaturanMutation();
    const handleSave = async () => {
        const formData = new FormData();
        formData.append('id', employeeID!);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('nip', nip);
        formData.append('phone', phone);
        formData.append('position', position);
        formData.append('pob', pob);
        formData.append('dob', dob?.format('YYYY-MM-DD') ?? moment().format('YYYY-MM-DD'));
        formData.append('address', address);
        formData.append('is_active', `${isActive ? 1 : 0}`);
        formData.append('_method', 'PUT');
        try {
            await updateEmployee(formData).unwrap();
            setShowSnackbar({
                isOpen: true,
                message: 'Berhasil mengubah data',
                status: 'success'
            })
            navigate('/pengaturan/user')
        } catch (error: any) {
            if (error.data.message) {
                setShowSnackbarLocal({
                    isOpen: true,
                    message: error.data.message,
                    status: 'error'
                })
            } else {
                setShowSnackbarLocal({
                    isOpen: true,
                    message: 'Server error',
                    status: 'error'
                })
            }
        }
    }

    const { data: dataEmployee } = useGetDetailEmployeePengaturanQuery(employeeID!);
    useEffect(() => {
        if (dataEmployee) {
            setName(dataEmployee.data?.name ?? '')
            setEmail(dataEmployee.data?.user?.email ?? '')
            setNIP(dataEmployee.data?.nip ?? '')
            setPhone(dataEmployee.data?.phone ?? '')
            setPosition(dataEmployee.data?.position ?? '')
            setDOB(moment(dataEmployee.data?.dob ?? ''))
            setPOB(dataEmployee.data?.pob ?? '')
            setAddress(dataEmployee.data?.address ?? '')
            setIsActive(dataEmployee.data?.user?.is_active ?? false)
        }
    }, [dataEmployee]);
    return (
        <Layout>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={showSnackbarLocal.isOpen} autoHideDuration={6000} onClose={() => setShowSnackbar({ isOpen: false, message: '', status: 'error' })}>
                <Alert
                    onClose={() => setShowSnackbarLocal({ isOpen: false, message: '', status: 'error' })}
                    className={(showSnackbarLocal.status === 'success' ? 'bg-success-500' : 'bg-danger-500') + ' w-[85vw] md:w-[496px]'}
                    variant="filled"
                >
                    {showSnackbarLocal.message}
                </Alert>
            </Snackbar>
            <Grid2 container alignContent={'center'}>
                <IconButton onClick={() => navigate('/pengaturan/user')}>
                    <RiArrowLeftLine className="w-8 h-8" color="#000000" />
                </IconButton>
                <Typography className="w-10/12 text-4xl font-semibold text-base-dark pt-1">
                    Update User
                </Typography>
            </Grid2>
            <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1 }} marginTop={3}>
                <Grid2 className="bg-base-white rounded-lg" xs={12} sx={{
                    '.tox-tinymce': {
                        width: '100%',
                        marginTop: '8px'
                    },
                }}>
                    <Stack spacing={3} padding={2} className='m-6'>
                        <Grid2 container>
                            <Typography className="text-base-dark w-full">Nama <span className='text-danger-600'>*</span></Typography>
                            <TextField value={name} onChange={(data) => {
                                setName(data.target.value)
                            }} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Nama'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <Typography className="text-base-dark w-full">Email <span className='text-danger-600'>*</span></Typography>
                            <TextField value={email} onChange={(data) => {
                                setEmail(data.target.value)
                            }} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Email'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <Typography className="text-base-dark w-full">NIP <span className='text-danger-600'>*</span></Typography>
                            <TextField value={nip} onChange={(data) => {
                                setNIP(data.target.value)
                            }} variant="outlined" className='mt-2 w-full' placeholder='Masukkan NIP'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <Typography className="text-base-dark w-full">Nomor Telepon <span className='text-danger-600'>*</span></Typography>
                            <TextField value={phone} onChange={(data) => {
                                setPhone(data.target.value)
                            }} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Nomor Telepon'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <Typography className="text-base-dark w-full">Jabatan <span className='text-danger-600'>*</span></Typography>
                            <TextField value={position} onChange={(data) => {
                                setPosition(data.target.value)
                            }} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Jabatan'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <Typography className="text-base-dark w-full">Tempat Lahir <span className='text-danger-600'>*</span></Typography>
                            <TextField value={pob} onChange={(data) => {
                                setPOB(data.target.value)
                            }} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Tempat Lahir'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <Typography className="text-base-dark w-full">Tanggal Lahir<span className='text-danger-600'>*</span></Typography>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <MobileDateTimePicker
                                    ampm={false}
                                    value={dob}
                                    onChange={(data) => setDOB(data)}
                                    className='mt-2 w-full' />
                            </LocalizationProvider>
                        </Grid2>
                        <Grid2 container>
                            <Typography className="text-base-dark w-full">Alamat <span className='text-danger-600'>*</span></Typography>
                            <TextField value={address} onChange={(data) => {
                                setAddress(data.target.value)
                            }} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Alamat'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <UseSwitchesCustom isActive={isActive} setIsActive={setIsActive} />
                            <Typography className="text-base-dark self-center ml-2">Active?</Typography>
                        </Grid2>
                        {!isLoading && (
                            <Button onClick={handleSave} className='bg-primary-600 text-base-white hover:bg-primary-600 hover:text-base-white' >
                                Simpan
                            </Button>
                        )}
                        {isLoading && (
                            <LoadingButton
                                loading
                                loadingIndicator='Loading...'
                                variant="outlined"
                                className=''
                            >Loading...</LoadingButton>
                        )}
                    </Stack>
                </Grid2>
            </Grid2>
        </Layout>
    );
}