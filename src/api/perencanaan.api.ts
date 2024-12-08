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
        updateTim: builder.mutation<any, any>({
            query: ({ data, id }) => ({
                url: `tim-pengawas/update/${id}`,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        deleteTim: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `tim-pengawas/delete/${id}`,
                method: "DELETE",
            }),
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
        updateDokumen: builder.mutation<any, any>({
            query: ({ data, id }) => ({
                url: `perencanaan/dokumen/update/${id}`,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        deleteDokumen: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `perencanaan/dokumen/delete/${id}`,
                method: "DELETE",
            }),
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
    useCreateDokumenMutation,
    useUpdateTimMutation,
    useDeleteTimMutation,
    useUpdateDokumenMutation,
    useDeleteDokumenMutation
} = api_perencanaan;