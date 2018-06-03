import { parseCreate } from '../../lib/parser/create.parser';
import { getAttributes } from '../../lib/service/attribute.service';
import { USER_TABLE } from '../_mocks/contants/name.consts';
import { CreateQuery } from '../_mocks/contants/query.consts';
import { userFindallExpects } from '../_mocks/contants/user-resulta.data';
import { User } from '../_mocks/user.model';

describe('Create parser generates correct query.', () => {

  it('Should return update query.', () => {
    const user = new User(userFindallExpects[0]);
    const attr = getAttributes(user);
    const [ query, binds ] = parseCreate(USER_TABLE, userFindallExpects[0] as Partial<User>, attr, user);

    expect(query).toEqual(CreateQuery);
  });

});
