import { ITableAttr } from '../interface/table-attribute.interface';
import { MapperObject } from '../interface/where.interface';

export function parseCreateBinds<T>(whereOptions: Partial<T>, cols: ITableAttr, binds: MapperObject): string {
  const keys = Object.keys(cols.columsInfo);
  let into = '';
  let bindMapping = '';

  keys.forEach((k: string) => {
    const val = (whereOptions as any)[k];
    if (!val) {
      return;
    }

    const bindKey = `${k}$`;
    into += `${cols.columsInfo[k].column}, `;
    bindMapping += `:${bindKey}, `;
    binds[bindKey] = val;
  });
  into = into.slice(0, -2);
  bindMapping = bindMapping.slice(0, -2);

  return ` ( ${into} ) VALUES ( ${bindMapping} )`;
}
