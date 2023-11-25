import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { useCases } from '../../../domain';

export const GET = withApiAuthRequired(async function handler(
    req: any,
    { params },
) {
    // If your access token is expired and you have a refresh token
    // `getAccessToken` will fetch you a new one using the `refresh_token` grant
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res);
    const lot = await useCases.get_lot_by_id.execute(
        {
            id: params?.id as string,
        },
        accessToken as string,
    );
    return NextResponse.json(lot);
});
