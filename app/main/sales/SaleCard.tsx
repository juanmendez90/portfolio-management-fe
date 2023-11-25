import { Card } from '@/app/components/surfaces/Card';
import { SellOrderEntity } from '@/app/domain/sell-order/entities/sell-order.entity';
import { parseMoney } from '@/app/utils/parse-money';
import { Money } from '@carbon/icons-react';
import { useMemo } from 'react';

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

export function SaleCard({
    date = '',
    totalPrice = 0,
    totalNetPrice,
    totalAnimals,
}: SellOrderEntity) {
    const dateParse = useMemo(() => {
        const dateObj = new Date(date);
        return `${dateObj.toLocaleString('en-EN', {
            month: 'short',
        })} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
    }, [date]);

    return (
        <Card>
            <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex flex-row items-center whitespace-nowrap mr-2 ">
                        <span className="mr-2">
                            <Money className="min-h-[24px] min-w-[24px]" />
                        </span>
                        Sale
                    </h3>
                    <p className="text-sm font-medium">{dateParse}</p>
                </div>
                <div className="flex flex-row mb-4 justify-between">
                    <div className="flex flex-col mr-1">
                        <p className="text-sm">Price</p>
                        <p className="font-medium ">
                            {parseMoney(totalPrice as number)}
                        </p>
                    </div>
                    <div className="flex flex-col mr-1">
                        <p className="text-sm">Total Net Price</p>
                        <p className="font-medium">
                            {parseMoney(totalNetPrice as number)}
                        </p>
                    </div>
                    <div className="flex flex-col mr-1">
                        <p className="text-sm">#Cow</p>
                        <p className="font-medium text-right">{totalAnimals}</p>
                    </div>
                </div>
            </div>
        </Card>
    );
}

SaleCard.Skeleton = Skeleton;
