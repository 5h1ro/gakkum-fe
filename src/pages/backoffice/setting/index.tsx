import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moment } from "moment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useAuth } from "../../../hooks/auth.hook";
import Layout from "../../../components/Layout";

function Setting() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState<Moment | null>(null);
    const [endDate, setEndDate] = useState<Moment | null>(null);
    return (
        <Layout>
            <Typography className="text-4xl font-semibold text-base-dark mb-6">
                Pengaturan
            </Typography>
            <Grid2 className="md:w-1/3">
            </Grid2>
        </Layout >
    )
}

export default Setting 