import { OracleDataTypes } from '../enum/data.type';

export interface IAttrInfo {
  column: string;
  // name: string;
  type: OracleDataTypes;
}