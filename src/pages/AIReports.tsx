import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { Brain, AlertTriangle, TrendingUp, Globe, Shield } from 'lucide-react';

export default function AIReports() {
  const { t } = useI18n();

  const reports = [
    {
      title: 'Daily Global Intelligence Briefing',
      date: 'March 12, 2026',
      typeKey: 'ai.daily_brief',
      icon: Globe,
      sections: [
        { heading: 'Top Events Today', content: '• Eastern Ukraine sees heaviest fighting in months with sustained artillery exchanges near Donetsk.\n• 5.8 magnitude earthquake strikes southeastern Turkey, affecting ~50,000 people.\n• Federal Reserve signals potential rate adjustment amid mixed economic data.\n• WHO monitoring new H5N1 variant detected in Vietnam with higher transmissibility.' },
        { heading: 'Key Takeaway', content: 'Global risk levels remain elevated with concurrent military, natural disaster, and public health challenges demanding international attention.' },
      ],
    },
    {
      title: 'Weekly Global Risk Report',
      date: 'Week of March 9-15, 2026',
      typeKey: 'ai.risk_analysis',
      icon: Shield,
      sections: [
        { heading: 'Risk Assessment', content: '• Military: HIGH — Active conflicts in Ukraine, Middle East, Sudan, and Sahel region.\n• Economic: MODERATE — Central bank policy uncertainty. EU energy security concerns.\n• Health: ELEVATED — Avian flu variant under WHO surveillance.\n• Natural: HIGH — Active earthquake zone in Turkey-Syria, cyclone threat in Bay of Bengal.' },
        { heading: 'Forecast', content: 'Expect continued volatility in energy markets. Diplomatic channels for Ukraine remain stalled. Southeast Asian maritime tensions likely to persist through Q2.' },
      ],
    },
    {
      title: 'Global Economic Trends Analysis',
      date: 'Q1 2026',
      typeKey: 'ai.economic_intel',
      icon: TrendingUp,
      sections: [
        { heading: 'Key Trends', content: '• US GDP growth moderating to 2.1% amid tightening financial conditions.\n• China outperforming expectations at 4.8% growth, led by tech sector.\n• India maintains strongest G20 growth at 6.5%.\n• EU struggling with sub-1% growth across major economies.' },
        { heading: 'Market Implications', content: 'Crypto markets showing resilience with BTC above $87K. Gold near all-time highs reflecting geopolitical uncertainty. Oil markets volatile on supply concerns.' },
      ],
    },
    {
      title: 'Emerging Threat Assessment',
      date: 'March 2026',
      typeKey: 'ai.threat_intel',
      icon: AlertTriangle,
      sections: [
        { heading: 'Emerging Risks', content: '• Avian flu H5N1 mutation — potential pandemic risk if human transmission confirmed.\n• South China Sea escalation — naval confrontations increasing in frequency.\n• EU energy dependency — winter reserves declining faster than projected.\n• Sahel destabilization — expanding insurgent control affecting regional stability.' },
        { heading: 'Recommendation', content: 'Organizations should update contingency plans for supply chain disruptions in SE Asia and energy-dependent operations in Europe.' },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">{t('ai.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('ai.subtitle')}</p>
      </motion.div>

      <div className="space-y-4">
        {reports.map((report, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border/30">
              <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
                <report.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-foreground">{report.title}</h2>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span>{report.date}</span>
                  <span>•</span>
                  <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">{t(report.typeKey)}</span>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1.5 text-[10px] text-accent">
                <Brain className="w-3 h-3" />
                <span>{t('ai.generated')}</span>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {report.sections.map((section, j) => (
                <div key={j}>
                  <h3 className="text-xs font-semibold text-foreground mb-1.5">{section.heading}</h3>
                  <div className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{section.content}</div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
