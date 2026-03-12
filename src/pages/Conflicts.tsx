import { motion } from 'framer-motion';
import { useDashboardStore } from '@/lib/store';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const intensityColor = { high: '#EF4444', medium: '#F59E0B', low: '#22C55E' };

export default function Conflicts() {
  const conflicts = useDashboardStore((s) => s.conflicts);

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Conflict Tracker</h1>
        <p className="text-sm text-muted-foreground mt-1">Monitoring active military conflicts and security situations worldwide</p>
      </motion.div>

      {/* Map */}
      <WidgetCard title="Conflict Map" className="[&>div:last-child]:p-0 [&>div:last-child]:h-[350px]">
        <div className="w-full h-full rounded-b-xl overflow-hidden">
          <MapContainer center={[20, 40]} zoom={2} className="w-full h-full" scrollWheelZoom={true} minZoom={2}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {conflicts.map((c) => (
              <CircleMarker
                key={c.id}
                center={[c.lat, c.lng]}
                radius={c.intensity === 'high' ? 12 : 8}
                pathOptions={{ color: intensityColor[c.intensity], fillColor: intensityColor[c.intensity], fillOpacity: 0.5, weight: 2 }}
              >
                <Popup>
                  <div className="text-xs">
                    <div className="font-bold">{c.name}</div>
                    <div>{c.status}</div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </WidgetCard>

      {/* Conflict details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {conflicts.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`w-2.5 h-2.5 rounded-full ${c.intensity === 'high' ? 'bg-destructive animate-pulse-dot' : 'bg-warning'}`} />
              <h3 className="text-sm font-bold text-foreground">{c.name}</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
              <div><span className="text-muted-foreground">Region:</span> <span className="text-foreground">{c.region}</span></div>
              <div><span className="text-muted-foreground">Status:</span> <span className="text-foreground">{c.status}</span></div>
              <div><span className="text-muted-foreground">Parties:</span> <span className="text-foreground">{c.parties.join(', ')}</span></div>
              <div><span className="text-muted-foreground">Casualties:</span> <span className="text-destructive font-mono">{c.casualties}</span></div>
            </div>
            {/* Timeline */}
            <div className="border-t border-border/30 pt-3">
              <h4 className="text-[11px] text-muted-foreground font-medium mb-2">Recent Events</h4>
              <div className="space-y-2">
                {c.timeline.map((t, j) => (
                  <div key={j} className="flex gap-2 text-[11px]">
                    <span className="text-muted-foreground font-mono shrink-0">{t.date}</span>
                    <span className="text-foreground">{t.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
