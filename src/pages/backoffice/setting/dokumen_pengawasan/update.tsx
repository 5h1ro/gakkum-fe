import { LoadingButton } from '@mui/lab';
import { Alert, Autocomplete, Button, Card, CardContent, IconButton, Snackbar, Stack, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
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
import { useGetDetailDokumenPengawasanPengaturanQuery, useUpdateDokumenPengawasanPengaturanMutation } from '../../../../api/setting.api';

interface updateDokumenPengawasanProps {
    showSnackBar: snackbarType
    setShowSnackbar: Dispatch<React.SetStateAction<snackbarType>>
}

export default function UpdateDokumenPengawasan(props: updateDokumenPengawasanProps) {
    const [showSnackbarLocal, setShowSnackbarLocal] = useState<snackbarType>({
        isOpen: false,
        message: '',
        status: 'success'
    });
    const { showSnackBar, setShowSnackbar } = props;
    const navigate = useNavigate()
    const { dokumenPengawasanID } = useParams();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isActive, setIsActive] = useState<boolean>(true)

    const [updateDokumenPengawasan, { isLoading }] = useUpdateDokumenPengawasanPengaturanMutation();
    const handleSave = async () => {
        const formData = new FormData();
        formData.append('id', dokumenPengawasanID!);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('is_active', `${isActive ? 1 : 0}`);
        formData.append('_method', 'PUT');
        try {
            await updateDokumenPengawasan(formData).unwrap();
            setShowSnackbar({
                isOpen: true,
                message: 'Berhasil mengubah data',
                status: 'success'
            })
            navigate('/pengaturan/dokumen-pengawasan')
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

    const { data: dataDokumenPengawasan } = useGetDetailDokumenPengawasanPengaturanQuery(dokumenPengawasanID!);
    useEffect(() => {
        if (dataDokumenPengawasan) {
            setName(dataDokumenPengawasan.data?.name ?? '')
            setDescription(dataDokumenPengawasan.data?.description ?? '')
            setIsActive(dataDokumenPengawasan.data?.is_active ?? false)
        }
    }, [dataDokumenPengawasan]);
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
                <IconButton onClick={() => navigate('/pengaturan/dokumen-pengawasan')}>
                    <RiArrowLeftLine className="w-8 h-8" color="#000000" />
                </IconButton>
                <Typography className="w-10/12 text-4xl font-semibold text-base-dark pt-1">
                    Update Dokumen Pengawasan
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
                            <Typography className="text-base-dark w-full">Deskripsi <span className='text-danger-600'>*</span></Typography>
                            <TextField value={description} onChange={(data) => setDescription(data.target.value)} variant="outlined" className='mt-2 w-full' placeholder='Masukkan deskripsi'
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