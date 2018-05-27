import { ColumnOptionType } from '../enum/option.type';
import { IColumnOption } from '../interface/table-attribute.interface';
import { OPTIONS_KEY } from './key.constant';

export function addOption(target: any, propertyKey: string, optionKey: ColumnOptionType, optionValue: string): void {
  const options = getOptions(target, propertyKey);
  options[optionKey] = optionValue;
  Reflect.defineMetadata(OPTIONS_KEY, options, target, propertyKey);
}

export function getOptions(target: any, propertyKey: string): IColumnOption {
  const options = Reflect.getMetadata(OPTIONS_KEY, target, propertyKey);
  return options ? options : {};
}
