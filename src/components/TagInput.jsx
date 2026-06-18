import { useState } from "react";

export function TagInput({ tags, onAdd, onRemove }) {
  const [value, setValue] = useState("");

  const commit = () => {
    const tag = value.trim();
    if (!tag) return;
    onAdd(tag);
    setValue("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commit();
    }
    // Backspace on empty input removes the last tag
    if (e.key === "Backspace" && !value && tags.length) {
      onRemove(tags[tags.length - 1]);
    }
  };

  return (
    <div className="tag-input">
      {tags.map((tag) => (
        <span key={tag} className="tag tag-removable">
          {tag}
          <button
            type="button"
            className="tag-x"
            aria-label={`Odebrat štítek ${tag}`}
            onClick={() => onRemove(tag)}
          >
            ×
          </button>
        </span>
      ))}
      <input
        className="tag-field"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={commit}
        placeholder={tags.length ? "Přidat…" : "Přidat štítek…"}
      />
    </div>
  );
}
