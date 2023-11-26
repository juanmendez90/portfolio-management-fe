import { Table } from '@/app/components/data-display/Table';
import { AnimalEntity } from '@/app/domain/lot/entities/animal.entity';

interface LotAnimalTableProps {
    isLoading: boolean;
    animals: AnimalEntity[];
}

export function LotAnimalTable({ isLoading, animals }: LotAnimalTableProps) {
    return (
        <div className="transition-all duration-300 ease-in-out transform max-h-[180px] overflow-y-auto mt-4">
            {!!animals?.length && (
                <Table isLoading={isLoading}>
                    <Table.Head>
                        <Table.Row>
                            <Table.Cell>#Ring</Table.Cell>
                            <Table.Cell width="80px" center>
                                Gender
                            </Table.Cell>
                            <Table.Cell width="80px" center>
                                Age (months)
                            </Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {animals.map((item) => {
                            return (
                                <Table.Row key={item.ring}>
                                    <Table.Cell>{item.ring}</Table.Cell>
                                    <Table.Cell center>
                                        {item.gender}
                                    </Table.Cell>
                                    <Table.Cell center>{item.age}</Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            )}
        </div>
    );
}
