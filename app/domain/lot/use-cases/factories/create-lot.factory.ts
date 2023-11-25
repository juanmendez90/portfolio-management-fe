import { ConfigInterface } from '@/app/domain/config';
import { FetcherInterface } from '@/app/domain/fetcher';
import { ApiLotRepositoryFactory } from '../../repositories/factories/api-lot.factory';
import { CreateLotUseCase } from '../create-lot.use-case';

interface ICreateLotFactory {
    fetcher: FetcherInterface;
    config: ConfigInterface;
}

export const CreateLotFactory = ({ fetcher, config }: ICreateLotFactory) => {
    return CreateLotUseCase({
        apiLotRepository: ApiLotRepositoryFactory({ fetcher, config }),
    });
};
