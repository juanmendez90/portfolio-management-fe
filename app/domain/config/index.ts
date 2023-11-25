export interface ConfigInterface {
    apiHost?: string;
}

export const config = {
    apiHost: process.env.NEXT_PUBLIC_API_HOST,
};
