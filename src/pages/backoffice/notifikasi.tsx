import { Box, Divider, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moment } from "moment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { RiFileAddFill, RiFileEditFill, RiFileChartFill, RiFileHistoryFill } from '@remixicon/react';
import { useGetNotificationAllQuery } from "../../api/dashboard.api";
import Layout from "../../components/Layout";

function Notifikasi() {
    const [notif, setNotif] = useState<any[]>([])
    const { data: dataNotif } = useGetNotificationAllQuery();

    useEffect(() => {
        setNotif(dataNotif?.data ?? [])
    }, [dataNotif])
    return (
        <Layout>
            <Typography className="text-4xl font-semibold text-base-dark mb-6">
                Notifikasi
            </Typography>
            <Grid2 className="bg-base-white rounded-lg">
                {notif.map((data, index) => {
                    return <>
                        <Divider hidden={index == 0} />
                        <Typography className={`text-base-dark px-4 py-4`}>{data.message}</Typography>
                    </>
                })}
            </Grid2>
        </Layout >
    )
}

export default Notifikasi 