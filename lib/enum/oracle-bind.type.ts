import { DataType } from './data.type';

export enum OracleBind {
  BIND_OUT= 3003,
}

export const OrcleDataTypeConst: Readonly<any> = {
  [DataType.Date]: 2003,
  [DataType.Number]: 2002,
  [DataType.String]: 2001,
  [DataType.CLOB]: 2006,
  BLOB: 2007,
  BUFFER: 2005,
  CURSOR: 2004,
  DEFAULT: 0,
};