import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Eye,
  HelpCircle,
  History,
  Info,
  LogOut,
  QrCode,
  RotateCcw,
  Settings,
  Trash2,
  Type,
} from 'lucide-react';
import { CATALOGS, STORES } from '../data/stores';
import {
  ListTemplate,
  NavTab,
  ReturnItem,
  StoreId,
  UserPreferences,
  ViewState,
} from '../types';
import { TopBar } from './NavigationShell';
import { ProductArt } from './ProductArt';

interface ReturnsHomeViewProps {
  returns: ReturnItem[];
  activeStoreId: StoreId | null;
  onInspectReturn: (storeId: StoreId, productId: string, returnId: string) => void;
  onChangeStore: () => void;
}

export const ReturnsHomeView: React.FC<ReturnsHomeViewProps> = ({
  returns,
  activeStoreId,
  onInspectReturn,
  onChangeStore,
}) => {
  const pending = returns.filter((r) => r.status === 'pending');

  return (
    <>
      <TopBar
        title="Devolucions"
        subtitle="Retorna productes a la seva ubicació original"
        showBack={false}
        onBack={() => {}}
        activeStoreId={activeStoreId}
        onChangeStore={onChangeStore}
      />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:px-8 lg:py-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#EAF3FF] border border-[#BFDBFE] rounded-[18px] p-4 mb-5">
            <p className="text-[13px] font-bold text-[#174A91] leading-relaxed">
              Cada producte s&apos;ha de retornar a la seva prestatgeria o expositor original dins
              de l&apos;establiment.
            </p>
          </div>

          <h2 className="text-xs font-bold tracking-wider uppercase text-[#737B87] mb-3 tabular-nums">
            Productes pendents de retornar ({pending.length})
          </h2>

          {pending.length === 0 ? (
            <div className="text-center p-7 bg-white rounded-[18px] border border-dashed border-[#CBD5E1] text-[#737B87] text-sm leading-relaxed">
              No tens cap producte pendent de retornar!
              <br />
              Pots marcar qualsevol producte per retornar des de la seva fitxa.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pending.map((r) => {
                const store = STORES[r.storeId];
                const p = CATALOGS[r.storeId].find((x) => x.id === r.productId);
                if (!p) return null;

                return (
                  <div
                    key={r.id}
                    className="bg-white rounded-[18px] p-4 border border-[#E3E8F0] shadow-sm flex flex-col justify-between gap-3"
                  >
                    <div className="flex gap-3 items-center">
                      <ProductArt storeId={r.storeId} product={p} size="md" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold mb-0.5 flex-wrap">
                          <span style={{ color: store.color }}>{store.name}</span>
                          <span className="text-[#CBD5E1]" aria-hidden="true">·</span>
                          <span className="text-[#D97706]">Pendent de retornar</span>
                        </div>
                        <div className="text-[15px] font-extrabold text-[#202A36] leading-snug">
                          {p.name}
                        </div>
                        <div className="text-xs text-[#737B87] mt-1">
                          Ubicació original:{' '}
                          <strong className="text-[#174A91]">
                            {p.aisle} · {p.shelf} · {p.level}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onInspectReturn(r.storeId, p.id, r.id)}
                      className="w-full min-h-[44px] px-4 py-2.5 rounded-[12px] bg-[#246BCE] hover:bg-[#174A91] text-white text-[13px] font-bold shadow-sm active:scale-[0.98] transition cursor-pointer"
                    >
                      Consultar producte i ubicació
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

function getInitials(name: string): string {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'UD';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

interface ToggleSwitchProps {
  checked: boolean;
  onToggle: () => void;
  label: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onToggle, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={onToggle}
    className={`relative inline-flex h-[32px] w-[54px] shrink-0 items-center rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#246BCE] ${
      checked ? 'bg-[#1D63C9]' : 'bg-[#8A94A3]'
    }`}
  >
    <span
      className={`inline-block h-[24px] w-[24px] rounded-full bg-white shadow-sm transition-transform duration-200 ${
        checked ? 'translate-x-[26px]' : 'translate-x-[4px]'
      }`}
    />
  </button>
);

interface ProfileViewProps {
  activeStoreId: StoreId | null;
  recentStores: StoreId[];
  userName: string;
  preferences: UserPreferences;
  returns: ReturnItem[];
  templates: ListTemplate[];
  stats: { listsCompleted: number; returnsCompleted: number };
  onUserNameChange: (name: string) => void;
  onTogglePreference: (key: keyof UserPreferences) => void;
  onPushView: (view: ViewState) => void;
  onExitStore: () => void;
  onSwitchTab: (tab: NavTab) => void;
  onConfirmClearHistory: () => void;
  onConfirmResetDemoData: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  activeStoreId,
  recentStores,
  userName,
  preferences,
  returns,
  templates,
  stats,
  onUserNameChange,
  onTogglePreference,
  onPushView,
  onExitStore,
  onSwitchTab,
  onConfirmClearHistory,
  onConfirmResetDemoData,
}) => {
  const store = activeStoreId ? STORES[activeStoreId] : null;
  const pendingReturns = returns.filter((r) => r.status === 'pending').length;
  const initials = getInitials(userName);

  return (
    <main className="flex-1 overflow-y-auto pb-24 lg:pb-10 bg-[#F5F9FF]">
      {/* Blue Header Banner matching screenshot 1 */}
      <div className="bg-gradient-to-b from-[#1D63C9] to-[#1755B3] px-4 pt-5 pb-12 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-extrabold text-white tracking-tight font-display">
            Perfil
          </h1>
        </div>
      </div>

      {/* Overlapping User Card + Profile Sections */}
      <div className="px-4 lg:px-8 -mt-8">
        <div className="max-w-2xl mx-auto flex flex-col gap-5">
          {/* User Identity Card */}
          <section className="bg-white rounded-[22px] p-4 sm:p-5 border border-[#E3E8F0] shadow-sm flex items-center gap-4">
            <div
              className="w-[62px] h-[62px] rounded-full bg-[#1D63C9] text-white flex items-center justify-center text-xl font-extrabold shrink-0 tracking-tight select-none"
              aria-hidden="true"
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <label
                htmlFor="demo-username"
                className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5"
              >
                Nom d&apos;usuari de demostració
              </label>
              <input
                id="demo-username"
                type="text"
                value={userName}
                onChange={(e) => onUserNameChange(e.target.value)}
                placeholder="Usuari Demo"
                maxLength={32}
                className="w-full h-11 rounded-[12px] border border-[#CBD5E1] bg-[#F8FAFC] px-3.5 text-[15px] font-semibold text-[#202A36] outline-none focus:border-[#1D63C9] focus:bg-white transition-colors"
              />
            </div>
          </section>

          {/* Preferències */}
          <section aria-labelledby="pref-heading">
            <h2
              id="pref-heading"
              className="text-base font-extrabold text-[#202A36] mb-2.5 font-display"
            >
              Preferències
            </h2>
            <div className="bg-white rounded-[20px] border border-[#E3E8F0] shadow-sm divide-y divide-[#EEF2F6]">
              <div className="p-4 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-[14px] bg-[#EAF3FF] text-[#1D63C9] flex items-center justify-center shrink-0">
                  <Type className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-bold text-[#202A36]">Text més gran</div>
                  <div className="text-xs text-[#64748B] leading-snug">
                    Augmenta la mida dels textos
                  </div>
                </div>
                <ToggleSwitch
                  checked={preferences.largeText}
                  onToggle={() => onTogglePreference('largeText')}
                  label="Text més gran"
                />
              </div>

              <div className="p-4 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-[14px] bg-[#EAF3FF] text-[#1D63C9] flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-bold text-[#202A36]">Mostrar preus</div>
                  <div className="text-xs text-[#64748B] leading-snug">
                    Preus de demostració als productes
                  </div>
                </div>
                <ToggleSwitch
                  checked={preferences.showPrices}
                  onToggle={() => onTogglePreference('showPrices')}
                  label="Mostrar preus"
                />
              </div>
            </div>
          </section>

          {/* El meu compte */}
          <section aria-labelledby="account-heading">
            <h2
              id="account-heading"
              className="text-base font-extrabold text-[#202A36] mb-2.5 font-display"
            >
              El meu compte
            </h2>
            <div className="bg-white rounded-[20px] border border-[#E3E8F0] shadow-sm divide-y divide-[#EEF2F6] overflow-hidden">
              <button
                type="button"
                onClick={() => onPushView({ type: 'profileHistory' })}
                className="w-full p-4 flex items-center gap-3.5 text-left hover:bg-[#F8FAFC] active:bg-[#F1F5F9] transition-colors cursor-pointer min-h-[68px]"
              >
                <div className="w-11 h-11 rounded-[14px] bg-[#EAF3FF] text-[#1D63C9] flex items-center justify-center shrink-0">
                  <History className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-bold text-[#202A36]">
                    Historial d&apos;establiments
                  </div>
                  <div className="text-xs text-[#64748B] tabular-nums">
                    {recentStores.length}{' '}
                    {recentStores.length === 1 ? 'establiment visitat' : 'establiments visitats'}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#1D63C9] shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => onPushView({ type: 'profileHelp' })}
                className="w-full p-4 flex items-center gap-3.5 text-left hover:bg-[#F8FAFC] active:bg-[#F1F5F9] transition-colors cursor-pointer min-h-[68px]"
              >
                <div className="w-11 h-11 rounded-[14px] bg-[#EAF3FF] text-[#1D63C9] flex items-center justify-center shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-bold text-[#202A36]">Ajuda</div>
                  <div className="text-xs text-[#64748B]">Com funciona FINDIT</div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#1D63C9] shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => onPushView({ type: 'profileInfo' })}
                className="w-full p-4 flex items-center gap-3.5 text-left hover:bg-[#F8FAFC] active:bg-[#F1F5F9] transition-colors cursor-pointer min-h-[68px]"
              >
                <div className="w-11 h-11 rounded-[14px] bg-[#EAF3FF] text-[#1D63C9] flex items-center justify-center shrink-0">
                  <Info className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-bold text-[#202A36]">Informació de FINDIT</div>
                  <div className="text-xs text-[#64748B]">
                    Versió, dades de demostració i codis QR
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#1D63C9] shrink-0" />
              </button>
            </div>
          </section>

          {/* Activitat i establiment actiu */}
          <section aria-labelledby="activity-heading">
            <h2
              id="activity-heading"
              className="text-base font-extrabold text-[#202A36] mb-2.5 font-display"
            >
              Activitat i establiment
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-white rounded-[18px] p-4 border border-[#E3E8F0] shadow-sm text-center">
                <div className="text-2xl font-extrabold text-[#1D63C9] tabular-nums">
                  {stats.listsCompleted}
                </div>
                <div className="text-xs text-[#64748B] font-semibold mt-0.5">
                  Llistes completades
                </div>
              </div>
              <div className="bg-white rounded-[18px] p-4 border border-[#E3E8F0] shadow-sm text-center">
                <div className="text-2xl font-extrabold text-[#16A34A] tabular-nums">
                  {stats.returnsCompleted}
                </div>
                <div className="text-xs text-[#64748B] font-semibold mt-0.5">
                  Devolucions fetes
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-4 border border-[#E3E8F0] shadow-sm flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-bold text-[#202A36]">Establiment actiu</div>
                <div className="text-xs text-[#64748B] truncate">
                  {store
                    ? `Dins de ${store.name}`
                    : 'No hi ha cap establiment seleccionat'}
                </div>
              </div>
              {store ? (
                <button
                  type="button"
                  onClick={onExitStore}
                  className="min-h-[42px] px-3.5 py-2 rounded-[12px] bg-[#EAF3FF] hover:bg-[#DCEBFF] text-[#174A91] text-xs font-bold inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sortir</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onSwitchTab('inici')}
                  className="min-h-[42px] px-3.5 py-2 rounded-[12px] bg-[#1D63C9] hover:bg-[#174A91] text-white text-xs font-bold shrink-0 cursor-pointer"
                >
                  Seleccionar
                </button>
              )}
            </div>
          </section>

          {/* Configuració */}
          <section aria-labelledby="config-heading">
            <h2
              id="config-heading"
              className="text-base font-extrabold text-[#202A36] mb-2.5 font-display flex items-center gap-2"
            >
              <Settings className="w-4 h-4 text-[#202A36]" />
              <span>Configuració</span>
            </h2>
            <div className="bg-white rounded-[20px] p-4 border border-[#E3E8F0] shadow-sm flex flex-col gap-2.5">
              <button
                type="button"
                onClick={onConfirmClearHistory}
                disabled={recentStores.length === 0}
                className="w-full min-h-[48px] px-4 py-2.5 rounded-[14px] bg-[#EAF3FF] hover:bg-[#DCEBFF] disabled:opacity-50 disabled:cursor-not-allowed text-[#174A91] text-sm font-bold inline-flex items-center justify-center gap-2.5 active:scale-[0.985] transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4 shrink-0" />
                <span>Esborrar l&apos;historial d&apos;establiments</span>
              </button>

              <div className="pt-1 flex items-center justify-between text-xs text-[#64748B] px-1 tabular-nums">
                <span>
                  Devolucions pendents: {pendingReturns} · Plantilles: {templates.length}
                </span>
              </div>

              <button
                type="button"
                onClick={onConfirmResetDemoData}
                className="w-full min-h-[44px] px-4 py-2 rounded-[12px] bg-white border-[1.5px] border-[#FECACA] text-[#DC2626] hover:bg-[#FEF2F2] text-xs font-bold inline-flex items-center justify-center gap-2 active:scale-[0.985] transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablir totes les dades de demostració</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

interface ProfileHistoryViewProps {
  recentStores: StoreId[];
  activeStoreId: StoreId | null;
  onBack: () => void;
  onEnterStore: (storeId: StoreId) => void;
  onConfirmClearHistory: () => void;
  onChangeStore: () => void;
}

export const ProfileHistoryView: React.FC<ProfileHistoryViewProps> = ({
  recentStores,
  activeStoreId,
  onBack,
  onEnterStore,
  onConfirmClearHistory,
  onChangeStore,
}) => {
  return (
    <>
      <TopBar
        title="Historial d'establiments"
        subtitle={`${recentStores.length} establiments visitats`}
        onBack={onBack}
        activeStoreId={activeStoreId}
        onChangeStore={onChangeStore}
      />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:px-8 lg:py-6">
        <div className="max-w-2xl mx-auto">
          {recentStores.length === 0 ? (
            <div className="text-center p-7 bg-white rounded-[18px] border border-dashed border-[#CBD5E1] text-[#737B87] text-sm leading-relaxed">
              Encara no has visitat cap establiment o l&apos;historial s&apos;ha esborrat.
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2.5 mb-4">
                {recentStores.map((id, idx) => {
                  const s = STORES[id];
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => onEnterStore(s.id)}
                      className="w-full bg-white rounded-[16px] p-4 border border-[#E3E8F0] shadow-sm flex items-center gap-3.5 text-left hover:border-[#246BCE]/45 active:scale-[0.985] transition cursor-pointer"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-base text-white shrink-0"
                        style={{ backgroundColor: s.color }}
                      >
                        {s.short}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[15px] font-bold text-[#202A36] truncate">
                          {s.name}
                        </div>
                        <div className="text-xs text-[#737B87] truncate">
                          {idx === 0 ? 'Última visita recent' : `Visita #${idx + 1}`} · {s.desc}
                        </div>
                      </div>
                      <span className="px-3 py-1.5 rounded-lg bg-[#EAF3FF] text-[#174A91] text-xs font-bold shrink-0">
                        Entrar
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={onConfirmClearHistory}
                className="w-full min-h-[46px] px-4 py-2.5 rounded-[14px] bg-[#EAF3FF] hover:bg-[#DCEBFF] text-[#174A91] text-sm font-bold inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Esborrar l&apos;historial d&apos;establiments</span>
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
};

interface ProfileHelpViewProps {
  activeStoreId: StoreId | null;
  onBack: () => void;
  onChangeStore: () => void;
}

const FAQ_ITEMS = [
  {
    q: 'Com busco un producte?',
    a: "Primer selecciona l'establiment des d'Inici (cercant-lo, escanejant el codi QR o detectant-lo per ubicació). A la pestanya Cerca, escriu el nom del producte, la marca o una categoria (fins i tot només les primeres lletres, com «Lle» o «Sab») i toca el resultat per veure'n la ubicació exacta, les indicacions pas a pas o el mapa 2D.",
  },
  {
    q: 'Necessito crear una llista per trobar un producte?',
    a: "No! Pots cercar qualsevol producte individual directament des de la pestanya Cerca i obrir «Com arribar-hi» o «Veure mapa» a l'instant. Les llistes són opcionals i pensades per quan vols recollir diversos articles en una mateixa visita.",
  },
  {
    q: 'Com funcionen les llistes?',
    a: "Cada establiment té la seva pròpia llista. Quan hi afegeixes productes, FINDIT els ordena automàticament pel camí més curt pels passadissos des de l'entrada. En prémer «Començar recorregut», l'app et guia producte a producte i avança automàticament quan marques «Producte trobat».",
  },
  {
    q: 'Puc ometre un producte durant el recorregut?',
    a: "Sí. Durant el recorregut guiat tens el botó «Ometre per ara», que passa al següent producte de la ruta i deixa l'article omès per al final sense perdre el progrés. També pots pausar el recorregut en qualsevol moment i reprendre'l més tard.",
  },
  {
    q: 'Com retorno un producte al seu lloc?',
    a: "Obre la pestanya Devolucions per veure els productes pendents de retornar (o marca'n un des de la seva fitxa de producte). Entra al producte per veure la seva ubicació original i utilitza «Com arribar-hi» o «Veure mapa» fins a deixar-lo a lloc i prémer «PRODUCTE RETORNAT».",
  },
];

export const ProfileHelpView: React.FC<ProfileHelpViewProps> = ({
  activeStoreId,
  onBack,
  onChangeStore,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <TopBar
        title="Ajuda"
        subtitle="Preguntes freqüents"
        onBack={onBack}
        activeStoreId={activeStoreId}
        onChangeStore={onChangeStore}
      />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:px-8 lg:py-6 bg-[#F5F9FF]">
        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.q}
                className="bg-white rounded-[20px] border border-[#E3E8F0] shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left hover:bg-[#F8FAFC] transition-colors cursor-pointer min-h-[64px]"
                >
                  <span className="text-[16px] font-bold text-[#202A36] leading-snug">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#1D63C9] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-0.5 text-sm text-[#475569] leading-relaxed border-t border-[#F1F5F9]">
                    <p className="pt-3">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

interface ProfileInfoViewProps {
  activeStoreId: StoreId | null;
  onBack: () => void;
  onEnterStore: (storeId: StoreId) => void;
  onChangeStore: () => void;
}

export const ProfileInfoView: React.FC<ProfileInfoViewProps> = ({
  activeStoreId,
  onBack,
  onEnterStore,
  onChangeStore,
}) => {
  return (
    <>
      <TopBar
        title="Informació de FINDIT"
        subtitle="Versió, dades de demostració i codis QR"
        onBack={onBack}
        activeStoreId={activeStoreId}
        onChangeStore={onChangeStore}
      />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:px-8 lg:py-6 bg-[#F5F9FF]">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          <div className="bg-white rounded-[20px] p-5 border border-[#E3E8F0] shadow-sm">
            <div className="text-lg font-extrabold text-[#174A91] font-display mb-1">
              FINDIT — Guia intel·ligent d&apos;interiors
            </div>
            <div className="text-xs font-semibold text-[#64748B] mb-3">
              Versió de demostració 1.0 · Dades guardades localment
            </div>
            <p className="text-sm text-[#475569] leading-relaxed">
              FINDIT calcula rutes reals sobre el plànol de cada establiment evitant prestatgeries
              i obstacles, optimitza automàticament les llistes de compra i facilita el retorn de
              productes a la seva ubicació original.
            </p>
          </div>

          <div className="bg-white rounded-[20px] p-5 border border-[#E3E8F0] shadow-sm">
            <div className="flex items-center gap-2 text-sm font-extrabold text-[#202A36] mb-3">
              <QrCode className="w-4 h-4 text-[#1D63C9]" />
              <span>Establiments i codis QR de demostració</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {Object.values(STORES).map((s) => (
                <div
                  key={s.id}
                  className="p-3 rounded-[14px] bg-[#F8FAFC] border border-[#E3E8F0] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm text-white shrink-0"
                      style={{ backgroundColor: s.color }}
                    >
                      {s.short}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-[#202A36] truncate">{s.name}</div>
                      <div className="text-xs text-[#64748B] tabular-nums">
                        Codi QR: FINDIT-{s.id.toUpperCase()} · {CATALOGS[s.id].length} productes
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onEnterStore(s.id)}
                    className="px-3 py-2 rounded-lg bg-[#EAF3FF] hover:bg-[#DCEBFF] text-[#174A91] text-xs font-bold shrink-0 cursor-pointer"
                  >
                    Obrir
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
