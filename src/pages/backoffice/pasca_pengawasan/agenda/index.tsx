import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Layout from '../../../../components/Layout';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { gapi } from "gapi-script";
import { useEffect, useState } from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useGetAgendaPascaPengawasanQuery } from '../../../../api/pascaPengawasan.api';

function PascaPengawasanAgenda() {
    const [events, setEvents] = useState<any[]>([]);
    const localizer = momentLocalizer(moment);
    const CLIENT_ID = "49338518240-h05l0si2q6kh1n6bbn2vrrai5mprrev0.apps.googleusercontent.com";
    const API_KEY = "AIzaSyCMvcvDtlzBemr4alP3m6vDbqtoKJ31DTc";
    const SCOPES = "https://www.googleapis.com/auth/calendar.events";

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
    const { data: dataAgenda, isLoading: getting, isFetching } = useGetAgendaPascaPengawasanQuery();
    useEffect(() => {
        setEvents(dataAgenda?.data ?? [])
    }, [dataAgenda])
    return (
        <Layout>
            <Grid2 container justifyContent={'space-between'}>
                <Grid2 container alignContent={'center'}>
                    <Typography className="text-3xl font-semibold text-base-dark mt-[-2px] md:mt-0 md:text-4xl">
                        Pasca Pengawasan &gt; Agenda
                    </Typography>
                </Grid2>
                <Grid2 container gap={2} className='w-full md:w-auto'>
                    {/* <Button className="w-full mt-4 bg-primary-600 text-base-white rounded-lg py-4 px-6 hover:bg-primary-600 md:mt-0 md:w-auto gap-2" onClick={() => navigate('/register/daftar/tambah')}><RiAddLine /> Tambah</Button> */}
                </Grid2>
            </Grid2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                className='mt-16'
                eventPropGetter={(event) => {
                    let backgroundColor = "#003285"; // Default untuk "Penghentian Pelanggaran Tertentu"
                    if (event.tahapan === "Pengawasan Pelaksanaan SA") {
                        backgroundColor = "#C40C0C";
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

export default PascaPengawasanAgenda;
