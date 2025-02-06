import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Layout from '../../../../components/Layout';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { gapi } from "gapi-script";
import { useEffect, useState } from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useGetAgendaPengawasanQuery } from '../../../../api/pengawasan.api';
import { useNavigate } from 'react-router-dom';

function PengawasanAgenda() {
    const [events, setEvents] = useState<any[]>([]);
    const localizer = momentLocalizer(moment);

    // useEffect(() => {
    //     const initClient = () => {
    //         gapi.client
    //             .init({
    //                 apiKey: API_KEY,
    //                 clientId: CLIENT_ID,
    //                 discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    //                 scope: SCOPES,
    //             })
    //             .then(() => listEvents());
    //     };

    //     gapi.load("client:auth2", initClient);
    // }, []);

    // const listEvents = async () => {
    //     const response = await gapi.client.calendar.events.list({
    //         calendarId: "primary",
    //         timeMin: new Date().toISOString(),
    //         showDeleted: false,
    //         singleEvents: true,
    //         orderBy: "startTime",
    //     });

    //     const fetchedEvents = response.result.items.map((event: any) => ({
    //         title: event.summary,
    //         start: new Date(event.start.dateTime || event.start.date),
    //         end: new Date(event.end.dateTime || event.end.date),
    //     }));

    //     setEvents(fetchedEvents);
    // };

    const navigate = useNavigate();
    const handleEventClick = (data: any) => {
        navigate(`/pengawasan/daftar/detail/${data.id}`);
    };
    const { data: dataAgenda, isLoading: getting, isFetching } = useGetAgendaPengawasanQuery();
    useEffect(() => {
        setEvents(dataAgenda?.data ?? [])
    }, [dataAgenda])
    return (
        <Layout>
            <Grid2 container justifyContent={'space-between'}>
                <Grid2 container alignContent={'center'}>
                    <Typography className="text-3xl font-semibold text-base-dark mt-[-2px] md:mt-0 md:text-4xl">
                        Pengawasan &gt; Agenda
                    </Typography>
                </Grid2>
                <Grid2 container gap={2} className='w-full md:w-auto'>
                    {/* <Button className="w-full mt-4 bg-primary-600 text-base-white rounded-lg py-4 px-6 hover:bg-primary-600 md:mt-0 md:w-auto gap-2" onClick={() => navigate('/register/daftar/tambah')}><RiAddLine /> Tambah</Button> */}
                </Grid2>
            </Grid2>
            <Calendar
                localizer={localizer}
                events={events}
                showMultiDayTimes
                style={{ height: 500 }}
                className='mt-16'
                onSelectEvent={handleEventClick}
                eventPropGetter={(event) => {
                    let backgroundColor = "#EFB036"; // Default untuk "Pembahasan"
                    if (event.tahapan === "Pengambilan Sampel") {
                        backgroundColor = "#3B6790";
                    }
                    if (event.tahapan === "Pembahasan") {
                        backgroundColor = "#EB5A3C";
                    }
                    if (event.tahapan === "Permintaan Keterangan") {
                        backgroundColor = "#A02334";
                    }

                    return {
                        style: {
                            backgroundColor,
                            color: "#fff",
                            borderRadius: "5px",
                            border: "none",
                        },
                    };
                }}
            />
        </Layout>
    );
};

export default PengawasanAgenda;
