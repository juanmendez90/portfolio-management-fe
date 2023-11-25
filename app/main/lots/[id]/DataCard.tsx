interface DataCardProps {
    children: React.ReactNode;
    label: string;
}

export function DataCard({ children, label }: DataCardProps) {
    return (
        <div className="w-52 p-2 rounded-lg bg-white/10 text-primary-white shadow border border-white">
            <p className="mb-2 text-sm">{label}</p>
            <p className="font-semibold text-right text-xl">{children}</p>
        </div>
    );
}
