import { ConfigInterface } from '@/app/domain/config';
import { FetcherInterface } from '@/app/domain/fetcher';
import { ApiSellOrderFactory } from '../../repositories/factories/api-sell-order.factory';
import { GetUserSellOrdersUseCase } from '../get-user-sell-orders.use-case';

interface IGetUserSellOrdersFactory {
    fetcher: FetcherInterface;
    config: ConfigInterface;
}

export const GetUSerSellOrdersFactory = ({
    fetcher,
    config,
}: IGetUserSellOrdersFactory) => {
    return GetUserSellOrdersUseCase({
        apiSellOrderRepository: ApiSellOrderFactory({ fetcher, config }),
    });
};
