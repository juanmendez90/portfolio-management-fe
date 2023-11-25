'use client';
import { Dialog } from '@/app/components/feedback/Dialog';
import { Button } from '@/app/components/inputs/Button';
import { LotForm } from './LotForm';
import { useCallback, useState } from 'react';
import { Close } from '@carbon/icons-react';
import { IconButton } from '@/app/components/inputs/IconButton';

export function LotFormDialog() {
    const [show, setShow] = useState<boolean>();
    const handleClose = useCallback(() => {
        setShow(false);
    }, []);
    const handleOpen = useCallback(() => {
        setShow(true);
    }, []);

    return (
        <div>
            <Button color="primary-dark" onClick={handleOpen}>
                Buy a Lot
            </Button>
            <Dialog show={show} onClose={handleClose}>
                <Dialog.Title className="font-semibold text-xl mb-4 flex flex-row justify-between items-center">
                    Create Lot
                    <IconButton
                        onClick={handleClose}
                        size="l"
                        icon={<Close />}
                    />
                </Dialog.Title>
                <LotForm onDiscard={handleClose} />
            </Dialog>
        </div>
    );
}
