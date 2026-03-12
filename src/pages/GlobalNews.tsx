import { motion } from 'framer-motion';
import { useDashboardStore } from '@/lib/store';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { Newspaper, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

const categories = ['All', 'Economy', 'Politics', 'Markets', 'Health', 'Disaster', 'Science'];

export default function GlobalNews() {
  const news = useDashboardStore((s) => s.news);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? news : news.filter((n) => n.category === filter);

  const importanceBadge: Record<string, string> = {
    breaking: 'bg-destructive/20 text-destructive',
    high: 'bg-warning/20 text-warning',
    normal: 'bg-primary/20 text-primary',
  };

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Global News Intelligence</h1>
        <p className="text-sm text-muted-foreground mt-1">AI-curated global news feed with real-time analysis</p>
      </motion.div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === cat ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl p-4 hover:bg-secondary/30 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${importanceBadge[item.importance]}`}>
                {item.importance === 'breaking' && '🔴 '}{item.importance}
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">
                {new Date(item.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
            <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{item.summary}</p>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span>{item.source}</span>
              <span>•</span>
              <span>{item.country}</span>
              <span>•</span>
              <span className="bg-secondary px-1.5 py-0.5 rounded">{item.category}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
