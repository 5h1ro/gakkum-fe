import { Autocomplete, Card, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { RiArrowLeftLine, RiCloseLine } from '@remixicon/react';
import { Editor } from '@tinymce/tinymce-react';
import moment, { Moment } from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UseSwitchesCustom from '../../../../components/atoms/Switch';
import Layout from '../../../../components/Layout';
import { useGetDetailCompanyPengaturanQuery, useGetProvincePengaturanQuery, useLazyGetCityPengaturanQuery, useLazyGetDistrictPengaturanQuery, useLazyGetPostalCodePengaturanQuery, useLazyGetVillagePengaturanQuery } from '../../../../api/setting.api';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export default function DetailCompany() {
    const navigate = useNavigate()
    const { employeeID } = useParams();

    const { data: dataProvince } = useGetProvincePengaturanQuery();
    const [lazyCity] = useLazyGetCityPengaturanQuery();
    const [dataCity, setDataCity] = useState<any[]>([])
    const getCity = async (id: string) => {
        const city = await lazyCity(id).unwrap();
        setDataCity(city?.data ?? []);
    }
    const [lazyDistrict] = useLazyGetDistrictPengaturanQuery();
    const [dataDistrict, setDataDistrict] = useState<any[]>([])
    const getDistrict = async (id: string) => {
        const district = await lazyDistrict(id).unwrap();
        setDataDistrict(district?.data ?? []);
    }
    const [lazyVillage] = useLazyGetVillagePengaturanQuery();
    const [dataVillage, setDataVillage] = useState<any[]>([])
    const getVillage = async (id: string) => {
        const village = await lazyVillage(id).unwrap();
        setDataVillage(village?.data ?? []);
    }
    const [lazyPostalCode] = useLazyGetPostalCodePengaturanQuery();
    const [dataPostalCode, setDataPostalCode] = useState<any[]>([])
    const getPostalCode = async (id: string) => {
        const postalCode = await lazyPostalCode(id).unwrap();
        setDataPostalCode(postalCode?.data ?? []);
    }

    const [isActive, setIsActive] = useState<boolean>(true)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [address, setAddress] = useState('')
    const [province, setProvince] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [village, setVillage] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [picName, setPicName] = useState('')
    const [picPosition, setPicPosition] = useState('')

    const { data: dataCompany } = useGetDetailCompanyPengaturanQuery(employeeID!);
    useEffect(() => {
        if (dataCompany) {
            setName(dataCompany.data?.name ?? '')
            setEmail(dataCompany.data?.email ?? '')
            setNumber(dataCompany.data?.number ?? '')
            setAddress(dataCompany.data?.address ?? '')
            setProvince(dataCompany.data?.province?.name ?? '')
            setCity(dataCompany.data?.city?.name ?? '')
            setDistrict(dataCompany.data?.district?.name ?? '')
            setVillage(dataCompany.data?.village?.name ?? '')
            setPostalCode(dataCompany.data?.postal_code ?? '')
            setPicName(dataCompany.data?.pic_name ?? '')
            setPicPosition(dataCompany.data?.pic_position ?? '')
            setIsActive(dataCompany.data?.is_active ?? false)
        }
    }, [dataCompany]);

    return (
        <Layout>
            <Grid2 container alignContent={'center'}>
                <IconButton onClick={() => navigate('/pengaturan/perusahaan')}>
                    <RiArrowLeftLine className="w-8 h-8" color="#000000" />
                </IconButton>
                <Typography className="w-10/12 text-4xl font-semibold text-base-dark pt-1">
                    Detail Perusahaan
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
                            <Typography className="text-base-dark w-full">Nomor Telepon <span className='text-danger-600'>*</span></Typography>
                            <TextField value={number} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Nomor Telepon'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
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
                        <Grid2 container xs={12} mt={'1rem'}>
                            <Typography className="text-base-dark w-full">Provinsi <span className='text-danger-600'>*</span></Typography>
                            <TextField value={province} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Alamat'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container xs={12} mt={'1rem'}>
                            <Typography className="text-base-dark w-full">Kota <span className='text-danger-600'>*</span></Typography>
                            <TextField value={city} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Alamat'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container xs={12} mt={'1rem'}>
                            <Typography className="text-base-dark w-full">Kecamatan <span className='text-danger-600'>*</span></Typography>
                            <TextField value={district} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Alamat'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container xs={12} mt={'1rem'}>
                            <Typography className="text-base-dark w-full">Desa <span className='text-danger-600'>*</span></Typography>
                            <TextField value={village} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Alamat'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container xs={12} mt={'1rem'}>
                            <Typography className="text-base-dark w-full">Kode Pos <span className='text-danger-600'>*</span></Typography>
                            <TextField value={postalCode} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Alamat'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <Typography className="text-base-dark w-full">Nama PIC <span className='text-danger-600'>*</span></Typography>
                            <TextField value={picName} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Nama PIC'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <Typography className="text-base-dark w-full">Jabatan PIC <span className='text-danger-600'>*</span></Typography>
                            <TextField value={picPosition} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Jabatan PIC'
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