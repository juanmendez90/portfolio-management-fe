'use client';
import {
    UserAvatarFilled,
    ChevronRight,
    Edit,
    DocumentPreliminary,
    Archive,
    Logout,
} from '@carbon/icons-react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useContext } from 'react';
import clsx from 'clsx';
import { NavContext } from '@/app/main/layout-context';

function Skeleton() {
    return (
        <div className="bg-background p-4 animate-pulse flex flex-row w-full items-center">
            <div className="min-h-[24px] min-w-[24px] rounded-full bg-gray-dark mr-2" />
            <div className="h-2 rounded-full bg-gray-dark w-full" />
        </div>
    );
}

export function UserBox() {
    const { user, isLoading } = useUser();
    const { isOpen } = useContext(NavContext);

    return (
        <>
            {isLoading && <Skeleton />}
            {!isLoading && (
                <Menu
                    as="div"
                    className="relative inline-block text-left w-full"
                >
                    <Menu.Button className="w-full rounded-br-lg hover:bg-background-dark cursor-pointer bg-background border-t border-gray-divider flex flex-row p-4 text-primary-dark items-center">
                        {!user?.picture && (
                            <UserAvatarFilled className="min-h-[24px] min-w-[24px] mr-2" />
                        )}
                        {user?.picture && (
                            <img
                                className="h-[24px] w-[24px] mr-2 rounded-full"
                                src={user.picture}
                            />
                        )}
                        {isOpen && (
                            <span className="text-ellipsis overflow-hidden">
                                {user?.name}
                            </span>
                        )}
                        <ChevronRight className="min-h-[16px] min-w-[16px] ml-2" />
                    </Menu.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="top-3/4 -translate-y-full left-full absolute w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="/api/auth/logout"
                                            className={clsx(
                                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                                {
                                                    'bg-primary text-primary-dark':
                                                        active,
                                                    'text-gray-900': !active,
                                                },
                                            )}
                                        >
                                            <Logout />
                                            Logout
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            )}
        </>
    );
}
