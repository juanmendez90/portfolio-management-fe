'use client';
import { Tabs } from '@/app/components/navigation/Tabs';
import { SaleList } from './SaleList';
import useQueryParams from '@/app/components/hooks/useQueryParams';
import { useCallback, useMemo } from 'react';

export enum SaleTabValues {
    ALL = 'ALL',
    PAID = 'PAID',
    NOT_PAID = 'NOT_PAID',
}

export function SaleWrapper() {
    const [params, setParams] = useQueryParams();
    const status = useMemo(() => {
        return params.get('status') || SaleTabValues.ALL;
    }, [params]);
    const handleStatusChange = useCallback(
        (value: string | number) => {
            setParams({ key: 'status', value: value as string });
        },
        [setParams],
    );
    return (
        <>
            <Tabs value={status} onChange={handleStatusChange}>
                <Tabs.Tab value={SaleTabValues.ALL}>All</Tabs.Tab>
                <Tabs.Tab value={SaleTabValues.NOT_PAID}>Not Paid</Tabs.Tab>
                <Tabs.Tab value={SaleTabValues.PAID}>Paid</Tabs.Tab>
            </Tabs>
            <div className="w-full h-full flex flex-col mt-6">
                <SaleList />
            </div>
        </>
    );
}
