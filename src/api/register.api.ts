import { api } from "./base.api";

export const api_register = api.injectEndpoints({
    endpoints: (builder) => ({
        getRegistrasi: builder.query<any, void>({
            query: () => ({
                url: 'registrasi',
            }),
        }),
        getReguler: builder.query<any, void>({
            query: () => ({
                url: 'registrasi/reguler',
            }),
        }),
        getInsidental: builder.query<any, void>({
            query: () => ({
                url: 'registrasi/insidental',
            }),
        }),
        getArsip: builder.query<any, void>({
            query: () => ({
                url: 'registrasi/data-arsip',
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
        getDetailPerencanaan: builder.query<any, string>({
            query: (id: string) => ({
                url: `perencanaan/${id ?? '9d8ac6d0-297b-499f-bf0f-e0344fae59e6'}`,
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
            query: (data: any) => ({
                url: `peta-masalah/create`,
                method: "POST",
                body: data.data,
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
        updateCatatan: builder.mutation<any, any>({
            query: ({ data, id }) => ({
                url: `catatan/update/${id}`,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        deleteCatatan: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `catatan/delete/${id}`,
                method: "DELETE",
            }),
        }),
        createArsip: builder.mutation<any, { data: FormData, id: string }>({
            query: ({ data, id }) => ({
                url: `registrasi/arsip/${id}`,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        aktifkanData: builder.mutation<any, { data: FormData, id: string }>({
            query: ({ data, id }) => ({
                url: `registrasi/aktif/${id}`,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                return response;
            },
        }),
        eskalasi: builder.mutation<any, { data: FormData, id: string }>({
            query: ({ data, id }) => ({
                url: `registrasi/eskalasi/${id}`,
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
    useGetRegistrasiQuery,
    useGetRegulerQuery,
    useGetInsidentalQuery,
    useGetArsipQuery,
    useGetStatusDataQuery,
    useGetBadanUsahaQuery,
    useGetSumberDataQuery,
    useGetCatatanQuery,
    useGetDetailRegistrasiQuery,
    useGetDetailPerencanaanQuery,
    useGetDetailPetamasalahQuery,
    useCreateRegistrasiMutation,
    useUpdateRegistrasiMutation,
    useCreatePetaMasalahMutation,
    useUpdatePetamasalahMutation,
    useUpdateCatatanMutation,
    useDeleteCatatanMutation,
    useCreateCatatanMutation,
    useCreateArsipMutation,
    useAktifkanDataMutation,
    useEskalasiMutation
} = api_register;