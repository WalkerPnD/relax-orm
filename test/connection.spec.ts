import { ConnectionManager } from '../lib/connection/connection.manager';
import { DBCONFIG } from '../lib/connection/dbconfig';
import { userResult } from './datas/user-resulta.data';
import { User } from './models/user.model';
import { errHandler } from './util/error.handler';

describe('Table Decorator', () => {
  // const user = new User();
  const conn = new ConnectionManager({
    user          : DBCONFIG.user,
    password      : DBCONFIG.password,
    connectString : DBCONFIG.connectString,
  });

  // Initialize connection Manager.
  beforeAll(async() => {
    conn.addEntities([ User ]);
    await conn.init();
  });

  describe('Decorator sets table name.', () => {

    it('should return table name', async() => {
      const res = await conn.execute('Select * From RLXORM.TB_USER').catch(errHandler);
      // console.log(res);
      expect(res).toEqual(userResult);
    });

    it('should return table name', async() => {
      const res = await User.findAll().catch(errHandler);
      // console.log(res);
      expect(res).toEqual([{ id: 1, name: 'abc' }, { id: 2, name: 'bbb' }]);
    });

    it('should return table name', async() => {
      const res = await User.findAll({
        where: {
          id: 1,
          name: 'abc',
        },
      }).catch(errHandler);
      expect(res).toEqual([{ id: 1, name: 'abc' }]);
    });

    it('should create record', async() => {
      const res = await User.create({ id: 3, name: 'ccc' }).catch(errHandler);
      expect(res).toEqual([{ id: 1, name: 'abc' }]);
    });

  });
});
