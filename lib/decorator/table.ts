import 'reflect-metadata';
import { TABLE_NAME_KEY } from '../service/key.constant';

export function Table(name: string): Function {
  return (target: any) => annotate(target, name);
}

function annotate(target: any, name: string): void {
  Reflect.defineMetadata(TABLE_NAME_KEY, name, target);
}

export function getTableName(target: Object): string {
  return Reflect.getMetadata(TABLE_NAME_KEY, target);
}
