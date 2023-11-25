import clsx from 'clsx';

interface IconButtonProps {
    icon: React.ReactNode;
    size?: 'm' | 'l';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const sizesDictionary = {
    m: 'p-1 [&>svg]:w-[16px] [&>svg]:h-[16px]',
    l: 'p-1 [&>svg]:w-[24px] [&>svg]:h-[24px]',
};

export function IconButton({ icon, size = 'm', onClick }: IconButtonProps) {
    const sizesClass = sizesDictionary[size];
    return (
        <button
            onClick={onClick}
            className={clsx(
                'rounded-full hover:bg-background-dark',
                sizesClass,
            )}
        >
            {icon}
        </button>
    );
}
