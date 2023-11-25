import { ConfigInterface } from '@/app/domain/config';
import { FetcherInterface } from '@/app/domain/fetcher';
import { ApiSellOrderFactory } from '../../repositories/factories/api-sell-order.factory';
import { CreateSellOrderUseCase } from '../create-sell-order.use-case';

interface ICreateSellOrderFactory {
    fetcher: FetcherInterface;
    config: ConfigInterface;
}

export const CreateSellOrderFactory = ({
    fetcher,
    config,
}: ICreateSellOrderFactory) => {
    return CreateSellOrderUseCase({
        apiSellOrderRepository: ApiSellOrderFactory({ fetcher, config }),
    });
};
