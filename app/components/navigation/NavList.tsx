import { PiggyBank, Switcher, Wallet } from '@carbon/icons-react';
import { NavListItem } from './NavlistItem';

export const routes = {
    dashboard: '/main/dashboard',
    lots: '/main/lots',
    sales: '/main/sales',
};

export function NavList() {
    return (
        <nav className="[&>*]:mb-2">
            <NavListItem href={routes.dashboard} icon={<Switcher />}>
                Dashboard
            </NavListItem>
            <NavListItem href={routes.lots} icon={<PiggyBank />}>
                Your Lots
            </NavListItem>
            <NavListItem href={routes.sales} icon={<Wallet />}>
                Your Sales
            </NavListItem>
        </nav>
    );
}
