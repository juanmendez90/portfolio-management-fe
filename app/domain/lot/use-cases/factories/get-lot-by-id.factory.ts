import { ConfigInterface } from '@/app/domain/config';
import { FetcherInterface } from '@/app/domain/fetcher';
import { ApiLotRepositoryFactory } from '../../repositories/factories/api-lot.factory';
import { GetUserLotsUseCase } from '../get-user-lots.use-case';
import { GetLotByIdUseCase } from '../get-lot-by-id.use-case';

interface IGetLotByIdFactory {
    fetcher: FetcherInterface;
    config: ConfigInterface;
}

export const GetLotByIdFactory = ({ fetcher, config }: IGetLotByIdFactory) => {
    return GetLotByIdUseCase({
        apiLotRepository: ApiLotRepositoryFactory({ fetcher, config }),
    });
};
