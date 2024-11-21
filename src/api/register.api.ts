import { api } from "./base.api";

export const api_register = api.injectEndpoints({
    endpoints: (builder) => ({
        getRegistrasi: builder.query<any, void>({
            query: () => ({
                url: 'registrasi',
            }),
        }),
        getStatusData: builder.query<any, void>({
            query: () => ({
                url: 'status-data',
            }),
        }),
        getBadanUsaha: builder.query<any, void>({
            query: () => ({
                url: 'company',
            }),
        }),
        getSumberData: builder.query<any, void>({
            query: () => ({
                url: 'sumber-data',
            }),
        }),
        createRegistrasi: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `registrasi/create`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        createPetaMasalah: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `peta-masalah/create`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
    })
});

export const {
    useGetRegistrasiQuery,
    useGetStatusDataQuery,
    useGetBadanUsahaQuery,
    useGetSumberDataQuery,
    useCreateRegistrasiMutation,
    useCreatePetaMasalahMutation
} = api_register;