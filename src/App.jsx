import React, { useState } from "react";

/** VUL HIER JE FORMSPREE ENDPOINT IN, bv: https://formspree.io/f/abcd1234 */
const FORMSPREE_URL = "https://formspree.io/forms/xblzdbal"; // <-- vervang

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        form.reset();
        setSubmitted(true);
      } else {
        const json = await res.json().catch(() => null);
        setError(json?.error || "Verzenden is niet gelukt. Probeer het later nog eens.");
      }
    } catch {
      setError("Er ging iets mis met de verbinding. Probeer het later opnieuw.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen text-slate-800 bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="w-16 h-16" />
            <div>
              <h1 className="text-3xl font-extrabold leading-tight text-slate-900">
                Document Support Service
              </h1>
              <p className="text-base text-slate-600 mt-1">
                Wij maken ruimte, u wint tijd.
              </p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#diensten" className="hover:text-slate-900 text-slate-600">Diensten</a>
            <a href="#pakketten" className="hover:text-slate-900 text-slate-600">Pakketten</a>
            <a href="#werkwijze" className="hover:text-slate-900 text-slate-600">Werkwijze</a>
            <a href="#veiligheid" className="hover:text-slate-900 text-slate-600">Veiligheid</a>
            <a href="#cta" className="inline-flex items-center rounded-2xl px-4 py-2 bg-sky-600 text-white shadow-sm hover:bg-sky-700 transition">
              Offerte aanvragen
            </a>
          </nav>
        </div>
      </header>

      {/* CTA */}
      <section id="cta" className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-50 to-blue-50" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
              Gratis intake binnen 48 uur
            </h3>
            <p className="mt-4 text-lg text-slate-700">
              We bekijken uw situatie, schatten de omvang in en geven een vaste prijs waar mogelijk.
            </p>
            <ul className="mt-6 text-slate-600 list-disc list-inside space-y-2">
              <li>AVG-proof werken (VO + NDA beschikbaar)</li>
              <li>Vernietigingscertificaat bij papierafvoer</li>
              <li>Heldere planning en één contactpersoon</li>
            </ul>
          </div>

          <div id="contact" className="space-y-6">
            <div className="relative w-full h-48 md:h-56">
              <img src="/archiefbeheer.jpg" alt="Archiefopruiming en documentbeheer"
                   className="rounded-2xl shadow-md object-cover w-full h-full" />
            </div>

            {submitted && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 p-4">
                <div className="font-medium">Bedankt! 🎉</div>
                <div className="text-sm">Uw bericht is ontvangen. We nemen zo snel mogelijk contact met u op.</div>
              </div>
            )}
            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 text-rose-800 p-4">
                <div className="font-medium">Verzenden mislukt</div>
                <div className="text-sm">{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-slate-200 space-y-4">
              <input type="text" name="_gotcha" className="hidden" tabIndex="-1" autoComplete="off" />
              <input type="hidden" name="_subject" value="Nieuwe intake-aanvraag via Document Support Service" />

              <div>
                <label className="text-sm text-slate-600" htmlFor="bedrijf">Bedrijfsnaam</label>
                <input id="bedrijf" name="Bedrijfsnaam" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" placeholder="Uw bedrijfsnaam" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-600" htmlFor="naam">Naam</label>
                  <input id="naam" name="Naam" required className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" placeholder="Uw naam" />
                </div>
                <div>
                  <label className="text-sm text-slate-600" htmlFor="email">E-mail</label>
                  <input id="email" type="email" name="email" required className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" placeholder="naam@bedrijf.nl" />
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-600" htmlFor="bericht">Bericht</label>
                <textarea id="bericht" name="Bericht" required className="mt-1 w-full min-h-[110px] rounded-xl border border-slate-300 px-3 py-2" placeholder="Korte omschrijving van uw archief / wens" />
              </div>

              <button disabled={sending} type="submit" className="w-full rounded-2xl px-5 py-3 bg-sky-600 text-white font-semibold shadow hover:bg-sky-700 transition disabled:opacity-70">
                {sending ? "Versturen…" : "Plan intake"}
              </button>
              <p className="text-xs text-slate-500">
                Door te verzenden gaat u akkoord met onze voorwaarden en privacyverklaring.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs">
      {children}
    </span>
  );
}

function Logo({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="48" height="48" rx="10" className="fill-sky-500/20" />
      <path d="M24 20h16c1.1 0 2 .9 2 2v20c0 1.1-.9 2-2 2H24a2 2 0 0 1-2-2V22c0-1.1.9-2 2-2Z" className="fill-white stroke-slate-900"/>
      <path d="M28 26h12M28 32h12M28 38h8" className="stroke-slate-900" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 48h24" className="stroke-slate-900" strokeWidth="2" strokeLinecap="round"/>
      <path d="M40 24l6-6" className="stroke-slate-900" strokeWidth="2"/>
      <path d="M38 22h8v8" className="stroke-slate-900" strokeWidth="2"/>
      <circle cx="46" cy="18" r="7" className="fill-white stroke-slate-900"/>
      <path d="M42 18h8M46 14v8" className="stroke-slate-900" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function Illustration() {
  return (
    <svg viewBox="0 0 480 280" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="480" height="280" rx="24" fill="#F8FAFC" />
      <rect x="36" y="36" width="180" height="208" rx="14" fill="#FFFFFF" stroke="#0F172A" />
      <rect x="60" y="72" width="132" height="12" rx="6" fill="#CBD5E1" />
      <rect x="60" y="100" width="132" height="12" rx="6" fill="#CBD5E1" />
      <rect x="60" y="128" width="90" height="12" rx="6" fill="#CBD5E1" />
      <rect x="220" y="60" width="224" height="140" rx="12" fill="#FFFFFF" stroke="#0F172A" />
      <rect x="240" y="88" width="184" height="12" rx="6" fill="#CBD5E1" />
      <rect x="240" y="116" width="184" height="12" rx="6" fill="#CBD5E1" />
      <rect x="240" y="144" width="120" height="12" rx="6" fill="#CBD5E1" />
      <path d="M120 244h240" stroke="#0F172A" />
      <circle cx="380" cy="60" r="14" fill="#FFFFFF" stroke="#0F172A" />
      <path d="M374 60h12M380 54v12" stroke="#0F172A" strokeWidth="2" />
    </svg>
  );
}
