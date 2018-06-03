import { getOptions } from './option.service';

export function getPrimaryKey(target: any): string {
  const keys = Object.keys(target);

  for (const k of keys) {
    const options = getOptions(target, k);
    if (options.primaryKey) {
      return k;
    }
  }
  return '';
}