import { Box, Button, Dialog, DialogContent, DialogContentText, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { RiAddLine, RiArrowLeftLine, RiArrowLeftRightFill, RiContactsBook2Line, RiEyeLine, RiHome5Line } from '@remixicon/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../../components/Layout';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Moment } from 'moment';
import TabPanel from '../../../../components/organism/TabPanel';
import CustomTabPanel from '../../../../components/molecules/CustomTabPanel';
import Table from '../../../../components/organism/Table';
import { MRT_ColumnDef } from 'material-react-table';

export default function RegistrasiDaftarCreate() {
    const navigate = useNavigate()

    const timDummy = [
        {
            name: 'adella',
            email: 'adella@gmail.com',
            phoneNumber: 6285123456789
        },
        {
            name: 'henny',
            email: 'henny@gmail.com',
            phoneNumber: 6285987654321
        }
    ]
    const [timOpen, setTimOpen] = useState<boolean>(false)
    const [timName, setTimName] = useState<string>('')
    const [timPosition, setTimPosition] = useState<string>('')
    const [timPic, setTimPic] = useState<string>('')
    const [timEmail, setTimEmail] = useState<string>('')
    const [timPhoneNumber, setTimPhoneNumber] = useState<string>('')

    const [value, setValue] = useState(0)
    const [nomor, setNomor] = useState('')
    const [date, setDate] = useState<Moment | null>(null)
    const [typeId, setTypeId] = useState('')
    const [createdBy, setCreatedBy] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pic, setPic] = useState('')
    const [position, setPosition] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [problem, setProblem] = useState('')
    const [status, setStatus] = useState('')
    const labels = ['Data Registrasi', 'Tim', 'Tahapan', 'Sanksi', 'Dokumen']
    const onCreate = async () => {
        try {
            const formData = new FormData();
            navigate('/manajemen-tes')
        } catch (error: any) {
        }
    };

    const [openFilter, setOpenFilter] = useState<boolean>(false)
    const filterExclude = ['aksi']
    const data = [
        {
            nama: "Asti",
            posisi: "Ketua TIM",
            pic: true,
            telepon: "08123456789",
            email: "Asti@gmail.com",
        },
        {
            nama: "Adella",
            posisi: "Anggota",
            pic: false,
            telepon: "08123456789",
            email: "Adella@gmail.com"
        }
    ]
    const columns: MRT_ColumnDef<any>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            Cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: "nama",
            header: 'Tim Pengawasan',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'equals',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "posisi",
            header: 'Posisi',
            enableClickToCopy: true,
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'fuzzy',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "pic",
            header: 'PIC',
            enableClickToCopy: true,
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            Cell: ({ row }) => {
                return row.original.pic ? 'Iya' : 'Tidak';
            },
            filterFn: 'fuzzy',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "telepon",
            header: 'Telepon/WA',
            enableClickToCopy: true,
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'fuzzy',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "email",
            header: 'Email',
            enableClickToCopy: true,
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'fuzzy',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "aksi",
            header: 'Aksi',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            size: 50,
            Cell: ({ row }) => {
                return <IconButton className="border-solid border-2 text-primary-600" aria-label="confirm">
                    <RiEyeLine />
                </IconButton>
            },
            enableColumnFilter: false,
        },
    ];


    const [openFilterTahapan, setOpenFilterTahapan] = useState<boolean>(false)
    const filterExcludeTahapan = ['aksi']
    const dataTahapan = [
        {
            tahapan: 'Pembahasan',
            mulai: "02/08/2024",
            selesai: "02/08/2024",
            pic: "Asti",
            status: "Selesai",
        },
        {
            tahapan: 'Pengawasan',
            mulai: "02/09/2024",
            selesai: "12/09/2024",
            pic: "Adella",
            status: "In Progress",
        }
    ]
    const columnsTahapan: MRT_ColumnDef<any>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            Cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: "tahapan",
            header: 'Tahapan',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'equals',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "mulai",
            header: 'Mulai',
            enableClickToCopy: true,
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'fuzzy',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "selesai",
            header: 'Selesai',
            enableClickToCopy: true,
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'fuzzy',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "pic",
            header: 'PIC',
            enableClickToCopy: true,
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'fuzzy',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "status",
            header: 'Status',
            enableClickToCopy: true,
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'fuzzy',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "aksi",
            header: 'Aksi',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            size: 50,
            Cell: ({ row }) => {
                return <IconButton className="border-solid border-2 text-primary-600" aria-label="confirm">
                    <RiEyeLine />
                </IconButton>
            },
            enableColumnFilter: false,
        },
    ];



    const [openFilterSanksi, setOpenFilterSanksi] = useState<boolean>(false)
    const filterExcludeSanksi = ['aksi']
    const dataSanksi = [
        {
            jenis: 'BA Rekomendasi',
            tanggal: "02/08/2024",
            nomor: "DLH/12/VIII/2024",
            diterima: "02/08/2024",
            batas: "02/08/2024",
            tindakan: 0,
        },
        {
            jenis: 'BA Hasil Pengawasan',
            tanggal: "02/09/2024",
            nomor: "DLH/12/VIII/2024",
            diterima: "12/09/2024",
            batas: "02/09/2024",
            tindakan: 2,
        }
    ]
    const columnsSanksi: MRT_ColumnDef<any>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            Cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: "jenis",
            header: 'Jenis',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'equals',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "terbit",
            header: 'Tgl Terbit',
            enableClickToCopy: true,
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'fuzzy',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "nomor",
            header: 'Nomor Surat',
            enableClickToCopy: true,
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'fuzzy',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "diterima",
            header: 'Diterima',
            enableClickToCopy: true,
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'fuzzy',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "batas",
            header: 'Batas Waktu',
            enableClickToCopy: true,
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'fuzzy',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "tindakan",
            header: 'Tindakan',
            enableClickToCopy: true,
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'fuzzy',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "aksi",
            header: 'Aksi',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            size: 50,
            Cell: ({ row }) => {
                return <IconButton className="border-solid border-2 text-primary-600" aria-label="confirm">
                    <RiEyeLine />
                </IconButton>
            },
            enableColumnFilter: false,
        },
    ];


    const [openFilterDokumen, setOpenFilterDokumen] = useState<boolean>(false)
    const filterExcludeDokumen = ['aksi']
    const dataDokumen = [
        {
            jenis: 'BA Rekomendasi',
            file: "Peta Masalah",
            nomor: "DLH/12/VIII/2024",
            terbit: "02/08/2024",
            berlaku: "02/08/2024",
        },
        {
            jenis: 'BA Hasil Pengawasan',
            file: "Peta Masalah",
            nomor: "DLH/12/VIII/2024",
            terbit: "12/09/2024",
            berlaku: "02/09/2024",
        }
    ]
    const columnsDokumen: MRT_ColumnDef<any>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            Cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: "jenis",
            header: 'Jenis',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'equals',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "file",
            header: 'Nama File',
            enableClickToCopy: true,
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'fuzzy',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "nomor",
            header: 'Nomor',
            enableClickToCopy: true,
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'fuzzy',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "terbit",
            header: 'Terbit',
            enableClickToCopy: true,
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'fuzzy',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "berlaku",
            header: 'Berlaku',
            enableClickToCopy: true,
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            filterFn: 'fuzzy',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "aksi",
            header: 'Aksi',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            size: 50,
            Cell: ({ row }) => {
                return <IconButton className="border-solid border-2 text-primary-600" aria-label="confirm">
                    <RiEyeLine />
                </IconButton>
            },
            enableColumnFilter: false,
        },
    ];
    return (
        <Layout>
            <Dialog
                open={timOpen}
                onClose={() => setTimOpen(false)}
                maxWidth={'lg'}
                sx={{
                    '.MuiPaper-root': {
                        borderRadius: '16px',
                        '@media(minWidth: 960px)': {
                            paddingX: '64px'
                        },
                    }
                }}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className='justify-center align-center text-center md:pt-16 w-full md:w-[622px]'>
                        <Typography className='text-[24px] md:text-[32px] font-semibold text-base-dark'>
                            Tambah Data TIM
                        </Typography>
                    </DialogContentText>
                    <Grid2 container>
                        <Typography className="text-base-dark w-full mt-6">Nama Pengawas <span className='text-danger-600'>*</span></Typography>
                        <Select
                            value={timName}
                            className='rounded-lg mt-2'
                            fullWidth
                            onChange={(event) => {
                                setTimName(event.target.value);
                                const tim = timDummy.find((data) => data.name === event.target.value);
                                setTimEmail(tim?.email ?? '');
                                setTimPhoneNumber(tim?.phoneNumber.toString() ?? '');
                            }}
                        >
                            {
                                timDummy.map((value, index) => {
                                    return <MenuItem
                                        key={`name_${index}`}
                                        value={value.name}
                                    >
                                        {value.name}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </Grid2>
                    <Grid2 container>
                        <Typography className="text-base-dark w-full mt-6">Posisi <span className='text-danger-600'>*</span></Typography>
                        <Select
                            value={timPosition}
                            className='rounded-lg mt-2'
                            fullWidth
                            onChange={(event) => {
                                setTimPosition(event.target.value);
                            }}
                        >
                            <MenuItem
                                key={'1'}
                                value={'katim'}
                            >
                                {'Ketua Tim'}
                            </MenuItem>
                            <MenuItem
                                key={'2'}
                                value={'anggota'}
                            >
                                {'Anggota'}
                            </MenuItem>
                        </Select>
                    </Grid2>
                    <Grid2 container>
                        <Typography className="text-base-dark w-full mt-6">PIC <span className='text-danger-600'>*</span></Typography>
                        <Select
                            value={timPic}
                            className='rounded-lg mt-2'
                            fullWidth
                            onChange={(event) => {
                                setTimPic(event.target.value);
                            }}
                        >
                            <MenuItem
                                key={'1'}
                                value={'yes'}
                            >
                                {'Iya'}
                            </MenuItem>
                            <MenuItem
                                key={'2'}
                                value={'no'}
                            >
                                {'Tidak'}
                            </MenuItem>
                        </Select>
                    </Grid2>
                    <Grid2 container>
                        <Typography className="text-base-dark w-full mt-6">Email <span className='text-danger-600'>*</span></Typography>
                        <TextField value={timEmail} onChange={(data) => setTimEmail(data.target.value)} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Email'
                            InputProps={{
                                style: {
                                    borderRadius: "10px",
                                }
                            }} />
                    </Grid2>
                    <Grid2 container>
                        <Typography className="text-base-dark w-full mt-6">Nomor Telepon <span className='text-danger-600'>*</span></Typography>
                        <TextField value={timPhoneNumber} onChange={(data) => setTimPhoneNumber(data.target.value)} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Email'
                            InputProps={{
                                style: {
                                    borderRadius: "10px",
                                }
                            }} />
                    </Grid2>
                    <Grid2 container className='flex gap-2 mt-6 justify-center pb-8 md:pb-16'>

                        <Button className='bg-primary-600 text-base-white hover:bg-primary-600 hover:text-base-white py-4 px-6 rounded-xl gap-3'>
                            Unduh Hasil Tes
                        </Button>
                    </Grid2>
                </DialogContent>
            </Dialog>
            <Grid2 container alignContent={'center'}>
                <IconButton onClick={() => navigate('/register/daftar')}>
                    <RiArrowLeftLine className="w-8 h-8" color="#000000" />
                </IconButton>
                <Typography className="w-10/12 text-4xl font-semibold text-base-dark pt-1">
                    Tambah Data
                </Typography>
            </Grid2>
            <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1 }} marginTop={3}>
                <TabPanel icons={[]} labels={labels} value={value} setValue={setValue}>
                    <CustomTabPanel value={value} index={0}>
                        <Grid2 container>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Nomor <span className='text-danger-600'>*</span></Typography>
                                <TextField value={nomor} onChange={(data) => setNomor(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12} mt={'1rem'}>
                                <Typography className="text-base-dark w-full">Tanggal <span className='text-danger-600'>*</span></Typography>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <MobileDateTimePicker
                                        ampm={false}
                                        value={date}
                                        onChange={(data) => setDate(data)}
                                        className='mt-2 w-full' />
                                </LocalizationProvider>
                            </Grid2>
                            <Grid2 container xs={12} mt={'1rem'}>
                                <Typography className="text-base-dark w-full">Jenis Pengawasan <span className='text-danger-600'>*</span></Typography>
                                <Select
                                    value={typeId}
                                    className='rounded-lg mt-2'
                                    fullWidth
                                    onChange={(event) => {
                                        setTypeId(event.target.value);
                                    }}
                                >
                                    <MenuItem
                                        key={'1'}
                                        value={'1'}
                                    >
                                        {'Insidental'}
                                    </MenuItem>
                                    <MenuItem
                                        key={'2'}
                                        value={'2'}
                                    >
                                        {'Reguler'}
                                    </MenuItem>
                                </Select>
                            </Grid2>
                            <Grid2 container xs={12} mt={'1rem'}>
                                <Typography className="text-base-dark w-full">Dibuat Oleh <span className='text-danger-600'>*</span></Typography>
                                <Select
                                    value={createdBy}
                                    className='rounded-lg mt-2'
                                    fullWidth
                                    onChange={(event) => {
                                        setCreatedBy(event.target.value);
                                    }}
                                >
                                    <MenuItem
                                        key={'1'}
                                        value={'1'}
                                    >
                                        {'Meika'}
                                    </MenuItem>
                                    <MenuItem
                                        key={'1'}
                                        value={'1'}
                                    >
                                        {'Raditya'}
                                    </MenuItem>
                                </Select>
                            </Grid2>
                            <Grid2 container xs={12} mt={'1rem'}>
                                <Typography className="text-base-dark w-full">Nama <span className='text-danger-600'>*</span></Typography>
                                <TextField value={name} onChange={(data) => setName(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12} mt={'1rem'}>
                                <Typography className="text-base-dark w-full">Alamat <span className='text-danger-600'>*</span></Typography>
                                <TextField value={address} onChange={(data) => setAddress(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12} mt={'1rem'}>
                                <Typography className="text-base-dark w-full">Kota / Kabupaten <span className='text-danger-600'>*</span></Typography>
                                <TextField value={city} onChange={(data) => setCity(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12} mt={'1rem'}>
                                <Typography className="text-base-dark w-full">Provinsi <span className='text-danger-600'>*</span></Typography>
                                <TextField value={state} onChange={(data) => setState(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12} mt={'1rem'}>
                                <Typography className="text-base-dark w-full">Nama Penanggung Jawab <span className='text-danger-600'>*</span></Typography>
                                <TextField value={pic} onChange={(data) => setPic(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12} mt={'1rem'}>
                                <Typography className="text-base-dark w-full">Jabatan <span className='text-danger-600'>*</span></Typography>
                                <TextField value={position} onChange={(data) => setPosition(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12} mt={'1rem'}>
                                <Typography className="text-base-dark w-full">Telepon <span className='text-danger-600'>*</span></Typography>
                                <TextField value={phoneNumber} onChange={(data) => setPhoneNumber(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12} mt={'1rem'}>
                                <Typography className="text-base-dark w-full">Email <span className='text-danger-600'>*</span></Typography>
                                <TextField value={email} onChange={(data) => setEmail(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12} mt={'1rem'}>
                                <Typography className="text-base-dark w-full">Problem <span className='text-danger-600'>*</span></Typography>
                                <TextField value={problem} onChange={(data) => setProblem(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12} mt={'1rem'}>
                                <Typography className="text-base-dark w-full">Status <span className='text-danger-600'>*</span></Typography>
                                <TextField value={status} onChange={(data) => setStatus(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Button onClick={onCreate} className='bg-primary-600 text-base-white hover:bg-primary-600 hover:text-base-white w-full mt-4' >
                                Simpan
                            </Button>
                        </Grid2>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Grid2 container>
                            <Grid2 xs={12} container className='w-full justify-end'>
                                <Button className="w-full mt-4 bg-primary-600 text-base-white rounded-lg py-4 px-6 hover:bg-primary-600 md:mt-0 md:w-auto gap-2" onClick={() => setTimOpen(true)}><RiAddLine /> Tambah</Button>
                            </Grid2>
                        </Grid2>
                        <Table openFilter={openFilter} setOpenFilter={setOpenFilter} columns={columns} data={data ?? []} filterExclude={filterExclude}></Table>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Grid2 container>
                            <Grid2 xs={12} container className='w-full justify-end'>
                                <Button className="w-full mt-4 bg-primary-600 text-base-white rounded-lg py-4 px-6 hover:bg-primary-600 md:mt-0 md:w-auto gap-2" onClick={() => navigate('/cms/manajemen-web/create')}><RiAddLine /> Tambah</Button>
                            </Grid2>
                        </Grid2>
                        <Table openFilter={openFilterTahapan} setOpenFilter={setOpenFilterTahapan} columns={columnsTahapan} data={dataTahapan ?? []} filterExclude={filterExcludeTahapan}></Table>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <Grid2 container>
                            <Grid2 xs={12} container className='w-full justify-end'>
                                <Button className="w-full mt-4 bg-primary-600 text-base-white rounded-lg py-4 px-6 hover:bg-primary-600 md:mt-0 md:w-auto gap-2" onClick={() => navigate('/cms/manajemen-web/create')}><RiAddLine /> Tambah</Button>
                            </Grid2>
                        </Grid2>
                        <Table openFilter={openFilterSanksi} setOpenFilter={setOpenFilterSanksi} columns={columnsSanksi} data={dataSanksi ?? []} filterExclude={filterExcludeSanksi}></Table>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={4}>
                        <Grid2 container>
                            <Grid2 xs={12} container className='w-full justify-end'>
                                <Button className="w-full mt-4 bg-primary-600 text-base-white rounded-lg py-4 px-6 hover:bg-primary-600 md:mt-0 md:w-auto gap-2" onClick={() => navigate('/cms/manajemen-web/create')}><RiAddLine /> Tambah</Button>
                            </Grid2>
                        </Grid2>
                        <Table openFilter={openFilterDokumen} setOpenFilter={setOpenFilterDokumen} columns={columnsDokumen} data={dataDokumen ?? []} filterExclude={filterExcludeDokumen}></Table>
                    </CustomTabPanel>
                </TabPanel>
            </Grid2>
        </Layout >
    );
}