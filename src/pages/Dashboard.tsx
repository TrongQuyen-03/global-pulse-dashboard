import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Zap, BarChart3, Crosshair, CloudLightning, Brain } from 'lucide-react';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { WorldMap } from '@/components/widgets/WorldMap';
import { EventsFeed, MarketTicker, ConflictAlerts, DisasterAlerts, AIInsights } from '@/components/widgets/DashboardWidgets';
import { useDashboardStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';

export default function Dashboard() {
  const updateMarkets = useDashboardStore((s) => s.updateMarkets);
  const { t } = useI18n();

  useEffect(() => {
    const interval = setInterval(updateMarkets, 3000);
    return () => clearInterval(interval);
  }, [updateMarkets]);

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">{t('dashboard.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('dashboard.subtitle')}</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: t('dashboard.active_conflicts'), value: '5', icon: '⚔️', color: 'glow-destructive' },
          { label: t('dashboard.natural_disasters'), value: '5', icon: '🌊', color: 'glow-warning' },
          { label: t('dashboard.market_alerts'), value: '3', icon: '📊', color: 'glow-primary' },
          { label: t('dashboard.risk_level'), value: t('dashboard.elevated'), icon: '⚠️', color: 'glow-destructive' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`glass rounded-xl p-4 ${stat.color}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">{stat.icon}</span>
              <span className="text-[11px] text-muted-foreground">{stat.label}</span>
            </div>
            <div className="text-xl font-bold font-mono text-foreground">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <WidgetCard
          title={t('dashboard.global_hotspots')}
          icon={<Globe className="w-4 h-4" />}
          className="lg:col-span-2 [&>div:last-child]:p-0 [&>div:last-child]:h-[400px]"
        >
          <WorldMap />
        </WidgetCard>

        <WidgetCard title={t('dashboard.top_events')} icon={<Zap className="w-4 h-4" />}>
          <EventsFeed />
        </WidgetCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <WidgetCard title={t('dashboard.financial_markets')} icon={<BarChart3 className="w-4 h-4" />}>
          <MarketTicker />
        </WidgetCard>

        <WidgetCard title={t('dashboard.conflict_zones')} icon={<Crosshair className="w-4 h-4" />}>
          <ConflictAlerts />
        </WidgetCard>

        <WidgetCard title={t('dashboard.active_disasters')} icon={<CloudLightning className="w-4 h-4" />}>
          <DisasterAlerts />
        </WidgetCard>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <WidgetCard title={t('dashboard.ai_briefing')} icon={<Brain className="w-4 h-4" />}>
          <AIInsights />
        </WidgetCard>
      </div>
    </div>
  );
}
