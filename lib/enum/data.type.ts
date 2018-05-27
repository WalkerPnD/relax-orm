export enum DataType {
  String = 'String',
  Number = 'Number',
  CLOB = 'CLOB',
  Date = 'Date',
}

export type OracleDataTypes = keyof typeof DataType;
