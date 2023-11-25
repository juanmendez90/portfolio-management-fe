import { routes } from '@/app/components/navigation/NavList';
import { PageHeader } from '@/app/components/page/Header';
import { LotFormDialog } from '@/app/main/lots/LotFormDialog';
import { LotWrapper } from '@/app/main/lots/LotWrapper';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { PiggyBank } from '@carbon/icons-react';

async function LotsPage() {
    return (
        <div className="w-full">
            <PageHeader>
                <PageHeader.Title icon={<PiggyBank />}>
                    Your Lots
                </PageHeader.Title>
                <LotFormDialog />
            </PageHeader>
            <LotWrapper />
        </div>
    );
}

export default withPageAuthRequired(LotsPage, { returnTo: routes.lots });
