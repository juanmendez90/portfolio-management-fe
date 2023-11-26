'use client';
import { ChevronLeft } from '@carbon/icons-react';
import clsx from 'clsx';
import { createContext, useCallback, useState } from 'react';
import { IconButton } from '../components/inputs/IconButton';
import { Drawer } from '../components/navigation/Drawer';
import { UserBox } from '../components/navigation/UserBox';
import { NavList } from '../components/navigation/NavList';
import { NavContext } from './layout-context';

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const handleChange = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);
    return (
        <section className="bg-background flex flex-row pt-4 pr-4 h-screen w-full">
            {/* Include shared UI here e.g. a header or sidebar */}
            <NavContext.Provider
                value={{
                    isOpen,
                    onChange: setIsOpen,
                }}
            >
                <Drawer isOpen={isOpen}>
                    <div className="h-full flex flex-col relative">
                        <div className="px-4">
                            <div
                                className={clsx(
                                    'mb-7 flex flex-row items-center h-[56px]',
                                    {
                                        'justify-between': isOpen,
                                        'justify-center': !isOpen,
                                    },
                                )}
                            >
                                {isOpen && (
                                    <h1 className="text-xl text-primary-dark font-medium">
                                        Portfolio
                                        <br />
                                        Management
                                    </h1>
                                )}
                                <span>
                                    <IconButton
                                        onClick={handleChange}
                                        icon={
                                            <ChevronLeft
                                                className={clsx(
                                                    'transition-all duration-300 ease-in-out text-grayV2-dark',
                                                    {
                                                        'rotate-0': isOpen,
                                                        'rotate-180': !isOpen,
                                                    },
                                                )}
                                            />
                                        }
                                    />
                                </span>
                            </div>
                            <NavList />
                        </div>
                        <div className="absolute bottom-0 w-full">
                            <UserBox />
                        </div>
                    </div>
                </Drawer>
            </NavContext.Provider>
            <main className="ml-4 overflow-y-auto rounded-3xl bg-white h-full w-full rounded-lg p-7">
                {children}
            </main>
        </section>
    );
}
