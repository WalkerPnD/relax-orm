import 'reflect-metadata';
import { DataType } from '../enum/data.type';
import { IAttrInfo } from '../interface/column-option.interface';
import { ReflecionTypes } from '../interface/reflextion.type';
import { addAttribute } from '../service/attribute.service';

export function Column(option?: string | IAttrInfo): Function {
  return (target: any, propertyKey: string) => {
    let columnOption =
      (!option || typeof option === 'string')
      ? columnOptionFactory(target, propertyKey, option) : option;

    addAttribute(target, propertyKey, columnOption);
  };
}

function columnOptionFactory(target: any, propertyKey: string, name?: string): IAttrInfo {
  const dataType = Reflect.getMetadata('design:type', target, propertyKey).name as ReflecionTypes;
  if (dataType !== 'String' && dataType !== 'Number') {
    throw new Error('DataType have to be decleared at @Column with IColumnOption');
  }

  return {
    column: name ? name : propertyKey.toUpperCase(),
    type: DataType[dataType],
  };
}