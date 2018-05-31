import { DataType } from '../enum/data.type';
import { OracleBind, OrcleDataTypeConst } from '../enum/oracle-bind.type';
import { IAttrInfo } from '../interface/column-option.interface';
import { IColumnOption, ITableAttr } from '../interface/table-attribute.interface';
import { MapperObject } from '../interface/where.interface';
import { getOptions } from '../service/option.service';

export function parseCreateBinds<T>(whereOptions: Partial<T>, cols: ITableAttr, binds: MapperObject, entityInstance: Object): string {
  const entityProps = Object.keys(cols.columsInfo);
  let columns = '';
  let bindMapping = '';
  let outBindMapping = '';

  entityProps.forEach((prop: string) => {
    const colOptions = getOptions(entityInstance, prop);
    const entityValue = (whereOptions as any)[prop];
    if (!entityValue && !colOptions.sequence) {
      return;
    }

    const columnInfo = cols.columsInfo[prop];
    columns += `${columnInfo.column}, `;
    const [inBind, outBind] = bundKey(entityValue, binds, prop, colOptions, columnInfo);
    bindMapping += inBind;
    outBindMapping = outBind ? outBind : outBindMapping;
  });
  columns = columns.slice(0, -2);
  bindMapping = bindMapping.slice(0, -2);

  return ` ( ${columns} ) VALUES ( ${bindMapping} )${outBindMapping};`;
}

function bundKey(entityValue: any, binds: MapperObject, prop: string, colOptions: IColumnOption, colInfo: IAttrInfo): [string, string] {
  const bindKey = `${prop}$`;
  let outBind = '';

  if (colOptions.primaryKey && (colInfo.type === DataType.Number || DataType.String)) {
    const outBindKey = `out$${prop}`;
    const dataType = DataType.Number ? OrcleDataTypeConst.NUMBER : OrcleDataTypeConst.STRING;

    binds[outBindKey] = { dir : OracleBind.BIND_OUT, type: dataType };
    outBind = ` RETURNING ${colInfo.column} INTO :${outBindKey}`;
  }

  if (colOptions.sequence) {
    return [`${colOptions.sequence}.NEXTVAL, `, outBind];
  }

  binds[bindKey] = entityValue;
  return [`:${bindKey}, `, outBind];
}
