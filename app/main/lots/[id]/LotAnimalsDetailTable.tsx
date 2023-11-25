'use client';
import { Table } from '@/app/components/data-display/Table';
import { AnimalEntity } from '@/app/domain/lot/entities/animal.entity';
import moment from 'moment';

interface LotAnimalTableProps {
    isLoading?: boolean;
    animals: AnimalEntity[];
}

export function LotAnimalDetailTable({
    isLoading,
    animals,
}: LotAnimalTableProps) {
    return (
        <div className="transition-all duration-300 ease-in-out transform">
            {!!animals?.length && (
                <Table isLoading={isLoading}>
                    <Table.Head>
                        <Table.Row>
                            <Table.Cell>#Ring</Table.Cell>
                            <Table.Cell>Gender</Table.Cell>
                            <Table.Cell>Age (months)</Table.Cell>
                            <Table.Cell>Sold</Table.Cell>
                            <Table.Cell>Status</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {animals.map((item) => {
                            return (
                                <Table.Row key={item.id}>
                                    <Table.Cell>{item.id}</Table.Cell>
                                    <Table.Cell center>
                                        {item.gender}
                                    </Table.Cell>
                                    <Table.Cell>{item.age}</Table.Cell>
                                    <Table.Cell>
                                        {moment(item.dateSold).format(
                                            'DD/MM/YYYY',
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>{item.status}</Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            )}
        </div>
    );
}
