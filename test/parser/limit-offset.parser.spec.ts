import { parseCreate } from '../../lib/parser/create.parser';
import { getAttributes } from '../../lib/service/attribute.service';
import { USER_TABLE } from '../_mocks/contants/name.consts';
import { CreateQuery } from '../_mocks/contants/query.consts';
import { userFindallExpects } from '../_mocks/contants/user-resulta.data';
import { User } from '../_mocks/user.model';

describe('LimitOffset parser generates correct query.', () => {

  it('Should return orderd request query.', () => {
    const user = new User(userFindallExpects[0]);
    const attr = getAttributes(user);
    const [ query, binds ] = parseCreate(USER_TABLE, userFindallExpects[0] as Partial<User>, attr, user);
    // SELECT SEQ_NUM_USER, NAME FROM ( SELECT SEQ_NUM_USER, NAME, ROW_NUMBER() OVER( ) as TMP$ROWNUMBER FROM RLXORM.TB_USER ) WHERE
    // TMP$ROWNUMBER > :TMP$OFFSET
    expect(query).toEqual(CreateQuery);
  });

});
