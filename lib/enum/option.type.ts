export enum ColumnOption {
  sequence = 'sequence',
  primaryKey = 'primaryKey',
}

export type ColumnOptionType = keyof typeof ColumnOption;
