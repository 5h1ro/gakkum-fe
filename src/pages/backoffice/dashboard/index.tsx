import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moment } from "moment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useAuth } from "../../../hooks/auth.hook";
import Layout from "../../../components/Layout";
import Card1 from "../../../components/molecules/Card1";
import { RiFileAddFill, RiFileEditFill, RiFileChartFill, RiFileHistoryFill }  from '@remixicon/react';
import { useGetDashboardQuery } from '../../../api/dashboard.api';

function Dashboard() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState<Moment | null>(null);
    const [endDate, setEndDate] = useState<Moment | null>(null);    
    const { data: dashboard, isLoading: getting, isFetching } = useGetDashboardQuery();

    const data = [
        {
            name: 'Registrasi',
            total: 0,
            image: '/icons/RiFileAddFill.svg',
            hidden: false
        },
        {
            name: 'Perencanaan',
            total: 0,
            image: '/icons/RiFileEditFill.svg',
            hidden: false
        },
        {
            name: 'Pengawasan',
            total: 0,
            image: '/icons/RiFileChartFill.svg',
            hidden: false
        },
        {
            name: 'Pasca Pengawasan',
            total: 0,
            image: '/icons/RiFileHistoryFill.svg',
            hidden: false
        },
    ];

    const updatedData = !getting && dashboard ? data.map((item) => {
        switch (item.name) {
            case 'Registrasi':
                return { ...item, total: dashboard.data.registrasi_count };
            case 'Perencanaan':
                return { ...item, total: dashboard.data.perencanaan_count };
            case 'Pengawasan':
                return { ...item, total: dashboard.data.pengawasan_count };
            case 'Pasca Pengawasan':
                return { ...item, total: dashboard.data.pasca_pengawasan_count };
            default:
                return item;
        }
    }) : data;

    let card1 = updatedData.map((item, index) => {
        return (
            <Card1
                image={item.image}
                name={item.name}
                total={item.total}
                index={index}
                key={item.name}
                hidden={item.hidden}
            ></Card1>
        );
    });
    return (
        <Layout>
            <Typography className="text-4xl font-semibold text-base-dark mb-6">
                Dashboard
            </Typography>
            <Grid2 container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={'1rem'}>
                {card1}
            </Grid2>
        </Layout >
    )
}

export default Dashboard 