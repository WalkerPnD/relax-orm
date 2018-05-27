import { IAttrInfo } from '../interface/column-option.interface';
import { ITableAttr } from '../interface/table-attribute.interface';
import { ATTRIBUTES_KEY } from './key.constant';

export function addAttribute(target: any, propertyKey: string, options: IAttrInfo): void {
  const attributes = getAttributes(target);
  attributes.columsInfo[propertyKey] = options;
  attributes.rowNameMap[options.column] = propertyKey;
  Reflect.defineMetadata(ATTRIBUTES_KEY, attributes, target);
}

export function getAttributes(target: any): ITableAttr {
  const attributes = Reflect.getMetadata(ATTRIBUTES_KEY, target);
  return attributes ? attributes : { rowNameMap: {}, columsInfo: {} };
}
