import { motion } from 'framer-motion';
import { useDashboardStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function Economy() {
  const economies = useDashboardStore((s) => s.economies);
  const { t } = useI18n();

  const gdpData = economies.map((e) => ({ name: e.code, GDP: e.gdp, Growth: e.gdpGrowth }));
  const inflationData = economies.map((e) => ({ name: e.code, Inflation: e.inflation, Unemployment: e.unemployment }));

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">{t('economy.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('economy.subtitle')}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WidgetCard title={t('economy.gdp_chart')}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gdpData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 32% 15%)" />
                <XAxis dataKey="name" tick={{ fill: 'hsl(215 20% 55%)', fontSize: 11 }} />
                <YAxis tick={{ fill: 'hsl(215 20% 55%)', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: 'hsl(222 47% 6%)', border: '1px solid hsl(217 32% 15%)', borderRadius: 8, color: 'hsl(210 40% 95%)' }} />
                <Bar dataKey="GDP" fill="hsl(217 91% 53%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </WidgetCard>

        <WidgetCard title={t('economy.inflation_chart')}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inflationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 32% 15%)" />
                <XAxis dataKey="name" tick={{ fill: 'hsl(215 20% 55%)', fontSize: 11 }} />
                <YAxis tick={{ fill: 'hsl(215 20% 55%)', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: 'hsl(222 47% 6%)', border: '1px solid hsl(217 32% 15%)', borderRadius: 8, color: 'hsl(210 40% 95%)' }} />
                <Bar dataKey="Inflation" fill="hsl(38 92% 50%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Unemployment" fill="hsl(0 84% 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </WidgetCard>
      </div>

      <WidgetCard title={t('economy.indicators')}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left py-2 text-muted-foreground font-medium">{t('economy.country')}</th>
                <th className="text-right py-2 text-muted-foreground font-medium">{t('economy.gdp')}</th>
                <th className="text-right py-2 text-muted-foreground font-medium">{t('economy.growth')}</th>
                <th className="text-right py-2 text-muted-foreground font-medium">{t('economy.inflation')}</th>
                <th className="text-right py-2 text-muted-foreground font-medium">{t('economy.unemployment')}</th>
                <th className="text-right py-2 text-muted-foreground font-medium">{t('economy.debt_gdp')}</th>
              </tr>
            </thead>
            <tbody>
              {economies.map((e, i) => (
                <motion.tr
                  key={e.code}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/20 hover:bg-secondary/30 transition-colors"
                >
                  <td className="py-2.5 font-medium text-foreground">{e.country}</td>
                  <td className="py-2.5 text-right font-mono text-foreground">${e.gdp}T</td>
                  <td className={`py-2.5 text-right font-mono ${e.gdpGrowth >= 2 ? 'text-accent' : e.gdpGrowth >= 1 ? 'text-warning' : 'text-destructive'}`}>
                    {e.gdpGrowth}%
                  </td>
                  <td className={`py-2.5 text-right font-mono ${e.inflation <= 2 ? 'text-accent' : e.inflation <= 4 ? 'text-warning' : 'text-destructive'}`}>
                    {e.inflation}%
                  </td>
                  <td className={`py-2.5 text-right font-mono ${e.unemployment <= 4 ? 'text-accent' : e.unemployment <= 6 ? 'text-warning' : 'text-destructive'}`}>
                    {e.unemployment}%
                  </td>
                  <td className={`py-2.5 text-right font-mono ${e.debt <= 80 ? 'text-accent' : e.debt <= 120 ? 'text-warning' : 'text-destructive'}`}>
                    {e.debt}%
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </WidgetCard>
    </div>
  );
}
