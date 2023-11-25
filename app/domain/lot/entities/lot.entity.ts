import { AnimalEntity } from './animal.entity';

export enum LotStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
}

export interface CreateLotDto {
    name: string;
    totalNetPrice: string;
    totalPrice: string;
    unitPrice: string;
    avgWeight: string;
    date: string;
    animals: AnimalEntity[];
}

export interface GetLotsDto {
    id?: string;
    name?: string;
    date?: string;
    totalPrice?: number | string;
    avgWeight?: number | string;
    unitPrice?: number | string;
    totalAnimals?: number;
    sold: number;
    lotYield: number;
    status?: LotStatus;
    soldAnimals?: number;
    animals?: AnimalEntity[];
}

export interface LotEntity {
    name: string;
    date: string;
    status: LotStatus;
    unitPrice: string;
    avgWeight: string;
    userId: string;
    totalPrice: string;
    totalNetPrice: string;
    lotYield: string;
    netLotYield: string;
    sold: string;
    netSold: string;
    animals?: AnimalEntity[];
}
