import { IConnection } from 'oracledb';

export interface IConnectionManager {
  execute: IConnection['execute'];
}
