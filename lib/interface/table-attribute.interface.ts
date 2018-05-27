import { ColumnOption } from '../enum/option.type';
import { IAttrInfo } from './column-option.interface';

export interface ITableAttr {
  rowNameMap: {
    [key: string]: string;
  };
  columsInfo: {
    [key: string]: IAttrInfo,
  };
}

export interface IColumnOption {
  [ColumnOption.sequence]: string;
}
