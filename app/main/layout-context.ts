import { createContext } from 'react';

interface NavContextProps {
    isOpen?: boolean;
    onChange?: (value: boolean) => any;
}

export const NavContext = createContext<NavContextProps>({});
