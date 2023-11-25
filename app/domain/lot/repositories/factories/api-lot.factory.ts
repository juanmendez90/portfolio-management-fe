import { ConfigInterface } from '@/app/domain/config';
import { FetcherInterface } from '@/app/domain/fetcher';
import { ApiLotRepository, IApiLotRepository } from '../api-lot.repository';

interface IApiLotRepositoryFactory {
    fetcher: FetcherInterface;
    config: ConfigInterface;
}

export function ApiLotRepositoryFactory({
    fetcher,
    config,
}: IApiLotRepositoryFactory): IApiLotRepository {
    return ApiLotRepository({ fetcher, config });
}
