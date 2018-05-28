import { getTableName } from '../lib/decorator/table';
import { DataType } from '../lib/enum/data.type';
import { IColumnOption, ITableAttr } from '../lib/interface/table-attribute.interface';
import { getAttributes } from '../lib/service/attribute.service';
import { getOptions } from '../lib/service/option.service';
import { USER_ID, USER_SEQUENCE, USER_TABLE } from './models/name.consts';
import { User } from './models/user.model';

describe('Table Decorator', () => {
  const user = new User();
  // beforeEach(() => {
  //   console.log('prepare');
  // });

  describe('Decorator sets table name.', () => {

    it('should return table name', () => {
      expect(getTableName(User)).toEqual(USER_TABLE);
    });

    it('should return table attributes', () => {
      const result: ITableAttr = {
        id: {
          column: USER_ID,
          type: DataType.Number,
        },
        name: {
          column: 'NAME',
          type: DataType.String,
        },
      };
      expect(getAttributes(user)).toEqual(result);
    });

    it('should return column options [Sequence]', () => {
      const result: IColumnOption = { sequence: USER_SEQUENCE };
      expect(getOptions(user, 'id')).toEqual(result);
    });
  });
});