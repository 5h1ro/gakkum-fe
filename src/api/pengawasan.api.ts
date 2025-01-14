import { api } from "./base.api";

export const api_pengawasan = api.injectEndpoints({
    endpoints: (builder) => ({
        getPengawasan: builder.query<any, void>({
            query: () => ({
                url: 'pengawasan',
            }),
        }),
        getPengawasanReguler: builder.query<any, void>({
            query: () => ({
                url: 'pengawasan/reguler',
            }),
        }),
        getPengawasanInsidental: builder.query<any, void>({
            query: () => ({
                url: 'pengawasan/insidental',
            }),
        }),
        getPengawasanArsip: builder.query<any, void>({
            query: () => ({
                url: 'pengawasan/data-arsip',
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
                url: `pengawasan/dokumen/data/${dataID}`,
            }),
        }),
        getListDokumen: builder.query<any, void>({
            query: () => ({
                url: `dokumen-pengawasan`,
            }),
        }),
        createDokumenPengawasan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `pengawasan/dokumen/create`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        updateDokumen: builder.mutation<any, any>({
            query: ({ data, id }) => ({
                url: `pengawasan/dokumen/update/${id}`,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        deleteDokumen: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `pengawasan/dokumen/delete/${id}`,
                method: "DELETE",
            }),
        }),
        createPengawasanArsip: builder.mutation<any, { data: FormData, id: string }>({
            query: ({ data, id }) => ({
                url: `pengawasan/arsip/${id}`,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        aktifkanDataPengawasan: builder.mutation<any, { data: FormData, id: string }>({
            query: ({ data, id }) => ({
                url: `pengawasan/aktif/${id}`,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        eskalasiPengawasan: builder.mutation<any, { data: FormData, id: string }>({
            query: ({ data, id }) => ({
                url: `pengawasan/eskalasi/${id}`,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
    })
});

export const {
    useGetPengawasanQuery,
    useGetPengawasanRegulerQuery,
    useGetPengawasanInsidentalQuery,
    useGetPengawasanArsipQuery,
    useGetActiveEmployeeQuery,
    useCreateTimMutation,
    useGetTimQuery,
    useGetDokumenQuery,
    useGetListDokumenQuery,
    useCreateDokumenPengawasanMutation,
    useUpdateTimMutation,
    useDeleteTimMutation,
    useUpdateDokumenMutation,
    useDeleteDokumenMutation,
    useCreatePengawasanArsipMutation,
    useAktifkanDataPengawasanMutation,
    useEskalasiPengawasanMutation
} = api_pengawasan;