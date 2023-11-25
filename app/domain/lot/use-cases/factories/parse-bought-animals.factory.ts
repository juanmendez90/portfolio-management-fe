import { ConfigInterface } from '@/app/domain/config';
import { FetcherInterface } from '@/app/domain/fetcher';
import { ParseBoughtAnimals } from '../parse-bought-animals.use-case';

interface ICreateLotFactory {
    fetcher: FetcherInterface;
    config: ConfigInterface;
}

export const ParseBoughtAnimalsFactory = ({
    fetcher,
    config,
}: ICreateLotFactory) => {
    return ParseBoughtAnimals();
};
