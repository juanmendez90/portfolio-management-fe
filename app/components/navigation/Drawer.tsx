import clsx from 'clsx';
import { ReactNode } from 'react';

interface DrawerProps {
    children: ReactNode;
    isOpen?: boolean;
}

export function Drawer({ children, isOpen }: DrawerProps) {
    return (
        <nav
            className={clsx(
                'pt-2 h-full bg-background transition-all duration-300 ease-in-out transform',
                {
                    'w-[230px]': isOpen,
                    'w-[72px]': !isOpen,
                },
            )}
        >
            {children}
        </nav>
    );
}
