import { IExecuteReturn } from 'oracledb';
import { Entity } from '..';
import { MapperObject } from '../interface/where.interface';

export function mapCommandResult<T extends Entity<T>>(result: IExecuteReturn, entityRef: (new (v?: any) => T)): T {
  if (!result.outBinds) {
    throw new Error('No results found.');
  }

  const mappedValues: MapperObject = {};
  Object.keys(result.outBinds).forEach(r => {
    const originalKey = r.slice(4);
    mappedValues[originalKey] = (result.outBinds as any)[r][0];
  });

  return new entityRef(mappedValues);
}
