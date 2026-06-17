export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

export const formatPrice = (n) =>
  new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(n);

export const daysUntil = (iso) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(iso);
  target.setHours(0, 0, 0, 0);
  return Math.round((target - today) / 86400000);
};

export const pluralZakazka = (count) => {
  if (count === 1) return "zakázka";
  if (count < 5) return "zakázky";
  return "zakázek";
};
