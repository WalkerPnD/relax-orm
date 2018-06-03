import { IConnectionManager } from '../connection/connection-manager.interface';
import { getTableName } from '../decorator/table';
import { IFindOptions, MapperObject } from '../interface/where.interface';
import { parseCreate } from '../parser/create.parser';
import { parseOrder } from '../parser/order.parser';
import { parseSave } from '../parser/save.parser';
import { parseWhere } from '../parser/where.parser';
import { getAttributes } from '../service/attribute.service';
import { mapCommandResult } from './command-result.mapper';
import { mapResult } from './mapper';

export class Entity<T extends Entity<T>> {
  static conn: IConnectionManager;
  private storedValue!: Partial<T>;

  constructor(values?: Partial<T>) {
    if (values) {
      Object.assign(this, values);
      Object.defineProperty(this, 'storedValue', {
        value: values,
        writable: true,
      });
    }
  }

  static async findOne<T extends Entity<T>>(this: (new (v?: any) => T), findOptions?: IFindOptions<T>): Promise<T | null> {
    const result = await (this as any as typeof Entity).findAll(findOptions) as T[];
    return result[0] ? result[0] : null;
  }

  static async findAll<T extends Entity<T>>(this: (new (v?: any) => T), findOptions?: IFindOptions<T>): Promise<T[]> {
    const entity = new this();
    const table = getTableName(this);
    const attr = getAttributes(entity);
    const keys = Object.keys(attr.columsInfo);
    let query = 'SELECT ';
    let binds: MapperObject = {};

    query = keys
      .reduce<string>((res: string, key: string): string => `${res}${attr.columsInfo[key].column}, `, query)
      .slice(0, -2);
    query += ` FROM ${table}`;

    if (findOptions && findOptions.where) {
      const whereString = parseWhere(findOptions.where, attr, binds);
      query += whereString;
    }

    if (findOptions && findOptions.order) {
      const orderString = parseOrder(findOptions.order, attr);
      query += orderString;
    }

    if ((this as any as typeof Entity).conn.logging) {
      console.info(query);
    }

    const result = await (this as any as typeof Entity).conn.execute(query, binds);
    const mappedResult = mapResult(attr, result, this);
    return mappedResult ? mappedResult : [];
  }

  static async create<T extends Entity<T>>(this: (new (v?: any) => T), values: Partial<T>, autoCommit: boolean = true): Promise<T> {
    let entity = new this();
    const table = getTableName(this);
    const attr = getAttributes(entity);

    const [query, binds] = parseCreate(table, values, attr, entity);

    if ((this as any as typeof Entity).conn.logging) {
      console.info(query);
    }

    const result = await (this as any as typeof Entity).conn.execute(query, binds, { autoCommit });

    return mapCommandResult(result, this);
  }

  async save(autoCommit: boolean = true): Promise<void> {
    const conn = this.constructor.prototype.constructor.conn;

    const [query, binds] = parseSave(this as any, this.storedValue);

    await conn.execute(query, binds, { autoCommit });
    if (conn.logging) {
      console.info(query);
    }
    this.storedValue = Object.assign(this.storedValue, this);

  }
}
