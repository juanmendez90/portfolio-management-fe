import { Breadcrumbs } from '@/app/components/navigation/Breadcrumbs';
import { PageHeader } from '@/app/components/page/Header';
import { useCases } from '@/app/domain';
import { LotEntity } from '@/app/domain/lot/entities/lot.entity';
import { parseMoney } from '@/app/utils/parse-money';
import {
    AppRouterPageRouteOpts,
    getAccessToken,
    withPageAuthRequired,
} from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { DataCard } from './DataCard';
import { LotAnimalDetailTable } from './LotAnimalsDetailTable';
import { ProgressBar } from '@/app/components/data-display/ProgressBar';

interface GetDataProps {
    id: string;
}

async function getData({ id }: GetDataProps): Promise<LotEntity | null> {
    const { accessToken } = await getAccessToken();
    const lot = await useCases.get_lot_by_id.execute(
        {
            id,
        },
        accessToken as string,
    );
    return lot;
}

async function LotDetailsPage({ params }: AppRouterPageRouteOpts) {
    const lot = await getData({ id: params?.id as string });
    return (
        <div className="w-full h-full flex flex-col">
            <header className="mb-8">
                <div className="flex flex-col w-full">
                    <Breadcrumbs>
                        <Link href="/main/lots">Lots</Link>
                        <span>{lot?.name}</span>
                    </Breadcrumbs>
                    <div className="mt-6 bg-primary-dark text-white rounded-xl w-full p-10 flex flex-row items-center">
                        <h2 className="text-3xl font-semibold whitespace-nowrap">
                            {lot?.name}
                        </h2>
                        <div className="w-full flex flex-row justify-center">
                            <div className="grid grid-cols-3 gap-4">
                                <DataCard label="Gross Price">
                                    {parseMoney(lot?.totalPrice)}
                                </DataCard>
                                <DataCard label="Earnings">
                                    {parseMoney(lot?.sold)}
                                </DataCard>
                                <DataCard label="Yield">
                                    {`${lot?.lotYield}%`}
                                </DataCard>
                                <DataCard label="Net Price">
                                    {parseMoney(lot?.totalNetPrice)}
                                </DataCard>
                                <DataCard label="Net Earnings">
                                    {parseMoney(lot?.netSold)}
                                </DataCard>
                                <DataCard label="Net Yield">
                                    {`${lot?.netLotYield}%`}
                                </DataCard>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="w-full flex flex-col gap-2 px-2">
                <h3 className="text-xl mr-4 font-semibold">Cows</h3>
                <div className="w-64">
                    <ProgressBar percentage={20} label={`Cows ${10}/${50}`} />
                </div>
            </div>

            {lot?.animals && <LotAnimalDetailTable animals={lot?.animals} />}
        </div>
    );
}

export default withPageAuthRequired(LotDetailsPage, {
    returnTo: ({ params }: AppRouterPageRouteOpts) =>
        `routes.lots/${params?.id}`,
});
