import { Alert, Box, Button, Chip, Dialog, DialogContent, DialogContentText, IconButton, Snackbar, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { RiAddLine, RiArrowDownSLine, RiArrowUpSLine, RiDeleteBin7Line, RiEditLine, RiEyeLine, RiListUnordered } from '@remixicon/react';
import {
    type MRT_ColumnDef,
} from 'material-react-table';
import moment from 'moment';
import { Dispatch, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../../components/Layout';
import Table from '../../../../components/organism/Table';
import { snackbarType } from '../../../../interfaces/snackbar.interface';
import { useDeleteStatusDataMutation, useGetStatusDataQuery } from '../../../../api/setting.api';


interface statusDataProps {
    showSnackBar: snackbarType
    setShowSnackbar: Dispatch<React.SetStateAction<snackbarType>>
}

function StatusData(props: statusDataProps) {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const { showSnackBar, setShowSnackbar } = props;
    const [statusDataID, setStatusDataID] = useState('')
    const navigate = useNavigate();
    const [openFilter, setOpenFilter] = useState<boolean>(false)
    const [openFilterMobile, setOpenFilterMobile] = useState<boolean>(false)
    const filterExclude = ['report', 'aksi']
    const [deleteStatusData] = useDeleteStatusDataMutation();

    const { data: dataStatusData, isLoading: getting, isFetching } = useGetStatusDataQuery();
    const columns: MRT_ColumnDef<any>[] = [
        {
            accessorKey: "name",
            header: 'Nama',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            Cell: ({ row }) => {
                return <Typography>{row.original.name}</Typography>
            },
            filterFn: 'equals',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "description",
            header: 'Deskripsi',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            Cell: ({ row }) => {
                return <Typography>{row.original.description}</Typography>
            },
            filterFn: 'equals',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "status",
            header: 'Status',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            Cell: ({ row }) => {
                let status_data
                switch (row.original.is_active) {
                    case 1:
                        status_data = {
                            status: 'Active',
                            style: {
                                bg: 'success',
                                text: 'success'
                            }
                        }
                        break;
                    case 0:
                        status_data = {
                            status: 'Inactive',
                            style: {
                                bg: 'danger',
                                text: 'danger'
                            }
                        }
                        break;
                    default:
                        status_data = {
                            status: 'Tidak Diketahui',
                            style: {
                                bg: 'success',
                                text: 'success'
                            }
                        }
                        break;
                }
                return <Chip label={status_data.status} className={`bg-${status_data.style.bg}-50 text-${status_data.style.text}-500 rounded-md`} />
            },
            filterFn: 'equals',
            filterSelectOptions: [
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
            ],
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
                return <div className='flex gap-2'>
                    <IconButton className="border-solid border-2 text-primary-600" aria-label="confirm" onClick={() => navigate(`/pengaturan/status-data/detail/${row.original.id}`)}>
                        <RiEyeLine />
                    </IconButton>
                    <IconButton className="border-solid border-2 text-secondary-600" aria-label="confirm" onClick={() => navigate(`/pengaturan/status-data/update/${row.original.id}`)}>
                        <RiEditLine />
                    </IconButton>
                    <IconButton className="border-solid border-2 text-danger-600" aria-label="confirm" onClick={() => {
                        setStatusDataID(!dataStatusData ? '' : dataStatusData.data![row.index].id.toString())
                        setOpenDialog(true)
                    }}>
                        <RiDeleteBin7Line />
                    </IconButton>
                </div>
            },
            enableColumnFilter: false,
        },
    ];

    const handleCloseSnackbar = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowSnackbar({
            isOpen: false,
            message: showSnackBar.message,
            status: 'success'
        })
    };

    const handleCloseDialog = () => {
        setOpenDialog(false)
    };

    return (
        <Layout>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth={'lg'}
                sx={{
                    '.MuiPaper-root': {
                        borderRadius: '16px',
                    }
                }}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className='justify-center align-center text-center pt-8 md:pt-16 w-full md:w-[622px]'>
                        <img
                            src='/images/danger.svg'
                            loading="lazy"
                        />
                        <Typography className='text-[32px] font-semibold text-base-dark'>
                            Apakah kamu yakin akan menghapus data ini?
                        </Typography>
                        <Typography marginTop={'16px'}>
                            Setelah data dihapus Anda tidak bisa melihat data tersebut
                        </Typography>
                    </DialogContentText>
                    <Grid2 container className='flex gap-2 mt-6 justify-center pb-8 md:pb-16'>
                        <Button className='bg-danger-500 text-base-white hover:bg-danger-500 hover:text-base-white py-4 px-6 rounded-xl' onClick={() => {
                            try {
                                deleteStatusData(statusDataID)
                                setOpenDialog(false)
                                setShowSnackbar({
                                    isOpen: true,
                                    message: "Berhasil menghapus data",
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
                        }}>
                            Hapus
                        </Button>
                        <Button className='bg-base-white text-general-500 hover:bg-base-white hover:text-general-500 py-4 px-6 rounded-xl' onClick={handleCloseDialog}>
                            Batal
                        </Button>
                    </Grid2>
                </DialogContent>
            </Dialog>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={showSnackBar.isOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert
                    onClose={handleCloseSnackbar}
                    className={(showSnackBar.status === 'success' ? 'bg-success-500' : 'bg-danger-500') + ' w-[85vw] md:w-[496px]'}
                    variant="filled"
                >
                    {showSnackBar.message}
                </Alert>
            </Snackbar>
            <Grid2 container justifyContent={'space-between'}>
                <Grid2 container alignContent={'center'}>
                    <Typography className="text-3xl font-semibold text-base-dark mt-[-2px] md:mt-0 md:text-4xl">
                        Manajemen Status Data
                    </Typography>
                </Grid2>
                <Grid2 container gap={2} className='w-full md:w-auto'>
                    <Button className="w-full mt-4 bg-primary-600 text-base-white rounded-lg py-4 px-6 hover:bg-primary-600 md:mt-0 md:w-auto gap-2" onClick={() => navigate('/pengaturan/status-data/create')}><RiAddLine /> Tambah</Button>
                </Grid2>
            </Grid2>

            <Grid2 container className="hidden md:block" marginTop={4}>
                <Box sx={{
                    "& .MuiBox-root": {
                        boxShadow: "0",
                    },
                    "& .MuiPaper-root": {
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        paddingTop: '14px',
                    },
                    bgcolor: 'white'
                }}>
                    <Stack sx={{ margin: '24px' }}>
                        <Table openFilter={openFilter} setOpenFilter={setOpenFilter} columns={columns} data={dataStatusData?.data ?? []} state={{ isLoading: getting || isFetching }} filterExclude={filterExclude}></Table>
                    </Stack>
                </Box>
            </Grid2>
        </Layout>
    );
};

export default StatusData;
