import 'reflect-metadata';
import { ColumnOption } from '../enum/option.type';
import { addOption } from '../service/option.service';

export function Sequence(sequenceName: string): Function {
  return (target: any, propertyKey: string) => {
    addOption(target, propertyKey, ColumnOption.sequence , sequenceName);
  };
}

export function PrimaryKey(): Function {
  return (target: any, propertyKey: string) => {
    addOption(target, propertyKey, ColumnOption.primaryKey, true);
  };
}
