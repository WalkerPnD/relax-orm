import oracledb from 'oracledb';
import { Entity } from '../entity/entity';
import { IConnectionManager } from './connection-manager.interface';

export class ConnectionManager implements IConnectionManager{

  // tslint:disable-next-line:typedef
  public readonly config = oracledb;
  public execute!: oracledb.IConnection['execute'];
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

  addEntities(entities: Array<typeof Entity>): void {
    entities.forEach((e): void => {
      e.conn = this;
      Object.defineProperty(e, 'conn', { writable: false });
    });
  }
}
