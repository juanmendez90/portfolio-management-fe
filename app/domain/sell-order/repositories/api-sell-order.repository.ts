import { ConfigInterface } from '../../config';
import { FetcherInterface } from '../../fetcher';
import { SellOrderEntity } from '../entities/sell-order.entity';

interface ApiSellOrderRepositoryProps {
    fetcher: FetcherInterface;
    config: ConfigInterface;
}

interface CreateSellOrderParams {
    data: SellOrderEntity;
}

export interface GetSellOrdersParams {
    status: string;
}

export interface IApiSellOrderRepository {
    createSellOrder: (
        { data }: CreateSellOrderParams,
        token: string,
    ) => Promise<SellOrderEntity | null>;
    getUserSellOrders: (
        { status }: GetSellOrdersParams,
        token: string,
    ) => Promise<SellOrderEntity[]>;
    getSellOrder: () => void;
}

export function ApiSellOrderRepository({
    fetcher,
    config,
}: ApiSellOrderRepositoryProps): IApiSellOrderRepository {
    return {
        createSellOrder: async (
            { data }: CreateSellOrderParams,
            token: string,
        ) => {
            try {
                const response = await fetcher.post(
                    `${config.apiHost}/sell-order`,
                    data,
                    {},
                    token,
                );
                return response.data as SellOrderEntity;
            } catch (error) {
                console.error({ error });
                return null;
            }
        },
        getUserSellOrders: async (
            { status }: GetSellOrdersParams,
            token: string,
        ) => {
            try {
                const response = await fetcher.get(
                    `${config.apiHost}/sell-order`,
                    {
                        params: { status },
                    },
                    token,
                );
                return response.data;
            } catch (error) {
                console.error({ error });
                return null;
            }
        },
        getSellOrder: () => {},
    };
}
