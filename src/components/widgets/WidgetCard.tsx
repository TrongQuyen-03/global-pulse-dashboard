import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface WidgetCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}

export function WidgetCard({ title, icon, children, className = '', headerAction }: WidgetCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`glass rounded-xl overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
        <div className="flex items-center gap-2">
          {icon && <span className="text-primary">{icon}</span>}
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        </div>
        {headerAction}
      </div>
      <div className="p-4">{children}</div>
    </motion.div>
  );
}
