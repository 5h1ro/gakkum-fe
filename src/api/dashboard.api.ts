import { api } from "./base.api";

export const api_dashboard = api.injectEndpoints({
    endpoints: (builder) => ({
        getDashboard: builder.query<any, void>({
            query: () => ({
                url: 'dashboard',
            }),
        }),
    })
});

export const {
    useGetDashboardQuery
} = api_dashboard;