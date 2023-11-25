'use client';
import useQueryParams from '@/app/components/hooks/useQueryParams';
import { ToggleSwitch } from '@/app/components/inputs/ToggleSwitch';
import { Tabs } from '@/app/components/navigation/Tabs';
import { useCallback, useMemo } from 'react';
import { LotList } from './LotList';

export enum LotToggleSwitchValues {
    NET = 'net',
    GROSS = 'gross',
}

export enum LotTabValues {
    ALL = 'ALL',
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
}

export function LotWrapper() {
    const [params, setParams] = useQueryParams();
    const status = useMemo(
        () => (params.get('status') || LotTabValues.OPEN) as string,
        [params],
    );
    const view = useMemo(
        () => (params.get('view') || LotToggleSwitchValues.NET) as string,
        [params],
    );

    const handleStatusChange = useCallback(
        (value: string | number) => {
            setParams({ key: 'status', value: value as string });
        },
        [setParams],
    );
    const handleViewChange = useCallback(
        (value: string) => {
            setParams({ key: 'view', value });
        },
        [setParams],
    );
    return (
        <>
            <div className="flex flex-row w-full">
                <Tabs value={status as string} onChange={handleStatusChange}>
                    <Tabs.Tab value={LotTabValues.ALL}>All</Tabs.Tab>
                    <Tabs.Tab value={LotTabValues.OPEN}>Open</Tabs.Tab>
                    <Tabs.Tab value={LotTabValues.CLOSED}>Closed</Tabs.Tab>
                    <div className="flex flex-row items-center justify-end w-full pb-1 ml-4">
                        <ToggleSwitch value={view} onChange={handleViewChange}>
                            <ToggleSwitch.Option
                                value={LotToggleSwitchValues.NET}
                            >
                                Net
                            </ToggleSwitch.Option>
                            <ToggleSwitch.Option
                                value={LotToggleSwitchValues.GROSS}
                            >
                                Gross
                            </ToggleSwitch.Option>
                        </ToggleSwitch>
                    </div>
                </Tabs>
            </div>
            <div className="w-full h-full flex flex-col mt-6">
                <LotList />
            </div>
        </>
    );
}
