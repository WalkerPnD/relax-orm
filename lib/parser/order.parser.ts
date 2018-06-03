import { ITableAttr } from '../interface/table-attribute.interface';
import { ResultOrderType } from '../interface/where.interface';

export function parseOrder(orders: ResultOrderType[], attr: ITableAttr): string {
  let query = ' ORDER BY ';

  orders.forEach(od => {
    query += `${attr.columsInfo[od[0]].column} ${od[1]}, `;
  });
  query = query.slice(0, -2);

  return query;
}