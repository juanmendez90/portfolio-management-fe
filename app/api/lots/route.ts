import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { useCases } from '../../domain';

export const GET = withApiAuthRequired(async function handler(req: any) {
    // If your access token is expired and you have a refresh token
    // `getAccessToken` will fetch you a new one using the `refresh_token` grant
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res);
    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status') as string;
    const view = searchParams.get('view') as string;
    const lots = await useCases.get_user_lots.execute(
        {
            status,
            view,
        },
        accessToken as string,
    );
    return NextResponse.json(lots);
});

export const POST = withApiAuthRequired(async function handler(req: any) {
    // If your access token is expired and you have a refresh token
    // `getAccessToken` will fetch you a new one using the `refresh_token` grant
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res);
    const { data } = await req.json();

    const lot = await useCases.create_lot.execute(
        { data },
        accessToken as string,
    );
    return NextResponse.json(lot);
});
