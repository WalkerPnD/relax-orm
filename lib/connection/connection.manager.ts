import oracledb from 'oracledb';
import { Entity } from '../entity/entity';
import { IConnectionManager } from './connection-manager.interface';

// Please DO NOT write unit test for this Class.
export class ConnectionManager implements IConnectionManager{

  // tslint:disable-next-line:typedef
  static readonly config = oracledb;

  public execute!: oracledb.IConnection['execute'];
  public logging: boolean = true;

  private conn!: oracledb.IConnection;

  constructor(private readonly poolAttributes: oracledb.IPoolAttributes) {
  }

  async init(): Promise<void> {
    await (oracledb.createPool(this.poolAttributes) as Promise<any>);
    this.conn = await oracledb.getConnection();
    Object.defineProperty(this, 'conn', { writable: false });
    this.execute = this.conn.execute.bind(this.conn);
    Object.defineProperty(this, 'execute', { writable: false });
  }

  addEntities(entities: Array<any>): void {
    entities.forEach((e: typeof Entity): void => {
      e.conn = this;
      Object.defineProperty(e, 'conn', { writable: false });
    });
  }
}
