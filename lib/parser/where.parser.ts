import { Op } from '../enum/operator.type';
import { ITableAttr } from '../interface/table-attribute.interface';
import { MapperObject, WhereOptions } from '../interface/where.interface';

export function parseWhere<T>(whereOptions: WhereOptions<T>, cols: ITableAttr, binds: MapperObject, op?: Symbol): string {
  const keys = Object.keys(cols.columsInfo);
  let res = '';

  const rootOperators = Object.getOwnPropertySymbols(whereOptions);
  rootOperators.forEach((op: any) => {
    res += ` ${parseWhereArray((whereOptions as any)[op], cols, binds, op)} AND`;
  });

  keys.forEach((k: string) => {
    const val = (whereOptions as any)[k];
    if (!val) {
      return;
    }
    const bindKey = `${k}$`;
    res += ` ${cols.columsInfo[k].column} = :${bindKey} AND`;
    binds[bindKey] = val;
  });
  res = res.slice(0, -4);

  if (op === Op.and || op === Op.or) {
    return res;
  }

  return res !== '' ? ` WHERE${res}` : '';
}

function parseWhereArray<T>(whereOptionsArr: WhereOptions<T>[], cols: ITableAttr, binds: MapperObject, op: Symbol): string {
  let res = '';
  let lastOperator = '';
  if (!Array.isArray(whereOptionsArr)) {
    throw new TypeError(`op: have to be Array of whereOptions`);
  }
  whereOptionsArr.forEach(options => {
    res += `(${parseWhere(options, cols, binds, op)} )`;

    lastOperator = op === Op.or ? ' OR ' : ' AND ';
    res += lastOperator;
  });

  return res.slice(0, -(lastOperator.length));
}