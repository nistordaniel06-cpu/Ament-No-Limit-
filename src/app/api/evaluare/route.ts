import { randomUUID } from "node:crypto";
import { mkdir, writeFile, appendFile } from "node:fs/promises";
import path from "node:path";

import {
  MAX_POZE,
  MAX_POZA_BYTES,
  TIPURI_POZA_ACCEPTATE,
  valideazaEvaluare,
  type EvaluareInput,
} from "@/lib/evaluare";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATA_DIR = path.join(process.cwd(), "data");
const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

function camp(form: FormData, name: string): string {
  const v = form.get(name);
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ ok: false, error: "Cerere invalidă." }, { status: 400 });
  }

  const input: EvaluareInput = {
    scop: camp(form, "scop") === "vanzare" ? "vanzare" : "amanet",
    categorie: camp(form, "categorie") as EvaluareInput["categorie"],
    titlu: camp(form, "titlu"),
    stare: camp(form, "stare") as EvaluareInput["stare"],
    descriere: camp(form, "descriere"),
    grameAur: camp(form, "grameAur") || undefined,
    karateAur: camp(form, "karateAur") || undefined,
    sumaDorita: camp(form, "sumaDorita") || undefined,
    nume: camp(form, "nume"),
    telefon: camp(form, "telefon").replace(/[\s.-]/g, ""),
    oras: camp(form, "oras") || undefined,
    acordDate: form.get("acordDate") === "true" || form.get("acordDate") === "on",
  };

  const erori = valideazaEvaluare(input);
  if (erori.length > 0) {
    return Response.json({ ok: false, erori }, { status: 422 });
  }

  // Validare poze
  const poze = form.getAll("poze").filter((f): f is File => f instanceof File && f.size > 0);
  if (poze.length > MAX_POZE) {
    return Response.json(
      { ok: false, error: `Maximum ${MAX_POZE} poze.` },
      { status: 422 },
    );
  }
  for (const p of poze) {
    if (p.size > MAX_POZA_BYTES) {
      return Response.json(
        { ok: false, error: `Poza "${p.name}" depășește ${MAX_POZA_BYTES / 1024 / 1024} MB.` },
        { status: 422 },
      );
    }
    if (p.type && !TIPURI_POZA_ACCEPTATE.includes(p.type)) {
      return Response.json(
        { ok: false, error: `Tip de fișier neacceptat: ${p.type}.` },
        { status: 422 },
      );
    }
  }

  const id = randomUUID();
  const record = {
    id,
    primitLa: new Date().toISOString(),
    ...input,
    poze: [] as string[],
  };

  // Persistență best-effort — pe hosting fără disc scriabil, sărim peste fără să eșuăm.
  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
    let idx = 0;
    for (const p of poze) {
      const ext = path.extname(p.name) || ".jpg";
      const fname = `${id}-${idx++}${ext}`;
      const buf = Buffer.from(await p.arrayBuffer());
      await writeFile(path.join(UPLOAD_DIR, fname), buf);
      record.poze.push(`uploads/${fname}`);
    }
    await appendFile(path.join(DATA_DIR, "evaluari.jsonl"), JSON.stringify(record) + "\n", "utf8");
  } catch (err) {
    console.warn("[evaluare] nu am putut persista cererea pe disc:", err);
  }

  console.info(`[evaluare] cerere nouă ${id} — ${input.categorie} / ${input.titlu} / ${input.telefon}`);

  return Response.json({ ok: true, id, nrPoze: poze.length });
}
