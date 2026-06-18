import { formatDate, formatPrice, daysUntil } from "../utils/formatters.js";
import { TagInput } from "./TagInput.jsx";

export function OrderRow({ order, expanded, onToggle, onAddTag, onRemoveTag }) {
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
        <td className="name">
          {order.zakazka}
          {order.tags?.length > 0 && (
            <span className="row-tags">
              {order.tags.map((tag) => (
                <span key={tag} className="tag tag-mini">
                  {tag}
                </span>
              ))}
            </span>
          )}
        </td>
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
                <p className="popis">{order.popis}</p>
              </div>
              <div className="detail-block price-block">
                <span className="detail-label">Cena</span>
                <p className="price">{formatPrice(order.cena)}</p>
              </div>
            </div>
            <div className="detail-tags">
              <span className="detail-label">Štítky</span>
              <TagInput
                tags={order.tags ?? []}
                onAdd={(tag) => onAddTag(order.id, tag)}
                onRemove={(tag) => onRemoveTag(order.id, tag)}
              />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}