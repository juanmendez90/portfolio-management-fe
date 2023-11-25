'use client';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { ReactNode, useContext, useMemo } from 'react';
import { NavContext } from '../../main/layout';
import Link from 'next/link';

interface NavListItemProps {
    children: ReactNode;
    icon: ReactNode;
    href: string;
}

export function NavListItem({ children, icon, href }: NavListItemProps) {
    const { isOpen } = useContext(NavContext);
    const pathname = usePathname();
    const isActive = useMemo(() => pathname.includes(href), [href, pathname]);
    return (
        <Link
            href={href}
            className={clsx(
                'transition ease-out duration-100 whitespace-nowrap rounded-lg flex flex-row w-full items-center p-0.5 cursor-pointer hover:bg-background-dark',
                {
                    'bg-primary-dark text-primary hover:bg-primary-dark':
                        isActive,
                },
            )}
        >
            <span className="p-1.5 rounded-lg [&>svg]:w-[24px] [&>svg]:h-[24px]">
                {icon}
            </span>
            {isOpen && <span className="ml-2 pr-2">{children}</span>}
        </Link>
    );
}
