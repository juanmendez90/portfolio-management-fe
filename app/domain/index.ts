import { config } from './config';
import { FetcherFactory } from './fetcher';
import { CreateLotFactory } from './lot/use-cases/factories/create-lot.factory';
import { GetLotByIdFactory } from './lot/use-cases/factories/get-lot-by-id.factory';
import { GetUserLotsFactory } from './lot/use-cases/factories/get-user-lots.factory';
import { ParseBoughtAnimalsFactory } from './lot/use-cases/factories/parse-bought-animals.factory';
import { CreateSellOrderFactory } from './sell-order/use-cases/factories/create-sell-order.factory';
import { GetUSerSellOrdersFactory } from './sell-order/use-cases/factories/get-user-sell-orders.factory';
import { ParseSoldAnimalsFactory } from './sell-order/use-cases/factories/parse-sold-animals.factory';

const fetcher = FetcherFactory({ options: {} });

export const useCases = {
    create_lot: CreateLotFactory({ config, fetcher }),
    parse_bought_animals: ParseBoughtAnimalsFactory({ config, fetcher }),
    get_user_lots: GetUserLotsFactory({ config, fetcher }),
    create_sell_order: CreateSellOrderFactory({ config, fetcher }),
    get_user_sell_orders: GetUSerSellOrdersFactory({ config, fetcher }),
    parse_sold_animals: ParseSoldAnimalsFactory({ config, fetcher }),
    get_lot_by_id: GetLotByIdFactory({ config, fetcher }),
};
