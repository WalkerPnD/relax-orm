import { IFindOptions, MapperObject } from '../interface/where.interface';

// tslint:disable-next-line:max-line-length
export function parserLimitOffset(options: IFindOptions<any>,table: string, columns: string, whereOptions: string, orderString: string): [string, MapperObject] {
  const rowNumExpression =
    orderString === '' ? ' ROWNUM as TMP$ROWNUMBER' : ` ROW_NUMBER() OVER(${orderString} ) as TMP$ROWNUMBER`;
  let subQuery = `( SELECT ${columns},${rowNumExpression} FROM ${table}${whereOptions} )`;
  whereOptions = ' WHERE';
  const binds: MapperObject = {};
  const offset = typeof options.offset === 'number' ? options.offset : 0;
  const limit = typeof options.limit === 'number' ? options.limit : 0;

  if (offset > 0) {
    whereOptions += ' TMP$ROWNUMBER > :TMP$OFFSET AND';
    binds.TMP$OFFSET = offset;
  }

  if (limit > 0) {
    whereOptions += ' TMP$ROWNUMBER <= :TMP$LIMIT AND';
    binds.TMP$LIMIT = limit + offset;
  }

  subQuery += whereOptions.slice(0, -4);

  return [subQuery, binds];
}