import { motion } from 'framer-motion';
import { useDashboardStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const SATELLITE_TILE = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const LABELS_TILE = 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}';

const severityColor = { critical: '#EF4444', high: '#F59E0B', medium: '#3B82F6' };
const typeIcon: Record<string, string> = { earthquake: '🌍', hurricane: '🌀', wildfire: '🔥', flood: '🌊', tsunami: '🌊' };

export default function Disasters() {
  const disasters = useDashboardStore((s) => s.disasters);
  const { t } = useI18n();

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">{t('disasters.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('disasters.subtitle')}</p>
      </motion.div>

      <WidgetCard title={t('disasters.map')} className="[&>div:last-child]:p-0 [&>div:last-child]:h-[350px]">
        <div className="w-full h-full rounded-b-xl overflow-hidden">
          <MapContainer center={[20, 30]} zoom={2} className="w-full h-full" scrollWheelZoom={true} minZoom={2}>
            <TileLayer url={SATELLITE_TILE} />
            <TileLayer url={LABELS_TILE} />
            {disasters.map((d) => (
              <CircleMarker
                key={d.id}
                center={[d.lat, d.lng]}
                radius={d.severity === 'critical' ? 12 : 8}
                pathOptions={{ color: severityColor[d.severity], fillColor: severityColor[d.severity], fillOpacity: 0.5, weight: 2 }}
              >
                <Popup>
                  <div className="text-xs">
                    <div className="font-bold">{typeIcon[d.type]} {d.type}</div>
                    <div>{d.location}</div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </WidgetCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {disasters.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`glass rounded-xl p-4 border-l-2 ${d.severity === 'critical' ? 'border-l-destructive glow-destructive' : d.severity === 'high' ? 'border-l-warning' : 'border-l-primary'}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{typeIcon[d.type]}</span>
              <div>
                <h3 className="text-sm font-bold text-foreground capitalize">{d.type}</h3>
                <p className="text-[11px] text-muted-foreground">{d.location}</p>
              </div>
            </div>
            {d.magnitude && (
              <div className="text-xs mb-1">
                <span className="text-muted-foreground">{t('disasters.magnitude')}:</span>{' '}
                <span className="font-mono font-bold text-warning">M{d.magnitude}</span>
              </div>
            )}
            <div className="text-xs mb-1">
              <span className="text-muted-foreground">{t('disasters.affected')}:</span>{' '}
              <span className="text-foreground">{d.affected}</span>
            </div>
            <div className="text-[10px] text-muted-foreground font-mono mt-2">
              {new Date(d.timestamp).toLocaleString()}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
