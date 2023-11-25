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
    const sellOrders = await useCases.get_user_sell_orders.execute(
        {
            status,
        },
        accessToken as string,
    );
    return NextResponse.json(sellOrders);
});

export const POST = withApiAuthRequired(async function handler(req: any) {
    // If your access token is expired and you have a refresh token
    // `getAccessToken` will fetch you a new one using the `refresh_token` grant
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res);
    const { data } = await req.json();

    const sellOrder = await useCases.create_sell_order.execute(
        { data },
        accessToken as string,
    );
    return NextResponse.json(sellOrder);
});
