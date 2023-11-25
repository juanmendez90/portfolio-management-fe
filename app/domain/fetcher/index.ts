import { getAccessToken } from '@auth0/nextjs-auth0';
import axios, {
    CreateAxiosDefaults,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';

interface optionsProps {
    options: CreateAxiosDefaults;
}

export interface FetcherInterface {
    delete: (
        url: string,
        optionsProps: AxiosRequestConfig | null | undefined,
        token: string,
    ) => Promise<AxiosResponse<any, any>>;
    get: (
        url: string,
        optionsProps: AxiosRequestConfig,
        token: string,
    ) => Promise<AxiosResponse<any, any>>;
    post: (
        url: string,
        data: object,
        optionsProps: AxiosRequestConfig | null | undefined,
        token: string,
    ) => Promise<AxiosResponse<any, any>>;
    put: (
        url: string,
        data: object,
        optionsProps: AxiosRequestConfig | null | undefined,
        token: string,
    ) => Promise<AxiosResponse<any, any>>;
}

export const FetcherFactory = ({ options }: optionsProps) => {
    let token = '';
    const fetcher = axios.create(options);

    const setToken = async ({ accessToken }: { accessToken: string }) => {
        token = accessToken;
    };

    const getHeaders = async (headersProps = {}, token: string) => {
        const headers = {
            ...headersProps,
            ...(token && {
                authorization: `Bearer ${token}`,
            }),
        };
        return headers;
    };

    const deleteFunc = async (
        url: string,
        optionsProps: AxiosRequestConfig | null | undefined = {},
        token: string,
    ) => {
        const optionsUpdated = {
            ...optionsProps,
            headers: await getHeaders(optionsProps?.headers, token),
        };

        return fetcher.delete(url, optionsUpdated);
    };

    const get = async (
        url: string,
        optionsProps: AxiosRequestConfig | null | undefined = {},
        token: string,
    ) => {
        const optionsUpdated = {
            ...optionsProps,
            headers: await getHeaders(optionsProps?.headers, token),
        };

        return fetcher.get(url, optionsUpdated);
    };

    const post = async (
        url: string,
        data: object,
        optionsProps: AxiosRequestConfig | null | undefined = {},
        token: string,
    ) => {
        const headers = await getHeaders(optionsProps?.headers, token);
        const optionsUpdated = {
            ...optionsProps,
            headers,
        };

        return fetcher.post(url, data, optionsUpdated);
    };

    const put = async (
        url: string,
        data: object,
        optionsProps: AxiosRequestConfig | null | undefined = {},
        token: string,
    ) => {
        const optionsUpdated = {
            ...optionsProps,
            headers: await getHeaders(optionsProps?.headers, token),
        };

        return fetcher.put(url, data, optionsUpdated);
    };

    return {
        delete: deleteFunc,
        get,
        post,
        put,
    };
};
