import { useState, useMemo } from "react";
import { seedData } from "./data/seedData.js";
import { formatPrice, pluralZakazka } from "./utils/formatters.js";
import { OrderTable } from "./components/OrderTable.jsx";
import { NewOrderForm } from "./components/NewOrderForm.jsx";
import "./styles.css";

export default function App() {
  const [orders, setOrders] = useState(seedData);
  const [expandedId, setExpandedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");

  const toggle = (id) => setExpandedId((cur) => (cur === id ? null : id));

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
    setShowForm(false);
    setExpandedId(order.id);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter((o) =>
      [o.evCislo, o.zakazka, o.klient].some((v) =>
        v.toLowerCase().includes(q)
      )
    );
  }, [orders, query]);

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

      <OrderTable
        orders={filtered}
        expandedId={expandedId}
        onToggle={toggle}
      />
    </div>
  );
}