export function TagFilter({ allTags, selected, onToggle, onClear }) {
  if (allTags.length === 0) return null;

  return (
    <div className="tag-filter">
      <span className="tag-filter-label">Filtrovat štítky:</span>
      {allTags.map((tag) => (
        <button
          key={tag}
          type="button"
          className={`tag tag-toggle ${selected.includes(tag) ? "active" : ""}`}
          onClick={() => onToggle(tag)}
        >
          {tag}
        </button>
      ))}
      {selected.length > 0 && (
        <button type="button" className="tag-clear" onClick={onClear}>
          Zrušit filtr
        </button>
      )}
    </div>
  );
}
