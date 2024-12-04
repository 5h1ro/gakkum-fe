import { api } from "./base.api";

export const api_perencanaan = api.injectEndpoints({
    endpoints: (builder) => ({
        getPerencanaan: builder.query<any, void>({
            query: () => ({
                url: 'perencanaan',
            }),
        }),
        getActiveEmployee: builder.query<any, void>({
            query: () => ({
                url: 'employees',
            }),
        }),
        createTim: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `tim-pengawas/create`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        getTim: builder.query<any, string>({
            query: (dataID: string) => ({
                url: `tim-pengawas/data/${dataID}`,
            }),
        }),
        getDokumen: builder.query<any, string>({
            query: (dataID: string) => ({
                url: `perencanaan/dokumen/data/${dataID}`,
            }),
        }),
        getListDokumen: builder.query<any, void>({
            query: () => ({
                url: `dokumen-perencanaan`,
            }),
        }),
        createDokumen: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `perencanaan/dokumen/create`,
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
    useGetPerencanaanQuery,
    useGetActiveEmployeeQuery,
    useCreateTimMutation,
    useGetTimQuery,
    useGetDokumenQuery,
    useGetListDokumenQuery,
    useCreateDokumenMutation
} = api_perencanaan;