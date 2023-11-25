import { ConfigInterface } from '@/app/domain/config';
import { FetcherInterface } from '@/app/domain/fetcher';
import { ApiLotRepositoryFactory } from '../../repositories/factories/api-lot.factory';
import { GetUserLotsUseCase } from '../get-user-lots.use-case';

interface IGetUserLotsFactory {
    fetcher: FetcherInterface;
    config: ConfigInterface;
}

export const GetUserLotsFactory = ({
    fetcher,
    config,
}: IGetUserLotsFactory) => {
    return GetUserLotsUseCase({
        apiLotRepository: ApiLotRepositoryFactory({ fetcher, config }),
    });
};
