import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useDashboardStore } from '@/lib/store';
import 'leaflet/dist/leaflet.css';

const SATELLITE_TILE = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const LABELS_TILE = 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}';

const severityColor: Record<string, string> = {
  critical: '#EF4444',
  high: '#F59E0B',
  medium: '#3B82F6',
  low: '#22C55E',
};

const categoryIcon: Record<string, string> = {
  conflict: '⚔️',
  economy: '📊',
  disaster: '🌊',
  health: '🏥',
  politics: '🏛️',
};

export function WorldMap() {
  const events = useDashboardStore((s) => s.events);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden">
      <MapContainer
        center={[20, 30]}
        zoom={2}
        className="w-full h-full"
        zoomControl={true}
        scrollWheelZoom={true}
        minZoom={2}
      >
        <TileLayer url={SATELLITE_TILE} />
        <TileLayer url={LABELS_TILE} />
        {events.map((event) => (
          <CircleMarker
            key={event.id}
            center={[event.lat, event.lng]}
            radius={event.severity === 'critical' ? 10 : event.severity === 'high' ? 8 : 6}
            pathOptions={{
              color: severityColor[event.severity],
              fillColor: severityColor[event.severity],
              fillOpacity: 0.6,
              weight: 2,
            }}
          >
            <Popup>
              <div className="text-xs">
                <div className="font-bold text-sm mb-1">{categoryIcon[event.category]} {event.title}</div>
                <div className="text-gray-600">{event.location}</div>
                <div className="mt-1">{event.summary}</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
