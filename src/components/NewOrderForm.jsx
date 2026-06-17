import { useState } from "react";

const emptyForm = {
  evCislo: "",
  datumZalozeni: new Date().toISOString().slice(0, 10),
  zakazka: "",
  klient: "",
  termin: "",
  popis: "",
  cena: "",
};

export function NewOrderForm({ onAdd, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const valid =
    form.evCislo && form.zakazka && form.klient && form.termin && form.cena;

  const submit = () => {
    if (!valid) return;
    onAdd({ ...form, cena: Number(form.cena), id: Date.now() });
    setForm(emptyForm);
  };

  return (
    <div className="form">
      <div className="form-grid">
        <label>
          Evidenční číslo
          <input
            value={form.evCislo}
            onChange={set("evCislo")}
            placeholder="ZAK-2026-017"
          />
        </label>
        <label>
          Datum založení
          <input
            type="date"
            value={form.datumZalozeni}
            onChange={set("datumZalozeni")}
          />
        </label>
        <label>
          Zakázka
          <input
            value={form.zakazka}
            onChange={set("zakazka")}
            placeholder="Název zakázky"
          />
        </label>
        <label>
          Klient
          <input
            value={form.klient}
            onChange={set("klient")}
            placeholder="Název klienta"
          />
        </label>
        <label>
          Termín zhotovení
          <input type="date" value={form.termin} onChange={set("termin")} />
        </label>
        <label>
          Cena (Kč)
          <input
            type="number"
            value={form.cena}
            onChange={set("cena")}
            placeholder="50000"
          />
        </label>
        <label className="full">
          Popis
          <textarea
            rows={3}
            value={form.popis}
            onChange={set("popis")}
            placeholder="Stručný popis zakázky…"
          />
        </label>
      </div>
      <div className="form-actions">
        <button className="btn ghost" onClick={onCancel}>
          Zrušit
        </button>
        <button className="btn primary" disabled={!valid} onClick={submit}>
          Uložit zakázku
        </button>
      </div>
    </div>
  );
}
