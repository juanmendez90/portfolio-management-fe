import { routes } from '@/app/components/navigation/NavList';
import { PageHeader } from '@/app/components/page/Header';
import { SaleFormDialog } from '@/app/main/sales/SaleFormDialog';
import { SaleWrapper } from '@/app/main/sales/SaleWrapper';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Wallet } from '@carbon/icons-react';

async function SalesPage() {
    return (
        <div className="w-full">
            <PageHeader>
                <PageHeader.Title icon={<Wallet />}>
                    Your Sales
                </PageHeader.Title>
                <SaleFormDialog />
            </PageHeader>
            <SaleWrapper />
        </div>
    );
}

export default withPageAuthRequired(SalesPage, { returnTo: routes.sales });
