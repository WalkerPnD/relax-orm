import { IExecuteReturn, IMetaData } from 'oracledb';
import { Entity } from '..';
import { ITableAttr } from '../interface/table-attribute.interface';

type Mapper = {[key: number]: string};
const mapperCahe: {[key: string]: Mapper} = {};

function getMapper(metaData: IMetaData[], colInfos: ITableAttr): Mapper {
  const cacheKey = JSON.stringify(metaData);
  if (!mapperCahe[cacheKey]) {
    let mapper: any = {};
    metaData.forEach((data, idx) => {
      mapper[idx] = colInfos.rowNameMap[data.name];
    });
    mapperCahe[cacheKey] = mapper;
  }

  return mapperCahe[cacheKey];
}

export function mapResult<T extends Entity<T>>(colInfos: ITableAttr, result: IExecuteReturn, entityRef: (new (v?: any) => T)): T[] | undefined {
  if (!result.rows) {
    return undefined;
  }
  if (!result.metaData) {
    throw new Error('metaData error');
  }

  const mapper = getMapper(result.metaData, colInfos);
  const persisteds: T[] = [];

  for (const row of result.rows) {

    if (!(Array.isArray(row))) {
      let p = new entityRef(row as any);
      persisteds.push(p);
      continue;
    }

    const p = new entityRef();
    row.forEach((col, idx) => {
      (p as any)[mapper[idx]] = col;
    });
    persisteds.push(p);
  }

  return persisteds;
}
