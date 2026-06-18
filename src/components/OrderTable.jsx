import { OrderRow } from "./OrderRow.jsx";

export function OrderTable({ orders, expandedId, onToggle, onAddTag, onRemoveTag }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Evidenční číslo</th>
          <th>Datum založení</th>
          <th>Zakázka</th>
          <th>Klient</th>
          <th>Termín zhotovení</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <OrderRow
            key={order.id}
            order={order}
            expanded={expandedId === order.id}
            onToggle={onToggle}
            onAddTag={onAddTag}
            onRemoveTag={onRemoveTag}
          />
        ))}
        {orders.length === 0 && (
          <tr>
            <td colSpan={6} className="empty">
              Žádná zakázka neodpovídá hledání. Zkuste jiný výraz nebo
              založte novou zakázku.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}