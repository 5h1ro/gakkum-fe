import { LoadingButton } from '@mui/lab';
import { Alert, Autocomplete, Button, Card, CardContent, IconButton, MenuItem, Select, Snackbar, Stack, TextField, Typography } from '@mui/material';
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
import { useGetDetailCompanyPengaturanQuery, useGetProvincePengaturanQuery, useLazyGetCityPengaturanQuery, useLazyGetDistrictPengaturanQuery, useLazyGetPostalCodePengaturanQuery, useLazyGetVillagePengaturanQuery, useUpdateCompanyPengaturanMutation } from '../../../../api/setting.api';

interface updateCompanyProps {
    showSnackBar: snackbarType
    setShowSnackbar: Dispatch<React.SetStateAction<snackbarType>>
}

export default function UpdateCompany(props: updateCompanyProps) {
    const [showSnackbarLocal, setShowSnackbarLocal] = useState<snackbarType>({
        isOpen: false,
        message: '',
        status: 'success'
    });
    const { showSnackBar, setShowSnackbar } = props;
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
    const [provinceID, setProvinceID] = useState('')
    const [cityID, setCityID] = useState('')
    const [districtID, setDistrictID] = useState('')
    const [villageID, setVillageID] = useState('')
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
            setProvinceID(dataCompany.data?.province?.id ?? '')
            getCity(dataCompany.data?.province?.id)
            setCityID(dataCompany.data?.city?.id ?? '')
            getDistrict(dataCompany.data?.city?.id)
            setDistrictID(dataCompany.data?.district?.id ?? '')
            getVillage(dataCompany.data?.district?.id)
            setVillageID(dataCompany.data?.village?.id ?? '')
            getPostalCode(dataCompany.data?.village?.id)
            setPostalCode(dataCompany.data?.postal_code ?? '')
            setPicName(dataCompany.data?.pic_name ?? '')
            setPicPosition(dataCompany.data?.pic_position ?? '')
            setIsActive(dataCompany.data?.is_active ?? false)
        }
    }, [dataCompany]);

    const [updateCompany, { isLoading }] = useUpdateCompanyPengaturanMutation();
    const handleSave = async () => {
        const formData = new FormData();
        formData.append('id', employeeID!);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('number', number);
        formData.append('address', address);
        formData.append('province_id', provinceID);
        formData.append('city_id', cityID);
        formData.append('district_id', districtID);
        formData.append('village_id', villageID);
        formData.append('postal_code', postalCode);
        formData.append('pic_name', picName);
        formData.append('pic_position', picPosition);
        formData.append('is_active', `${isActive ? 1 : 0}`);
        formData.append('_method', 'PUT');
        try {
            await updateCompany(formData).unwrap();
            setShowSnackbar({
                isOpen: true,
                message: 'Berhasil mengubah data',
                status: 'success'
            })
            navigate('/pengaturan/perusahaan')
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
    return (
        <Layout>
            <Grid2 container alignContent={'center'}>
                <IconButton onClick={() => navigate('/pengaturan/perusahaan')}>
                    <RiArrowLeftLine className="w-8 h-8" color="#000000" />
                </IconButton>
                <Typography className="w-10/12 text-4xl font-semibold text-base-dark pt-1">
                    Update Perusahaan
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
                            <Typography className="text-base-dark w-full">Nomor Telepon <span className='text-danger-600'>*</span></Typography>
                            <TextField value={number} onChange={(data) => {
                                setNumber(data.target.value)
                            }} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Nomor Telepon'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
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
                        <Grid2 container xs={12} mt={'1rem'}>
                            <Typography className="text-base-dark w-full">Provinsi <span className='text-danger-600'>*</span></Typography>
                            <Select
                                value={provinceID}
                                className='rounded-lg mt-2'
                                fullWidth
                                onChange={(event) => {
                                    setProvinceID(event.target.value);
                                    setCityID(event.target.value);
                                    setDistrictID(event.target.value);
                                    setVillageID(event.target.value);
                                    setPostalCode(event.target.value);

                                    getCity(event.target.value);
                                }}
                            >
                                {dataProvince?.data?.map((data: any) => {
                                    return <MenuItem
                                        key={data.id}
                                        value={data.id}
                                    >
                                        {data.name}
                                    </MenuItem>
                                })}
                            </Select>
                        </Grid2>
                        <Grid2 container xs={12} mt={'1rem'}>
                            <Typography className="text-base-dark w-full">Kota <span className='text-danger-600'>*</span></Typography>
                            <Select
                                value={cityID}
                                className='rounded-lg mt-2'
                                fullWidth
                                onChange={(event) => {
                                    setCityID(event.target.value);
                                    setDistrictID('');
                                    setVillageID('');
                                    setPostalCode('');

                                    getDistrict(event.target.value);
                                }}
                            >
                                {dataCity?.map((data: any) => {
                                    return <MenuItem
                                        key={data.id}
                                        value={data.id}
                                    >
                                        {data.name}
                                    </MenuItem>
                                })}
                            </Select>
                        </Grid2>
                        <Grid2 container xs={12} mt={'1rem'}>
                            <Typography className="text-base-dark w-full">Kecamatan <span className='text-danger-600'>*</span></Typography>
                            <Select
                                value={districtID}
                                className='rounded-lg mt-2'
                                fullWidth
                                onChange={(event) => {
                                    setDistrictID(event.target.value);
                                    setVillageID('');
                                    setPostalCode('');

                                    getVillage(event.target.value);
                                }}
                            >
                                {dataDistrict?.map((data: any) => {
                                    return <MenuItem
                                        key={data.id}
                                        value={data.id}
                                    >
                                        {data.name}
                                    </MenuItem>
                                })}
                            </Select>
                        </Grid2>
                        <Grid2 container xs={12} mt={'1rem'}>
                            <Typography className="text-base-dark w-full">Desa <span className='text-danger-600'>*</span></Typography>
                            <Select
                                value={villageID}
                                className='rounded-lg mt-2'
                                fullWidth
                                onChange={(event) => {
                                    setVillageID(event.target.value);
                                    setPostalCode('');

                                    getPostalCode(event.target.value);
                                }}
                            >
                                {dataVillage?.map((data: any) => {
                                    return <MenuItem
                                        key={data.id}
                                        value={data.id}
                                    >
                                        {data.name}
                                    </MenuItem>
                                })}
                            </Select>
                        </Grid2>
                        <Grid2 container xs={12} mt={'1rem'}>
                            <Typography className="text-base-dark w-full">Kode Pos <span className='text-danger-600'>*</span></Typography>
                            <Select
                                value={postalCode}
                                className='rounded-lg mt-2'
                                fullWidth
                                onChange={(event) => {
                                    setPostalCode(event.target.value);
                                }}
                            >
                                {dataPostalCode?.map((data: any) => {
                                    return <MenuItem
                                        key={data}
                                        value={data}
                                    >
                                        {data}
                                    </MenuItem>
                                })}
                            </Select>
                        </Grid2>
                        <Grid2 container>
                            <Typography className="text-base-dark w-full">Nama PIC <span className='text-danger-600'>*</span></Typography>
                            <TextField value={picName} onChange={(data) => {
                                setPicName(data.target.value)
                            }} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Nama PIC'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <Typography className="text-base-dark w-full">Jabatan PIC <span className='text-danger-600'>*</span></Typography>
                            <TextField value={picPosition} onChange={(data) => {
                                setPicPosition(data.target.value)
                            }} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Jabatan PIC'
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