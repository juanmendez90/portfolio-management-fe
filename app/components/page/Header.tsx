import { ReactNode } from 'react';

interface PageTitleProps {
    children: ReactNode;
    icon?: ReactNode;
}
interface PageHeaderProps {
    children: ReactNode;
}
function Title({ children, icon }: PageTitleProps) {
    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-md relative p-2">
            <div className="border border-primary-dark bg-white z-10 w-full h-full rounded-lg absolute flex flex-col py-4 pb-7 px-6 justify-between"></div>
            <div className="w-full h-full rounded-md absolute -right-[4px] top-[4px] bg-primary-dark z-0" />
            <h2 className="z-10 text-3xl flex flex-row items-center font-semibold">
                {icon && (
                    <span className="flex items-center justify-center mr-2 [&>svg]:h-[32px] [&>svg]:w-[32px]">
                        {icon}
                    </span>
                )}
                {children}
            </h2>
        </div>
    );
}

export function PageHeader({ children }: PageHeaderProps) {
    return (
        <div className="flex flex-row justify-between mb-12 w-full">
            {children}
        </div>
    );
}

PageHeader.Title = Title;
