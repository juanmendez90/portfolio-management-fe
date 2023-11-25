import { AnimalEntity } from '../../lot/entities/animal.entity';

export enum SellOrderStatus {
    NOT_PAID = 'NOT_PAID',
    PAID = 'PAID',
}

export interface SellOrderEntity {
    id?: string;
    userId?: string;
    date?: string;
    totalPrice?: number;
    totalNetPrice?: number;
    avgWeight?: number;
    unitPrice?: number;
    totalAnimals?: number;
    status?: SellOrderStatus;
    animals?: AnimalEntity[];
}
