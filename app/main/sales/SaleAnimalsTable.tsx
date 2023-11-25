import { Table } from '@/app/components/data-display/Table';
import { AnimalEntity } from '@/app/domain/lot/entities/animal.entity';

interface SalesAnimalTableProps {
    isLoading: boolean;
    animals: AnimalEntity[];
}

export function SaleAnimalTable({ isLoading, animals }: SalesAnimalTableProps) {
    return (
        <div className="transition-all duration-300 ease-in-out transform max-h-[180px] overflow-y-auto mt-4">
            {!!animals?.length && (
                <Table isLoading={isLoading}>
                    <Table.Head>
                        <Table.Row>
                            <Table.Cell>#Ring</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {animals.map((item) => {
                            return (
                                <Table.Row key={item.id}>
                                    <Table.Cell>{item.id}</Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            )}
        </div>
    );
}
