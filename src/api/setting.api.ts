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
    })
});

export const {
    useGetUserMutation,
    useUpdateUserMutation,
    useUpdateUserPasswordMutation
} = api_setting;