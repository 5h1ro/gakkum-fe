import { Autocomplete, Card, IconButton, Stack, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { RiArrowLeftLine, RiCloseLine } from '@remixicon/react';
import { Editor } from '@tinymce/tinymce-react';
import moment, { Moment } from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UseSwitchesCustom from '../../../../components/atoms/Switch';
import Layout from '../../../../components/Layout';
import { useGetDetailEmployeePengaturanQuery } from '../../../../api/setting.api';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export default function DetailEmployee() {
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
            <Grid2 container alignContent={'center'}>
                <IconButton onClick={() => navigate('/pengaturan/user')}>
                    <RiArrowLeftLine className="w-8 h-8" color="#000000" />
                </IconButton>
                <Typography className="w-10/12 text-4xl font-semibold text-base-dark pt-1">
                    Detail User
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
                            <TextField value={name} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Nama'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <Typography className="text-base-dark w-full">Email <span className='text-danger-600'>*</span></Typography>
                            <TextField value={email} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Email'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <Typography className="text-base-dark w-full">NIP <span className='text-danger-600'>*</span></Typography>
                            <TextField value={nip} variant="outlined" className='mt-2 w-full' placeholder='Masukkan NIP'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <Typography className="text-base-dark w-full">Nomor Telepon <span className='text-danger-600'>*</span></Typography>
                            <TextField value={phone} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Nomor Telepon'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <Typography className="text-base-dark w-full">Jabatan <span className='text-danger-600'>*</span></Typography>
                            <TextField value={position} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Jabatan'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <Typography className="text-base-dark w-full">Tempat Lahir <span className='text-danger-600'>*</span></Typography>
                            <TextField value={pob} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Tempat Lahir'
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
                                    className='mt-2 w-full' />
                            </LocalizationProvider>
                        </Grid2>
                        <Grid2 container>
                            <Typography className="text-base-dark w-full">Alamat <span className='text-danger-600'>*</span></Typography>
                            <TextField value={address} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Alamat'
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
                    </Stack>
                </Grid2>
            </Grid2>
        </Layout>
    );
}