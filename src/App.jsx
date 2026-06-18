import { useState, useMemo } from "react";
import { seedData } from "./data/seedData.js";
import { formatPrice, pluralZakazka } from "./utils/formatters.js";
import { OrderTable } from "./components/OrderTable.jsx";
import { NewOrderForm } from "./components/NewOrderForm.jsx";
import { TagFilter } from "./components/TagFilter.jsx";
import "./styles.css";

export default function App() {
  const [orders, setOrders] = useState(seedData);
  const [expandedId, setExpandedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const toggle = (id) => setExpandedId((cur) => (cur === id ? null : id));

  const addOrder = (order) => {
    setOrders((prev) => [{ tags: [], ...order }, ...prev]);
    setShowForm(false);
    setExpandedId(order.id);
  };

  const addTag = (orderId, tag) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId && !(o.tags ?? []).includes(tag)
          ? { ...o, tags: [...(o.tags ?? []), tag] }
          : o
      )
    );
  };

  const removeTag = (orderId, tag) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, tags: (o.tags ?? []).filter((t) => t !== tag) }
          : o
      )
    );
    // Drop the tag from the active filter if no order uses it anymore
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  const toggleTagFilter = (tag) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const allTags = useMemo(() => {
    const set = new Set();
    orders.forEach((o) => (o.tags ?? []).forEach((t) => set.add(t)));
    return [...set].sort((a, b) => a.localeCompare(b, "cs"));
  }, [orders]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      const matchesText =
        !q ||
        [o.evCislo, o.zakazka, o.klient].some((v) =>
          v.toLowerCase().includes(q)
        );
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((t) => (o.tags ?? []).includes(t));
      return matchesText && matchesTags;
    });
  }, [orders, query, selectedTags]);

  const totalValue = filtered.reduce((sum, o) => sum + o.cena, 0);

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Evidence zakázek</h1>
          <p className="subtitle">
            {filtered.length} {pluralZakazka(filtered.length)} · celkem{" "}
            {formatPrice(totalValue)}
          </p>
        </div>
        <button className="btn primary" onClick={() => setShowForm((s) => !s)}>
          {showForm ? "Skrýt formulář" : "+ Nová zakázka"}
        </button>
      </header>

      {showForm && (
        <NewOrderForm onAdd={addOrder} onCancel={() => setShowForm(false)} />
      )}

      <input
        className="search"
        placeholder="Hledat podle čísla, názvu nebo klienta…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <TagFilter
        allTags={allTags}
        selected={selectedTags}
        onToggle={toggleTagFilter}
        onClear={() => setSelectedTags([])}
      />

      <OrderTable
        orders={filtered}
        expandedId={expandedId}
        onToggle={toggle}
        onAddTag={addTag}
        onRemoveTag={removeTag}
      />
    </div>
  );
}