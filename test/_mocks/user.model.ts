import { Column } from '../../lib/decorator/column';
import { PrimaryKey, Sequence } from '../../lib/decorator/options';
import { Table } from '../../lib/decorator/table';
import { Entity } from '../../lib/entity/entity';
import { USER_ID, USER_SEQUENCE, USER_TABLE } from './contants/name.consts';

@Table(USER_TABLE)
export class User extends Entity<User>{

  @PrimaryKey()
  @Sequence(USER_SEQUENCE)
  @Column(USER_ID)
  id?: number;

  @Column()
  name?: string;
}
