import { api } from "./base.api";

export const api_pasca_pengawasan = api.injectEndpoints({
    endpoints: (builder) => ({
        getPascaPengawasan: builder.query<any, void>({
            query: () => ({
                url: 'pasca-pengawasan',
            }),
        }),
        getPascaPengawasanReguler: builder.query<any, void>({
            query: () => ({
                url: 'pasca-pengawasan/reguler',
            }),
        }),
        getPascaPengawasanInsidental: builder.query<any, void>({
            query: () => ({
                url: 'pasca-pengawasan/insidental',
            }),
        }),
        getPascaPengawasanArsip: builder.query<any, void>({
            query: () => ({
                url: 'pasca-pengawasan/data-arsip',
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
                url: `pasca-pengawasan/dokumen/data/${dataID}`,
            }),
        }),
        getListDokumen: builder.query<any, void>({
            query: () => ({
                url: `dokumen-pasca-pengawasan`,
            }),
        }),
        createDokumenPascaPengawasan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `pasca-pengawasan/dokumen/create`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        updateDokumen: builder.mutation<any, any>({
            query: ({ data, id }) => ({
                url: `pasca-pengawasan/dokumen/update/${id}`,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        deleteDokumen: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `pasca-pengawasan/dokumen/delete/${id}`,
                method: "DELETE",
            }),
        }),
        createPascaPengawasanArsip: builder.mutation<any, { data: FormData, id: string }>({
            query: ({ data, id }) => ({
                url: `pasca-pengawasan/arsip/${id}`,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        aktifkanDataPascaPengawasan: builder.mutation<any, { data: FormData, id: string }>({
            query: ({ data, id }) => ({
                url: `pasca-pengawasan/aktif/${id}`,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        eskalasiPascaPengawasan: builder.mutation<any, { data: FormData, id: string }>({
            query: ({ data, id }) => ({
                url: `pasca-pengawasan/eskalasi/${id}`,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        getListTahapanPascaPengawasan: builder.query<any, void>({
            query: () => ({
                url: `tahapan-pasca-pengawasan`,
            }),
        }),
        getTahapanPascaPengawasan: builder.query<any, void>({
            query: () => ({
                url: `tahapan-pasca-pengawasan/all`,
            }),
        }),
        getStatusTahapanPascaPengawasan: builder.query<any, void>({
            query: () => ({
                url: `status-data`,
            }),
        }),
        createTahapanPascaPengawasan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `pasca-pengawasan/tahapan/create`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        updateTahapanPascaPengawasan: builder.mutation<any, any>({
            query: ({ data, id }) => ({
                url: `pasca-pengawasan/tahapan/update/${id}`,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        deleteTahapanPascaPengawasan: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `pasca-pengawasan/tahapan/delete/${id}`,
                method: "DELETE",
            }),
        }),
        createSanksiPascaPengawasan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `pasca-pengawasan/sanksi/create`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        updateSanksiPascaPengawasan: builder.mutation<any, any>({
            query: ({ data, id }) => ({
                url: `pasca-pengawasan/sanksi/update/${id}`,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        deleteSanksiPascaPengawasan: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `pasca-pengawasan/sanksi/delete/${id}`,
                method: "DELETE",
            }),
        }),
        createTindakanSanksiPascaPengawasan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `pasca-pengawasan/tindakan-sanksi/create`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        updateTindakanSanksiPascaPengawasan: builder.mutation<any, any>({
            query: ({ data, id }) => ({
                url: `pasca-pengawasan/tindakan-sanksi/update/${id}`,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        deleteTindakanSanksiPascaPengawasan: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `pasca-pengawasan/tindakan-sanksi/delete/${id}`,
                method: "DELETE",
            }),
        }),
        getAgendaPascaPengawasan: builder.query<any, void>({
            query: () => ({
                url: `pasca-pengawasan/agenda`,
            }),
        }),
    })
});

export const {
    useGetPascaPengawasanQuery,
    useGetPascaPengawasanRegulerQuery,
    useGetPascaPengawasanInsidentalQuery,
    useGetPascaPengawasanArsipQuery,
    useGetActiveEmployeeQuery,
    useCreateTimMutation,
    useGetTimQuery,
    useGetDokumenQuery,
    useGetListDokumenQuery,
    useCreateDokumenPascaPengawasanMutation,
    useUpdateTimMutation,
    useDeleteTimMutation,
    useUpdateDokumenMutation,
    useDeleteDokumenMutation,
    useCreatePascaPengawasanArsipMutation,
    useAktifkanDataPascaPengawasanMutation,
    useEskalasiPascaPengawasanMutation,
    useCreateTahapanPascaPengawasanMutation,
    useDeleteTahapanPascaPengawasanMutation,
    useUpdateTahapanPascaPengawasanMutation,
    useGetListTahapanPascaPengawasanQuery,
    useGetTahapanPascaPengawasanQuery,
    useGetStatusTahapanPascaPengawasanQuery,
    useGetAgendaPascaPengawasanQuery,
    useCreateSanksiPascaPengawasanMutation,
    useDeleteSanksiPascaPengawasanMutation,
    useUpdateSanksiPascaPengawasanMutation,
    useCreateTindakanSanksiPascaPengawasanMutation,
    useDeleteTindakanSanksiPascaPengawasanMutation,
    useUpdateTindakanSanksiPascaPengawasanMutation
} = api_pasca_pengawasan;