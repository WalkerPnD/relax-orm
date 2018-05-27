import { ConnectionManager } from '../connection/connection.manager';
import { getTableName } from '../decorator/table';
import { IFindOptions, MapperObject } from '../interface/where.interface';
import { parseCreateBinds } from '../parser/create.parser';
import { parseWhere } from '../parser/where.parser';
import { getAttributes } from '../service/attribute.service';
import { mapResult } from './mapper';

export class Entity<T extends Entity<T>> {
  static conn: ConnectionManager;

  static async findAll<T extends Entity<T>>(this: (new () => T), findOptions?: IFindOptions<T>): Promise<T[]> {
    const EntityRef: (typeof Entity) = (this as any);
    const entity = new this();
    const table = getTableName(EntityRef);
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

    const result = await EntityRef.conn.execute(query, binds);
    const mappedResult = mapResult<T>(attr, result, this);
    return mappedResult ? mappedResult : [];
  }

  static async create<T extends Entity<T>>(this: (new () => T), values: Partial<T>, autoCommit: boolean = true): Promise<T> {
    const EntityRef: (typeof Entity) = (this as any);
    const entity = new this();
    const table = getTableName(EntityRef);
    const attr = getAttributes(entity);
    // const keys = Object.keys(attr.columsInfo);
    let query = `INSERT INTO ${table}`;
    let binds: MapperObject = {};

    query += parseCreateBinds(values, attr, binds);
    console.log(query);

    const result = await EntityRef.conn.execute(query, binds, { autoCommit });

    // const mappedResult = mapResult<T>(attr, result, this);
    return result as any;
  }

  hello(): void {
    console.log('hello');

  }

}
