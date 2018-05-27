import {
  createPool, getConnection,
  IConnection, IPoolAttributes,
} from 'oracledb';
import { Entity } from '../entity/entity';

export class ConnectionManager {

  public execute!: IConnection['execute'];
  private conn!: IConnection;

  constructor(private readonly poolAttributes: IPoolAttributes) {
  }

  async init(): Promise<void> {
    await (createPool(this.poolAttributes) as Promise<any>);
    this.conn = await getConnection();
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
