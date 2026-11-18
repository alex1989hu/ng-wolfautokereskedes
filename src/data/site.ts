export const site = {
  name: "Wolf Autókereskedés",
  owner: "Csákváry Péter",
  url: "https://www.wolfautokereskedes.hu",
  title: "Eredetvizsga Szombathelyen - Wolf Autókereskedés Szombathely",
  description:
    "Eredetvizsgálat Szombathelyen 22 950 Ft-tól, gépjárműátírás és ingyenes biztosításkötés egy helyen. Wolf Autókereskedés, Csákváry Péter. Tel.: +36-20-99999-15.",
  phone: { display: "+36-20-99999-15", href: "tel:+36209999915" },
  address: {
    street: "Farkas Károly utca 1.",
    city: "Szombathely",
    zip: "9700",
    landmark: "A METRO körforgalomban, a rétesház mellett.",
    full: "9700 Szombathely, Farkas Károly utca 1.",
  },
  // Google Business Profile place, referenced by its CID (stable, no tracking parameters).
  mapUrl: "https://www.google.com/maps?cid=7436703874519662060",
  geo: { latitude: 47.253687, longitude: 16.6149763 },
  author: { name: "Alex Szakaly", url: "https://linkedin.com/in/alexszakaly" },
  sourceUrl: "https://github.com/alex1989hu/ng-wolfautokereskedes",
} as const;

/** Opening hours as shown on the Google Business Profile. A null time range means closed. */
export const openingHours = [
  {
    label: "Hétfő – Csütörtök",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    hours: { opens: "09:00", closes: "16:00" },
  },
  { label: "Péntek", days: ["Friday"], hours: { opens: "09:00", closes: "15:00" } },
  { label: "Szombat", days: ["Saturday"], hours: { opens: "09:00", closes: "11:00" } },
  { label: "Vasárnap", days: ["Sunday"], hours: null },
] as const;

export const nav = [
  { label: "Szolgáltatások", href: "/services/" },
  { label: "Árak", href: "/pricing/" },
  { label: "Miért mi?", href: "/#why-us" },
  { label: "GYIK", href: "/#faq" },
  { label: "Kapcsolat", href: "/contact/" },
] as const;

export const originInspectionPrices = [
  { name: "Személygépkocsi", detail: "1400 cm³ hengerűrtartalomig", price: "22 950 Ft" },
  { name: "Személygépkocsi", detail: "1401 – 2000 cm³", price: "24 975 Ft" },
  { name: "Személygépkocsi", detail: "2000 cm³ hengerűrtartalom felett", price: "27 000 Ft" },
] as const;

export type ServiceId = "origin-inspection" | "vehicle-transfer" | "insurance";

export const services = [
  {
    id: "origin-inspection",
    eyebrow: "Hivatalos vizsgálat",
    title: "Eredetvizsgálat",
    price: "22 950 - 27 000",
    unit: "Ft",
    note: "Hengerűrtartalom szerint",
    duration: "~30 perc",
    accent: "bg-primary-bright",
    check: "text-primary-bright",
    items: [
      "Megvizsgáljuk, hogy gépjárműve azonosítószámai, rendszáma, illetve dokumentumai eredetiek-e.",
      "Hatósági bizonyítványt állítunk ki, mely 60 napig felhasználható gépjárműve átírásához.",
    ],
    intro:
      "Az eredetvizsgálat során megvizsgáljuk, hogy gépjárműve azonosítószámai, rendszáma és dokumentumai eredetiek-e, majd hatósági bizonyítványt állítunk ki. A vizsgálat nagyjából 30 percet vesz igénybe, a bizonyítvány pedig 60 napig használható fel az átíráshoz. Különleges gyártmányú autók (Mercedes, BMW, Maserati, Ferrari stb.) vizsgálatához időpont szükséges.",
  },
  {
    id: "vehicle-transfer",
    eyebrow: "Okmányirodai ügyintézés",
    title: "Gépjárműátírás",
    price: "5 000 - 10 000",
    unit: "Ft",
    note: "Bonyolultságtól függően",
    duration: "1 nap",
    accent: "bg-navy",
    check: "text-primary-bright",
    items: [
      "Vállaljuk járművének okmányirodában történő átírását.",
      "Igény esetén kötelező biztosításának megkötését is elintézzük.",
    ],
    intro:
      "Vállaljuk járműve okmányirodában történő átírását, így Önnek nem kell sorban állnia. Az ügyintézés díja bonyolultságtól függően 5 000 – 10 000 Ft, a hatósági illetékek és okmánydíjak ezen felül értendők. Igény esetén a szükséges kötelező biztosítást is megkötjük.",
  },
  {
    id: "insurance",
    eyebrow: "Biztosítási alkusz",
    title: "Biztosításkötés",
    price: "0",
    unit: "Ft",
    note: "Ingyenes",
    duration: "~20 perc",
    accent: "bg-success",
    check: "text-success",
    items: [
      "Vállaljuk kötelező biztosításának megkötését gépjárműátíráshoz, illetve évfordulós átkötését.",
      "12 biztosítótársasággal vagyunk kapcsolatban, kiválasztjuk Önnek a legkedvezőbb ajánlatot.",
    ],
    intro:
      "Kötelező biztosítását megkötjük gépjárműátíráshoz, illetve elintézzük az évfordulós átkötését. 12 biztosítótársasággal vagyunk kapcsolatban, ezért kiválasztjuk Önnek a legkedvezőbb ajánlatot. A szolgáltatás ingyenes, nagyjából 20 percet vesz igénybe.",
  },
] as const;

export const faqs = [
  {
    topics: ["origin-inspection"],
    q: "Milyen okmányok szükségesek az eredetvizsgálathoz?",
    a: "Magánszemély esetén a jármű forgalmi engedélye, a megrendelő személyazonosító igazolványa és lakcímkártyája, meghatalmazott esetén szabályos meghatalmazás. Céges gépjárműnél ezen felül cégkivonat és aláírási címpéldány másolata szükséges.",
  },
  {
    topics: ["origin-inspection"],
    q: "Meddig érvényes az eredetvizsgálatról kiállított bizonyítvány?",
    a: "A hatósági bizonyítvány 60 napig használható fel gépjárműve átírásához.",
  },
  {
    topics: ["origin-inspection", "insurance"],
    q: "Mennyi ideig tart a vizsgálat?",
    a: "Az eredetvizsgálat nagyjából 30 percet vesz igénybe, a biztosításkötés körülbelül 20 percet.",
  },
  {
    topics: ["insurance", "vehicle-transfer"],
    q: "Hogyan történik a biztosításkötés az átíráshoz?",
    a: "Az átíráshoz az új tulajdonos nevére szóló kötelező felelősségbiztosítás szükséges. 12 biztosítótársasággal állunk kapcsolatban, és kiválasztjuk Önnek a legkedvezőbb ajánlatot. A biztosításkötés ingyenes.",
  },
  {
    topics: ["vehicle-transfer"],
    q: "Mi a teendő, ha nem tudok bemenni az okmányirodába?",
    a: "Vállaljuk járműve okmányirodában történő átírását, így Önnek nem kell sorban állnia. Az ügyintézés díja bonyolultságtól függően 5 000 – 10 000 Ft, a hatósági illetékek és okmánydíjak ezen felül értendők.",
  },
] as const;
