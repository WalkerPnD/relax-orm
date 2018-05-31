import { ColumnOption } from '../enum/option.type';
import { IAttrInfo } from './column-option.interface';
import { PrimitiveTypes } from './where.interface';

export interface ITableAttr {
  rowNameMap: {
    [key: string]: string;
  };
  columsInfo: {
    [key: string]: IAttrInfo,
  };
}

export interface IColumnOption {
  [ColumnOption.primaryKey]: PrimitiveTypes;
  [ColumnOption.sequence]: PrimitiveTypes;
}
