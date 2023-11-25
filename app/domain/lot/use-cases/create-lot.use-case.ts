import { CreateLotDto } from '../entities/lot.entity';
import { IApiLotRepository } from '../repositories/api-lot.repository';

export interface ICreateLotUseCase {
    apiLotRepository: IApiLotRepository;
}

interface IExecuteParams {
    data: CreateLotDto;
}

export function CreateLotUseCase({ apiLotRepository }: ICreateLotUseCase) {
    return {
        execute: async ({ data }: IExecuteParams, token: string) => {
            return apiLotRepository.createLot({ data }, token);
        },
    };
}
