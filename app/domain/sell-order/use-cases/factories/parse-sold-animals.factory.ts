import { ConfigInterface } from '@/app/domain/config';
import { FetcherInterface } from '@/app/domain/fetcher';
import { ParseSoldAnimalsUseCase } from '../pare-sold-animals.use-case';

interface IParseSoldAnimalsFactory {
    fetcher: FetcherInterface;
    config: ConfigInterface;
}

export const ParseSoldAnimalsFactory = ({
    fetcher,
    config,
}: IParseSoldAnimalsFactory) => {
    return ParseSoldAnimalsUseCase();
};
