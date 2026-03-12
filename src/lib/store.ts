import { create } from 'zustand';

export interface GlobalEvent {
  id: string;
  title: string;
  category: 'conflict' | 'economy' | 'disaster' | 'health' | 'politics';
  severity: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  lat: number;
  lng: number;
  timestamp: string;
  summary: string;
}

export interface MarketData {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'crypto' | 'commodity' | 'index';
}

export interface ConflictZone {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  intensity: 'high' | 'medium' | 'low';
  parties: string[];
  casualties: string;
  status: string;
  timeline: { date: string; event: string }[];
}

export interface Disaster {
  id: string;
  type: 'earthquake' | 'hurricane' | 'wildfire' | 'flood' | 'tsunami';
  location: string;
  lat: number;
  lng: number;
  magnitude?: number;
  severity: 'critical' | 'high' | 'medium';
  timestamp: string;
  affected: string;
}

export interface EconomyData {
  country: string;
  code: string;
  gdp: number;
  gdpGrowth: number;
  inflation: number;
  unemployment: number;
  debt: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  category: string;
  country: string;
  timestamp: string;
  summary: string;
  importance: 'breaking' | 'high' | 'normal';
}

interface DashboardStore {
  events: GlobalEvent[];
  markets: MarketData[];
  conflicts: ConflictZone[];
  disasters: Disaster[];
  economies: EconomyData[];
  news: NewsItem[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  updateMarkets: () => void;
}

const initialEvents: GlobalEvent[] = [
  { id: '1', title: 'Escalation in Eastern Ukraine', category: 'conflict', severity: 'critical', location: 'Ukraine', lat: 48.37, lng: 35.14, timestamp: '2026-03-12T08:30:00Z', summary: 'Heavy fighting reported near Donetsk with increased artillery exchanges.' },
  { id: '2', title: 'Earthquake hits Turkey', category: 'disaster', severity: 'high', location: 'Turkey', lat: 37.57, lng: 36.93, timestamp: '2026-03-12T06:15:00Z', summary: '5.8 magnitude earthquake strikes southeastern Turkey.' },
  { id: '3', title: 'Fed Signals Rate Decision', category: 'economy', severity: 'high', location: 'United States', lat: 38.89, lng: -77.03, timestamp: '2026-03-12T14:00:00Z', summary: 'Federal Reserve hints at potential rate adjustment in upcoming meeting.' },
  { id: '4', title: 'Tensions in South China Sea', category: 'conflict', severity: 'high', location: 'South China Sea', lat: 15.0, lng: 114.0, timestamp: '2026-03-12T04:45:00Z', summary: 'Naval standoff reported between Chinese and Philippine vessels.' },
  { id: '5', title: 'Cyclone Warning - Bay of Bengal', category: 'disaster', severity: 'critical', location: 'India', lat: 15.0, lng: 85.0, timestamp: '2026-03-12T10:00:00Z', summary: 'Category 3 cyclone expected to make landfall within 48 hours.' },
  { id: '6', title: 'EU Summit on Energy Crisis', category: 'politics', severity: 'medium', location: 'Belgium', lat: 50.85, lng: 4.35, timestamp: '2026-03-12T09:00:00Z', summary: 'European leaders convene to discuss energy security measures.' },
  { id: '7', title: 'Avian Flu Outbreak in Southeast Asia', category: 'health', severity: 'high', location: 'Vietnam', lat: 21.02, lng: 105.85, timestamp: '2026-03-12T03:20:00Z', summary: 'H5N1 variant detected in multiple provinces, WHO monitoring.' },
  { id: '8', title: 'Sudan Conflict Intensifies', category: 'conflict', severity: 'critical', location: 'Sudan', lat: 15.5, lng: 32.56, timestamp: '2026-03-12T07:00:00Z', summary: 'Fighting between RSF and SAF continues in Khartoum region.' },
];

const initialMarkets: MarketData[] = [
  { name: 'Bitcoin', symbol: 'BTC', price: 87432.50, change: 1245.30, changePercent: 1.44, type: 'crypto' },
  { name: 'Ethereum', symbol: 'ETH', price: 3256.80, change: -45.20, changePercent: -1.37, type: 'crypto' },
  { name: 'Gold', symbol: 'XAU', price: 2985.40, change: 12.80, changePercent: 0.43, type: 'commodity' },
  { name: 'Crude Oil', symbol: 'WTI', price: 78.65, change: -1.23, changePercent: -1.54, type: 'commodity' },
  { name: 'S&P 500', symbol: 'SPX', price: 5823.45, change: 34.67, changePercent: 0.60, type: 'index' },
  { name: 'NASDAQ', symbol: 'NDX', price: 18456.30, change: -89.45, changePercent: -0.48, type: 'index' },
  { name: 'Nikkei 225', symbol: 'N225', price: 39876.20, change: 245.60, changePercent: 0.62, type: 'index' },
  { name: 'Silver', symbol: 'XAG', price: 33.42, change: 0.28, changePercent: 0.84, type: 'commodity' },
];

const initialConflicts: ConflictZone[] = [
  { id: 'c1', name: 'Ukraine-Russia War', region: 'Eastern Europe', lat: 48.37, lng: 35.14, intensity: 'high', parties: ['Ukraine', 'Russia'], casualties: '500,000+', status: 'Active combat', timeline: [{ date: '2026-03-12', event: 'Heavy fighting near Donetsk' }, { date: '2026-03-10', event: 'Drone strikes on energy infrastructure' }, { date: '2026-03-08', event: 'Diplomatic talks stall' }] },
  { id: 'c2', name: 'Israel-Palestine Conflict', region: 'Middle East', lat: 31.5, lng: 34.47, intensity: 'high', parties: ['Israel', 'Hamas', 'Hezbollah'], casualties: '45,000+', status: 'Active combat', timeline: [{ date: '2026-03-12', event: 'Ceasefire negotiations ongoing' }, { date: '2026-03-09', event: 'Humanitarian aid delivery' }] },
  { id: 'c3', name: 'Sudan Civil War', region: 'East Africa', lat: 15.5, lng: 32.56, intensity: 'high', parties: ['SAF', 'RSF'], casualties: '15,000+', status: 'Active combat', timeline: [{ date: '2026-03-11', event: 'Fighting in Khartoum intensifies' }] },
  { id: 'c4', name: 'South China Sea Tensions', region: 'Southeast Asia', lat: 15.0, lng: 114.0, intensity: 'medium', parties: ['China', 'Philippines', 'Vietnam'], casualties: 'N/A', status: 'Naval standoff', timeline: [{ date: '2026-03-12', event: 'Naval confrontation near Scarborough Shoal' }] },
  { id: 'c5', name: 'Sahel Region Insurgency', region: 'West Africa', lat: 14.0, lng: 1.0, intensity: 'medium', parties: ['JNIM', 'ISGS', 'National forces'], casualties: '10,000+', status: 'Ongoing insurgency', timeline: [{ date: '2026-03-10', event: 'Military operation in northern Mali' }] },
];

const initialDisasters: Disaster[] = [
  { id: 'd1', type: 'earthquake', location: 'Turkey, Gaziantep', lat: 37.57, lng: 36.93, magnitude: 5.8, severity: 'high', timestamp: '2026-03-12T06:15:00Z', affected: '~50,000 people' },
  { id: 'd2', type: 'hurricane', location: 'Bay of Bengal, India', lat: 15.0, lng: 85.0, severity: 'critical', timestamp: '2026-03-12T10:00:00Z', affected: '~2M at risk' },
  { id: 'd3', type: 'wildfire', location: 'California, USA', lat: 34.05, lng: -118.24, severity: 'high', timestamp: '2026-03-11T18:00:00Z', affected: '~15,000 evacuated' },
  { id: 'd4', type: 'flood', location: 'Bangladesh, Sylhet', lat: 24.89, lng: 91.87, severity: 'medium', timestamp: '2026-03-10T12:00:00Z', affected: '~300,000 displaced' },
  { id: 'd5', type: 'earthquake', location: 'Japan, Hokkaido', lat: 43.06, lng: 141.35, magnitude: 4.2, severity: 'medium', timestamp: '2026-03-12T02:30:00Z', affected: 'Minor damage reported' },
];

const initialEconomies: EconomyData[] = [
  { country: 'United States', code: 'US', gdp: 28.78, gdpGrowth: 2.1, inflation: 3.2, unemployment: 3.8, debt: 124.5 },
  { country: 'China', code: 'CN', gdp: 19.37, gdpGrowth: 4.8, inflation: 1.5, unemployment: 5.2, debt: 83.6 },
  { country: 'Japan', code: 'JP', gdp: 4.41, gdpGrowth: 1.2, inflation: 2.8, unemployment: 2.5, debt: 255.2 },
  { country: 'Germany', code: 'DE', gdp: 4.31, gdpGrowth: 0.3, inflation: 2.9, unemployment: 5.8, debt: 64.3 },
  { country: 'United Kingdom', code: 'GB', gdp: 3.34, gdpGrowth: 0.8, inflation: 4.1, unemployment: 4.2, debt: 101.2 },
  { country: 'India', code: 'IN', gdp: 3.94, gdpGrowth: 6.5, inflation: 5.4, unemployment: 7.8, debt: 83.1 },
  { country: 'France', code: 'FR', gdp: 3.05, gdpGrowth: 0.9, inflation: 3.1, unemployment: 7.3, debt: 112.8 },
  { country: 'Brazil', code: 'BR', gdp: 2.13, gdpGrowth: 2.9, inflation: 4.6, unemployment: 8.1, debt: 74.4 },
];

const initialNews: NewsItem[] = [
  { id: 'n1', title: 'US Federal Reserve Signals Potential Rate Adjustment', source: 'Reuters', category: 'Economy', country: 'US', timestamp: '2026-03-12T14:00:00Z', summary: 'Fed Chair indicates possible rate changes amid mixed economic signals.', importance: 'breaking' },
  { id: 'n2', title: 'NATO Holds Emergency Meeting on Eastern Front', source: 'AP News', category: 'Politics', country: 'Belgium', timestamp: '2026-03-12T11:30:00Z', summary: 'Alliance members discuss reinforcement of eastern defenses.', importance: 'high' },
  { id: 'n3', title: 'Bitcoin Surges Past $87,000 on ETF Inflows', source: 'Bloomberg', category: 'Markets', country: 'Global', timestamp: '2026-03-12T09:45:00Z', summary: 'Institutional investment drives crypto rally to new highs.', importance: 'high' },
  { id: 'n4', title: 'WHO Warns of New Avian Flu Variant', source: 'WHO', category: 'Health', country: 'Vietnam', timestamp: '2026-03-12T08:00:00Z', summary: 'New H5N1 mutation detected with higher transmissibility.', importance: 'breaking' },
  { id: 'n5', title: 'EU Approves Emergency Energy Package', source: 'Euronews', category: 'Politics', country: 'EU', timestamp: '2026-03-12T13:00:00Z', summary: '€50B package to stabilize energy markets across the bloc.', importance: 'high' },
  { id: 'n6', title: 'China GDP Growth Beats Expectations', source: 'SCMP', category: 'Economy', country: 'China', timestamp: '2026-03-12T07:00:00Z', summary: 'Q1 GDP growth at 4.8%, driven by tech and manufacturing.', importance: 'normal' },
  { id: 'n7', title: 'Wildfire Forces Evacuation in Southern California', source: 'CNN', category: 'Disaster', country: 'US', timestamp: '2026-03-11T22:00:00Z', summary: '15,000 residents evacuated as fire spreads across 10,000 acres.', importance: 'high' },
  { id: 'n8', title: 'India Launches Mars Sample Return Mission', source: 'ISRO', category: 'Science', country: 'India', timestamp: '2026-03-12T05:30:00Z', summary: 'Historic mission aims to bring back first Mars soil samples.', importance: 'normal' },
];

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  events: initialEvents,
  markets: initialMarkets,
  conflicts: initialConflicts,
  disasters: initialDisasters,
  economies: initialEconomies,
  news: initialNews,
  selectedCategory: 'all',
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  updateMarkets: () => {
    set((state) => ({
      markets: state.markets.map((m) => {
        const delta = (Math.random() - 0.5) * m.price * 0.002;
        const newPrice = +(m.price + delta).toFixed(2);
        const newChange = +(m.change + delta).toFixed(2);
        const newPercent = +((newChange / (newPrice - newChange)) * 100).toFixed(2);
        return { ...m, price: newPrice, change: newChange, changePercent: newPercent };
      }),
    }));
  },
}));
