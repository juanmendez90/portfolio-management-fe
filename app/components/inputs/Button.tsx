import { ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface ButtonProps {
    color?: 'primary' | 'primary-dark' | 'error';
    children: ReactNode;
    href?: string;
    fullWidth?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: 'contained' | 'text' | 'outlined';
    startAdornment?: React.ReactNode;
    disabled?: boolean;
}

const colors = {
    primary: {
        contained:
            'bg-primary text-primary-dark hover:bg-[#a1ffab] active:bg-[#8ee99e]',
        text: 'text-primary hover:bg-[#a1ffab]/30 active:bg-[#8ee99e]/30 disabled:bg-inherit disabled:text-black-disabled',
        outlined:
            'border border-primary text-primary hover:bg-[#a1ffab]/30 active:bg-[#8ee99e]/30 disabled:border-gray-dark disabled:text-gray-dark disabled:bg-inherit',
    },
    'primary-dark': {
        contained:
            'bg-primary-dark text-primary hover:bg-[#012a23] active:bg-[#011d17]',
        text: 'text-primary-dark hover:bg-[#012a23]/30 active:bg-[#011d17]/30 disabled:bg-inherit disabled:text-black-disabled',
        outlined:
            'border border-primary-dark text-primary-dark hover:bg-[#012a23]/30 active:bg-[#011d17]/30 disabled:border-gray-dark disabled:text-gray-dark disabled:bg-inherit',
    },
    error: {
        contained: 'bg-error text-white hover:bg-[#C91E3E] active:bg-[#96172D]',
        text: 'text-error hover:bg-[#C91E3E]/30 active:bg-[#96172D]/30 disabled:bg-inherit disabled:text-black-disabled',
        outlined:
            'border border-error text-error hover:bg-[#C91E3E]/30 active:bg-[#96172D]/30 disabled:border-gray-dark disabled:text-gray-dark disabled:bg-inherit',
    },
};

export function Button({
    href,
    children,
    color = 'primary',
    fullWidth,
    onClick,
    variant = 'contained',
    disabled,
    startAdornment,
}: ButtonProps) {
    const buttonClasses = colors[color][variant];
    if (href) {
        return (
            <Link
                href={href}
                className={clsx(
                    `rounded-md px-4 py-2 ${buttonClasses} text-center font-semibold`,
                    {
                        'w-full': fullWidth,
                    },
                )}
            >
                {startAdornment && (
                    <span
                        className={clsx(
                            'text-inherit pr-1.5',
                            '[&>svg]:w-[16px] [&>svg]:h-[16px]',
                            { 'text-gray-divider': disabled },
                        )}
                    >
                        {startAdornment}
                    </span>
                )}
                {children}
            </Link>
        );
    }
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={clsx(
                `text-center rounded-md px-4 py-2 font-semibold ${buttonClasses} flex flex-row items-center justify-center`,
                {
                    'w-full': fullWidth,
                },
            )}
        >
            {startAdornment && (
                <span
                    className={clsx(
                        'text-inherit pr-1.5',
                        '[&>svg]:w-[16px] [&>svg]:h-[16px]',
                        { 'text-gray-divider': disabled },
                    )}
                >
                    {startAdornment}
                </span>
            )}
            {children}
        </button>
    );
}
