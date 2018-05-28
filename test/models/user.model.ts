import { Column, Table } from '../../lib';
import { Sequence } from '../../lib/decorator/options';
import { Entity } from '../../lib/entity/entity';
import { USER_ID, USER_SEQUENCE, USER_TABLE } from './name.consts';

@Table(USER_TABLE)
export class User extends Entity<User>{

  @Sequence(USER_SEQUENCE)
  @Column(USER_ID)
  id?: number;

  @Column()
  name?: string;
}
