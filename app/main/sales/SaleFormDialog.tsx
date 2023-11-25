'use client';
import { Dialog } from '@/app/components/feedback/Dialog';
import { Button } from '@/app/components/inputs/Button';
import { IconButton } from '@/app/components/inputs/IconButton';
import { Close } from '@carbon/icons-react';
import { useCallback, useState } from 'react';
import { SaleForm } from './SaleForm';

export function SaleFormDialog() {
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
                Sell Animals
            </Button>
            <Dialog show={show} onClose={handleClose}>
                <Dialog.Title className="font-semibold text-xl mb-4 flex flex-row justify-between items-center">
                    Sell Animals
                    <IconButton
                        onClick={handleClose}
                        size="l"
                        icon={<Close />}
                    />
                </Dialog.Title>
                <SaleForm onDiscard={handleClose} />
            </Dialog>
        </div>
    );
}
