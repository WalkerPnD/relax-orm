import { IExecuteReturn } from 'oracledb';
import { getTableName } from '../lib/decorator/table';
import { DataType } from '../lib/enum/data.type';
import { IColumnOption, ITableAttr } from '../lib/interface/table-attribute.interface';
import { getAttributes } from '../lib/service/attribute.service';
import { getOptions } from '../lib/service/option.service';
import { MockConnectionManager } from './_mocks/connection-manager.mock';
import { USER_ID, USER_SEQUENCE, USER_TABLE } from './_mocks/contants/name.consts';
import { createUserResult, userFindAllEmptyResult, userFindallExpects, userFindAllUserResult } from './_mocks/contants/user-resulta.data';
import { User } from './_mocks/user.model';

describe('Entity functions works correctly', () => {
  const user = new User();
  let connManager: MockConnectionManager;

  beforeEach(() => {
    connManager = new MockConnectionManager();
    User.conn = connManager;
  });

  describe('FindAll functions', () => {

    it('Should return mapped entity.', () => {
      (connManager.execute as sinon.SinonStub).resolves(userFindAllUserResult);

      expect(User.findAll()).resolves.toEqual(userFindallExpects);
    });

    it('Shoud return empty result.', () => {
      (connManager.execute as sinon.SinonStub).resolves(userFindAllEmptyResult);

      expect(User.findAll()).resolves.toEqual([]);
    });

  });

  describe('FindOne functions', () => {

    it('Should return mapped entity.', () => {
      (connManager.execute as sinon.SinonStub).resolves(userFindAllUserResult);

      expect(User.findOne()).resolves.toEqual(userFindallExpects[0]);
    });

    it('Shoud return null as result.', () => {
      (connManager.execute as sinon.SinonStub).resolves(userFindAllEmptyResult);

      expect(User.findOne()).resolves.toEqual(null);
    });

  });

  describe('Create functions', () => {

    it('Should return mapped entity.', () => {
      (connManager.execute as sinon.SinonStub).resolves(createUserResult);

      expect(User.create(userFindallExpects[0])).resolves.toEqual(userFindallExpects[0]);
    });

  });

});
