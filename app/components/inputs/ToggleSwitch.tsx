import clsx from 'clsx';
import React, { createContext, useCallback, useContext, useMemo } from 'react';

interface ToggleSwitchProps {
    children: React.ReactNode;
    value: string;
    onChange: (value: string) => void;
}

interface ToggleSwitchOptionProps {
    children: React.ReactNode;
    value: string;
    checked?: boolean;
}

interface ToggleSwitchContextProps {
    value?: string;
    onChange: (value: string) => void;
}

const ToggleSwitchContext = createContext<ToggleSwitchContextProps>({
    onChange: () => {},
});

function Option({ children, value }: ToggleSwitchOptionProps) {
    const { value: selectedValue, onChange } = useContext(ToggleSwitchContext);
    const isChecked = useMemo(() => {
        return selectedValue === value;
    }, [selectedValue, value]);
    const handleChange = useCallback(() => {
        onChange(value);
    }, [value, onChange]);

    return (
        <>
            <input
                onChange={handleChange}
                checked={isChecked}
                name={value}
                type="radio"
                className={clsx('appearance-none opacity-0 absolute peer')}
            />
            <label
                onClick={handleChange}
                htmlFor={value}
                className={clsx(
                    'text-center leading-4 tracking-[1px] text-base text-black-high font-semibold normal-case px-3 py-2.5 rounded-full cursor-pointer min-w-[60px]',
                    {
                        'peer-checked:bg-black-high peer-checked:text-primary':
                            isChecked,
                    },
                )}
            >
                {children}
            </label>
        </>
    );
}

export function ToggleSwitch({ children, onChange, value }: ToggleSwitchProps) {
    const handleChange = useCallback(
        (newValue: string) => {
            onChange && onChange(newValue);
        },
        [onChange],
    );

    return (
        <ToggleSwitchContext.Provider value={{ value, onChange: handleChange }}>
            <div
                className={clsx(
                    'border border-gray-dark p-1 rounded-full flex flex-row bg-background',
                )}
            >
                {children}
            </div>
        </ToggleSwitchContext.Provider>
    );
}

ToggleSwitch.Option = Option;
