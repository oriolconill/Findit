import React from 'react';
import {
  ChevronLeft,
  Home,
  ListChecks,
  MapPin,
  RotateCcw,
  Search,
  User,
} from 'lucide-react';
import { STORES } from '../data/stores';
import { NavTab, StoreId } from '../types';

interface TopBarProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack: () => void;
  activeStoreId: StoreId | null;
  onChangeStore: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  title,
  subtitle,
  showBack = true,
  onBack,
  activeStoreId,
  onChangeStore,
}) => {
  const store = activeStoreId ? STORES[activeStoreId] : null;

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-[#E3E8F0] px-4 py-2.5 flex items-center gap-2.5 sticky top-0 z-20 shrink-0 min-h-[54px]">
      {showBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Enrere"
          className="w-10 h-10 rounded-xl border border-[#E3E8F0] bg-white text-[#202A36] flex items-center justify-center shrink-0 hover:bg-[#F1F3F6] active:scale-95 transition cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-bold text-[#202A36] truncate font-display">{title}</div>
        {subtitle && (
          <div className="text-xs text-[#737B87] truncate">{subtitle}</div>
        )}
      </div>
      {store && (
        <button
          type="button"
          onClick={onChangeStore}
          title="Canviar d'establiment"
          className="inline-flex items-center gap-2 bg-[#EAF3FF] hover:bg-[#DCEBFF] text-[#174A91] px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 whitespace-nowrap transition cursor-pointer"
        >
          <span
            className="w-2.5 h-2.5 rounded-sm shrink-0"
            style={{ backgroundColor: store.color }}
          />
          <span>{store.name}</span>
        </button>
      )}
    </header>
  );
};

interface NavShellProps {
  activeTab: NavTab;
  pendingReturnsCount: number;
  activeStoreId: StoreId | null;
  onSwitchTab: (tab: NavTab) => void;
}

const TABS: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'inici', label: 'Inici', icon: Home },
  { id: 'cerca', label: 'Cerca', icon: Search },
  { id: 'llistes', label: 'Llistes', icon: ListChecks },
  { id: 'devolucions', label: 'Devolucions', icon: RotateCcw },
  { id: 'perfil', label: 'Perfil', icon: User },
];

export const BottomNav: React.FC<NavShellProps> = ({
  activeTab,
  pendingReturnsCount,
  onSwitchTab,
}) => {
  return (
    <nav
      aria-label="Navegació principal"
      className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-[#E3E8F0] grid grid-cols-5 items-center px-1 z-30 shadow-[0_-4px_16px_rgba(23,74,145,0.06)]"
    >
      {TABS.map((t) => {
        const Icon = t.icon;
        const isActive = activeTab === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onSwitchTab(t.id)}
            className={`relative flex flex-col items-center justify-center gap-1 min-h-[48px] px-1 text-[11px] font-semibold transition-colors cursor-pointer ${
              isActive ? 'text-[#246BCE]' : 'text-[#737B87] hover:text-[#202A36]'
            }`}
          >
            {isActive && (
              <span className="absolute top-0 w-7 h-[3px] bg-[#246BCE] rounded-b-full" />
            )}
            {t.id === 'devolucions' && pendingReturnsCount > 0 && (
              <span className="absolute top-1 right-3.5 bg-[#DC2626] text-white text-[10px] font-bold min-w-[17px] h-[17px] rounded-full flex items-center justify-center px-1 tabular-nums">
                {pendingReturnsCount}
              </span>
            )}
            <Icon className="w-[21px] h-[21px]" />
            <span className="whitespace-nowrap">{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export const DesktopSidebar: React.FC<NavShellProps> = ({
  activeTab,
  pendingReturnsCount,
  activeStoreId,
  onSwitchTab,
}) => {
  const store = activeStoreId ? STORES[activeStoreId] : null;

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-[#E3E8F0] p-5 justify-between">
      <div>
        <div className="flex items-center gap-3 mb-7">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#246BCE] to-[#174A91] flex items-center justify-center text-white shadow-sm">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-[#174A91] font-display">
            FINDIT
          </span>
        </div>

        <nav className="flex flex-col gap-1.5" aria-label="Menú lateral">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSwitchTab(t.id)}
                className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#EAF3FF] text-[#174A91]'
                    : 'text-[#737B87] hover:bg-[#F5F9FF] hover:text-[#202A36]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="w-[18px] h-[18px]" />
                  <span>{t.label}</span>
                </span>
                {t.id === 'devolucions' && pendingReturnsCount > 0 && (
                  <span className="bg-[#DC2626] text-white text-[11px] font-bold min-w-[20px] h-5 rounded-full flex items-center justify-center px-1.5 tabular-nums">
                    {pendingReturnsCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-[#E3E8F0]">
        {store ? (
          <button
            type="button"
            onClick={() => onSwitchTab('inici')}
            className="w-full text-left p-3 rounded-xl bg-[#F5F9FF] hover:bg-[#EAF3FF] transition-colors cursor-pointer"
          >
            <div className="text-[11px] font-semibold text-[#737B87] mb-1">
              Establiment actiu
            </div>
            <div className="flex items-center gap-2.5">
              <span
                className="w-7 h-7 rounded-lg text-white text-xs font-extrabold flex items-center justify-center shrink-0"
                style={{ backgroundColor: store.color }}
              >
                {store.short}
              </span>
              <div className="min-w-0">
                <div className="text-sm font-bold text-[#202A36] truncate">{store.name}</div>
                <div className="text-[11px] text-[#246BCE] font-medium">Canviar establiment</div>
              </div>
            </div>
          </button>
        ) : (
          <div className="p-3 rounded-xl bg-[#F5F9FF] text-xs text-[#737B87]">
            Cap establiment actiu. Selecciona&apos;n un des d&apos;Inici.
          </div>
        )}
      </div>
    </aside>
  );
};
