import { ChevronRight } from '@carbon/icons-react';
import { Children } from 'react';

interface BreadcrumbsProps {
    children: React.ReactNode;
}
export function Breadcrumbs({ children }: BreadcrumbsProps) {
    return (
        <div className="flex flex-row last text-sm text-black-inactive ">
            {Children.map(children, (child, index) => {
                return (
                    <div
                        key={index}
                        className="hover:underline last:hover:no-underline last:text-primary-dark last:font-semibold items-center flex flex-row"
                    >
                        {child}
                        {index < Children.count(children) - 1 && (
                            <ChevronRight className="mx-1 min-w-[16px]" />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
