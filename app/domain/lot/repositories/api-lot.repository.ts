import { ConfigInterface } from '../../config';
import { FetcherInterface } from '../../fetcher';
import { CreateLotDto, GetLotsDto, LotEntity } from '../entities/lot.entity';

interface ApiLotRepositoryProps {
    fetcher: FetcherInterface;
    config: ConfigInterface;
}

interface CreateLotParams {
    data: CreateLotDto;
}

interface GetLotByIdParams {
    id: string;
}

export interface GetLotsParams {
    status: string;
    view: string;
}

export interface IApiLotRepository {
    createLot: (
        { data }: CreateLotParams,
        token: string,
    ) => Promise<LotEntity | null>;
    getUserLots: (
        { status, view }: GetLotsParams,
        token: string,
    ) => Promise<GetLotsDto[]>;
    getLotById: (
        { id }: GetLotByIdParams,
        token: string,
    ) => Promise<LotEntity | null>;
}

export function ApiLotRepository({
    fetcher,
    config,
}: ApiLotRepositoryProps): IApiLotRepository {
    return {
        createLot: async ({ data }: CreateLotParams, token: string) => {
            try {
                const response = await fetcher.post(
                    `${config.apiHost}/lot`,
                    data,
                    {},
                    token,
                );
                return response.data as LotEntity;
            } catch (error) {
                console.error({ error });
                return null;
            }
        },
        getUserLots: async ({ status, view }: GetLotsParams, token: string) => {
            try {
                const response = await fetcher.get(
                    `${config.apiHost}/lot`,
                    {
                        params: { status, view },
                    },
                    token,
                );
                return response.data;
            } catch (error) {
                console.error({ error });
                return null;
            }
        },
        getLotById: async ({ id }: GetLotByIdParams, token: string) => {
            try {
                const response = await fetcher.get(
                    `${config.apiHost}/lot/${id}`,
                    {},
                    token,
                );
                return response.data;
            } catch (error) {
                console.error({ error });
                return null;
            }
        },
    };
}
