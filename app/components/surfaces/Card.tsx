import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
}

export function Card({ children }: CardProps) {
    return (
        <div className="cursor-pointer bg-background border border-primary-dark p-4 rounded-xl hover:shadow-md">
            {children}
        </div>
    );
}
