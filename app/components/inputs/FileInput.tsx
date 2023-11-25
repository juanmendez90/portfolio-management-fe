import { CloudUpload } from '@carbon/icons-react';
import {
    ChangeEvent,
    DragEvent,
    useCallback,
    useReducer,
    useRef,
    useState,
} from 'react';
import { Button } from './Button';
import clsx from 'clsx';

interface FileInputProps {
    onFileChange: (file: File) => void;
    accept?: string;
}

enum Actions {
    'IS_DRAG_OVER' = 'IS_DRAG_OVER',
    FILE = 'FILE',
    ERROR = 'ERROR',
}

interface IAction {
    value: any;
    action: Actions;
}

interface IState {
    file: File | null;
    error: boolean;
    isDragOver: boolean;
}

const dragClasses = 'ring-4 ring-primary/70';
const errorClasses = 'ring-4 ring-error-dark/60';

function fileInputReducer(state: IState, action: IAction): IState {
    switch (action.action) {
        case Actions.IS_DRAG_OVER:
            return {
                ...state,
                isDragOver: action.value,
            };
        case Actions.FILE:
            return {
                ...state,
                file: action.value,
            };
        case Actions.ERROR:
            return {
                ...state,
                error: action.value,
            };
        default:
            return state;
    }
}

const initialState = {
    file: null,
    isDragOver: false,
    error: false,
};

export function FileInput({ onFileChange, accept }: FileInputProps) {
    const [state, dispatch] = useReducer(fileInputReducer, initialState);

    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const handleClick = useCallback(() => {
        hiddenFileInput.current?.click();
    }, [hiddenFileInput]);

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { target } = event;
            if (target) {
                const fileUploaded = target?.files?.[0];
                fileUploaded && onFileChange(fileUploaded);
            }
        },
        [onFileChange],
    );

    const handleDrop = useCallback(
        (event: DragEvent<HTMLDivElement>) => {
            // Prevent default behavior (Prevent file from being opened)
            event.preventDefault();
            let file = null;
            const files = [...event.dataTransfer.files];
            file = files[0];

            if (file.type === 'text/csv') {
                dispatch({
                    action: Actions.FILE,
                    value: file,
                });
                file && onFileChange(file as File);
            } else {
                dispatch({
                    action: Actions.ERROR,
                    value: true,
                });
            }
            dispatch({
                action: Actions.IS_DRAG_OVER,
                value: false,
            });
        },
        [onFileChange],
    );

    const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        // Prevent default behavior (Prevent file from being opened)
        event.preventDefault();
        dispatch({
            action: Actions.IS_DRAG_OVER,
            value: true,
        });
        dispatch({
            action: Actions.ERROR,
            value: false,
        });
    }, []);

    return (
        <div
            // onDragEnter={handleDragEnter}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={clsx(
                'transition-all duration-300 ease-in-out transform relative border border-gray-divider bg-background rounded-lg px-4 py-4 flex flex-col justify-center items-center w-full',
                {
                    [dragClasses]: state.isDragOver,
                    [errorClasses]: state.error,
                },
            )}
        >
            <input
                accept={accept}
                onChange={handleChange}
                ref={hiddenFileInput}
                type="file"
                className="z-0 invisible absolute top-0 left-0 w-[1px] h-[1px] pointer-events-none"
            />
            <p className="font-normal text-black-inactive text-base text-center mb-2">
                Drop your file here
                <br />
                or
            </p>
            <Button onClick={handleClick} startAdornment={<CloudUpload />}>
                Select a file
            </Button>
        </div>
    );
}
