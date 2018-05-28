import { IExecuteReturn } from 'oracledb';
import { USER_ID } from '../models/name.consts';

export const userResult: IExecuteReturn = {
  outBinds: undefined,
  rowsAffected: undefined,
  metaData: [
    { name: USER_ID },
    { name: 'NAME' },
  ] as any,
  rows: [
    [1, 'abc'],
    [2, 'bbb'],
  ],
};