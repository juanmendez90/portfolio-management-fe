import clsx from 'clsx';

interface ProgressBarProps {
    percentage: number;
    label?: string;
}

export function ProgressBar({ percentage, label }: ProgressBarProps) {
    return (
        <div className="flex flex-col w-full">
            <div className="w-full bg-primary-dark rounded-full h-2.5">
                <div
                    className={clsx('bg-primary h-2.5 rounded-full', {
                        'border border-primary-dark': percentage > 0,
                    })}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            {label && (
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{label}</span>
                    <span className="text-sm font-medium">{`${percentage}%`}</span>
                </div>
            )}
        </div>
    );
}
