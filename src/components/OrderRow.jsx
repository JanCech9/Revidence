import { formatDate, formatPrice, daysUntil } from "../utils/formatters.js";

export function OrderRow({ order, expanded, onToggle }) {
  const days = daysUntil(order.termin);
  const deadlineClass =
    days < 0 ? "deadline overdue" : days <= 7 ? "deadline soon" : "deadline";

  return (
    <>
      <tr
        className={`row ${expanded ? "row-open" : ""}`}
        onClick={() => onToggle(order.id)}
      >
        <td className="mono">{order.evCislo}</td>
        <td>{formatDate(order.datumZalozeni)}</td>
        <td className="name">{order.zakazka}</td>
        <td>{order.klient}</td>
        <td>
          <span className={deadlineClass}>
            {formatDate(order.termin)}
            <small>
              {days < 0
                ? ` (${Math.abs(days)} dní po termínu)`
                : days === 0
                ? " (dnes)"
                : ` (zbývá ${days} dní)`}
            </small>
          </span>
        </td>
        <td className="chevron">{expanded ? "▾" : "▸"}</td>
      </tr>

      {expanded && (
        <tr className="detail-row">
          <td colSpan={6}>
            <div className="detail">
              <div className="detail-block">
                <span className="detail-label">Popis</span>
                <p>{order.popis}</p>
              </div>
              <div className="detail-block price-block">
                <span className="detail-label">Cena</span>
                <p className="price">{formatPrice(order.cena)}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
