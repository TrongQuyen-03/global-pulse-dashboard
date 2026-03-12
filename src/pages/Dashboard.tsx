import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Zap, BarChart3, Crosshair, CloudLightning, Brain } from 'lucide-react';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { WorldMap } from '@/components/widgets/WorldMap';
import { EventsFeed, MarketTicker, ConflictAlerts, DisasterAlerts, AIInsights } from '@/components/widgets/DashboardWidgets';
import { useDashboardStore } from '@/lib/store';

export default function Dashboard() {
  const updateMarkets = useDashboardStore((s) => s.updateMarkets);

  useEffect(() => {
    const interval = setInterval(updateMarkets, 3000);
    return () => clearInterval(interval);
  }, [updateMarkets]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Global Intelligence Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time monitoring of global events, markets, and security</p>
      </motion.div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Active Conflicts', value: '5', icon: '⚔️', color: 'glow-destructive' },
          { label: 'Natural Disasters', value: '5', icon: '🌊', color: 'glow-warning' },
          { label: 'Market Alerts', value: '3', icon: '📊', color: 'glow-primary' },
          { label: 'Risk Level', value: 'ELEVATED', icon: '⚠️', color: 'glow-destructive' },
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

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map - spans 2 cols */}
        <WidgetCard
          title="Global Hotspots"
          icon={<Globe className="w-4 h-4" />}
          className="lg:col-span-2 [&>div:last-child]:p-0 [&>div:last-child]:h-[400px]"
        >
          <WorldMap />
        </WidgetCard>

        {/* Events feed */}
        <WidgetCard title="Top Events" icon={<Zap className="w-4 h-4" />}>
          <EventsFeed />
        </WidgetCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <WidgetCard title="Financial Markets" icon={<BarChart3 className="w-4 h-4" />}>
          <MarketTicker />
        </WidgetCard>

        <WidgetCard title="Conflict Zones" icon={<Crosshair className="w-4 h-4" />}>
          <ConflictAlerts />
        </WidgetCard>

        <WidgetCard title="Active Disasters" icon={<CloudLightning className="w-4 h-4" />}>
          <DisasterAlerts />
        </WidgetCard>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <WidgetCard title="AI Intelligence Briefing" icon={<Brain className="w-4 h-4" />}>
          <AIInsights />
        </WidgetCard>
      </div>
    </div>
  );
}
