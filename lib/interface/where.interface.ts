import { ResultOrder } from '../enum/result-order.type';

export type ResultOrderType = [string, keyof typeof ResultOrder];
export type PrimitiveTypes = string | number | boolean | typeof Date;
export type MapperObject = {[key: string]: PrimitiveTypes};

export interface IFindOptions<T> {
  where?: WhereOptions<T>;
  order?: ResultOrderType[];
  limit?: number;
  offset?: number;
  logging?: boolean;
  // Todo: Implement Assosiation
  // include?: Array<typeof Model | IIncludeOptions>;
}

export type WhereOptions<T> = {
  [P in keyof T]?: PrimitiveTypes | WhereLogic | WhereOptions<T[P]> | Array<WhereOptions<T>>;
};

export type WhereLogic = Partial<{
  $eq: PrimitiveTypes,
  // $in: Array<string | number>;
  // $like: string;
  // $lt: string | Date | number;
  // $lte: string | Date | number;
  // $gt: string | Date | number;
  // $gte: string | Date | number;
  // $between: string | Date | number;
  // $or: Array<any>
  // $and: Array<any>
}>;
