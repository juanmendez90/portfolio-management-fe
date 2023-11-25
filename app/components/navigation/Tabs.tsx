'use client';
import clsx from 'clsx';
import { ReactNode, createContext, useCallback, useContext } from 'react';

interface TabsContextProps {
    activeTab?: string;
    onChange: (value: string) => void;
}

interface TabProps {
    value: string;
    children: ReactNode;
    href?: string;
}

interface TabsProps {
    value: string;
    onChange?: (value: string) => void;
    children: ReactNode;
}

const TabsContext = createContext<TabsContextProps>({ onChange: () => {} });

function Tab({ value, children }: TabProps) {
    const { activeTab, onChange } = useContext(TabsContext);

    const handleClick = useCallback(() => {
        onChange(value);
    }, [onChange, value]);

    return (
        <div className="relative flex items-center justify-center">
            <button
                onClick={handleClick}
                className={clsx(
                    'font-semibold text-base px-2 py-4 tracking-[1px] whitespace-nowrap',
                    {
                        'text-primary-accent': activeTab === value,
                    },
                )}
            >
                {children}
            </button>
            <div
                className={clsx(
                    'absolute -bottom-[2.5px] rounded-full h-[4px] w-full',
                    {
                        'bg-primary-accent': activeTab === value,
                    },
                )}
            />
        </div>
    );
}

export function Tabs({ value, children, onChange }: TabsProps) {
    const handleChange = useCallback(
        (newValue: string) => {
            onChange && onChange(newValue);
        },
        [onChange],
    );

    return (
        <div className="flex flex-row w-full border-b border-gray-divider">
            <TabsContext.Provider
                value={{ activeTab: value, onChange: handleChange }}
            >
                {children}
            </TabsContext.Provider>
        </div>
    );
}

Tabs.Tab = Tab;
