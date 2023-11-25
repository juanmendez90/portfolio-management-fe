'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

interface SetParamsProps {
    key: string;
    value: string;
}

export default function useQueryParams(): [
    URLSearchParams,
    (value: SetParamsProps) => void,
] {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateParams = useCallback(
        ({ key, value }: SetParamsProps) => {
            let keyFound = false;
            const entries = Array.from(searchParams.entries()).map(
                ([paramKey, paramValue]) => {
                    if (paramKey === key) {
                        keyFound = true;
                        return [paramKey, value];
                    }
                    return [paramKey, paramValue];
                },
            );
            if (!keyFound) {
                entries.push([key, value]);
            }
            return new URLSearchParams(entries);
        },
        [searchParams],
    );
    const setParams = useCallback(
        (value: SetParamsProps) => {
            const newParams = updateParams(value);
            router.push(`${pathname}?${newParams.toString()}`);
        },
        [pathname, router, updateParams],
    );
    return useMemo(
        () => [searchParams, setParams],

        [searchParams, setParams],
    );
}
