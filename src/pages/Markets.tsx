import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDashboardStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';

function generateHistory(base: number, points: number = 24) {
  const data = [];
  let val = base;
  for (let i = 0; i < points; i++) {
    val += (Math.random() - 0.48) * base * 0.005;
    data.push({ time: `${i}h`, value: +val.toFixed(2) });
  }
  return data;
}

export default function Markets() {
  const markets = useDashboardStore((s) => s.markets);
  const updateMarkets = useDashboardStore((s) => s.updateMarkets);
  const { t } = useI18n();
  const [selectedMarket, setSelectedMarket] = useState(markets[0]?.symbol || 'BTC');

  useEffect(() => {
    const interval = setInterval(updateMarkets, 2000);
    return () => clearInterval(interval);
  }, [updateMarkets]);

  const selected = markets.find((m) => m.symbol === selectedMarket) || markets[0];
  const history = generateHistory(selected.price);

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">{t('markets.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('markets.subtitle')}</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {markets.map((m, i) => (
          <motion.div
            key={m.symbol}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => setSelectedMarket(m.symbol)}
            className={`glass rounded-xl p-4 cursor-pointer transition-all ${
              selectedMarket === m.symbol ? 'ring-1 ring-primary glow-primary' : 'hover:bg-secondary/30'
            }`}
          >
            <div className="text-[11px] text-muted-foreground mb-0.5">{m.name}</div>
            <div className="text-lg font-bold font-mono text-foreground">
              ${m.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={`flex items-center gap-1 text-xs font-mono ${m.change >= 0 ? 'text-accent' : 'text-destructive'}`}>
              {m.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {m.change >= 0 ? '+' : ''}{m.changePercent.toFixed(2)}%
            </div>
          </motion.div>
        ))}
      </div>

      <WidgetCard title={`${selected.name} (${selected.symbol}) — ${t('markets.chart_24h')}`}>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(217 91% 53%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(217 91% 53%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 32% 15%)" />
              <XAxis dataKey="time" tick={{ fill: 'hsl(215 20% 55%)', fontSize: 10 }} />
              <YAxis tick={{ fill: 'hsl(215 20% 55%)', fontSize: 10 }} domain={['auto', 'auto']} />
              <Tooltip contentStyle={{ background: 'hsl(222 47% 6%)', border: '1px solid hsl(217 32% 15%)', borderRadius: 8, color: 'hsl(210 40% 95%)' }} />
              <Area type="monotone" dataKey="value" stroke="hsl(217 91% 53%)" fill="url(#colorValue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </WidgetCard>

      <WidgetCard title={t('markets.heatmap')}>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {markets.map((m) => {
            const intensity = Math.min(Math.abs(m.changePercent) / 3, 1);
            const bg = m.change >= 0
              ? `rgba(34, 197, 94, ${0.1 + intensity * 0.5})`
              : `rgba(239, 68, 68, ${0.1 + intensity * 0.5})`;
            return (
              <div
                key={m.symbol}
                className="rounded-lg p-3 text-center transition-colors cursor-pointer"
                style={{ background: bg }}
              >
                <div className="text-[10px] font-bold text-foreground">{m.symbol}</div>
                <div className={`text-xs font-mono ${m.change >= 0 ? 'text-accent' : 'text-destructive'}`}>
                  {m.change >= 0 ? '+' : ''}{m.changePercent.toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>
      </WidgetCard>
    </div>
  );
}
