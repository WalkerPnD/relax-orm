import { IExecuteReturn } from 'oracledb';
import { User } from '../user.model';
import { USER_ID } from './name.consts';

const USER_ONE = {
  id: 1,
  name: 'walker',
};

const USER_TWO = {
  id: 2,
  name: 'style',
};

export const userFindAllUserResult: IExecuteReturn = {
  outBinds: undefined,
  rowsAffected: undefined,
  metaData: [
    { name: USER_ID },
    { name: 'NAME' },
  ] as any,
  rows: [
    [USER_ONE.id, USER_ONE.name],
    [USER_TWO.id, USER_TWO.name],
  ],
};

export const userFindAllEmptyResult: IExecuteReturn = {
  outBinds: undefined,
  rowsAffected: undefined,
  metaData: [
    { name: USER_ID },
    { name: 'NAME' },
  ] as any,
  rows: [],
};

export const userFindallExpects: User[] = [
  { id: USER_ONE.id, name: USER_ONE.name },
  { id: USER_TWO.id, name: USER_TWO.name },
] as User[];

export const createUserResult: IExecuteReturn = {
  outBinds: { 'out$id': [ USER_ONE.id ], 'out$name': [ USER_ONE.name ] },
  rowsAffected: 1,
  metaData: undefined,
  rows: undefined,
};
