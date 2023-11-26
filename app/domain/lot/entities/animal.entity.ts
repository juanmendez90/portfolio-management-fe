export enum AnimalBreeds {
    HEREFORD = 'Hereford',
    ABERDEEN_ANGUS = 'Aberdeen Angus',
}

export enum AnimalFamily {
    COW = 'COW',
}

export enum Gender {
    H = 'H',
    M = 'M',
}

export enum AnimalStatus {
    ALIVE = 'ALIVE',
    DEAD = 'DEAD',
    SOLD = 'SOLD',
}

export interface AnimalEntity {
    id?: string;
    ring?: string;
    age?: string;
    dateSold?: string;
    gender?: Gender;
    weight?: string;
    status?: AnimalStatus;
    breed?: AnimalBreeds;
    family?: AnimalFamily;
}
