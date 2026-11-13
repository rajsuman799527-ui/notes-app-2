import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { haptic } from '../lib/session';
import { useIsTablet } from '../lib/useLayout';

type Tab = { key: string; label: string; icon: LucideIcon; dot?: boolean };

export default function GlassNav({
  tabs, active, onChange, layoutId,
}: { tabs: Tab[]; active: string; onChange: (k: string) => void; layoutId: string }) {
  const tablet = useIsTablet();
  return (
    <nav
      className={`glass fixed z-30 flex p-1.5 ${tablet ? 'top-1/2 w-[72px] -translate-y-1/2 flex-col gap-1 rounded-[28px]' : 'h-16 items-center rounded-full'}`}
      style={
        tablet
          ? { left: 'max(16px, calc(50% - 624px))' }
          : { bottom: 'calc(16px + env(safe-area-inset-bottom))', left: 'max(20px, calc(50% - 195px))', right: 'max(92px, calc(50% - 195px + 72px))' }
      }
    >
      {tabs.map((t) => {
        const on = t.key === active;
        const Icon = t.icon;
        return (
          <button
            key={t.key}
            onClick={() => { haptic(); onChange(t.key); }}
            className={`press relative flex items-center justify-center rounded-full text-[13px] font-semibold ${tablet ? 'h-[64px] w-full flex-col !rounded-[22px]' : 'h-full flex-1 gap-1.5'}`}
          >
            {on && (
              <motion.span layoutId={layoutId} className={`absolute inset-0 bg-primary shadow-[0_6px_18px_rgba(30,107,255,0.35)] ${tablet ? 'rounded-[22px]' : 'rounded-full'}`}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }} />
            )}
            <span className={`relative flex items-center ${tablet ? 'flex-col gap-1' : 'gap-1.5'} ${on ? 'text-white' : 'text-muted-foreground'}`}>
              <Icon className="h-[20px] w-[20px]" strokeWidth={1.75} />
              {(on || tablet) && <span className={tablet ? 'text-[10.5px]' : ''}>{t.label}</span>}
              {t.dot && <span className="absolute -right-1.5 -top-1 h-2 w-2 rounded-full bg-primary ring-2 ring-white" />}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export function Fab({ onClick, icon: Icon, label }: { onClick: () => void; icon: LucideIcon; label: string }) {
  const tablet = useIsTablet();
  return (
    <button
      aria-label={label}
      onClick={() => { haptic(); onClick(); }}
      className="press fixed z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_30px_rgba(30,107,255,0.45)]"
      style={{
        bottom: tablet ? 'calc(28px + env(safe-area-inset-bottom))' : 'calc(20px + env(safe-area-inset-bottom))',
        right: tablet ? 'max(28px, calc(50% - 612px))' : 'max(20px, calc(50% - 195px))',
      }}
    >
      <Icon className="h-6 w-6" strokeWidth={2} />
    </button>
  );
}
