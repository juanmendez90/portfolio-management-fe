'use client';
import { Button } from '@/app/components/inputs/Button';
import { routes } from '@/app/components/navigation/NavList';
import { GetLotsDto, LotEntity } from '@/app/domain/lot/entities/lot.entity';
import axios from 'axios';
import { useMemo } from 'react';
import useSWR from 'swr';
import { LotCard } from './LotCard';
import { LotFormDialog } from './LotFormDialog';
import { LotTabValues } from './LotWrapper';
import useQueryParams from '@/app/components/hooks/useQueryParams';
import { useSearchParams } from 'next/navigation';

const fetcher = ({ url, params }: { url: string; params: string }) =>
    axios.get(url, { params }).then((res) => res.data);

function EmptyList() {
    const [params] = useQueryParams();
    const status = useMemo(() => params.get('status'), [params]);
    const showBuy = useMemo(() => {
        return status === LotTabValues.ALL || status === LotTabValues.OPEN;
    }, [status]);

    if (showBuy) {
        return (
            <div className="flex flex-col justify-center items-center mt-10">
                <p className="text-2xl text-center font-semibold mb-1">
                    {`Buy your `}
                    <span className="relative z-10">
                        <span className="relative z-10">first lot</span>
                        <span className="z-0 absolute w-full right-0 bottom-0 border-b-8 border-primary rounded-lg" />
                    </span>
                    !
                </p>

                <p className="text-lg mb-4 text-center">
                    Lots you buy will be shown on this page.
                    <br />
                    To get started, buy your first lot.
                </p>
                <LotFormDialog />
            </div>
        );
    }
    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <p className="text-2xl text-center font-semibold mb-1">
                {`Sell your `}
                <span className="relative z-10">
                    <span className="relative z-10 pl-1">first lot</span>
                    <span className="z-0 absolute w-full right-0 bottom-0 border-b-8 border-primary rounded-lg" />
                </span>
                !
            </p>

            <p className="text-lg mb-4 text-center">
                Lots closed will be shown on this page.
                <br />
                To get started, buy your first lot.
            </p>
            <Button color="primary-dark" href={routes.sales}>
                Sell a Lot
            </Button>
        </div>
    );
}

export function LotList() {
    const params = useSearchParams();

    const { data, error, isLoading } = useSWR<GetLotsDto[], any>(
        {
            url: '/api/lots',
            params: { status: params.get('status'), view: params.get('view') },
        },
        fetcher as any,
        { revalidateOnFocus: false },
    );
    const showEmpty = useMemo(() => {
        return !isLoading && !data?.length && !error;
    }, [data, isLoading, error]);

    return (
        <div className="flex flex-col">
            {showEmpty && <EmptyList />}
            <div className="grid grid-cols-3 gap-4">
                {!!data?.length &&
                    !isLoading &&
                    data.map((item: GetLotsDto) => {
                        return <LotCard key={item.id} {...item} />;
                    })}
                {isLoading &&
                    [...Array(6).keys()].map((_, index) => {
                        return <LotCard.Skeleton key={index} />;
                    })}
            </div>
        </div>
    );
}
