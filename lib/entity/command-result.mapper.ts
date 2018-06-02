import { IExecuteReturn } from 'oracledb';
import { Entity } from '..';

export function mapCommandResult<T extends Entity<T>>(result: IExecuteReturn, entityRef: (new (v?: any) => T)): T {
  if (!result.outBinds) {
    throw new Error('No results found.');
  }

  let entity = new entityRef();
  Object.keys(result.outBinds).forEach(r => {
    const originalKey = r.slice(4);
    console.log(originalKey);
    (entity as any)[originalKey] = (result.outBinds as any)[r][0];
  });

  return entity;
}
