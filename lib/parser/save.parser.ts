import { Entity } from '..';
import { getTableName } from '../decorator/table';
import { OracleBind, OrcleDataTypeConst } from '../enum/oracle-bind.type';
import { MapperObject } from '../interface/where.interface';
import { getAttributes } from '../service/attribute.service';
import { getPrimaryKey } from '../service/primary-key.service';
// import { MapperObject } from '../interface/where.interface';

export function parseSave<T extends Entity<T>>(newValue: T, oldValue: Partial<T>): [string, MapperObject] {
  const entityRef = newValue.constructor.prototype.constructor;
  const table = getTableName(entityRef);
  const attrInfo = getAttributes(newValue);
  const binds: MapperObject = {};
  let sets = '';
  let columns = '';
  let outBindMapping = '';

  Object.keys(attrInfo.columsInfo).forEach(key => {
    outBindMapping += `:out$${key}, `;
    const dataType = OrcleDataTypeConst[attrInfo.columsInfo[key].type];
    binds[`out$${key}`] = { dir : OracleBind.BIND_OUT, type: dataType };

    const val = (newValue as any)[key];
    if (!val) return;

    const bindKey = `${key}$`;
    const targetCol = attrInfo.columsInfo[key].column;
    binds[bindKey] = val;
    sets += `${targetCol} = :${bindKey}, `;
    columns += `${targetCol}, `;
  });
  sets = sets.slice(0, -2);
  columns = columns.slice(0, -2);
  outBindMapping = outBindMapping.slice(0, -2);

  const primaryKey = getPrimaryKey(newValue);
  const primaryColumn = attrInfo.columsInfo[primaryKey].column;
  binds[`key$${primaryKey}`] = (oldValue as any)[primaryKey];

  let query = `UPDATE ${table} SET ${sets} WHERE ${primaryColumn} = :key$${primaryKey}`;
  query += ` RETURNING ${columns} INTO ${outBindMapping}`;
  return [query, binds];
}
