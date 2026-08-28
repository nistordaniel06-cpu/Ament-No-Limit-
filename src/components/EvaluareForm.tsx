"use client";

import {
  Check,
  ChevronDown,
  ChevronLeft,
  ImagePlus,
  Loader2,
  MessageCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import Segmented from "@/components/ui/Segmented";
import Switch from "@/components/ui/Switch";
import { BUSINESS, waLink } from "@/lib/config";
import {
  CATEGORII,
  MAX_POZE,
  MAX_POZA_BYTES,
  SCOPURI,
  STARI,
  rezumatEvaluare,
  valideazaEvaluare,
  type CampErr,
  type EvaluareInput,
} from "@/lib/evaluare";

type Erori = Partial<Record<keyof EvaluareInput, string>>;

interface Poza {
  file: File;
  url: string;
}

const START: EvaluareInput = {
  scop: "amanet",
  categorie: "telefon",
  titlu: "",
  stare: "",
  descriere: "",
  grameAur: "",
  karateAur: "",
  sumaDorita: "",
  nume: "",
  telefon: "",
  oras: "",
  acordDate: false,
};

function toErori(list: CampErr[]): Erori {
  return Object.fromEntries(list.map((e) => [e.camp, e.mesaj]));
}

export default function EvaluareForm() {
  const [data, setData] = useState<EvaluareInput>(START);
  const [poze, setPoze] = useState<Poza[]>([]);
  const [erori, setErori] = useState<Erori>({});
  const [pozaErr, setPozaErr] = useState<string>("");
  const [serverErr, setServerErr] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [succes, setSucces] = useState<{ id: string; wa: string } | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const pozeRef = useRef<Poza[]>([]);

  useEffect(() => {
    pozeRef.current = poze;
  }, [poze]);

  useEffect(() => {
    return () => pozeRef.current.forEach((p) => URL.revokeObjectURL(p.url));
  }, []);

  function set<K extends keyof EvaluareInput>(k: K, v: EvaluareInput[K]) {
    setData((d) => ({ ...d, [k]: v }));
    if (erori[k]) setErori((e) => ({ ...e, [k]: undefined }));
  }

  function adaugaPoze(files: FileList | null) {
    if (!files) return;
    setPozaErr("");
    const noi: Poza[] = [];
    for (const f of Array.from(files)) {
      if (poze.length + noi.length >= MAX_POZE) {
        setPozaErr(`Poți încărca maximum ${MAX_POZE} poze.`);
        break;
      }
      if (!f.type.startsWith("image/")) {
        setPozaErr("Doar fișiere imagine sunt acceptate.");
        continue;
      }
      if (f.size > MAX_POZA_BYTES) {
        setPozaErr(`„${f.name}” depășește ${MAX_POZA_BYTES / 1024 / 1024} MB.`);
        continue;
      }
      noi.push({ file: f, url: URL.createObjectURL(f) });
    }
    if (noi.length) setPoze((p) => [...p, ...noi]);
    if (fileRef.current) fileRef.current.value = "";
  }

  function stergePoza(url: string) {
    URL.revokeObjectURL(url);
    setPoze((p) => p.filter((x) => x.url !== url));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerErr("");
    const list = valideazaEvaluare(data);
    if (list.length) {
      setErori(toErori(list));
      document
        .querySelector(`[data-camp="${list[0].camp}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => fd.append(k, String(v)));
      poze.forEach((p) => fd.append("poze", p.file, p.file.name));

      const res = await fetch("/api/evaluare", { method: "POST", body: fd });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        if (Array.isArray(json.erori)) {
          setErori(toErori(json.erori));
          setServerErr("Verifică datele completate.");
        } else {
          setServerErr(json.error ?? "A apărut o eroare. Încearcă din nou.");
        }
        return;
      }

      const wa = waLink(
        `${rezumatEvaluare(data, poze.length)}\n\n(Ref: ${String(json.id).slice(0, 8)})`,
      );
      setSucces({ id: json.id, wa });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setServerErr("Nu am putut trimite cererea. Verifică conexiunea și încearcă din nou.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    poze.forEach((p) => URL.revokeObjectURL(p.url));
    setPoze([]);
    setData(START);
    setErori({});
    setPozaErr("");
    setServerErr("");
    setSucces(null);
  }

  /* -------------------- SUCCES -------------------- */
  if (succes) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-[72px] h-[72px] rounded-full bg-ios-green flex items-center justify-center mx-auto">
          <Check className="text-white" size={40} strokeWidth={3} />
        </div>
        <div className="space-y-2">
          <h1 className="text-[28px] font-bold tracking-tight text-ios-label">Cerere trimisă</h1>
          <p className="text-[15px] text-ios-label-2 leading-relaxed">
            Am primit cererea ta. Te contactăm în cel mai scurt timp la numărul lăsat.
          </p>
          <p className="text-[13px] text-ios-label-3">Referință: {succes.id.slice(0, 8)}</p>
        </div>
        <div className="space-y-2.5 pt-2">
          <a
            href={succes.wa}
            target="_blank"
            rel="noopener noreferrer"
            className="tap flex items-center justify-center gap-2 bg-ios-green text-white text-[17px] font-semibold py-3.5 rounded-ios"
          >
            <MessageCircle size={19} /> Trimite și pe WhatsApp
          </a>
          <button
            onClick={reset}
            className="tap w-full flex items-center justify-center bg-ios-card text-gold text-[17px] font-semibold py-3.5 rounded-ios"
          >
            Trimite altă cerere
          </button>
          <Link
            href="/"
            className="tap block text-[15px] text-ios-label-2 pt-2"
          >
            Înapoi la pagina principală
          </Link>
        </div>
      </div>
    );
  }

  /* -------------------- FORMULAR -------------------- */
  return (
    <div className="max-w-xl mx-auto px-4 pb-10">
      <div className="pt-3 pb-1">
        <Link
          href="/"
          className="tap inline-flex items-center gap-0.5 text-[15px] text-gold -ml-1"
        >
          <ChevronLeft size={20} /> Înapoi
        </Link>
      </div>
      <h1 className="text-[34px] font-bold tracking-tight text-ios-label leading-tight">
        Cere evaluare
      </h1>
      <p className="mt-1 text-[15px] text-ios-label-2 leading-relaxed">
        Completează detaliile și primești o estimare rapidă, fără obligații.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-7">
        {/* Scop */}
        <Grup titlu="Ce vrei să faci?">
          <div className="px-3.5 py-3">
            <Segmented
              aria-label="Scop"
              options={SCOPURI.map((s) => ({ value: s.value, label: s.label }))}
              value={data.scop}
              onChange={(v) => set("scop", v)}
            />
          </div>
        </Grup>

        {/* Categorie */}
        <Grup titlu="Categorie" subsol={erori.categorie} eroare={!!erori.categorie}>
          <div data-camp="categorie" className="divide-y divide-ios-separator">
            {CATEGORII.map((c) => {
              const activ = data.categorie === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => set("categorie", c.id)}
                  className="tap w-full flex items-center gap-3 px-4 py-3 text-left"
                >
                  <span className="text-xl w-6 text-center">{c.emoji}</span>
                  <span className="flex-1 text-[16px] text-ios-label">{c.label}</span>
                  {activ && <Check size={19} className="text-gold" strokeWidth={2.5} />}
                </button>
              );
            })}
          </div>
        </Grup>

        {/* Detalii obiect */}
        <Grup
          titlu="Detalii obiect"
          subsol={erori.titlu || erori.grameAur}
          eroare={!!(erori.titlu || erori.grameAur)}
        >
          <Rand label="Obiect" camp="titlu">
            <input
              type="text"
              value={data.titlu}
              onChange={(e) => set("titlu", e.target.value)}
              placeholder="iPhone 13 / Lanț aur"
              className={inputCls(erori.titlu)}
            />
          </Rand>
          <Rand label="Stare" camp="stare">
            <SelectRight
              value={data.stare}
              onChange={(v) => set("stare", v as EvaluareInput["stare"])}
              placeholder="Alege"
              options={STARI.map((s) => ({ value: s, label: s }))}
            />
          </Rand>
          {data.categorie === "aur" && (
            <>
              <Rand label="Gramaj (g)" camp="grameAur">
                <input
                  type="text"
                  inputMode="decimal"
                  value={data.grameAur}
                  onChange={(e) => set("grameAur", e.target.value)}
                  placeholder="12.5"
                  className={inputCls(erori.grameAur)}
                />
              </Rand>
              <Rand label="Karate" camp="karateAur">
                <SelectRight
                  value={data.karateAur ?? ""}
                  onChange={(v) => set("karateAur", v)}
                  placeholder="—"
                  options={["24", "22", "18", "14", "10", "9"].map((k) => ({
                    value: k,
                    label: `${k}K`,
                  }))}
                />
              </Rand>
            </>
          )}
        </Grup>

        {/* Descriere */}
        <Grup titlu="Descriere" subsol={erori.descriere ?? "Accesorii, defecte, acte, vechime…"} eroare={!!erori.descriere}>
          <div data-camp="descriere" className="px-4 py-3">
            <textarea
              value={data.descriere}
              onChange={(e) => set("descriere", e.target.value)}
              rows={4}
              placeholder="Scrie câteva detalii despre obiect"
              className="w-full bg-transparent text-[16px] text-ios-label placeholder:text-ios-label-3 outline-none resize-none"
            />
          </div>
        </Grup>

        {/* Sumă dorită */}
        <Grup titlu="Sumă dorită" subsol="Opțional">
          <Rand label="Sumă" camp="sumaDorita">
            <input
              type="text"
              inputMode="numeric"
              value={data.sumaDorita}
              onChange={(e) => set("sumaDorita", e.target.value)}
              placeholder="ex: 1500 lei"
              className={inputCls()}
            />
          </Rand>
        </Grup>

        {/* Poze */}
        <Grup
          titlu="Poze"
          subsol={pozaErr || `Opțional · până la ${MAX_POZE} poze`}
          eroare={!!pozaErr}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            capture="environment"
            onChange={(e) => adaugaPoze(e.target.files)}
            className="hidden"
          />
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 p-4">
            {poze.map((p) => (
              <div
                key={p.url}
                className="relative aspect-square rounded-xl overflow-hidden bg-ios-bg"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- preview local (blob:), fără next/image */}
                <img src={p.url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => stergePoza(p.url)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/55 text-white flex items-center justify-center backdrop-blur-sm"
                  aria-label="Șterge poza"
                >
                  <X size={13} />
                </button>
              </div>
            ))}
            {poze.length < MAX_POZE && (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="tap aspect-square rounded-xl border border-dashed border-ios-separator flex flex-col items-center justify-center gap-1 text-ios-label-3"
              >
                <ImagePlus size={22} />
                <span className="text-[11px] font-medium">Adaugă</span>
              </button>
            )}
          </div>
        </Grup>

        {/* Contact */}
        <Grup
          titlu="Date de contact"
          subsol={erori.nume || erori.telefon}
          eroare={!!(erori.nume || erori.telefon)}
        >
          <Rand label="Nume" camp="nume">
            <input
              type="text"
              value={data.nume}
              onChange={(e) => set("nume", e.target.value)}
              autoComplete="name"
              placeholder="Numele tău"
              className={inputCls(erori.nume)}
            />
          </Rand>
          <Rand label="Telefon" camp="telefon">
            <input
              type="tel"
              value={data.telefon}
              onChange={(e) => set("telefon", e.target.value)}
              autoComplete="tel"
              placeholder="07xxxxxxxx"
              className={inputCls(erori.telefon)}
            />
          </Rand>
          <Rand label="Oraș" camp="oras">
            <input
              type="text"
              value={data.oras}
              onChange={(e) => set("oras", e.target.value)}
              placeholder={BUSINESS.city}
              className={inputCls()}
            />
          </Rand>
        </Grup>

        {/* Acord */}
        <Grup subsol={erori.acordDate} eroare={!!erori.acordDate}>
          <div
            data-camp="acordDate"
            className="flex items-center gap-3 px-4 py-3"
          >
            <span className="flex-1 text-[15px] text-ios-label leading-snug">
              Sunt de acord cu prelucrarea datelor pentru a fi contactat despre această cerere.
            </span>
            <Switch
              checked={data.acordDate}
              onChange={(v) => set("acordDate", v)}
              aria-label="Acord prelucrare date"
            />
          </div>
        </Grup>

        {serverErr && (
          <p className="text-[14px] text-ios-red bg-ios-card rounded-ios px-4 py-3">
            {serverErr}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="tap w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark disabled:opacity-60 text-white text-[17px] font-semibold py-3.5 rounded-ios"
        >
          {submitting ? (
            <>
              <Loader2 size={19} className="animate-spin" /> Se trimite…
            </>
          ) : (
            "Trimite cererea"
          )}
        </button>
        <p className="text-center text-[13px] text-ios-label-3">
          Sau scrie-ne direct pe{" "}
          <a
            href={waLink("Bună ziua, aș dori o evaluare.")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold"
          >
            WhatsApp
          </a>
        </p>
      </form>
    </div>
  );
}

/* ---------- primitive de prezentare (stil listă grupată iOS) ---------- */

function inputCls(err?: string) {
  return `flex-1 min-w-0 bg-transparent text-[16px] text-right outline-none placeholder:text-ios-label-3 ${
    err ? "text-ios-red" : "text-ios-label"
  }`;
}

function Grup({
  titlu,
  subsol,
  eroare,
  children,
}: {
  titlu?: string;
  subsol?: string;
  eroare?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section>
      {titlu && (
        <h2 className="px-4 pb-1.5 text-[13px] font-medium uppercase tracking-wide text-ios-label-2">
          {titlu}
        </h2>
      )}
      <div className="rounded-ios bg-ios-card overflow-hidden">{children}</div>
      {subsol && (
        <p
          className={`px-4 pt-1.5 text-[13px] leading-snug ${
            eroare ? "text-ios-red" : "text-ios-label-3"
          }`}
        >
          {subsol}
        </p>
      )}
    </section>
  );
}

function Rand({
  label,
  camp,
  children,
}: {
  label: string;
  camp: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-camp={camp}
      className="flex items-center gap-3 px-4 min-h-[47px] border-b border-ios-separator last:border-b-0"
    >
      <span className="w-24 shrink-0 text-[16px] text-ios-label">{label}</span>
      {children}
    </div>
  );
}

function SelectRight({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <div className="flex-1 flex items-center justify-end gap-1 min-w-0">
      <div className="relative flex items-center">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`appearance-none bg-transparent text-[16px] text-right outline-none pr-5 max-w-[62vw] truncate ${
            value ? "text-ios-label" : "text-ios-label-3"
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-0 text-ios-label-3 pointer-events-none"
        />
      </div>
    </div>
  );
}
