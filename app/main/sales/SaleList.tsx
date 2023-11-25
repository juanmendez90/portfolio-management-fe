'use client';
import { SellOrderEntity } from '@/app/domain/sell-order/entities/sell-order.entity';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import useSWR from 'swr';
import { SaleCard } from './SaleCard';
import { SaleFormDialog } from './SaleFormDialog';
import { SaleTabValues } from './SaleWrapper';

const fetcher = ({ url, params }: { url: string; params: string }) =>
    axios.get(url, { params }).then((res) => res.data);

function EmptyList() {
    const params = useSearchParams();
    const status = useMemo(() => {
        return params.get('status') as SaleTabValues;
    }, [params]);
    const showSell = useMemo(() => {
        return (
            status === SaleTabValues.ALL || status === SaleTabValues.NOT_PAID
        );
    }, [status]);

    if (showSell) {
        return (
            <div className="flex flex-col justify-center items-center mt-10">
                <p className="text-2xl text-center font-semibold mb-1">
                    {`Sell your `}
                    <span className="relative z-10">
                        <span className="relative z-10 pl-1">
                            first animals
                        </span>
                        <span className="z-0 absolute w-full right-0 bottom-0 border-b-8 border-primary rounded-lg" />
                    </span>
                    !
                </p>

                <p className="text-lg mb-4 text-center">
                    Sales will be shown on this page.
                    <br />
                    To get started, sell your first animals.
                </p>
                <SaleFormDialog />
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <p className="text-2xl text-center font-semibold mb-1">
                {`Mark as paid your `}
                <span className="relative z-10">
                    <span className="relative z-10 pl-1">first sale</span>
                    <span className="z-0 absolute w-full right-0 bottom-0 border-b-8 border-primary rounded-lg" />
                </span>
                !
            </p>

            <p className="text-lg mb-4 text-center">
                Sales charged will be shown on this page.
                <br />
                To get started, mark as paid your first sale.
            </p>
        </div>
    );
}

export function SaleList() {
    const params = useSearchParams();
    const status = useMemo(() => {
        return params.get('status') as SaleTabValues;
    }, [params]);

    const { data, error, isLoading } = useSWR<SellOrderEntity[], any>(
        { url: '/api/sell-order', params: { status } },
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
                    data.map((item: SellOrderEntity) => {
                        return <SaleCard key={item.id} {...item} />;
                    })}
                {isLoading &&
                    [...Array(6).keys()].map((_, index) => {
                        return <SaleCard.Skeleton key={index} />;
                    })}
            </div>
        </div>
    );
}
