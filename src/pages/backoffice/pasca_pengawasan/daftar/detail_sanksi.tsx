import { Box, Button, Chip, Dialog, DialogContent, DialogContentText, IconButton, List, ListItem, ListItemText, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import moment, { Moment } from "moment";
import { RiAddLine, RiArrowDownSLine, RiArrowLeftLine, RiArrowUpSLine, RiCloseLine, RiDeleteBin2Fill, RiEdit2Fill, RiEditCircleLine, RiEditLine } from "@remixicon/react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../../components/Layout";
import Table from "../../../../components/organism/Table";
import { useGetDetailPascaPengawasanQuery } from "../../../../api/register.api";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useCreateTindakanSanksiPascaPengawasanMutation, useDeleteTindakanSanksiPascaPengawasanMutation, useGetActiveEmployeeQuery, useUpdateTindakanSanksiPascaPengawasanMutation } from "../../../../api/pascaPengawasan.api";

function DetailSanksi() {
    const { dataID, sanksiID } = useParams();
    const { data: detail, isLoading: getting, isFetching } = useGetDetailPascaPengawasanQuery(dataID!);
    const [tindakanSanksi, setTindakanSanksi] = useState<any[]>([])

    useEffect(() => {
        if (detail?.data?.sanksi) {
            const tindakan = detail?.data?.sanksi.find((s: any) => s.id === sanksiID);
            setTindakanSanksi(tindakan?.tindakan_sanksi ?? [])
        }

    }, [detail])

    const navigate = useNavigate();
    const [tindakanOpen, setTindakanOpen] = useState<boolean>(false)
    const [tindakanEdit, setTindakanEdit] = useState<boolean>(false)
    const { data: employees } = useGetActiveEmployeeQuery();
    const [tindakanKewajiban, setTindakanKewajiban] = useState<string>('')
    const [tindakanID, setTindakanID] = useState<string>('')
    const [tindakanStatus, setTindakanStatus] = useState<string>('')
    const [tindakanJatuhTempo, setTindakanJatuhTempo] = useState<Moment | null>(null)
    const [tindakanEmployee, setTindakanEmployee] = useState<string>('')
    const [createTindakan, { isLoading: isLoadingTindakan }] = useCreateTindakanSanksiPascaPengawasanMutation();
    const [updateTindakan] = useUpdateTindakanSanksiPascaPengawasanMutation();
    const [deleteTindakan] = useDeleteTindakanSanksiPascaPengawasanMutation();
    const onCreateTindakan = async () => {
        const formData = new FormData();
        formData.append('sanksi_id', sanksiID!);
        formData.append('pemenuhan_kewajiban', tindakanKewajiban);
        formData.append('status', tindakanStatus);
        formData.append('jatuh_tempo', tindakanJatuhTempo?.format('YYYY-MM-DD') ?? moment().format('YYYY-MM-DD'));
        formData.append('employee_id', tindakanEmployee);
        try {
            if (tindakanEdit) {
                await updateTindakan({
                    data: formData,
                    id: tindakanID
                }).unwrap();
            } else {
                await createTindakan(formData).unwrap();
            }
            window.location.reload();
        } catch (error: any) {
        }
    };
    const [openFilter, setOpenFilter] = useState<boolean>(false)
    const filterExclude = ['aksi'];
    const columns: MRT_ColumnDef<any>[] = [
        {
            header: 'No.',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            Cell: ({ row }) => {
                return row.index + 1
            },
            size: 10,
            filterFn: 'fuzzy',
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "pic",
            header: 'PIC',
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
            accessorKey: "pemenuhan_kewajiban",
            header: 'Pemenuhan kewajiban',
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
            header: 'Sisa Waktu',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            Cell: ({ row }) => {
                return `${row.original.sisa_waktu} Hari`
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
                return <Grid2 container gap={1}>
                    <IconButton className="border-solid border-2 text-primary-600" aria-label="confirm" onClick={() => {
                        setTindakanEmployee(row.original.employee_id)
                        setTindakanID(row.original.id)
                        setTindakanJatuhTempo(moment(row.original.jatuh_tempo))
                        setTindakanKewajiban(row.original.pemenuhan_kewajiban)
                        setTindakanStatus(row.original.status)
                        setTindakanOpen(true)
                        setTindakanEdit(true)
                    }}>
                        <RiEdit2Fill />
                    </IconButton>
                    <IconButton className="border-solid border-2 text-danger-600" aria-label="delete" onClick={async () => {
                        await deleteTindakan(row.original.id).unwrap();
                        window.location.reload();
                    }}>
                        <RiDeleteBin2Fill />
                    </IconButton>
                </Grid2>
            },
            enableColumnFilter: false,
        },
    ];
    return (
        <Layout>
            <Grid2 container alignContent={'center'}>
                <IconButton onClick={() => navigate(`/pasca-pengawasan/daftar/detail/${dataID}`)}>
                    <RiArrowLeftLine className="w-8 h-8" color="#000000" />
                </IconButton>
                <Typography className="w-10/12 text-4xl font-semibold text-base-dark pt-1">
                    Detail Sanksi
                </Typography>
            </Grid2>
            <Dialog
                open={tindakanOpen}
                onClose={() => setTindakanOpen(false)}
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
                    onClick={() => setTindakanOpen(false)}
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
                            Tambah Sanksi
                        </Typography>
                    </DialogContentText>
                    <Grid2 container>
                        <Typography className="text-base-dark w-full mt-6">Status <span className='text-danger-600'>*</span></Typography>
                        <Select
                            value={tindakanStatus}
                            className='rounded-lg mt-2'
                            fullWidth
                            onChange={(event) => {
                                setTindakanStatus(event.target.value)
                            }}
                        >
                            <MenuItem
                                key={`Terpenuhi`}
                                value={'Terpenuhi'}
                            >
                                Terpenuhi
                            </MenuItem>
                            <MenuItem
                                key={`Belum Terpenuhi`}
                                value={'Belum Terpenuhi'}
                            >
                                Belum Terpenuhi
                            </MenuItem>
                        </Select>
                    </Grid2>
                    <Grid2 container>
                        <Typography className="text-base-dark w-full mt-6">Pemenuhan Kewajiban <span className='text-danger-600'>*</span></Typography>
                        <TextField value={tindakanKewajiban} onChange={(data) => setTindakanKewajiban(data.target.value)} variant="outlined" className='mt-2 w-full'
                            InputProps={{
                                style: {
                                    borderRadius: "10px",
                                }
                            }} />
                    </Grid2>
                    <Grid2 container>
                        <Typography className="text-base-dark w-full mt-6">Karyawan <span className='text-danger-600'>*</span></Typography>
                        <Select
                            value={tindakanEmployee}
                            className='rounded-lg mt-2'
                            fullWidth
                            onChange={(event) => {
                                setTindakanEmployee(event.target.value)
                            }}
                        >
                            {
                                employees?.data?.map((value: any, index: any) => {
                                    return <MenuItem
                                        key={`employee_${index}`}
                                        value={value.id}
                                    >
                                        {value.name}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </Grid2>
                    <Grid2 container xs={12} mt={'1rem'}>
                        <Typography className="text-base-dark w-full">Tanggal Jatuh Tempo<span className='text-danger-600'>*</span></Typography>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDateTimePicker
                                ampm={false}
                                value={tindakanJatuhTempo}
                                onChange={(data) => setTindakanJatuhTempo(data)}
                                className='mt-2 w-full' />
                        </LocalizationProvider>
                    </Grid2>
                    <Grid2 container className='flex gap-2 mt-6 justify-center pb-8 md:pb-16'>
                        <Button onClick={onCreateTindakan} className='bg-primary-600 text-base-white hover:bg-primary-600 hover:text-base-white py-4 px-6 rounded-xl gap-3'>
                            Simpan
                        </Button>
                    </Grid2>
                </DialogContent>
            </Dialog>
            <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1 }} marginTop={3}>
                <Grid2 className="bg-base-white rounded-lg" xs={12}>
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
                            <Grid2 container>
                                <Grid2 xs={12} container className='w-full justify-end'>
                                    <Button className="w-full mt-4 bg-primary-600 text-base-white rounded-lg py-4 px-6 hover:bg-primary-600 md:mt-0 md:w-auto gap-2" onClick={() => {
                                        setTindakanEmployee('')
                                        setTindakanID('')
                                        setTindakanJatuhTempo(moment(''))
                                        setTindakanKewajiban('')
                                        setTindakanStatus('')
                                        setTindakanOpen(true)
                                    }}><RiAddLine /> Tambah</Button>
                                </Grid2>
                            </Grid2>
                            <Stack sx={{ margin: '24px' }}>
                                <Table openFilter={openFilter} setOpenFilter={setOpenFilter} columns={columns} data={tindakanSanksi} filterExclude={filterExclude}></Table>
                            </Stack>
                        </Box>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Layout >
    )
}

export default DetailSanksi 