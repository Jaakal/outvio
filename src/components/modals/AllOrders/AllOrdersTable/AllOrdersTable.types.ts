import { OrderStatus } from '../../../../data/enums/OrderStatus';
import { Currency } from '../../../../data/enums/Currency';

export type AllOrdersTableProps = {
  className: string;
};

export type Order = {
  id: number;
  total: number;
  currency: Currency;
  quantity: number;
  status: OrderStatus;
  date: string;
  formattedDate: string;
  formattedTotal: string;
};

export type StatusWeights = {
  [key in OrderStatus]: number;
};
