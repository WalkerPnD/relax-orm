import { IConnectionManager } from '../connection/connection-manager.interface';
import { getTableName } from '../decorator/table';
import { IFindOptions, MapperObject, WhereOptions } from '../interface/where.interface';
import { parseCreate } from '../parser/create.parser';
import { parserLimitOffset } from '../parser/limit-offset.parser';
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
    const attr = getAttributes(entity);
    const keys = Object.keys(attr.columsInfo);
    let table = getTableName(this);
    let whereOptions = '';
    let orderString = '';
    let binds: MapperObject = {};

    const columns = keys
      .reduce<string>((res: string, key: string): string => `${res}${attr.columsInfo[key].column}, `, '')
      .slice(0, -2);

    if (findOptions && findOptions.where) {
      whereOptions += parseWhere(findOptions.where, attr, binds);
    }

    if (findOptions && findOptions.order) {
      orderString = parseOrder(findOptions.order, attr);
      whereOptions += orderString;
    }

    if (findOptions && (findOptions.limit || findOptions.offset)) {
      const [newTable, offsetBinds] = parserLimitOffset(findOptions, table, columns, whereOptions, orderString);
      table = newTable;
      whereOptions = '';
      binds = Object.assign(binds, offsetBinds);
    }

    const query = `SELECT ${columns} FROM ${table}${whereOptions}`;
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

  // tslint:disable-next-line:max-line-length
  static async destroy<T extends Entity<T>>(this: (new (v?: any) => T), whereOptions: WhereOptions<T>, autoCommit: boolean = true): Promise<number | undefined> {
    let entity = new this();
    const table = getTableName(this);
    const attr = getAttributes(entity);
    let query = `DELETE FROM ${table}`;
    let binds: MapperObject = {};
    query += parseWhere(whereOptions, attr, binds);

    if ((this as any as typeof Entity).conn.logging) {
      console.info(query);
    }

    const result = await (this as any as typeof Entity).conn.execute(query, binds, { autoCommit });

    return result.rowsAffected;
  }

  static async destroyAll<T extends Entity<T>>(this: (new (v?: any) => T), autoCommit: boolean = true): Promise<number | undefined> {
    const table = getTableName(this);
    let query = `DELETE FROM ${table}`;

    if ((this as any as typeof Entity).conn.logging) {
      console.info(query);
    }

    const result = await (this as any as typeof Entity).conn.execute(query,{}, { autoCommit });

    return result.rowsAffected;
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
