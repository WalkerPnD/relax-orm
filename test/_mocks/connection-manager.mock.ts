import { IConnection } from 'oracledb';
import { stub } from 'sinon';
import { IConnectionManager } from '../../lib/connection/connection-manager.interface';

export class MockConnectionManager implements IConnectionManager {
  execute: IConnection['execute'] = stub();
  logging: boolean = false;
}
