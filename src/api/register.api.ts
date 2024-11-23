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
        getCatatan: builder.query<any, string>({
            query: (id: string) => ({
                url: `catatan/${id ?? '9d8ac6d0-297b-499f-bf0f-e0344fae59e6'}`,
            }),
        }),
        getDetailRegistrasi: builder.query<any, string>({
            query: (id: string) => ({
                url: `registrasi/${id ?? '9d8ac6d0-297b-499f-bf0f-e0344fae59e6'}`,
            }),
        }),
        getDetailPetamasalah: builder.query<any, string>({
            query: (id: string) => ({
                url: `peta-masalah/${id ?? '9d8ac6d0-297b-499f-bf0f-e0344fae59e6'}`,
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
        updateRegistrasi: builder.mutation<any, any>({
            query: (data: any) => ({
                url: `registrasi/update/${data.id}`,
                method: "POST",
                body: data.data,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        updatePetamasalah: builder.mutation<any, any>({
            query: (data: any) => ({
                url: `peta-masalah/update/${data.id}`,
                method: "POST",
                body: data.data,
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
        createCatatan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `catatan/create`,
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
    useGetCatatanQuery,
    useGetDetailRegistrasiQuery,
    useGetDetailPetamasalahQuery,
    useCreateRegistrasiMutation,
    useUpdateRegistrasiMutation,
    useCreatePetaMasalahMutation,
    useUpdatePetamasalahMutation,
    useCreateCatatanMutation
} = api_register;