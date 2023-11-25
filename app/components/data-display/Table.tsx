'use client';
import clsx from 'clsx';
import { ReactNode, createContext, useContext } from 'react';

const ITEMS_PER_PAGE = 5;

interface TableRowContextProps {
    variant?: 'head' | 'body';
}

interface TableContextProps {
    isLoading?: boolean;
    itemsPerPage?: number;
}

interface TableProps {
    isLoading?: boolean;
    children: ReactNode;
}

interface TableComponentProps {
    children?: ReactNode;
}

interface TableCellProps {
    children?: ReactNode;
    colSpan?: number;
    width?: string;
    center?: boolean;
}

const TableRowContext = createContext<TableRowContextProps>({});
const TableContext = createContext<TableContextProps>({});

function TableRow({ children }: TableComponentProps) {
    return (
        <tr className="border-b border-grayV2-divider [&>*:first-child]:pl-4 [&>*:last-child]:pr-4 [&>*]:px-2">
            {children}
        </tr>
    );
}

function TableCell({ width, children, colSpan, center }: TableCellProps) {
    const { variant } = useContext(TableRowContext);
    if (variant === 'head') {
        return (
            <th
                style={{
                    width,
                }}
                className={clsx(
                    'py-2 tracking-[1.5px] uppercase text-[10px] text-blackV2-medium font-semibold',
                    {
                        'tex-center': center,
                        'text-left': !center,
                    },
                )}
                colSpan={colSpan}
            >
                {children}
            </th>
        );
    }
    return (
        <td
            colSpan={colSpan}
            className={clsx(
                'py-2 text-ellipsis overflow-hidden whitespace-nowrap tracking-[0.4px] text-sm font-normal text-blackV2-high',
                {
                    'text-center': center,
                },
            )}
        >
            {children}
        </td>
    );
}

function TableHead({ children }: TableComponentProps) {
    const tableContextValue = {
        variant: 'head',
    } as TableRowContextProps;
    return (
        <TableRowContext.Provider value={tableContextValue}>
            <thead>{children}</thead>
        </TableRowContext.Provider>
    );
}

function TableBody({ children }: TableComponentProps) {
    const { isLoading, itemsPerPage } = useContext(TableContext);

    const tableContextValue = {
        variant: 'body',
    } as TableRowContextProps;

    return (
        <TableRowContext.Provider value={tableContextValue}>
            <tbody>
                {!isLoading && children}
                {isLoading &&
                    [...Array(itemsPerPage).keys()].map((_, index) => (
                        <TableRow key={index}>
                            <TableCell colSpan={7}>
                                <div className="animate-pulse h-2 my-2 bg-grayV2-dark rounded col-span-3" />
                            </TableCell>
                        </TableRow>
                    ))}
            </tbody>
        </TableRowContext.Provider>
    );
}

export function Table({ children, isLoading }: TableProps) {
    return (
        <div className="w-full">
            <TableContext.Provider
                value={{
                    isLoading,
                    itemsPerPage: ITEMS_PER_PAGE,
                }}
            >
                <table className="w-full table-fixed">{children}</table>
            </TableContext.Provider>
        </div>
    );
}

Table.Row = TableRow;
Table.Cell = TableCell;
Table.Head = TableHead;
Table.Body = TableBody;
