import { MapperObject, PrimitiveTypes } from '../interface/where.interface';

export function parseIn(inValues: PrimitiveTypes[], propKey: string, colName: string, binds: MapperObject): string {
  let res = '';
  if (!Array.isArray(inValues)) {
    throw new TypeError('[Op.in] opeartor have to be an Array');
  }

  inValues.forEach((val, idx) => {
    const bindKey = `${propKey}$in$${idx}`;
    binds[bindKey] = val;
    res += `:${bindKey}, `;
  });
  res = res.slice(0, -2);

  return `${colName} IN ( ${res} )`;
}