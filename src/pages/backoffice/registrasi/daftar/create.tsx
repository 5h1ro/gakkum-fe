import { Box, Button, Dialog, DialogContent, DialogContentText, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { RiAddLine, RiArrowLeftLine, RiArrowLeftRightFill, RiCloseLine, RiContactsBook2Line, RiEyeLine, RiHome5Line } from '@remixicon/react';
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
import TabPanelInside from '../../../../components/organism/TabPanelInside';
import { useCreateCatatanMutation, useCreatePetaMasalahMutation, useCreateRegistrasiMutation, useGetBadanUsahaQuery, useGetCatatanQuery, useGetRegistrasiQuery, useGetStatusDataQuery, useGetSumberDataQuery } from '../../../../api/register.api';

export default function RegistrasiDaftarCreate() {
    const navigate = useNavigate()
    const { data: statusData } = useGetStatusDataQuery();
    const { data: badanUsaha } = useGetBadanUsahaQuery();
    const { data: sumberDataQuery } = useGetSumberDataQuery();
    const jenisDokumenRegistrasi = [
        {
            name: 'Peta Masalah / Laporan',
        },
        {
            name: 'Alat Bukti Peta Masalah',
        },
        {
            name: 'Disposisi KaBid Gakkum',
        },
    ]
    const [dokumenRegistrasiOpen, setDokumenRegistrasiOpen] = useState<boolean>(false)
    const [jenisDR, setJenisDR] = useState<string>('')
    const [nomorDR, setNomorDR] = useState<string>('')
    const [tanggalTerbitDR, setTanggalTerbitDR] = useState<Moment | null>(null)
    const [berlakuDR, setBerlakuDR] = useState<Moment | null>(null)

    const [dokumenPerusahaanOpen, setDokumenPerusahaanOpen] = useState<boolean>(false)
    const [jenisDPU, setJenisDPU] = useState<string>('')
    const [nomorDPU, setNomorDPU] = useState<string>('')
    const [tanggalTerbitDPU, setTanggalTerbitDPU] = useState<Moment | null>(null)
    const [berlakuDPU, setBerlakuDPU] = useState<Moment | null>(null)

    const [dokumenPengawasanOpen, setDokumenPengawasanOpen] = useState<boolean>(false)
    const [jenisDPA, setJenisDPA] = useState<string>('')
    const [nomorDPA, setNomorDPA] = useState<string>('')
    const [tanggalTerbitDPA, setTanggalTerbitDPA] = useState<Moment | null>(null)
    const [berlakuDPA, setBerlakuDPA] = useState<Moment | null>(null)

    const [dokumenPascaPengawasanOpen, setDokumenPascaPengawasanOpen] = useState<boolean>(false)
    const [jenisDPP, setJenisDPP] = useState<string>('')
    const [nomorDPP, setNomorDPP] = useState<string>('')
    const [tanggalTerbitDPP, setTanggalTerbitDPP] = useState<Moment | null>(null)
    const [berlakuDPP, setBerlakuDPP] = useState<Moment | null>(null)

    const [documentValue, setDocumentValue] = useState(0)
    const [value, setValue] = useState(0)
    const [nomor, setNomor] = useState('')
    const [date, setDate] = useState<Moment | null>(null)
    const [typeId, setTypeId] = useState('')
    const [statusId, setStatusId] = useState('')
    const [companyId, setCompanyId] = useState('')
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
    const labels = ['Data']
    const documentLabels = ['Registrasi', 'Dokumen Perusahaan', 'Pengawasan', 'Pasca Pengawasan', 'Semua']
    const [createRegistrasi, { isLoading }] = useCreateRegistrasiMutation();
    const onCreate = async () => {
        const formData = new FormData();
        formData.append('jenis_pengawasan', typeId);
        formData.append('status_data_id', statusId);
        formData.append('company_id', companyId);
        formData.append('perkiraan_masalah', problem);
        try {
            await createRegistrasi(formData).unwrap();
            navigate('/register/daftar')
        } catch (error: any) {
        }
    };

    const [openFilterTahapan, setOpenFilterTahapan] = useState<boolean>(false)
    const filterExcludeTahapan = ['aksi']
    const columnsCatatan: MRT_ColumnDef<any>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            Cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: "judul",
            header: 'Judul',
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
            accessorKey: "isi",
            header: 'Isi',
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
    ];
    const { data: registrasi } = useGetRegistrasiQuery();
    const [badanUsahaPetaMasalah, setBadanUsahaPetaMasalah] = useState('')
    const [alamatKantor, setAlamatKantor] = useState('')
    const [kota, setKota] = useState('')
    const [provinsi, setProvinsi] = useState('')
    const [penanggungJawab, setPenanggungJawab] = useState('')
    const [telepon, setTelepon] = useState('')
    const [emailPetaMasalah, setEmailPetaMasalah] = useState('')
    const [alamatLokasiKegiatan, setAlamatLokasiKegiatan] = useState('')
    const [titikKoordinat, setTitikKoordinat] = useState('')
    const [titikKoordinat2, setTitikKoordinat2] = useState('')
    const [nib, setNib] = useState('')
    const [kbu, setKbu] = useState('')
    const [jenisKegiatan, setJenisKegiatan] = useState('')
    const [tahunBeroperasi, setTahunBeroperasi] = useState('')
    const [statusPermodalan, setStatusPermodalan] = useState('')
    const [nilaiInvestasi, setNilaiInvestasi] = useState('')
    const [skalaUsaha, setSkalaUsaha] = useState('')
    const [totalLuasDiusahakan, setTotalLuasDiusahakan] = useState('')
    const [dokumenLingkungan, setDokumenLingkungan] = useState('')
    const [nomorRekomendasi, setNomorRekomendasi] = useState('')
    const [nomorIzinLingkungan, setNomorIzinLingkungan] = useState('')
    const [kapasitasTerpasang, setKapasitasTerpasang] = useState('')
    const [kapasitasSenyatanya, setKapasitasSenyatanya] = useState('')
    const [bahanBaku, setBahanBaku] = useState('')
    const [bahanPenolong, setBahanPenolong] = useState('')
    const [pemasaran, setPemasaran] = useState('')
    const [karyawan, setKaryawan] = useState('')
    const [lainnya, setLainnya] = useState('')
    const [sumberData, setSumberData] = useState('')
    const [petaMasalahA, setPetaMasalahA] = useState('')
    const [petaMasalahB, setPetaMasalahB] = useState('')
    const [petaMasalahC, setPetaMasalahC] = useState('')
    const [petaMasalahD, setPetaMasalahD] = useState('')
    const [petaMasalahE, setPetaMasalahE] = useState('')
    const [petaMasalahF, setPetaMasalahF] = useState('')
    const [createPetamasalah, { isLoading: isLoadingPetamasalah }] = useCreatePetaMasalahMutation();
    const onCreatePetamasalah = async () => {
        const formData = new FormData();
        formData.append('data_id', badanUsahaPetaMasalah);
        formData.append('alamat_kegiatan', alamatLokasiKegiatan);
        formData.append('latitude', titikKoordinat);
        formData.append('longitude', titikKoordinat2);
        formData.append('longitude', titikKoordinat2);
        formData.append('nib', nib);
        formData.append('kbli', kbu);
        formData.append('jenis_kegiatan', jenisKegiatan);
        formData.append('tahun_beroprasi', tahunBeroperasi);
        formData.append('status_permodalan', statusPermodalan);
        formData.append('nilai_investasi', nilaiInvestasi);
        formData.append('skala_usaha', skalaUsaha);
        formData.append('luas_usaha', totalLuasDiusahakan);
        formData.append('dokumen_lingkungan', dokumenLingkungan);
        formData.append('nomor_rekomendasi', nomorRekomendasi);
        formData.append('nomor_izin_lingkungan', nomorIzinLingkungan);
        formData.append('kapasitas_prod_terpasang', kapasitasTerpasang);
        formData.append('kapasitas_prod_senyatanya', kapasitasSenyatanya);
        formData.append('bahan_baku', bahanBaku);
        formData.append('bahan_penolong', bahanPenolong);
        formData.append('pemasaran', pemasaran);
        formData.append('jumlah_karyawan', karyawan);
        formData.append('lain_lain', lainnya);
        formData.append('sumber_data_id', sumberData);
        formData.append('dokumen_perizinan', petaMasalahA);
        formData.append('pengendalian_pencemaran', petaMasalahB);
        formData.append('pengendalian_pencemaran_udara', petaMasalahC);
        formData.append('pengolahan_limbah_b3', petaMasalahD);
        formData.append('pengelolaan_sampah', petaMasalahE);
        formData.append('catatan_lainnya', petaMasalahF);
        try {
            await createPetamasalah(formData).unwrap();
            navigate('/register/daftar')
        } catch (error: any) {
        }
    };

    const [catatanOpen, setCatatanOpen] = useState(false)
    const [badanUsahaCatatan, setBadanUsahaCatatan] = useState('9d8ac6d0-297b-499f-bf0f-e0344fae59e6')
    const [judulCatatan, setJudulCatatan] = useState('')
    const [isiCatatan, setIsiCatatan] = useState('')
    const { data: catatan, isLoading: getting, isFetching } = useGetCatatanQuery(badanUsahaCatatan);
    const [createCatatan, { isLoading: isLoadingCatatan }] = useCreateCatatanMutation();
    const onCreateCatatan = async () => {
        const formData = new FormData();
        formData.append('data_id', badanUsahaCatatan);
        formData.append('judul', judulCatatan);
        formData.append('isi', isiCatatan);
        try {
            await createCatatan(formData).unwrap();
            navigate('/register/daftar')
        } catch (error: any) {
        }
    };

    return (
        <Layout>
            <Dialog
                open={dokumenRegistrasiOpen}
                onClose={() => setDokumenRegistrasiOpen(false)}
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
                <IconButton
                    aria-label="close"
                    onClick={() => setDokumenRegistrasiOpen(false)}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <RiCloseLine />
                </IconButton>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className='justify-center align-center text-center md:pt-16 w-full md:w-[622px] -mt-8'>
                        <Typography className='text-[24px] md:text-[32px] font-semibold text-base-dark'>
                            Tambah Dokumen
                        </Typography>
                    </DialogContentText>
                    <Grid2 container>
                        <Typography className="text-base-dark w-full mt-6">Jenis Dokumen <span className='text-danger-600'>*</span></Typography>
                        <Select
                            value={jenisDR}
                            className='rounded-lg mt-2'
                            fullWidth
                            onChange={(event) => {
                                setJenisDR(event.target.value)
                            }}
                        >
                            {
                                jenisDokumenRegistrasi.map((value, index) => {
                                    return <MenuItem
                                        key={`jenis_dokumen_registrasi_${index}`}
                                        value={value.name}
                                    >
                                        {value.name}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </Grid2>
                    <Grid2 container>
                        <Typography className="text-base-dark w-full mt-6">Nomor <span className='text-danger-600'>*</span></Typography>
                        <TextField value={nomorDR} onChange={(data) => setNomorDR(data.target.value)} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Nomor Dokumen'
                            InputProps={{
                                style: {
                                    borderRadius: "10px",
                                }
                            }} />
                    </Grid2>
                    <Grid2 container xs={12} mt={'1rem'}>
                        <Typography className="text-base-dark w-full">Tanggal Terbit<span className='text-danger-600'>*</span></Typography>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDateTimePicker
                                ampm={false}
                                value={tanggalTerbitDR}
                                onChange={(data) => setTanggalTerbitDR(data)}
                                className='mt-2 w-full' />
                        </LocalizationProvider>
                    </Grid2>
                    <Grid2 container xs={12} mt={'1rem'}>
                        <Typography className="text-base-dark w-full">Berlaku<span className='text-danger-600'>*</span></Typography>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDateTimePicker
                                ampm={false}
                                value={berlakuDR}
                                onChange={(data) => setBerlakuDR(data)}
                                className='mt-2 w-full' />
                        </LocalizationProvider>
                    </Grid2>
                    <Grid2 container className='flex gap-2 mt-6 justify-center pb-8 md:pb-16'>
                        <Button className='bg-primary-600 text-base-white hover:bg-primary-600 hover:text-base-white py-4 px-6 rounded-xl gap-3'>
                            Simpan
                        </Button>
                    </Grid2>
                </DialogContent>
            </Dialog>
            <Dialog
                open={dokumenPerusahaanOpen}
                onClose={() => setDokumenPerusahaanOpen(false)}
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
                <IconButton
                    aria-label="close"
                    onClick={() => setDokumenPerusahaanOpen(false)}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <RiCloseLine />
                </IconButton>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className='justify-center align-center text-center md:pt-16 w-full md:w-[622px] -mt-8'>
                        <Typography className='text-[24px] md:text-[32px] font-semibold text-base-dark'>
                            Tambah Dokumen
                        </Typography>
                    </DialogContentText>
                    <Grid2 container>
                        <Typography className="text-base-dark w-full mt-6">Jenis Dokumen <span className='text-danger-600'>*</span></Typography>
                        <Select
                            value={jenisDPU}
                            className='rounded-lg mt-2'
                            fullWidth
                            onChange={(event) => {
                                setJenisDPU(event.target.value)
                            }}
                        >
                            {
                                jenisDokumenRegistrasi.map((value, index) => {
                                    return <MenuItem
                                        key={`jenis_dokumen_perusahaan_${index}`}
                                        value={value.name}
                                    >
                                        {value.name}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </Grid2>
                    <Grid2 container>
                        <Typography className="text-base-dark w-full mt-6">Nomor <span className='text-danger-600'>*</span></Typography>
                        <TextField value={nomorDPU} onChange={(data) => setNomorDPU(data.target.value)} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Nomor Dokumen'
                            InputProps={{
                                style: {
                                    borderRadius: "10px",
                                }
                            }} />
                    </Grid2>
                    <Grid2 container xs={12} mt={'1rem'}>
                        <Typography className="text-base-dark w-full">Tanggal Terbit<span className='text-danger-600'>*</span></Typography>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDateTimePicker
                                ampm={false}
                                value={tanggalTerbitDPU}
                                onChange={(data) => setTanggalTerbitDPU(data)}
                                className='mt-2 w-full' />
                        </LocalizationProvider>
                    </Grid2>
                    <Grid2 container xs={12} mt={'1rem'}>
                        <Typography className="text-base-dark w-full">Berlaku<span className='text-danger-600'>*</span></Typography>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDateTimePicker
                                ampm={false}
                                value={berlakuDPU}
                                onChange={(data) => setBerlakuDPU(data)}
                                className='mt-2 w-full' />
                        </LocalizationProvider>
                    </Grid2>
                    <Grid2 container className='flex gap-2 mt-6 justify-center pb-8 md:pb-16'>
                        <Button className='bg-primary-600 text-base-white hover:bg-primary-600 hover:text-base-white py-4 px-6 rounded-xl gap-3'>
                            Simpan
                        </Button>
                    </Grid2>
                </DialogContent>
            </Dialog>
            <Dialog
                open={dokumenPengawasanOpen}
                onClose={() => setDokumenPengawasanOpen(false)}
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
                <IconButton
                    aria-label="close"
                    onClick={() => setDokumenPengawasanOpen(false)}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <RiCloseLine />
                </IconButton>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className='justify-center align-center text-center md:pt-16 w-full md:w-[622px] -mt-8'>
                        <Typography className='text-[24px] md:text-[32px] font-semibold text-base-dark'>
                            Tambah Dokumen
                        </Typography>
                    </DialogContentText>
                    <Grid2 container>
                        <Typography className="text-base-dark w-full mt-6">Jenis Dokumen <span className='text-danger-600'>*</span></Typography>
                        <Select
                            value={jenisDPA}
                            className='rounded-lg mt-2'
                            fullWidth
                            onChange={(event) => {
                                setJenisDPA(event.target.value)
                            }}
                        >
                            {
                                jenisDokumenRegistrasi.map((value, index) => {
                                    return <MenuItem
                                        key={`jenis_dokumen_registrasi_${index}`}
                                        value={value.name}
                                    >
                                        {value.name}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </Grid2>
                    <Grid2 container>
                        <Typography className="text-base-dark w-full mt-6">Nomor <span className='text-danger-600'>*</span></Typography>
                        <TextField value={nomorDPA} onChange={(data) => setNomorDPA(data.target.value)} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Nomor Dokumen'
                            InputProps={{
                                style: {
                                    borderRadius: "10px",
                                }
                            }} />
                    </Grid2>
                    <Grid2 container xs={12} mt={'1rem'}>
                        <Typography className="text-base-dark w-full">Tanggal Terbit<span className='text-danger-600'>*</span></Typography>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDateTimePicker
                                ampm={false}
                                value={tanggalTerbitDPA}
                                onChange={(data) => setTanggalTerbitDPA(data)}
                                className='mt-2 w-full' />
                        </LocalizationProvider>
                    </Grid2>
                    <Grid2 container xs={12} mt={'1rem'}>
                        <Typography className="text-base-dark w-full">Berlaku<span className='text-danger-600'>*</span></Typography>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDateTimePicker
                                ampm={false}
                                value={berlakuDPA}
                                onChange={(data) => setBerlakuDPA(data)}
                                className='mt-2 w-full' />
                        </LocalizationProvider>
                    </Grid2>
                    <Grid2 container className='flex gap-2 mt-6 justify-center pb-8 md:pb-16'>
                        <Button className='bg-primary-600 text-base-white hover:bg-primary-600 hover:text-base-white py-4 px-6 rounded-xl gap-3'>
                            Simpan
                        </Button>
                    </Grid2>
                </DialogContent>
            </Dialog>
            <Dialog
                open={dokumenPascaPengawasanOpen}
                onClose={() => setDokumenPascaPengawasanOpen(false)}
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
                <IconButton
                    aria-label="close"
                    onClick={() => setDokumenPascaPengawasanOpen(false)}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <RiCloseLine />
                </IconButton>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className='justify-center align-center text-center md:pt-16 w-full md:w-[622px] -mt-8'>
                        <Typography className='text-[24px] md:text-[32px] font-semibold text-base-dark'>
                            Tambah Dokumen
                        </Typography>
                    </DialogContentText>
                    <Grid2 container>
                        <Typography className="text-base-dark w-full mt-6">Jenis Dokumen <span className='text-danger-600'>*</span></Typography>
                        <Select
                            value={jenisDPP}
                            className='rounded-lg mt-2'
                            fullWidth
                            onChange={(event) => {
                                setJenisDPP(event.target.value)
                            }}
                        >
                            {
                                jenisDokumenRegistrasi.map((value, index) => {
                                    return <MenuItem
                                        key={`jenis_dokumen_registrasi_${index}`}
                                        value={value.name}
                                    >
                                        {value.name}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </Grid2>
                    <Grid2 container>
                        <Typography className="text-base-dark w-full mt-6">Nomor <span className='text-danger-600'>*</span></Typography>
                        <TextField value={nomorDPP} onChange={(data) => setNomorDPP(data.target.value)} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Nomor Dokumen'
                            InputProps={{
                                style: {
                                    borderRadius: "10px",
                                }
                            }} />
                    </Grid2>
                    <Grid2 container xs={12} mt={'1rem'}>
                        <Typography className="text-base-dark w-full">Tanggal Terbit<span className='text-danger-600'>*</span></Typography>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDateTimePicker
                                ampm={false}
                                value={tanggalTerbitDPP}
                                onChange={(data) => setTanggalTerbitDPP(data)}
                                className='mt-2 w-full' />
                        </LocalizationProvider>
                    </Grid2>
                    <Grid2 container xs={12} mt={'1rem'}>
                        <Typography className="text-base-dark w-full">Berlaku<span className='text-danger-600'>*</span></Typography>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDateTimePicker
                                ampm={false}
                                value={berlakuDPP}
                                onChange={(data) => setBerlakuDPP(data)}
                                className='mt-2 w-full' />
                        </LocalizationProvider>
                    </Grid2>
                    <Grid2 container className='flex gap-2 mt-6 justify-center pb-8 md:pb-16'>
                        <Button className='bg-primary-600 text-base-white hover:bg-primary-600 hover:text-base-white py-4 px-6 rounded-xl gap-3'>
                            Simpan
                        </Button>
                    </Grid2>
                </DialogContent>
            </Dialog>
            <Dialog
                open={catatanOpen}
                onClose={() => setCatatanOpen(false)}
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
                <IconButton
                    aria-label="close"
                    onClick={() => setCatatanOpen(false)}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <RiCloseLine />
                </IconButton>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className='justify-center align-center text-center md:pt-16 w-full md:w-[622px] -mt-8'>
                        <Typography className='text-[24px] md:text-[32px] font-semibold text-base-dark'>
                            Tambah Catatan
                        </Typography>
                    </DialogContentText>
                    <Grid2 container>
                        <Typography className="text-base-dark w-full mt-6">Nama Badan Usaha <span className='text-danger-600'>*</span></Typography>
                        <Select
                            value={badanUsahaCatatan}
                            className='rounded-lg mt-2'
                            fullWidth
                            onChange={(event) => {
                                setBadanUsahaCatatan(event.target.value);
                            }}
                        >
                            {registrasi?.data?.map((data: any) => {
                                return <MenuItem
                                    key={data.id}
                                    value={data.id}
                                >
                                    {data.id}
                                </MenuItem>
                            })}
                        </Select>
                    </Grid2>
                    <Grid2 container>
                        <Typography className="text-base-dark w-full mt-6">Judul <span className='text-danger-600'>*</span></Typography>
                        <TextField value={judulCatatan} onChange={(data) => setJudulCatatan(data.target.value)} variant="outlined" className='mt-2 w-full'
                            InputProps={{
                                style: {
                                    borderRadius: "10px",
                                }
                            }} />
                    </Grid2>
                    <Grid2 container>
                        <Typography className="text-base-dark w-full mt-6">Isi <span className='text-danger-600'>*</span></Typography>
                        <TextField value={isiCatatan} onChange={(data) => setIsiCatatan(data.target.value)} variant="outlined" className='mt-2 w-full'
                            InputProps={{
                                style: {
                                    borderRadius: "10px",
                                }
                            }} />
                    </Grid2>
                    <Grid2 container className='flex gap-2 mt-6 justify-center pb-8 md:pb-16'>
                        <Button onClick={onCreateCatatan} className='bg-primary-600 text-base-white hover:bg-primary-600 hover:text-base-white py-4 px-6 rounded-xl gap-3'>
                            Simpan
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
                            {/* <Grid2 container xs={12}>
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
                            </Grid2> */}
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
                                        value={'Insidental'}
                                    >
                                        {'Insidental'}
                                    </MenuItem>
                                    <MenuItem
                                        key={'2'}
                                        value={'Reguler'}
                                    >
                                        {'Reguler'}
                                    </MenuItem>
                                </Select>
                            </Grid2>
                            <Grid2 container xs={12} mt={'1rem'}>
                                <Typography className="text-base-dark w-full">Status <span className='text-danger-600'>*</span></Typography>
                                <Select
                                    value={statusId}
                                    className='rounded-lg mt-2'
                                    fullWidth
                                    onChange={(event) => {
                                        setStatusId(event.target.value);
                                    }}
                                >
                                    {statusData?.data?.map((data: any) => {
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
                                <Typography className="text-base-dark w-full">Nama Badan Usaha <span className='text-danger-600'>*</span></Typography>
                                <Select
                                    value={companyId}
                                    className='rounded-lg mt-2'
                                    fullWidth
                                    onChange={(event) => {
                                        setCompanyId(event.target.value);
                                    }}
                                >
                                    {badanUsaha?.data?.map((data: any) => {
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
                                <Typography className="text-base-dark w-full">Perkiraan Masalah <span className='text-danger-600'>*</span></Typography>
                                <TextField value={problem} multiline rows={3} onChange={(data) => setProblem(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            {/* <Grid2 container xs={12} mt={'1rem'}>
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
                            </Grid2> */}
                            <Button onClick={onCreate} className='bg-primary-600 text-base-white hover:bg-primary-600 hover:text-base-white w-full mt-4' >
                                Simpan
                            </Button>
                        </Grid2>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Grid2 container>
                            {/* <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Nama Badan Usaha<span className='text-danger-600'>*</span></Typography>
                                <TextField value={badanUsahaPetaMasalah} onChange={(data) => setBadanUsahaPetaMasalah(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2> */}
                            <Grid2 container xs={12} mt={'1rem'}>
                                <Typography className="text-base-dark w-full">Nama Badan Usaha <span className='text-danger-600'>*</span></Typography>
                                <Select
                                    value={badanUsahaPetaMasalah}
                                    className='rounded-lg mt-2'
                                    fullWidth
                                    onChange={(event) => {
                                        setBadanUsahaPetaMasalah(event.target.value);
                                    }}
                                >
                                    {registrasi?.data?.map((data: any) => {
                                        return <MenuItem
                                            key={data.id}
                                            value={data.id}
                                        >
                                            {data.id}
                                        </MenuItem>
                                    })}
                                </Select>
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Alamat Lokasi Kegiatan<span className='text-danger-600'>*</span></Typography>
                                <TextField value={alamatLokasiKegiatan} onChange={(data) => setAlamatLokasiKegiatan(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Titik Koordinat (LATITUDE)<span className='text-danger-600'>*</span></Typography>
                                <TextField value={titikKoordinat} onChange={(data) => setTitikKoordinat(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Titik Koordinat (LONGITUDE)<span className='text-danger-600'>*</span></Typography>
                                <TextField value={titikKoordinat2} onChange={(data) => setTitikKoordinat2(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">NIB<span className='text-danger-600'>*</span></Typography>
                                <TextField value={nib} onChange={(data) => setNib(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">KBU (Perizinan Usaha)<span className='text-danger-600'>*</span></Typography>
                                <TextField value={kbu} onChange={(data) => setKbu(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Jenis Kegiatan (UKL-UPL)<span className='text-danger-600'>*</span></Typography>
                                <TextField value={jenisKegiatan} onChange={(data) => setJenisKegiatan(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Tahun Beroperasi<span className='text-danger-600'>*</span></Typography>
                                <TextField value={tahunBeroperasi} onChange={(data) => setTahunBeroperasi(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Status Permodalan<span className='text-danger-600'>*</span></Typography>
                                <TextField value={statusPermodalan} onChange={(data) => setStatusPermodalan(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Nilai Investasi<span className='text-danger-600'>*</span></Typography>
                                <TextField value={nilaiInvestasi} onChange={(data) => setNilaiInvestasi(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Skala Usaha<span className='text-danger-600'>*</span></Typography>
                                <TextField value={skalaUsaha} onChange={(data) => setSkalaUsaha(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Total Luas Diusahakan<span className='text-danger-600'>*</span></Typography>
                                <TextField value={totalLuasDiusahakan} onChange={(data) => setTotalLuasDiusahakan(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Dokumen Lingkungan<span className='text-danger-600'>*</span></Typography>
                                <TextField value={dokumenLingkungan} onChange={(data) => setDokumenLingkungan(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Nomor Rekomendasi<span className='text-danger-600'>*</span></Typography>
                                <TextField value={nomorRekomendasi} onChange={(data) => setNomorRekomendasi(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Nomor Izin Lingkungan<span className='text-danger-600'>*</span></Typography>
                                <TextField value={nomorIzinLingkungan} onChange={(data) => setNomorIzinLingkungan(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Kapasitas Prod. Terpasang<span className='text-danger-600'>*</span></Typography>
                                <TextField value={kapasitasTerpasang} onChange={(data) => setKapasitasTerpasang(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Kapasitas Prod. Senyatanya<span className='text-danger-600'>*</span></Typography>
                                <TextField value={kapasitasSenyatanya} onChange={(data) => setKapasitasSenyatanya(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Bahan Baku<span className='text-danger-600'>*</span></Typography>
                                <TextField value={bahanBaku} onChange={(data) => setBahanBaku(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Bahan Penolong<span className='text-danger-600'>*</span></Typography>
                                <TextField value={bahanPenolong} onChange={(data) => setBahanPenolong(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Pemasaran / Distribusi<span className='text-danger-600'>*</span></Typography>
                                <TextField value={pemasaran} onChange={(data) => setPemasaran(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Jumlah Karyawan<span className='text-danger-600'>*</span></Typography>
                                <TextField value={karyawan} onChange={(data) => setKaryawan(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">Lain-lain<span className='text-danger-600'>*</span></Typography>
                                <TextField value={lainnya} onChange={(data) => setLainnya(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12} mt={'1rem'}>
                                <Typography className="text-base-dark w-full">Sumber Data <span className='text-danger-600'>*</span></Typography>
                                <Select
                                    value={sumberData}
                                    className='rounded-lg mt-2'
                                    fullWidth
                                    onChange={(event) => {
                                        setSumberData(event.target.value);
                                    }}
                                >
                                    {sumberDataQuery?.data?.map((data: any) => {
                                        return <MenuItem
                                            key={data.id}
                                            value={data.id}
                                        >
                                            {data.name}
                                        </MenuItem>
                                    })}
                                </Select>
                            </Grid2>
                            <Typography className='my-4'>
                                PETA MASALAH
                            </Typography>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">a. Pemeriksaan Dokumen Perizinan Lingkungan<span className='text-danger-600'>*</span></Typography>
                                <TextField value={petaMasalahA} onChange={(data) => setPetaMasalahA(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">b. Pemeriksaan terhadap Pengendalian Pencemaran Air<span className='text-danger-600'>*</span></Typography>
                                <TextField value={petaMasalahB} onChange={(data) => setPetaMasalahB(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">c. Pemeriksaan terhadap Pengendalian Pencemaran Udara<span className='text-danger-600'>*</span></Typography>
                                <TextField value={petaMasalahC} onChange={(data) => setPetaMasalahC(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">d. Pemeriksaan terhadap Pengolahan Limbah B3<span className='text-danger-600'>*</span></Typography>
                                <TextField value={petaMasalahD} onChange={(data) => setPetaMasalahD(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">e. Pemeriksaan terhadap Pengelolaan Sampah Sejenis Sampah Rumah<span className='text-danger-600'>*</span></Typography>
                                <TextField value={petaMasalahE} onChange={(data) => setPetaMasalahE(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Grid2 container xs={12}>
                                <Typography className="text-base-dark w-full">f. Catatan Lainnya<span className='text-danger-600'>*</span></Typography>
                                <TextField value={petaMasalahF} onChange={(data) => setPetaMasalahF(data.target.value)} variant="outlined" className='mt-2 w-full'
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }} />
                            </Grid2>
                            <Button onClick={onCreatePetamasalah} className='bg-primary-600 text-base-white hover:bg-primary-600 hover:text-base-white w-full mt-4' >
                                Simpan
                            </Button>
                        </Grid2>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Grid2 container>
                            <Grid2 xs={12} container className='w-full justify-end'>
                                <Button className="w-full mt-4 bg-primary-600 text-base-white rounded-lg py-4 px-6 hover:bg-primary-600 md:mt-0 md:w-auto gap-2" onClick={() => setCatatanOpen(true)}><RiAddLine /> Tambah</Button>
                            </Grid2>
                        </Grid2>
                        <Table openFilter={openFilterTahapan} setOpenFilter={setOpenFilterTahapan} columns={columnsCatatan} data={catatan?.data ?? []} state={{ isLoading: getting || isFetching }} filterExclude={filterExcludeTahapan}></Table>
                    </CustomTabPanel>
                </TabPanel>
            </Grid2>
        </Layout >
    );
}