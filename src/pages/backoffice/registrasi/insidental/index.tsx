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
import { snackbarType } from '../../../../interfaces/snackbar.interface';
import Table from '../../../../components/organism/Table';
import { useGetInsidentalQuery } from '../../../../api/register.api';

function RegistrasiInsidental() {
    const navigate = useNavigate();
    const [openFilter, setOpenFilter] = useState<boolean>(false)
    const filterExclude = ['aksi']
    const { data: insidental, isLoading: getting, isFetching } = useGetInsidentalQuery();

    const columns: MRT_ColumnDef<any>[] = [
        {
          accessorKey: "id",
          header: "ID",
          Cell: ({ row }) => row.index + 1,
        },
        {
          header: "Tanggal",
          muiTableHeadCellProps: {
            align: "left",
          },
          muiTableBodyCellProps: {
            align: "left",
          },
          muiFilterTextFieldProps: {
            variant: "outlined",
          },
          accessorKey: "date_create",
          Cell: ({ row }) => row.original.date_create,
        },
        {
          header: "Nama Usaha",
          enableClickToCopy: true,
          muiTableHeadCellProps: {
            align: "left",
          },
          muiTableBodyCellProps: {
            align: "left",
          },
          filterFn: "fuzzy",
          filterVariant: "select",
          muiFilterTextFieldProps: {
            variant: "outlined",
          },
          accessorKey: "company.name",
          Cell: ({ row }) => row.original.company.name,
        },
        {
          header: "Jenis",
          enableClickToCopy: true,
          muiTableHeadCellProps: {
            align: "left",
          },
          muiTableBodyCellProps: {
            align: "left",
          },
          filterFn: "fuzzy",
          filterVariant: "select",
          muiFilterTextFieldProps: {
            variant: "outlined",
          },      
          accessorKey: "jenis_pengawasan",
          Cell: ({ row }) => row.original.jenis_pengawasan,
        },
        {
          header: "Perkiraan masalah",
          enableClickToCopy: true,
          size: 200,
          muiTableHeadCellProps: {
            align: "left",
          },
          muiTableBodyCellProps: {
            align: "left",
            sx: {
                whiteSpace: "normal",
                wordBreak: "break-word",
                borderBottom: "none"
                }
          },
          filterFn: "fuzzy",
          filterVariant: "select",
          muiFilterTextFieldProps: {
            variant: "outlined",
          },
          accessorKey: "perkiraan_masalah",
          Cell: ({ row }) => row.original.perkiraan_masalah,
        },
        {
          header: "Dibuat",
          enableClickToCopy: true,
          muiTableHeadCellProps: {
            align: "left",
          },
          muiTableBodyCellProps: {
            align: "left",
          },
          filterFn: "fuzzy",
          filterVariant: "select",
          muiFilterTextFieldProps: {
            variant: "outlined",
          },      
          accessorKey: "employee.name",
          Cell: ({ row }) => row.original.employee.name,
        },
        {
          header: "Status",
          accessorKey: "status_tahapan",
          enableClickToCopy: true,
          muiTableHeadCellProps: {
            align: "left",
          },
          muiTableBodyCellProps: {
            align: "left",
          },
          filterFn: "fuzzy",
          filterVariant: "select",
          muiFilterTextFieldProps: {
            variant: "outlined",
          },
        },
        {
          accessorKey: "aksi",
          header: "Aksi",
          muiTableHeadCellProps: {
            align: "left",
          },
          muiTableBodyCellProps: {
            align: "left",
          },
          size: 50,
          Cell: ({ row }) => {
            return (
              <IconButton
                className="border-solid border-2 text-primary-600"
                aria-label="confirm"
                onClick={() =>
                  navigate(`/register/daftar/detail/${row.original.id}`)
                }
              >
                <RiEyeLine />
              </IconButton>
            );
          },
          enableColumnFilter: false,
          enableSorting: false
        },
      ];

    return (
        <Layout>
            <Grid2 container justifyContent={'space-between'}>
                <Grid2 container alignContent={'center'}>
                    <Typography className="text-3xl font-semibold text-base-dark mt-[-2px] md:mt-0 md:text-4xl">
                        Registrasi &gt; Insidental
                    </Typography>
                </Grid2>
                <Grid2 container gap={2} className='w-full md:w-auto'>
                    {/* <Button className="w-full mt-4 bg-primary-600 text-base-white rounded-lg py-4 px-6 hover:bg-primary-600 md:mt-0 md:w-auto gap-2" onClick={() => navigate('/register/daftar/tambah')}><RiAddLine /> Tambah</Button> */}
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
                        <Table openFilter={openFilter} setOpenFilter={setOpenFilter} columns={columns} data={insidental?.data ?? []} state={{ isLoading: getting || isFetching }} filterExclude={filterExclude}></Table>
                    </Stack>
                </Box>
            </Grid2>
        </Layout>
    );
};

export default RegistrasiInsidental;
