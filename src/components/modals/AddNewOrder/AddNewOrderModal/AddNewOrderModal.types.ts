import { type Order } from '../../AllOrders/AllOrdersTable/AllOrdersTable.types';
import { type InputType } from '../../../../data/enums/InputType';

export type EventTarget = {
  target: {
    id: { value: string };
    date: { value: string };
    total: { value: string };
    quantity: { value: string };
    status: { value: string };
  };
};

export type InputAttributeType = Partial<Omit<Order, 'status' | 'currency'>>;

export type InputTypes = {
  [key in keyof InputAttributeType]: InputType;
};

export type InputMinimalValueType = {
  [key in keyof InputAttributeType]: number;
};

export type InputPatternsType = {
  [key in keyof InputAttributeType]: string;
};
