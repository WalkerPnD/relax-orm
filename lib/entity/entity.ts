import { IConnectionManager } from '../connection/connection-manager.interface';
import { getTableName } from '../decorator/table';
import { IFindOptions, MapperObject } from '../interface/where.interface';
import { parseCreateBinds } from '../parser/create.parser';
import { parseWhere } from '../parser/where.parser';
import { getAttributes } from '../service/attribute.service';
import { mapResult } from './mapper';

export class Entity<T extends Entity<T>> {
  static conn: IConnectionManager;

  static async findOne<T extends Entity<T>>(this: (new () => T), findOptions?: IFindOptions<T>): Promise<T | null> {
    const result = await (this as any as typeof Entity).findAll(findOptions) as T[];
    return result[0] ? result[0] : null;
  }

  static async findAll<T extends Entity<T>>(this: (new () => T), findOptions?: IFindOptions<T>): Promise<T[]> {
    const entity = new this();
    const table = getTableName(this);
    const attr = getAttributes(entity);
    const keys = Object.keys(attr.columsInfo);
    let query = 'SELECT ';
    let binds: MapperObject = {};

    query = keys
    .reduce<string>(
      (res: string, key: string): string => `${res}${attr.columsInfo[key].column}, `, query)
    .slice(0, -2);

    query += ` FROM ${table}`;
    if (findOptions && findOptions.where) {
      const whereString = parseWhere(findOptions.where, attr, binds);
      query += whereString;
    }

    const result = await (this as any as typeof Entity).conn.execute(query, binds);
    const mappedResult = mapResult<T>(attr, result, this);
    return mappedResult ? mappedResult : [];
  }

  static async create<T extends Entity<T>>(this: (new () => T), values: Partial<T>, autoCommit: boolean = true): Promise<T> {
    const entity = new this();
    const table = getTableName(this);

    const attr = getAttributes(entity);
    // const keys = Object.keys(attr.columsInfo);
    let query = `BEGIN INSERT INTO ${table}`;
    let binds: MapperObject = {};

    query += parseCreateBinds(values, attr, binds, entity) + ' END;';
    console.log(query);
    console.log(binds);

    const result = await (this as any as typeof Entity).conn.execute(query, binds, { autoCommit });
    if (result.outBinds && (result.outBinds as any).out$id) {
      (entity as any).id = (result.outBinds as any).out$id;
    }

    // const mappedResult = mapResult<T>(attr, result, this);
    return entity;
  }

}
