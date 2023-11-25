import { SellOrderEntity } from '../entities/sell-order.entity';
import { IApiSellOrderRepository } from '../repositories/api-sell-order.repository';

export interface ICreateSellOrderUseCase {
    apiSellOrderRepository: IApiSellOrderRepository;
}

interface IExecuteParams {
    data: SellOrderEntity;
}

export function CreateSellOrderUseCase({
    apiSellOrderRepository,
}: ICreateSellOrderUseCase) {
    return {
        execute: async ({ data }: IExecuteParams, token: string) => {
            return apiSellOrderRepository.createSellOrder({ data }, token);
        },
    };
}
