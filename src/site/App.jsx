import React, { useState } from "react";

/** VUL HIER JE FORMSPREE ENDPOINT IN, bijv. https://formspree.io/f/abcd1234 */
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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-100 blur-3xl" />
          <div className="absolute top-32 -left-16 w-80 h-80 rounded-full bg-sky-50 blur-3xl" />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              Van papierchaos naar digitale rust
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Wij helpen MKB en organisaties in Drenthe &amp; Groningen met het veilig
              opruimen, digitaliseren en beheren van documenten. Snel, AVG-proof en zonder gedoe.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#cta" className="inline-flex rounded-2xl px-5 py-3 bg-sky-600 text-white shadow hover:bg-sky-700 transition">
                Plan gratis intake
              </a>
              <a href="#pakketten" className="inline-flex rounded-2xl px-5 py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                Bekijk pakketten
              </a>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
              <Badge>AVG-proof</Badge>
              <Badge>Vernietigingscertificaat</Badge>
              <Badge>Doorzoekbare PDF/A</Badge>
            </div>
          </div>
          <div className="relative">
            <div className="p-6 md:p-10 bg-white rounded-3xl shadow-lg ring-1 ring-slate-200">
              <Illustration />
            </div>
          </div>
        </div>
      </section>

      {/* Diensten */}
      <section id="diensten" className="mx-auto max-w-6xl px-4 py-16">
        <h3 className="text-2xl md:text-3xl font-semibold">Onze diensten</h3>
        <p className="mt-2 text-slate-600 max-w-3xl">
          Kies een losse dienst of combineer voor een totaaloplossing. We werken transparant met vaste prijzen of heldere uurtarieven.
        </p>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard title="Archiefopruiming" icon="boxes">
            Sorteren, labelen en veilig afvoeren van papieren archieven in samenwerking met gecertificeerde vernietigers.
          </ServiceCard>
          <ServiceCard title="Archiefdigitalisering" icon="scanner">
            Snel scannen met OCR naar doorzoekbare PDF/A. Logische bestandsnamen en mappenstructuur.
          </ServiceCard>
          <ServiceCard title="Bestanden &amp; Cloud" icon="cloud">
            Opschonen en structureren van netwerkschijven, OneDrive/SharePoint of Google Drive.
          </ServiceCard>
          <ServiceCard title="Abonnement" icon="repeat">
            Maandelijks/kwartaal onderhoud: scannen, ordenen en kleine verbeteringen doorvoeren.
          </ServiceCard>
        </div>
      </section>

      {/* Pakketten */}
      <section id="pakketten" className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h3 className="text-2xl md:text-3xl font-semibold">Pakketten</h3>
          <div className="mt-8 grid md:grid-cols-3 gap-6 items-stretch">
            <PlanCard name="Basis" price="€500–€1.000 / project" highlights={[
              "Archiefsortering & opschoning",
              "AVG-proof vernietiging",
              "Korte rapportage"
            ]} />
            <PlanCard name="Plus" featured price="€1.000–€2.500 / project" highlights={[
              "Alles uit Basis",
              "Scannen + OCR naar PDF/A",
              "Mappenstructuur + naamconventie",
              "Korte gebruikersinstructie"
            ]} />
            <PlanCard name="Premium" price="€150–€300 / maand" highlights={[
              "Alles uit Plus",
              "Periodiek onderhoud",
              "Opschonen digitale bestanden",
              "Vaste contactpersoon"
            ]} />
          </div>
        </div>
      </section>

      {/* Werkwijze */}
      <section id="werkwijze" className="mx-auto max-w-6xl px-4 py-16">
        <h3 className="text-2xl md:text-3xl font-semibold">Onze werkwijze</h3>
        <ol className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          {[
            { n: 1, t: "Intake", d: "Vrijblijvend gesprek + inventarisatie en prijs." },
            { n: 2, t: "Sorteren", d: "Selectie op bewaartermijn, labeling en planning." },
            { n: 3, t: "Digitaliseren", d: "Scannen met OCR, naamconventie en mappenstructuur." },
            { n: 4, t: "Overdracht", d: "Veilige cloudoverdracht + certificaat vernietiging + handleiding." }
          ].map(step => (
            <li key={step.n} className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold">{step.n}</div>
                <div className="font-medium">{step.t}</div>
              </div>
              <p className="mt-3 text-slate-600">{step.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Veilig & AVG-proof */}
      <section id="veiligheid" className="mx-auto max-w-6xl px-4 py-16">
        <h3 className="text-2xl md:text-3xl font-semibold">Veilig &amp; AVG-proof werken</h3>
        <p className="mt-2 text-slate-600 max-w-3xl">
          Uw documenten bevatten vaak gevoelige informatie. Wij werken daarom met duidelijke, veilige richtlijnen en minimale bewaartermijnen.
        </p>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard title="Geheimhouding gegarandeerd">
            Voor ieder project tekenen we een <strong>NDA</strong>. Documenten worden nooit gedeeld zonder uw toestemming.
          </InfoCard>
          <InfoCard title="Verwerkersovereenkomst (AVG)">
            Standaard werken wij met een <strong>VO</strong>, zodat u aantoonbaar aan de <strong>AVG</strong> voldoet.
          </InfoCard>
          <InfoCard title="Veilige papiervernietiging">
            Afvoer via <strong>gecertificeerde vernietigers</strong> (o.a. DIN-normen). U ontvangt een <strong>vernietigingscertificaat</strong>.
          </InfoCard>
          <InfoCard title="Digitale overdracht">
            Overdracht via <strong>versleutelde</strong> USB of beveiligde cloud (OneDrive/SharePoint/Drive). Geen onnodige kopieën.
          </InfoCard>
          <InfoCard title="Toegang & beveiliging">
            Alleen geautoriseerde medewerkers. <strong>Sterke wachtwoorden</strong>, 2FA en waar mogelijk <strong>encryptie</strong>.
          </InfoCard>
          <InfoCard title="Bewaren wat nodig is">
            We hanteren <strong>zo min mogelijk gegevens, zo kort mogelijk bewaren</strong>. Heldere afspraken in de VO.
          </InfoCard>
        </div>
      </section>

      {/* CTA + Afbeelding + Contactformulier */}
      <section id="cta" className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-50 to-blue-50" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          {/* Tekst links */}
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

          {/* Afbeelding + formulier rechts */}
          <div id="contact" className="space-y-6">
            {/* Afbeelding uit /public */}
            <div className="relative w-full h-48 md:h-56">
              <img
                src="/archiefbeheer.jpg"  /* pas naar .png als je png gebruikt */
                alt="Archiefopruiming en documentbeheer"
                className="rounded-2xl shadow-md object-cover w-full h-full"
              />
            </div>

            {/* Succes / error-meldingen */}
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

            {/* Formulier */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-slate-200 space-y-4">
              {/* Honeypot tegen spam */}
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

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="w-10 h-10" />
              <div className="font-semibold">Document Support Service</div>
            </div>
            <p className="mt-3 text-sm text-slate-600 max-w-sm">
              Wij maken ruimte, u wint tijd. Documentbeheer &amp; archiefoplossingen voor Drenthe &amp; Groningen.
            </p>
          </div>
          <div>
            <div className="font-medium">Contact</div>
            <ul className="mt-3 text-sm text-slate-600 space-y-1">
              <li>info@documentsupport.nl</li>
              <li>+31 6 0000 0000</li>
              <li>KVK: 00000000</li>
            </ul>
          </div>
          <div>
            <div className="font-medium">Links</div>
            <ul className="mt-3 text-sm text-slate-600 space-y-1">
              <li><a href="#diensten" className="hover:text-slate-900">Diensten</a></li>
              <li><a href="#pakketten" className="hover:text-slate-900">Pakketten</a></li>
              <li><a href="#werkwijze" className="hover:text-slate-900">Werkwijze</a></li>
              <li><a href="#veiligheid" className="hover:text-slate-900">Veiligheid</a></li>
              <li><a href="#cta" className="hover:text-slate-900">Offerte</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-slate-500 pb-8">
          © {new Date().getFullYear()} Document Support Service. Alle rechten voorbehouden.
        </div>
      </footer>
    </section>
  );
}

/* ===== kleine UI helpers ===== */
function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs">
      {children}
    </span>
  );
}

function InfoCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-200">
      <div className="font-medium">{title}</div>
      <p className="mt-2 text-sm text-slate-600">{children}</p>
    </div>
  );
}

function ServiceCard({ title, children, icon }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <Icon kind={icon} className="w-5 h-5" />
        <div className="font-medium">{title}</div>
      </div>
      <p className="mt-3 text-sm text-slate-600">{children}</p>
    </div>
  );
}

function PlanCard({ name, price, highlights, featured }) {
  return (
    <div className={"rounded-3xl p-6 border shadow-sm " + (featured ? "border-sky-600 shadow-md" : "border-slate-200") }>
      <div className="flex items-baseline justify-between">
        <div className="text-lg font-semibold">{name}</div>
        {featured && <span className="text-xs rounded-full bg-sky-600 text-white px-2 py-1">Meest gekozen</span>}
      </div>
      <div className="mt-3 text-2xl font-bold">{price}</div>
      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        {highlights.map((h, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-sky-600"/> {h}
          </li>
        ))}
      </ul>
      <a href="#cta" className="mt-6 inline-flex w-full justify-center rounded-2xl px-4 py-2 bg-sky-600 text-white hover:bg-sky-700">Offerte aanvragen</a>
    </div>
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

function Icon({ kind, className }) {
  if (kind === "boxes") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 7l9-4 9 4-9 4-9-4Z"/><path d="M3 7v10l9 4 9-4V7"/>
      </svg>
    );
  }
  if (kind === "scanner") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="7" width="18" height="10" rx="2"/><path d="M7 11h10M7 15h6"/><path d="M9 7l2-4h2l2 4"/>
      </svg>
    );
  }
  if (kind === "cloud") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 18a5 5 0 0 1 0-10 6 6 0 0 1 11.3 2.5H19a4 4 0 0 1 0 8H7Z"/>
      </svg>
    );
  }
  if (kind === "repeat") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    );
  }
  return null;
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


