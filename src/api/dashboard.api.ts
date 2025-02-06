import { api } from "./base.api";

export const api_dashboard = api.injectEndpoints({
    endpoints: (builder) => ({
        getDashboard: builder.query<any, void>({
            query: () => ({
                url: 'dashboard',
            }),
        }),
        getNotification: builder.query<any, void>({
            query: () => ({
                url: 'notifikasi',
            }),
        }),
        getNotificationAll: builder.query<any, void>({
            query: () => ({
                url: 'notifikasi/all',
            }),
        }),
    })
});

export const {
    useGetDashboardQuery,
    useGetNotificationQuery,
    useGetNotificationAllQuery
} = api_dashboard;