'use client';
import { Button } from '@/app/components/inputs/Button';
import { FileInput } from '@/app/components/inputs/FileInput';
import { TextField } from '@/app/components/inputs/Textfield';
import { useCases } from '@/app/domain';
import { AnimalEntity } from '@/app/domain/lot/entities/animal.entity';
import { Save, TrashCan } from '@carbon/icons-react';
import axios from 'axios';
import { useCallback, useReducer } from 'react';
import { SaleAnimalTable } from './SaleAnimalsTable';

const fetcher = ({
    url,
    params,
    data,
}: {
    url: string;
    params?: string;
    data: any;
}) => axios.post(url, { params, data }).then((res) => res.data);

enum Actions {
    DATA = 'DATA',
    LOADING = 'LOADING',
    ERROR = 'ERROR',
}

interface IData {
    totalNetPrice: string;
    totalPrice: string;
    unitPrice: string;
    avgWeight: string;
    date: string;
    animals: AnimalEntity[];
}

interface IFormState {
    data: IData;
    isLoading: boolean;
    error: boolean;
}

interface IFormAction {
    action: Actions;
    field: string;
    value: string | boolean | AnimalEntity[];
}

interface SaleFormProps {
    onDiscard: () => void;
}

function formReducer(state: IFormState, action: IFormAction): IFormState {
    switch (action.action) {
        case Actions.DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.field]: action.value,
                },
            };
        case Actions.LOADING:
            return {
                ...state,
                isLoading: action.value as boolean,
            };
        case Actions.ERROR:
            return {
                ...state,
                error: action.value as boolean,
            };
        default:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.field]: action.value,
                },
            };
    }
}

const initialFormState = {
    data: {
        date: '',
        totalPrice: '',
        totalNetPrice: '',
        unitPrice: '',
        avgWeight: '',
        animals: [],
    },
    isLoading: false,
    error: false,
};

export function SaleForm({ onDiscard }: SaleFormProps) {
    const [state, dispatch] = useReducer(formReducer, initialFormState);

    const handleSubmit = useCallback(async () => {
        dispatch({
            action: Actions.ERROR,
            field: '',
            value: false,
        });
        dispatch({
            action: Actions.LOADING,
            field: '',
            value: true,
        });
        const { data } = state;
        const sellOrder = await fetcher({ url: '/api/sell-order', data });
        if (sellOrder) {
            dispatch({
                action: Actions.LOADING,
                field: '',
                value: false,
            });
            onDiscard();
        } else {
            dispatch({
                action: Actions.LOADING,
                field: '',
                value: false,
            });
            dispatch({
                action: Actions.ERROR,
                field: '',
                value: true,
            });
        }
    }, [state, onDiscard]);

    const handleChange = useCallback(({ target }: any) => {
        const { name, value } = target;
        dispatch({
            action: Actions.DATA,
            field: name,
            value,
        });
    }, []);

    const disableSubmit = useCallback((event: any) => {
        event?.preventDefault();
    }, []);

    return (
        <form onSubmit={disableSubmit}>
            <div className="flex flex-row [&>*:first-child]:mr-4 mb-4">
                <TextField
                    type="date"
                    name="date"
                    label="Purchased Date"
                    onChange={handleChange}
                    value={state.data.date}
                />
            </div>
            <div className="flex flex-row [&>*:first-child]:mr-4 mb-4">
                <TextField
                    step=".01"
                    name="unitPrice"
                    type="number"
                    label="Unit Price"
                    value={state.data.unitPrice}
                    onChange={handleChange}
                />
                <TextField
                    step=".01"
                    name="avgWeight"
                    value={state.data.avgWeight}
                    type="number"
                    label="Average Weight"
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-row [&>*:first-child]:mr-4 mb-4">
                <TextField
                    step=".01"
                    name="totalPrice"
                    value={state.data.totalPrice}
                    type="number"
                    label="Total Gross Price"
                    onChange={handleChange}
                />
                <TextField
                    step=".01"
                    name="totalNetPrice"
                    type="number"
                    label="Total Net Price"
                    value={state.data.totalNetPrice}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col mb-4 font-semibold">
                <h3 className="text-base mb-4">Cows</h3>
                <FileInput
                    accept=".csv"
                    onFileChange={async (file) => {
                        const animals =
                            await useCases.parse_sold_animals.execute({
                                file,
                            });
                        dispatch({
                            action: Actions.DATA,
                            field: 'animals',
                            value: animals,
                        });
                    }}
                />

                <SaleAnimalTable
                    isLoading={false}
                    animals={state.data.animals}
                />

                <p className="text-right py-2">
                    {!!state.data.animals.length &&
                        `Total: ${state.data.animals.length} cows`}
                </p>
            </div>
            {state.error && (
                <p className="text-error text-sm mb-4">
                    {`We couldn't sell your animals there was an ERROR, please try
                    again`}
                </p>
            )}
            <div className="[&>*:first-child]:mr-2 flex flex-row justify-end">
                <Button
                    startAdornment={<TrashCan />}
                    variant="text"
                    color="error"
                    onClick={onDiscard}
                >
                    Discard Sell
                </Button>
                <Button
                    onClick={handleSubmit}
                    color="primary-dark"
                    startAdornment={<Save />}
                >
                    Sell Animals
                </Button>
            </div>
        </form>
    );
}
