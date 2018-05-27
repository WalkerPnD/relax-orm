export const Op: {readonly [key: string]: Symbol} = {
  eq: Symbol.for('eq'),
  in: Symbol.for('in'),
  like: Symbol.for('like'),
  lt: Symbol.for('lt'),
  lte: Symbol.for('lte'),
  gt: Symbol.for('gt'),
  gte: Symbol.for('gte'),
  between: Symbol.for('between'),
  or: Symbol.for('or'),
  and: Symbol.for('and'),
};
