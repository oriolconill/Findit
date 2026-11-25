import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Compass,
  MapPin,
} from 'lucide-react';
import heroRetailImg from '../assets/images/findit_hero_retail_1795626558338.jpg';
import bentoLibraryImg from '../assets/images/findit_bento_library_1795626558951.jpg';
import bentoFashionImg from '../assets/images/findit_bento_fashion_1795626559028.jpg';
import { CATALOGS, STORES } from '../data/stores';
import { StoreId } from '../types';
import { APP_URL, LandingHeader } from './LandingHeader';
import { LandingInteractiveDemo } from './LandingInteractiveDemo';

const STORE_ORDER: StoreId[] = ['mercadona', 'zara', 'biblioteca', 'decathlon'];

const FAQ_ITEMS = [
  {
    q: 'Com sap FINDIT dins de quin establiment soc?',
    a: "Pots cercar l'establiment pel nom, escanejar el codi QR situat a l'entrada o utilitzar la detecció automàtica per ubicació per carregar el plànol i el catàleg en segons.",
  },
  {
    q: 'Cal descarregar cap aplicació des de la botiga del mòbil?',
    a: "No. FINDIT funciona directament des del navegador tant al mòbil com a l'ordinador. Només has de prémer «Accedir a l'app» per començar a utilitzar-la.",
  },
  {
    q: 'Com funciona l’ordenació automàtica de les llistes de la compra?',
    a: "Afegeix els productes que necessites i l'algorisme calcula el recorregut més curt des de l'entrada perquè passis per cada passadís una sola vegada.",
  },
  {
    q: 'Per a què serveix l’apartat de devolucions?',
    a: "Si decideixes no emportar-te un article o vols retornar un llibre prestat, FINDIT desa la referència i et guia fins a la prestatgeria, penjador o taulell exacte d'origen.",
  },
];

const AUDIENCE_BENEFITS = {
  compradors: [
    {
      num: '01',
      title: 'Sense preguntes ni voltes innecessàries',
      text: 'Troba el passadís, la secció, la prestatgeria i el nivell exacte abans de fer un sol pas.',
    },
    {
      num: '02',
      title: 'Llistes que s’adapten al plànol real',
      text: 'Reordena automàticament la compra setmanal i desa plantilles per a futures visites.',
    },
    {
      num: '03',
      title: 'Devolucions clares al lloc d’origen',
      text: 'Consulta en un toc on deixar cada peça de roba, article esportiu o llibre.',
    },
  ],
  establiments: [
    {
      num: '01',
      title: 'Menys interrupcions al personal de sala',
      text: 'Els visitants localitzen productes i talles de manera autònoma mitjançant el mapa 2D.',
    },
    {
      num: '02',
      title: 'Accés immediat amb codi QR a l’entrada',
      text: 'Un cartell a la porta connecta el client amb el catàleg i la distribució vigent del local.',
    },
    {
      num: '03',
      title: 'Adaptable a qualsevol superfície',
      text: 'Des de supermercats i botigues de moda fins a biblioteques municipals o centres esportius.',
    },
  ],
};

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackLabel: string;
  className?: string;
}

const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackLabel,
  className = '',
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`w-full h-full min-h-[220px] bg-gradient-to-br from-[#EAF3FF] to-[#DBEAFE] flex flex-col items-center justify-center p-6 text-center ${className}`}
      >
        <MapPin className="w-8 h-8 text-[#246BCE] mb-2" aria-hidden="true" />
        <span className="text-sm font-semibold text-[#174A91]">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export const LandingPage: React.FC = () => {
  const [audience, setAudience] = useState<'compradors' | 'establiments'>('compradors');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactVenue, setContactVenue] = useState('');
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const totalProductsCount = STORE_ORDER.reduce(
    (sum, id) => sum + (CATALOGS[id]?.length || 0),
    0
  );
  const totalZonesCount = STORE_ORDER.reduce(
    (sum, id) => sum + STORES[id].map.zones.length,
    0
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = contactName.trim();
    const trimmedEmail = contactEmail.trim();
    const trimmedVenue = contactVenue.trim();

    if (trimmedName.length < 2) {
      setContactError('Introdueix el teu nom per poder respondre’t.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setContactError('Introdueix una adreça de correu electrònic vàlida.');
      return;
    }
    if (trimmedVenue.length < 4) {
      setContactError('Explica breument quin establiment o consulta vols compartir.');
      return;
    }

    setContactError(null);
    setContactSubmitted(true);
  };

  return (
    <div id="inici" className="min-h-screen bg-[#F8FAFC] text-[#202A36] flex flex-col">
      <LandingHeader />

      <main className="flex-1">
        {/* Hero Split */}
        <section className="bg-white border-b border-[#E3E8F0]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-12 pb-12 lg:pt-16 lg:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="text-xs sm:text-sm font-medium text-[#64748B] mb-4">
                  Navegació interior · Mapes 2D · Rutes per a llistes
                </p>

                <h1
                  className="font-display font-extrabold tracking-tight text-[#202A36] leading-[1.08] text-balance mb-5"
                  style={{ fontSize: 'clamp(2.25rem, 4vw, 3.65rem)' }}
                >
                  Troba cada producte al primer intent dins de qualsevol establiment.
                </h1>

                <p className="text-base sm:text-[17px] text-[#475569] leading-relaxed max-w-xl mb-8">
                  FINDIT et mostra el plànol 2D del local, el passadís, la prestatgeria i
                  l&apos;alçada exacta de cada article. Planifica la teva llista amb recorregut
                  optimitzat i localitza devolucions en segons.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-[15px] font-semibold text-white bg-[#246BCE] hover:bg-[#174A91] rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#174A91]"
                  >
                    <span>Accedir a l&apos;app</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>

                  <a
                    href="#prova-mapa"
                    className="inline-flex items-center gap-1.5 px-4 py-3 text-[15px] font-semibold text-[#202A36] hover:text-[#246BCE] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Provar el mapa en directe</span>
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 flex">
                <div className="w-full rounded-2xl overflow-hidden border border-[#E3E8F0] bg-[#EDF3FB] min-h-[280px] sm:min-h-[360px] lg:min-h-[420px]">
                  <ResilientImage
                    src={heroRetailImg}
                    alt="Client consultant un mapa interior en 2D amb FINDIT dins d'un passadís de supermercat"
                    fallbackLabel="Navegació interior dins de l'establiment"
                    className="w-full h-full lg:h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 4-Column Quantified Strip */}
            <div className="mt-12 pt-8 border-t border-[#E3E8F0] grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#202A36] font-display tabular-nums">
                  {STORE_ORDER.length}
                </div>
                <div className="text-sm font-semibold text-[#202A36] mt-1">
                  Establiments actius
                </div>
                <div className="text-xs text-[#64748B] mt-0.5">
                  Supermercat, moda, biblioteca i esports
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#202A36] font-display tabular-nums">
                  {totalProductsCount}
                </div>
                <div className="text-sm font-semibold text-[#202A36] mt-1">
                  Productes geolocalitzats
                </div>
                <div className="text-xs text-[#64748B] mt-0.5">
                  Amb passadís, moble i prestatge exacte
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#202A36] font-display tabular-nums">
                  {totalZonesCount}
                </div>
                <div className="text-sm font-semibold text-[#202A36] mt-1">
                  Zones mapejades en 2D
                </div>
                <div className="text-xs text-[#64748B] mt-0.5">
                  Càlcul de ruta des de l&apos;entrada
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#202A36] font-display tabular-nums">
                  0
                </div>
                <div className="text-sm font-semibold text-[#202A36] mt-1">
                  Descàrregues necessàries
                </div>
                <div className="text-xs text-[#64748B] mt-0.5">
                  Accés web directe des de qualsevol mòbil
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Capabilities Bento Grid */}
        <section id="com-funciona" className="py-20 lg:py-24 bg-[#F8FAFC]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-semibold text-[#246BCE] mb-2">
                Com funciona l&apos;aplicació
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#202A36] font-display text-balance">
                Tot el que necessites per orientar-te en espais grans
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Feature 01 (col-span-2) */}
              <article className="lg:col-span-2 bg-white rounded-2xl border border-[#E3E8F0] overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch">
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#202A36] font-display mb-3">
                      01. Entrada immediata per QR, cerca o ubicació
                    </h3>
                    <p className="text-[15px] text-[#475569] leading-relaxed">
                      Obre FINDIT en entrar al local i escull el teu establiment en un segon.
                      Pots escanejar el codi QR de la porta, detectar el centre més proper o
                      cercar directament per nom i explorar tot el catàleg per categories.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#F1F5F9] text-xs font-medium text-[#64748B]">
                    Cerca intel·ligent · Sinònims automàtics · Accés sense registre previ
                  </div>
                </div>
                <div className="md:col-span-5 min-h-[220px] bg-[#EDF3FB]">
                  <ResilientImage
                    src={bentoFashionImg}
                    alt="Interior d'una botiga contemporània de moda i calçat esportiu amb expositors organitzats"
                    fallbackLabel="Botigues de moda i esport"
                    className="w-full h-full object-cover"
                  />
                </div>
              </article>

              {/* Feature 02 (col-span-1) */}
              <article className="lg:col-span-1 bg-white rounded-2xl border border-[#E3E8F0] p-6 sm:p-8 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[#202A36] font-display mb-3">
                    02. Precisió fins al prestatge
                  </h3>
                  <p className="text-[15px] text-[#475569] leading-relaxed">
                    Cada fitxa mostra el passadís, la secció, el moble expositor i l&apos;alçada
                    exacta on es troba el producte, juntament amb disponibilitat i variants de
                    talla o color.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#F1F5F9] text-xs font-medium text-[#64748B]">
                  Passadís · Prestatgeria · Nivell exacte
                </div>
              </article>

              {/* Feature 03 (col-span-1) */}
              <article className="lg:col-span-1 bg-white rounded-2xl border border-[#E3E8F0] p-6 sm:p-8 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[#202A36] font-display mb-3">
                    03. Devolucions sense dubtes
                  </h3>
                  <p className="text-[15px] text-[#475569] leading-relaxed">
                    Tens un llibre per tornar a la biblioteca o una peça que no t&apos;emportes?
                    Marca&apos;l a Devolucions i deixa que el mapa et porti de nou al seu lloc
                    original.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#F1F5F9] text-xs font-medium text-[#64748B]">
                  Llista de pendents · Ruta de retorn · Confirmació en 1 toc
                </div>
              </article>

              {/* Feature 04 (col-span-2) */}
              <article className="lg:col-span-2 bg-white rounded-2xl border border-[#E3E8F0] overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch">
                <div className="md:col-span-5 min-h-[220px] bg-[#EDF3FB] order-2 md:order-1">
                  <ResilientImage
                    src={bentoLibraryImg}
                    alt="Biblioteca lluminosa amb prestatgeries ordenades i zones de consulta"
                    fallbackLabel="Biblioteques i grans superfícies"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-4 order-1 md:order-2">
                  <div>
                    <h3 className="text-xl font-bold text-[#202A36] font-display mb-3">
                      04. Llistes intel·ligents i recorregut optimitzat
                    </h3>
                    <p className="text-[15px] text-[#475569] leading-relaxed">
                      Afegeix tots els productes a la llista de l&apos;establiment i inicia el
                      guiatge seqüencial. FINDIT ordena les parades per evitar anar amunt i
                      avall, i et permet desar plantilles per a compres recurrents.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#F1F5F9] text-xs font-medium text-[#64748B]">
                    Ruta multi-parada · Control de progrés · Plantilles guardades
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Live Interactive 2D Store Map Demo */}
        <LandingInteractiveDemo />

        {/* Supported Establishments & Audience Benefits */}
        <section id="establiments" className="py-20 lg:py-24 bg-white border-b border-[#E3E8F0]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold text-[#246BCE] mb-2">
                  Establiments i usos
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#202A36] font-display text-balance">
                  Adaptat a supermercats, moda, esports i biblioteques
                </h2>
              </div>

              <div className="inline-flex items-center p-1 bg-[#F1F5F9] rounded-xl self-start">
                <button
                  type="button"
                  onClick={() => setAudience('compradors')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    audience === 'compradors'
                      ? 'bg-white text-[#202A36] shadow-xs'
                      : 'text-[#64748B] hover:text-[#202A36]'
                  }`}
                >
                  Per a visitants
                </button>
                <button
                  type="button"
                  onClick={() => setAudience('establiments')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    audience === 'establiments'
                      ? 'bg-white text-[#202A36] shadow-xs'
                      : 'text-[#64748B] hover:text-[#202A36]'
                  }`}
                >
                  Per a establiments
                </button>
              </div>
            </div>

            {/* Audience Outcome Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 pb-12 border-b border-[#E3E8F0]">
              {AUDIENCE_BENEFITS[audience].map((item) => (
                <div key={item.num} className="bg-[#F8FAFC] rounded-2xl border border-[#E3E8F0] p-6">
                  <div className="text-xs font-bold text-[#246BCE] tabular-nums mb-2">
                    {item.num}.
                  </div>
                  <h3 className="text-base font-bold text-[#202A36] font-display mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            {/* 4 Real Establishments Directory */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {STORE_ORDER.map((id) => {
                const store = STORES[id];
                const productCount = CATALOGS[id]?.length || 0;
                const zoneCount = store.map.zones.length;
                const catCount = store.categories.length;

                return (
                  <div
                    key={id}
                    className="rounded-2xl border border-[#E3E8F0] bg-white p-6 flex flex-col justify-between gap-5"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-sm text-white shrink-0"
                          style={{ backgroundColor: store.color }}
                        >
                          {store.short}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-[#202A36] font-display truncate">
                            {store.name}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-[#475569] leading-relaxed">{store.desc}</p>
                    </div>

                    <div className="pt-4 border-t border-[#F1F5F9] text-xs font-medium text-[#64748B] tabular-nums">
                      {productCount} productes · {catCount} categories · {zoneCount} zones
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ & Establishment Inquiry Form */}
        <section id="preguntes" className="py-20 lg:py-24 bg-[#F8FAFC]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* FAQ Column */}
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-[#246BCE] mb-2">
                Preguntes freqüents
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#202A36] font-display mb-8 text-balance">
                Tot el que convé saber abans d&apos;entrar a l&apos;app
              </h2>

              <div className="divide-y divide-[#E3E8F0] border-y border-[#E3E8F0]">
                {FAQ_ITEMS.map((item, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="py-4">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between gap-4 text-left py-2 cursor-pointer group"
                      >
                        <span className="text-base font-semibold text-[#202A36] group-hover:text-[#246BCE] transition-colors">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#64748B] shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#246BCE]' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <p className="pt-2 pb-1 text-sm sm:text-[15px] text-[#475569] leading-relaxed">
                          {item.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Validated Contact / Store Integration Form */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E3E8F0] p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#246BCE] mb-2">
                <Building2 className="w-4 h-4" aria-hidden="true" />
                <span>Proposa un establiment</span>
              </div>
              <h3 className="text-xl font-bold text-[#202A36] font-display mb-2">
                Vols veure-hi la teva botiga o biblioteca?
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed mb-6">
                Envia&apos;ns les dades de l&apos;espai i ens posarem en contacte per preparar
                el plànol 2D i el catàleg inicial.
              </p>

              {contactSubmitted ? (
                <div
                  role="status"
                  className="rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] p-5 text-[#166534]"
                >
                  <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
                    <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>Sol·licitud registrada correctament</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-4">
                    Gràcies, {contactName.trim()}. Hem rebut la proposta per a{' '}
                    <strong>{contactVenue.trim()}</strong> i et respondrem a{' '}
                    <strong>{contactEmail.trim()}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactName('');
                      setContactEmail('');
                      setContactVenue('');
                    }}
                    className="text-xs font-semibold underline underline-offset-4 hover:text-[#14532D] cursor-pointer"
                  >
                    Enviar una altra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} noValidate className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#202A36] mb-1.5"
                    >
                      Nom i cognoms
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Ex. Marta Soler"
                      className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#202A36] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#246BCE]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#202A36] mb-1.5"
                    >
                      Correu electrònic
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="marta@establiment.cat"
                      className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#202A36] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#246BCE]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-venue"
                      className="block text-xs font-semibold text-[#202A36] mb-1.5"
                    >
                      Establiment o comentari
                    </label>
                    <textarea
                      id="contact-venue"
                      rows={3}
                      value={contactVenue}
                      onChange={(e) => setContactVenue(e.target.value)}
                      placeholder="Nom de la botiga, ciutat o tipus de catàleg..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#202A36] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#246BCE] resize-none"
                    />
                  </div>

                  {contactError && (
                    <p role="alert" className="text-xs font-semibold text-[#DC2626]">
                      {contactError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#202A36] hover:bg-[#0F172A] text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Enviar sol·licitud
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Final Conversion Callout */}
        <section className="bg-[#0F172A] text-white py-16 lg:py-20">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#93C5FD] mb-3">
                <Compass className="w-4 h-4" aria-hidden="true" />
                <span>Disponible ara al navegador</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display text-balance mb-3">
                Preparat per provar FINDIT en directe?
              </h2>
              <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                Obre l&apos;aplicació web oficial, selecciona un establiment i comença a
                navegar pels passadissos sense pèrdues de temps.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold text-[#0F172A] bg-white hover:bg-[#EAF3FF] rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Accedir a l&apos;app</span>
                <ArrowUpRight className="w-5 h-5 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="bg-white border-t border-[#E3E8F0] py-10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <a
              href="#inici"
              className="text-base font-extrabold tracking-tight text-[#174A91] font-display"
            >
              FINDIT
            </a>
            <p className="text-xs text-[#64748B] mt-1">
              Localització de productes i navegació interior en 2D.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-[#475569]">
            <a href="#com-funciona" className="hover:text-[#174A91] transition-colors">
              Com funciona
            </a>
            <a href="#prova-mapa" className="hover:text-[#174A91] transition-colors">
              Mapa interactiu
            </a>
            <a href="#establiments" className="hover:text-[#174A91] transition-colors">
              Establiments
            </a>
            <a href="#preguntes" className="hover:text-[#174A91] transition-colors">
              Preguntes
            </a>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#246BCE] hover:text-[#174A91] transition-colors inline-flex items-center gap-1"
            >
              <span>Obrir l&apos;app</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          <p className="text-xs text-[#94A3B8]">
            © {new Date().getFullYear()} FINDIT. Tots els drets reservats.
          </p>
        </div>
      </footer>
    </div>
  );
};
