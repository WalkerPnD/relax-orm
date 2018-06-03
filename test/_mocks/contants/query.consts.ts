import { USER_ID, USER_SEQUENCE, USER_TABLE } from './name.consts';

export const UpdateQuery =
`UPDATE ${USER_TABLE} SET ${USER_ID} = :id$, NAME = :name$ WHERE ${USER_ID} = :key$id RETURNING ${USER_ID}, NAME INTO :out$id, :out$name`;

export const CreateQuery =
`INSERT INTO ${USER_TABLE} ( ${USER_ID}, NAME ) VALUES ( ${USER_SEQUENCE}.NEXTVAL, :name$ ) RETURNING ${USER_ID}, NAME INTO :out$id, :out$name`;