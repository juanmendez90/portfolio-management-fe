import { IApiLotRepository } from '../repositories/api-lot.repository';

export interface IGetLotByIdUseCase {
    apiLotRepository: IApiLotRepository;
}
export interface GetLotByIdUseCaseExecuteParams {
    id: string;
}

export function GetLotByIdUseCase({ apiLotRepository }: IGetLotByIdUseCase) {
    return {
        execute: async (
            { id }: GetLotByIdUseCaseExecuteParams,
            token: string,
        ) => {
            return apiLotRepository.getLotById({ id }, token);
        },
    };
}
