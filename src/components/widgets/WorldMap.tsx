import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useDashboardStore } from '@/lib/store';
import 'leaflet/dist/leaflet.css';

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
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
