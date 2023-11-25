import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Switcher } from '@carbon/icons-react';
import { PageHeader } from '../../components/page/Header';
import { routes } from '../../components/navigation/NavList';
async function DashboardPage() {
    return (
        <div className="w-full h-full flex flex-col">
            <PageHeader>
                <PageHeader.Title icon={<Switcher />}>
                    Dashboard
                </PageHeader.Title>
            </PageHeader>
            <div className="w-[100px] h-[100px] bg-primary"></div>
            <div className="w-[100px] h-[100px] bg-primary-dark"></div>
        </div>
    );
}

export default withPageAuthRequired(DashboardPage, {
    returnTo: routes.dashboard,
});
