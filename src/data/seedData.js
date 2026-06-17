/** @type {Array<import('../types').Order>} */
export const seedData = [
  {
    id: 1,
    evCislo: "ZAK-2026-014",
    datumZalozeni: "2026-05-02",
    zakazka: "Rekonstrukce e-shopu",
    klient: "Vinařství Hruška s.r.o.",
    termin: "2026-06-30",
    popis:
      "Kompletní redesign e-shopu na Nuxt 3, napojení na skladový systém přes REST API, migrace produktového katalogu (cca 450 položek).",
    cena: 185000,
  },
  {
    id: 2,
    evCislo: "ZAK-2026-015",
    datumZalozeni: "2026-05-18",
    zakazka: "Interní docházkový systém",
    klient: "Strojírny Kyjov a.s.",
    termin: "2026-06-15",
    popis:
      "Webová aplikace pro evidenci docházky 80 zaměstnanců. Backend C# / .NET 8, frontend Vue, export do mzdového systému.",
    cena: 240000,
  },
  {
    id: 3,
    evCislo: "ZAK-2026-016",
    datumZalozeni: "2026-06-01",
    zakazka: "Prezentační web",
    klient: "Kožená galanterie Malina",
    termin: "2026-07-20",
    popis:
      "Jednoduchý prezentační web s katalogem výrobků, kontaktním formulářem a napojením na Instagram feed.",
    cena: 48000,
  },
];
