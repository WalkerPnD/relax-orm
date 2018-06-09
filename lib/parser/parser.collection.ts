import { Op } from '../enum/operator.type';
import { parseAnd } from './and.parser';
import { parseOr } from './or.parser';

export const RootParserCollection = {
  [Op.or]: parseOr,
  [Op.and]: parseAnd,
};
