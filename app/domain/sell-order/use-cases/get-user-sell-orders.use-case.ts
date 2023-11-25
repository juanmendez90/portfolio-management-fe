import { IApiSellOrderRepository } from '../repositories/api-sell-order.repository';

export interface IGetUserSellOrdersUseCase {
    apiSellOrderRepository: IApiSellOrderRepository;
}
export interface IGetUserSellOrdersExecuteParams {
    status: string;
}

export function GetUserSellOrdersUseCase({
    apiSellOrderRepository,
}: IGetUserSellOrdersUseCase) {
    return {
        execute: async (
            { status }: IGetUserSellOrdersExecuteParams,
            token: string,
        ) => {
            return apiSellOrderRepository.getUserSellOrders({ status }, token);
        },
    };
}
