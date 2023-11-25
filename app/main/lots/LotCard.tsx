import { ProgressBar } from '@/app/components/data-display/ProgressBar';
import { Card } from '@/app/components/surfaces/Card';
import { GetLotsDto, LotEntity } from '@/app/domain/lot/entities/lot.entity';
import { parseMoney } from '@/app/utils/parse-money';
import clsx from 'clsx';
import Link from 'next/link';
import { useMemo } from 'react';

interface YieldProps {
    value: number;
    label: string;
}

function Skeleton() {
    return (
        <Card>
            <div className="animate-pulse flex space-x-4 h-[142px]">
                <div className="flex-1 items-center justify-center py-1 mt-3">
                    <div className="h-2 bg-slate-700 rounded mb-8"></div>
                    <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                    </div>
                    <div className="space-y-4 mt-4">
                        <div className="h-2 bg-slate-700 rounded"></div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                            <div className="col-span-2"></div>
                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

function Yield({ value, label }: YieldProps) {
    return (
        <div className="flex flex-col">
            <p className="text-sm text-right">{label}</p>
            <p
                className={clsx('font-medium text-right', {
                    'text-green-900': value > 0,
                    'text-error': value < 0,
                })}
            >
                {`${value}%`}
            </p>
        </div>
    );
}

export function LotCard({
    id,
    name = '',
    date = '',
    totalPrice = 0,
    totalAnimals = 0,
    soldAnimals = 0,
    sold = 0,
    lotYield = 0,
}: GetLotsDto) {
    const percentage = useMemo(() => {
        return Math.ceil((soldAnimals / totalAnimals) * 100);
    }, [soldAnimals, totalAnimals]);

    const dateParse = useMemo(() => {
        const dateObj = new Date(date);
        return `${dateObj.toLocaleString('en-EN', {
            month: 'short',
        })} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
    }, [date]);

    return (
        <Link href={`lots/${id}`} passHref={true}>
            <Card>
                <div className="flex flex-col">
                    <div className="flex flex-row items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex flex-row items-center whitespace-nowrap mr-2 ">
                            <span className="text-2xl mr-2">🐮</span>
                            {name}
                        </h3>
                        <p className="text-sm font-medium">{dateParse}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-1 mb-4 justify-between">
                        <div className="flex flex-col">
                            <p className="text-sm">Price</p>
                            <p className="font-medium ">
                                {parseMoney(totalPrice as number)}
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm">Sold</p>
                            <p className="font-medium">{parseMoney(sold)}</p>
                        </div>
                        <Yield label="Est. Yield" value={lotYield} />
                    </div>
                    <ProgressBar
                        percentage={percentage}
                        label={`Cows ${soldAnimals}/${totalAnimals}`}
                    />
                </div>
            </Card>
        </Link>
    );
}

LotCard.Skeleton = Skeleton;
