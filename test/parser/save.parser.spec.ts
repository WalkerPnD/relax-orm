import { parseSave } from '../../lib/parser/save.parser';
import { UpdateQuery } from '../_mocks/contants/query.consts';
import { userFindallExpects } from '../_mocks/contants/user-resulta.data';
import { User } from '../_mocks/user.model';

describe('Save parser generates correct query.', () => {

  it('Should return update query.', () => {
    const user = new User(userFindallExpects[0]);
    const [ query, binds ] = parseSave(user, user);

    expect(query).toEqual(UpdateQuery);
  });

});
