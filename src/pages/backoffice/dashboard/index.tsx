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

function Dashboard() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState<Moment | null>(null);
    const [endDate, setEndDate] = useState<Moment | null>(null);

    const data = [
        {
            name: 'Register',
            total: 0,
            image: '/icons/paper.svg',
            hidden: false
        },
        {
            name: 'Perencanaan',
            total: 0,
            image: '/icons/paper.svg',
            hidden: false
        },
        {
            name: 'Pengawasan',
            total: 0,
            image: '/icons/paper.svg',
            hidden: false
        },
        {
            name: 'Pasca Pengawasan',
            total: 0,
            image: '/icons/paper.svg',
            hidden: false
        },
    ];
    let card1 = data.map(function (data, index) {
        return <Card1 image={data.image} name={data.name} total={parseInt(data.total.toString())} index={index} key={data.name} hidden={data.hidden}></Card1>;
    });
    return (
        <Layout>
            <Typography className="text-4xl font-semibold text-base-dark mb-6">
                Dashboard
            </Typography>
            <Grid2 className="md:w-1/3">
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Box display="flex" alignItems="center">
                        <DatePicker
                            className="bg-base-white"
                            label="Awal"
                            value={startDate}
                            onChange={(newDate) => {
                                setStartDate(newDate!)

                            }}
                            slotProps={{ textField: { fullWidth: true } }} // Use slotProps for the input field
                        />
                        <Box sx={{ mx: 2 }}> - </Box>
                        <DatePicker
                            className="bg-base-white"
                            label="Akhir"
                            value={endDate}
                            onChange={(newDate) => setEndDate(newDate!)}
                            slotProps={{ textField: { fullWidth: true } }} // Use slotProps for the input field
                        />
                    </Box>
                </LocalizationProvider>
            </Grid2>
            <Grid2 container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={'1rem'}>
                {card1}
            </Grid2>
        </Layout >
    )
}

export default Dashboard 