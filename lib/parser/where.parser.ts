import { ITableAttr } from '../interface/table-attribute.interface';
import { MapperObject, WhereOptions } from '../interface/where.interface';

export function parseWhere<T>(whereOptions: WhereOptions<T>, cols: ITableAttr, binds: MapperObject): string {
  const keys = Object.keys(cols.columsInfo);
  let res = ' WHERE ';

  keys.forEach((k: string) => {
    const val = (whereOptions as any)[k];
    if (!val) {
      return;
    }
    const bindKey = `${k}$`;
    res += `${cols.columsInfo[k].column} = :${bindKey} AND `;
    binds[bindKey] = val;
  });
  res = res.slice(0, -5);

  return res;
}
