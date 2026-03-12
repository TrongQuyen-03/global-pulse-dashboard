import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Newspaper,
  TrendingUp,
  BarChart3,
  Crosshair,
  CloudLightning,
  Brain,
  ChevronLeft,
  Globe,
  Languages,
} from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '@/lib/i18n';

const navItems = [
  { path: '/', labelKey: 'nav.dashboard', icon: LayoutDashboard },
  { path: '/news', labelKey: 'nav.news', icon: Newspaper },
  { path: '/economy', labelKey: 'nav.economy', icon: TrendingUp },
  { path: '/markets', labelKey: 'nav.markets', icon: BarChart3 },
  { path: '/conflicts', labelKey: 'nav.conflicts', icon: Crosshair },
  { path: '/disasters', labelKey: 'nav.disasters', icon: CloudLightning },
  { path: '/ai-reports', labelKey: 'nav.ai_reports', icon: Brain },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { t, locale, setLocale } = useI18n();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="h-screen sticky top-0 flex flex-col glass-strong z-30 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border/50">
        <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
          <Globe className="w-5 h-5 text-primary" />
        </div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden">
            <h1 className="text-sm font-bold text-foreground tracking-tight">{t('sidebar.title')}</h1>
            <p className="text-[10px] text-muted-foreground">{t('sidebar.subtitle')}</p>
          </motion.div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group relative ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full"
                />
              )}
              <item.icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-primary' : ''}`} />
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium">
                  {t(item.labelKey)}
                </motion.span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Language toggle */}
      <button
        onClick={() => setLocale(locale === 'vi' ? 'en' : 'vi')}
        className="flex items-center gap-2 mx-2 mb-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
      >
        <Languages className="w-4 h-4 shrink-0" />
        {!collapsed && (
          <span className="font-medium">{locale === 'vi' ? '🇻🇳 Tiếng Việt' : '🇺🇸 English'}</span>
        )}
      </button>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-12 border-t border-border/50 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
      </button>
    </motion.aside>
  );
}
