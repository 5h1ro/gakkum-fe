import { Autocomplete, Card, IconButton, Stack, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { RiArrowLeftLine, RiCloseLine } from '@remixicon/react';
import { Editor } from '@tinymce/tinymce-react';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UseSwitchesCustom from '../../../../components/atoms/Switch';
import Layout from '../../../../components/Layout';
import { useGetDetailDokumenPascaPengawasanPengaturanQuery } from '../../../../api/setting.api';

export default function DetailDokumenPascaPengawasan() {
    const navigate = useNavigate()
    const { dokumenPascaPengawasanID } = useParams();
    const [isActive, setIsActive] = useState<boolean>(true)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const { data: dataDokumenPascaPengawasan } = useGetDetailDokumenPascaPengawasanPengaturanQuery(dokumenPascaPengawasanID!);
    useEffect(() => {
        if (dataDokumenPascaPengawasan) {
            setName(dataDokumenPascaPengawasan.data?.name ?? '')
            setDescription(dataDokumenPascaPengawasan.data?.description ?? '')
            setIsActive(dataDokumenPascaPengawasan.data?.is_active ?? false)
        }
    }, [dataDokumenPascaPengawasan]);
    return (
        <Layout>
            <Grid2 container alignContent={'center'}>
                <IconButton onClick={() => navigate('/pengaturan/dokumen-pasca-pengawasan')}>
                    <RiArrowLeftLine className="w-8 h-8" color="#000000" />
                </IconButton>
                <Typography className="w-10/12 text-4xl font-semibold text-base-dark pt-1">
                    Detail Dokumen Pasca Pengawasan
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
                            <Typography className="text-base-dark w-full">Deskripsi <span className='text-danger-600'>*</span></Typography>
                            <TextField value={description} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Deskripsi'
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