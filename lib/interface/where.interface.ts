import { ResultOrder } from '../enum/result-order.type';

export type ResultOrderType = [string, keyof typeof ResultOrder];
export type PrimitiveTypes = string | number | boolean | typeof Date;
export type OracleBindType = {dir?: number, type?: number, maxSize?: number};
export type MapperObject = {[key: string]: PrimitiveTypes | OracleBindType};

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
  [P in keyof T]?: PrimitiveTypes | WhereLogic<T> | WhereOptions<T[P]> | WhereOptions<T>[];
};

export type WhereLogic<T> = Partial<{
  $eq: PrimitiveTypes,
  // $in: Array<string | number>;
  // $like: string;
  // $lt: string | Date | number;
  // $lte: string | Date | number;
  // $gt: string | Date | number;
  // $gte: string | Date | number;
  // $between: string | Date | number;
  $or: WhereOptions<T>[],
  $and: WhereOptions<T>[],
}>;
