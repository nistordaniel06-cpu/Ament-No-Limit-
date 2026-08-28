// Model de date pentru fluxul "Cere evaluare" — partajat între formular (client) și API (server).

export const CATEGORII = [
  { id: "telefon", label: "Telefon", emoji: "📱" },
  { id: "laptop", label: "Laptop", emoji: "💻" },
  { id: "aur", label: "Bijuterii / aur", emoji: "⛓️" },
  { id: "ceas", label: "Ceas", emoji: "⌚" },
  { id: "altele", label: "Altele", emoji: "📦" },
] as const;

export type CategorieId = (typeof CATEGORII)[number]["id"];

export const CATEGORIE_IDS = CATEGORII.map((c) => c.id) as CategorieId[];

export const STARI = [
  "Nou / sigilat",
  "Ca nou",
  "Folosit - stare bună",
  "Folosit - urme de uzură",
  "Defect / pentru piese",
] as const;

export type Stare = (typeof STARI)[number];

export const SCOPURI = [
  { value: "amanet", label: "Amanet" },
  { value: "vanzare", label: "Vânzare" },
] as const;

export type Scop = (typeof SCOPURI)[number]["value"];

export const MAX_POZE = 8;
export const MAX_POZA_BYTES = 8 * 1024 * 1024; // 8 MB
export const TIPURI_POZA_ACCEPTATE = ["image/jpeg", "image/png", "image/webp", "image/heic"];

export interface EvaluareInput {
  scop: Scop;
  categorie: CategorieId;
  titlu: string; // marcă / model, ex: "iPhone 13 128GB"
  stare: Stare | "";
  descriere: string;
  grameAur?: string; // doar pentru categoria "aur"
  karateAur?: string; // doar pentru categoria "aur"
  sumaDorita?: string;
  nume: string;
  telefon: string;
  oras?: string;
  acordDate: boolean;
}

export interface CampErr {
  camp: keyof EvaluareInput;
  mesaj: string;
}

const RE_TELEFON = /^(\+?4?0)?7\d{8}$/; // număr mobil RO, tolerant la spații (curățate înainte)

/** Validare partajată. Întoarce lista de erori (goală = valid). */
export function valideazaEvaluare(input: Partial<EvaluareInput>): CampErr[] {
  const e: CampErr[] = [];
  const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  if (!input.categorie || !CATEGORIE_IDS.includes(input.categorie)) {
    e.push({ camp: "categorie", mesaj: "Alege o categorie." });
  }
  if (s(input.titlu).length < 2) {
    e.push({ camp: "titlu", mesaj: "Scrie marca și modelul obiectului." });
  }
  if (s(input.descriere).length < 10) {
    e.push({ camp: "descriere", mesaj: "Descrie pe scurt obiectul (min. 10 caractere)." });
  }
  if (input.categorie === "aur") {
    const g = Number(s(input.grameAur).replace(",", "."));
    if (!g || g <= 0) e.push({ camp: "grameAur", mesaj: "Introdu gramajul (ex: 12.5)." });
  }
  if (s(input.nume).length < 2) {
    e.push({ camp: "nume", mesaj: "Introdu numele tău." });
  }
  const tel = s(input.telefon).replace(/[\s.-]/g, "");
  if (!RE_TELEFON.test(tel)) {
    e.push({ camp: "telefon", mesaj: "Introdu un număr de telefon valid (07xxxxxxxx)." });
  }
  if (!input.acordDate) {
    e.push({ camp: "acordDate", mesaj: "Trebuie să fii de acord cu prelucrarea datelor." });
  }
  return e;
}

/** Rezumat text pentru WhatsApp / email. */
export function rezumatEvaluare(input: EvaluareInput, nrPoze = 0): string {
  const cat = CATEGORII.find((c) => c.id === input.categorie);
  const scop = SCOPURI.find((x) => x.value === input.scop)?.label ?? "Amanet";
  const linii = [
    `Cerere evaluare (${scop}) — ${cat?.label ?? input.categorie}`,
    `Obiect: ${input.titlu}`,
    input.stare && `Stare: ${input.stare}`,
    input.categorie === "aur" &&
      `Aur: ${input.grameAur ?? "?"} g${input.karateAur ? `, ${input.karateAur}K` : ""}`,
    `Detalii: ${input.descriere}`,
    input.sumaDorita && `Sumă dorită: ${input.sumaDorita}`,
    `Nume: ${input.nume}`,
    `Telefon: ${input.telefon}`,
    input.oras && `Oraș: ${input.oras}`,
    nrPoze > 0 && `Poze atașate: ${nrPoze}`,
  ].filter(Boolean);
  return linii.join("\n");
}
