import clsx from 'clsx';
import React from 'react';

interface TextFieldProps {
    withError?: boolean;
    className?: string;
    label?: string;
    placeholder?: string;
    helperText?: string;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    disabled?: boolean;
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    variant?: 'filled' | 'outlined' | 'standard';
    type?: 'text' | 'password' | 'number' | 'url' | 'tel' | 'date';
    name: string;
    step?: string;
}

const filledVariantClassNames = {
    inputContainer: 'bg-background-light',
    input: 'border focus:border-2 focus:m-0',
};

const outlinedVariantClassNames = {
    inputContainer: '',
    input: 'border focus:border-2 focus:m-0',
};

const standardVariantClassNames = {
    inputContainer: '',
    input: 'border-none focus:border-2',
};

const variantDictionary = {
    outlined: outlinedVariantClassNames,
    filled: filledVariantClassNames,
    standard: standardVariantClassNames,
};
export function TextField({
    type = 'text',
    label,
    withError,
    placeholder = ' ',
    helperText,
    startAdornment,
    endAdornment,
    disabled,
    value,
    onChange,
    variant = 'outlined',
    name,
    step,
}: TextFieldProps) {
    const { inputContainer, input } = variantDictionary[variant];
    return (
        <div className="relative w-full flex flex-col items-start">
            <label
                htmlFor={name}
                className={clsx(
                    inputContainer,
                    'relative w-full flex flex-col items-start justify-center rounded-full',
                )}
            >
                <span className="mb-2 pl-1 text-sm">{label}</span>
                <input
                    step={step}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={clsx(
                        'm-px rounded-lg block py-2 px-4 w-full text-sm text-black-high bg-transparent appearance-none focus:outline-none peer focus:placeholder-black-inactive focus:ring-0',
                        input,
                        {
                            'placeholder-transparent': label,
                            'placeholder-black-inactive': !label,

                            'border-error-dark focus:border-error-dark':
                                withError,
                            'border-gray-divider focus:border-primary':
                                !withError,
                            'pl-12': startAdornment,
                            'pr-12': endAdornment,
                            'text-gray-inactive': disabled,
                        },
                    )}
                    placeholder={placeholder}
                />
                {startAdornment && (
                    <span
                        className={clsx(
                            'absolute text-black-medium left-4',
                            '[&>svg]:w-[24px] [&>svg]:h-[24px]',
                            disabled && 'text-gray-divider',
                        )}
                    >
                        {startAdornment}
                    </span>
                )}
                {endAdornment && (
                    <span
                        className={clsx(
                            'absolute text-black-medium right-4',
                            '[&>svg]:w-[24px] [&>svg]:h-[24px]',
                            disabled && 'text-gray-divider',
                        )}
                    >
                        {endAdornment}
                    </span>
                )}
            </label>
            {!!helperText && (
                <p
                    className={clsx(
                        'mt-[4px] block p-0 pl-4 p-0 text-xs text-black-inactive',
                        withError && 'text-error-dark',
                        disabled && 'text-gray-inactive',
                    )}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
}
