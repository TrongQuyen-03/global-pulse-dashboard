import { motion } from 'framer-motion';
import { useDashboardStore } from '@/lib/store';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

const severityStyles: Record<string, string> = {
  critical: 'border-l-destructive bg-destructive/5',
  high: 'border-l-warning bg-warning/5',
  medium: 'border-l-primary bg-primary/5',
  low: 'border-l-accent bg-accent/5',
};

const categoryIcon: Record<string, string> = {
  conflict: '⚔️',
  economy: '📊',
  disaster: '🌊',
  health: '🏥',
  politics: '🏛️',
};

export function EventsFeed() {
  const events = useDashboardStore((s) => s.events);

  return (
    <div className="space-y-2">
      {events.slice(0, 6).map((event, i) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className={`p-3 rounded-lg border-l-2 ${severityStyles[event.severity]} cursor-pointer hover:bg-secondary/30 transition-colors`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-xs">{categoryIcon[event.category]}</span>
                <span className="text-xs font-semibold text-foreground truncate">{event.title}</span>
              </div>
              <p className="text-[11px] text-muted-foreground line-clamp-1">{event.summary}</p>
            </div>
            {event.severity === 'critical' && (
              <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
            )}
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[10px] text-muted-foreground">{event.location}</span>
            <span className="text-[10px] text-muted-foreground">•</span>
            <span className="text-[10px] text-muted-foreground">
              {new Date(event.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function MarketTicker() {
  const markets = useDashboardStore((s) => s.markets);

  return (
    <div className="grid grid-cols-2 gap-2">
      {markets.slice(0, 6).map((m, i) => (
        <motion.div
          key={m.symbol}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="p-3 rounded-lg glass hover:bg-secondary/30 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-muted-foreground">{m.symbol}</span>
            {m.change >= 0 ? (
              <TrendingUp className="w-3 h-3 text-accent" />
            ) : (
              <TrendingDown className="w-3 h-3 text-destructive" />
            )}
          </div>
          <div className="text-sm font-bold font-mono text-foreground">
            ${m.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className={`text-[11px] font-mono ${m.change >= 0 ? 'text-accent' : 'text-destructive'}`}>
            {m.change >= 0 ? '+' : ''}{m.changePercent.toFixed(2)}%
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function ConflictAlerts() {
  const conflicts = useDashboardStore((s) => s.conflicts);

  return (
    <div className="space-y-2">
      {conflicts.slice(0, 4).map((c, i) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className="p-3 rounded-lg glass hover:bg-secondary/30 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full ${c.intensity === 'high' ? 'bg-destructive animate-pulse-dot' : c.intensity === 'medium' ? 'bg-warning' : 'bg-accent'}`} />
            <span className="text-xs font-semibold text-foreground">{c.name}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span>{c.region}</span>
            <span>•</span>
            <span>{c.status}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function DisasterAlerts() {
  const disasters = useDashboardStore((s) => s.disasters);
  const typeIcon: Record<string, string> = { earthquake: '🌍', hurricane: '🌀', wildfire: '🔥', flood: '🌊', tsunami: '🌊' };

  return (
    <div className="space-y-2">
      {disasters.slice(0, 4).map((d, i) => (
        <motion.div
          key={d.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className="p-3 rounded-lg glass hover:bg-secondary/30 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs">{typeIcon[d.type]}</span>
            <span className="text-xs font-semibold text-foreground capitalize">{d.type}</span>
            {d.magnitude && <span className="text-[10px] font-mono text-warning">M{d.magnitude}</span>}
          </div>
          <div className="text-[11px] text-muted-foreground">{d.location}</div>
          <div className="text-[10px] text-muted-foreground mt-1">{d.affected}</div>
        </motion.div>
      ))}
    </div>
  );
}

export function AIInsights() {
  const insights = [
    { title: 'Global Risk Index', value: 'ELEVATED', color: 'text-warning', detail: 'Multiple active conflicts and natural disasters contributing to elevated global risk levels.' },
    { title: 'Market Sentiment', value: 'CAUTIOUS', color: 'text-primary', detail: 'Mixed signals from central banks. Crypto showing strength while energy markets remain volatile.' },
    { title: 'Top Trend', value: 'Energy Crisis', color: 'text-destructive', detail: 'EU energy security measures dominating policy discussions. Impact on global supply chains expected.' },
  ];

  return (
    <div className="space-y-3">
      {insights.map((insight, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="p-3 rounded-lg glass"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-muted-foreground">{insight.title}</span>
            <span className={`text-xs font-bold font-mono ${insight.color}`}>{insight.value}</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">{insight.detail}</p>
        </motion.div>
      ))}
    </div>
  );
}
