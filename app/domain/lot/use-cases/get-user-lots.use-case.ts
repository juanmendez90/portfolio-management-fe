import { IApiLotRepository } from '../repositories/api-lot.repository';

export interface IGetUserLotsUseCase {
    apiLotRepository: IApiLotRepository;
}
export interface IGetUserLotsExecuteParams {
    status: string;
    view: string;
}

export function GetUserLotsUseCase({ apiLotRepository }: IGetUserLotsUseCase) {
    return {
        execute: async (
            { status, view }: IGetUserLotsExecuteParams,
            token: string,
        ) => {
            return apiLotRepository.getUserLots({ status, view }, token);
        },
    };
}
