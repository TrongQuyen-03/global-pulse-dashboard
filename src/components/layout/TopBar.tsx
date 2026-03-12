import { Search, Bell, Activity } from 'lucide-react';
import { useDashboardStore } from '@/lib/store';
import { useEffect, useState } from 'react';

export function TopBar() {
  const markets = useDashboardStore((s) => s.markets);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="h-14 glass-strong border-b border-border/50 flex items-center px-4 gap-4 sticky top-0 z-20">
      {/* Ticker */}
      <div className="flex-1 overflow-hidden">
        <div className="flex gap-6 ticker-scroll whitespace-nowrap">
          {[...markets, ...markets].map((m, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-xs font-mono">
              <span className="text-muted-foreground">{m.symbol}</span>
              <span className="text-foreground">${m.price.toLocaleString()}</span>
              <span className={m.change >= 0 ? 'text-accent' : 'text-destructive'}>
                {m.change >= 0 ? '+' : ''}{m.changePercent.toFixed(2)}%
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <Activity className="w-3 h-3 text-accent animate-pulse" />
          <span>LIVE</span>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          {time.toLocaleTimeString('en-US', { hour12: false })} UTC
        </span>
        <button className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors">
          <Search className="w-4 h-4 text-muted-foreground" />
        </button>
        <button className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors relative">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-background" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-xs font-bold text-primary-foreground">
          A
        </div>
      </div>
    </header>
  );
}
