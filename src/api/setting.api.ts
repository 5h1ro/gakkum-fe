import { setCookie } from "../utils/cookies";
import { api } from "./base.api";

export const api_setting = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.mutation<any, void>({
            query: () => ({
                url: 'setting/profil',
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                if (response.data) {
                    setCookie('name', response.data.name ?? '', 30);
                    setCookie('email', response.data.email ?? '', 30);
                    setCookie('role', response.data.role ?? '', 30);
                    setCookie('avatar', response.data.image_path ?? '', 30);
                }
                return response;
            },
        }),
        updateUser: builder.mutation<any, any>({
            query: (credentials: any) => ({
                url: "setting/profil",
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        updateUserPassword: builder.mutation<any, any>({
            query: (credentials: any) => ({
                url: "setting/profil/change_password",
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        //
        getSumberData: builder.query<any, void>({
            query: () => ({
                url: 'sumber-data/all',
            }),
            providesTags: ['Sumber Data'],
        }),
        getDetailSumberData: builder.query<any, string>({
            query: (id: string) => ({
                url: `sumber-data/${id}`,
            }),
        }),
        createSumberData: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `sumber-data/create`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        updateSumberData: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `sumber-data/update/${credentials.get('id')}`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        deleteSumberData: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `sumber-data/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Sumber Data'],
        }),
        //
        getStatusData: builder.query<any, void>({
            query: () => ({
                url: 'status-data/all',
            }),
            providesTags: ['Status Data'],
        }),
        getDetailStatusData: builder.query<any, string>({
            query: (id: string) => ({
                url: `status-data/${id}`,
            }),
        }),
        createStatusData: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `status-data/create`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        updateStatusData: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `status-data/update/${credentials.get('id')}`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        deleteStatusData: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `status-data/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Status Data'],
        }),
        //
        getTahapanPerencanaanPengaturan: builder.query<any, void>({
            query: () => ({
                url: 'tahapan-perencanaan/all',
            }),
            providesTags: ['Tahapan Perencanaan'],
        }),
        getDetailTahapanPerencanaanPengaturan: builder.query<any, string>({
            query: (id: string) => ({
                url: `tahapan-perencanaan/${id}`,
            }),
        }),
        createTahapanPerencanaanPengaturan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `tahapan-perencanaan/create`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        updateTahapanPerencanaanPengaturan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `tahapan-perencanaan/update/${credentials.get('id')}`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        deleteTahapanPerencanaanPengaturan: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `tahapan-perencanaan/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Tahapan Perencanaan'],
        }),
        //
        getTahapanPengawasanPengaturan: builder.query<any, void>({
            query: () => ({
                url: 'tahapan-pengawasan/all',
            }),
            providesTags: ['Tahapan Pengawasan'],
        }),
        getDetailTahapanPengawasanPengaturan: builder.query<any, string>({
            query: (id: string) => ({
                url: `tahapan-pengawasan/${id}`,
            }),
        }),
        createTahapanPengawasanPengaturan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `tahapan-pengawasan/create`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        updateTahapanPengawasanPengaturan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `tahapan-pengawasan/update/${credentials.get('id')}`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        deleteTahapanPengawasanPengaturan: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `tahapan-pengawasan/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Tahapan Pengawasan'],
        }),
        //
        getTahapanPascaPengawasanPengaturan: builder.query<any, void>({
            query: () => ({
                url: 'tahapan-pasca-pengawasan/all',
            }),
            providesTags: ['Tahapan Pasca Pengawasan'],
        }),
        getDetailTahapanPascaPengawasanPengaturan: builder.query<any, string>({
            query: (id: string) => ({
                url: `tahapan-pasca-pengawasan/${id}`,
            }),
        }),
        createTahapanPascaPengawasanPengaturan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `tahapan-pasca-pengawasan/create`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        updateTahapanPascaPengawasanPengaturan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `tahapan-pasca-pengawasan/update/${credentials.get('id')}`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        deleteTahapanPascaPengawasanPengaturan: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `tahapan-pasca-pengawasan/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Tahapan Pasca Pengawasan'],
        }),
        //
        getDokumenPerencanaanPengaturan: builder.query<any, void>({
            query: () => ({
                url: 'dokumen-perencanaan/all',
            }),
            providesTags: ['Dokumen Perencanaan'],
        }),
        getDetailDokumenPerencanaanPengaturan: builder.query<any, string>({
            query: (id: string) => ({
                url: `dokumen-perencanaan/${id}`,
            }),
        }),
        createDokumenPerencanaanPengaturan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `dokumen-perencanaan/create`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        updateDokumenPerencanaanPengaturan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `dokumen-perencanaan/update/${credentials.get('id')}`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        deleteDokumenPerencanaanPengaturan: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `dokumen-perencanaan/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Dokumen Perencanaan'],
        }),
        //
        getDokumenPengawasanPengaturan: builder.query<any, void>({
            query: () => ({
                url: 'dokumen-pengawasan/all',
            }),
            providesTags: ['Dokumen Pengawasan'],
        }),
        getDetailDokumenPengawasanPengaturan: builder.query<any, string>({
            query: (id: string) => ({
                url: `dokumen-pengawasan/${id}`,
            }),
        }),
        createDokumenPengawasanPengaturan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `dokumen-pengawasan/create`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        updateDokumenPengawasanPengaturan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `dokumen-pengawasan/update/${credentials.get('id')}`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        deleteDokumenPengawasanPengaturan: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `dokumen-pengawasan/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Dokumen Pengawasan'],
        }),
        //
        getDokumenPascaPengawasanPengaturan: builder.query<any, void>({
            query: () => ({
                url: 'dokumen-pasca-pengawasan/all',
            }),
            providesTags: ['Dokumen Pasca Pengawasan'],
        }),
        getDetailDokumenPascaPengawasanPengaturan: builder.query<any, string>({
            query: (id: string) => ({
                url: `dokumen-pasca-pengawasan/${id}`,
            }),
        }),
        createDokumenPascaPengawasanPengaturan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `dokumen-pasca-pengawasan/create`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        updateDokumenPascaPengawasanPengaturan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `dokumen-pasca-pengawasan/update/${credentials.get('id')}`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        deleteDokumenPascaPengawasanPengaturan: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `dokumen-pasca-pengawasan/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Dokumen Pasca Pengawasan'],
        }),
        //
        getEmployeePengaturan: builder.query<any, void>({
            query: () => ({
                url: 'employees/all',
            }),
            providesTags: ['Employee'],
        }),
        getDetailEmployeePengaturan: builder.query<any, string>({
            query: (id: string) => ({
                url: `employees/${id}`,
            }),
        }),
        createEmployeePengaturan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `employees/create`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        updateEmployeePengaturan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `employees/update/${credentials.get('id')}`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        deleteEmployeePengaturan: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `employees/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Employee'],
        }),
        //
        getCompanyPengaturan: builder.query<any, void>({
            query: () => ({
                url: 'company/all',
            }),
            providesTags: ['Company'],
        }),
        getDetailCompanyPengaturan: builder.query<any, string>({
            query: (id: string) => ({
                url: `company/${id}`,
            }),
        }),
        createCompanyPengaturan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `company/create`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        updateCompanyPengaturan: builder.mutation<any, any>({
            query: (credentials: FormData) => ({
                url: `company/update/${credentials.get('id')}`,
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: any, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        deleteCompanyPengaturan: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `company/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Company'],
        }),
        //
        getProvincePengaturan: builder.query<any, void>({
            query: () => ({
                url: 'lokasi/provinsi',
            }),
        }),
        getCityPengaturan: builder.query<any, string>({
            query: (id: string) => ({
                url: `lokasi/kota/${id}`,
                method: "POST"
            }),
        }),
        getDistrictPengaturan: builder.query<any, string>({
            query: (id: string) => ({
                url: `lokasi/kecamatan/${id}`,
                method: "POST"
            }),
        }),
        getVillagePengaturan: builder.query<any, string>({
            query: (id: string) => ({
                url: `lokasi/desa/${id}`,
                method: "POST"
            }),
        }),
        getPostalCodePengaturan: builder.query<any, string>({
            query: (id: string) => ({
                url: `lokasi/kode-pos/${id}`,
                method: "POST"
            }),
        }),
    })
});

export const {
    useGetUserMutation,
    useUpdateUserMutation,
    useUpdateUserPasswordMutation,
    //
    useGetSumberDataQuery,
    useGetDetailSumberDataQuery,
    useUpdateSumberDataMutation,
    useDeleteSumberDataMutation,
    useCreateSumberDataMutation,
    //
    useGetStatusDataQuery,
    useGetDetailStatusDataQuery,
    useUpdateStatusDataMutation,
    useDeleteStatusDataMutation,
    useCreateStatusDataMutation,
    //
    useGetTahapanPerencanaanPengaturanQuery,
    useGetDetailTahapanPerencanaanPengaturanQuery,
    useUpdateTahapanPerencanaanPengaturanMutation,
    useDeleteTahapanPerencanaanPengaturanMutation,
    useCreateTahapanPerencanaanPengaturanMutation,
    //
    useGetTahapanPengawasanPengaturanQuery,
    useGetDetailTahapanPengawasanPengaturanQuery,
    useUpdateTahapanPengawasanPengaturanMutation,
    useDeleteTahapanPengawasanPengaturanMutation,
    useCreateTahapanPengawasanPengaturanMutation,
    //
    useGetTahapanPascaPengawasanPengaturanQuery,
    useGetDetailTahapanPascaPengawasanPengaturanQuery,
    useUpdateTahapanPascaPengawasanPengaturanMutation,
    useDeleteTahapanPascaPengawasanPengaturanMutation,
    useCreateTahapanPascaPengawasanPengaturanMutation,
    //
    useGetDokumenPerencanaanPengaturanQuery,
    useGetDetailDokumenPerencanaanPengaturanQuery,
    useUpdateDokumenPerencanaanPengaturanMutation,
    useDeleteDokumenPerencanaanPengaturanMutation,
    useCreateDokumenPerencanaanPengaturanMutation,
    //
    useGetDokumenPengawasanPengaturanQuery,
    useGetDetailDokumenPengawasanPengaturanQuery,
    useUpdateDokumenPengawasanPengaturanMutation,
    useDeleteDokumenPengawasanPengaturanMutation,
    useCreateDokumenPengawasanPengaturanMutation,
    //
    useGetDokumenPascaPengawasanPengaturanQuery,
    useGetDetailDokumenPascaPengawasanPengaturanQuery,
    useUpdateDokumenPascaPengawasanPengaturanMutation,
    useDeleteDokumenPascaPengawasanPengaturanMutation,
    useCreateDokumenPascaPengawasanPengaturanMutation,
    //
    useGetEmployeePengaturanQuery,
    useGetDetailEmployeePengaturanQuery,
    useUpdateEmployeePengaturanMutation,
    useDeleteEmployeePengaturanMutation,
    useCreateEmployeePengaturanMutation,
    //
    useGetCompanyPengaturanQuery,
    useGetDetailCompanyPengaturanQuery,
    useUpdateCompanyPengaturanMutation,
    useDeleteCompanyPengaturanMutation,
    useCreateCompanyPengaturanMutation,
    //
    useGetProvincePengaturanQuery,
    useLazyGetCityPengaturanQuery,
    useLazyGetDistrictPengaturanQuery,
    useLazyGetVillagePengaturanQuery,
    useLazyGetPostalCodePengaturanQuery
} = api_setting;