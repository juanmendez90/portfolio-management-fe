import { ConfigInterface } from '@/app/domain/config';
import { FetcherInterface } from '@/app/domain/fetcher';
import { ApiSellOrderRepository } from '../api-sell-order.repository';

interface ICreateSellOrderFactory {
    fetcher: FetcherInterface;
    config: ConfigInterface;
}

export const ApiSellOrderFactory = ({
    fetcher,
    config,
}: ICreateSellOrderFactory) => {
    return ApiSellOrderRepository({
        fetcher,
        config,
    });
};
