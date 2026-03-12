import { create } from 'zustand';

export type Locale = 'vi' | 'en';

interface I18nStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, string>> = {
  vi: {
    // Sidebar
    'nav.dashboard': 'Bảng điều khiển',
    'nav.news': 'Tin tức Toàn cầu',
    'nav.economy': 'Kinh tế',
    'nav.markets': 'Thị trường',
    'nav.conflicts': 'Xung đột',
    'nav.disasters': 'Thiên tai',
    'nav.ai_reports': 'Báo cáo AI',
    'sidebar.title': 'Global Intel',
    'sidebar.subtitle': 'Bảng điều khiển',

    // TopBar
    'topbar.live': 'TRỰC TIẾP',

    // Dashboard
    'dashboard.title': 'Bảng Điều Khiển Tình Báo Toàn Cầu',
    'dashboard.subtitle': 'Giám sát thời gian thực các sự kiện, thị trường và an ninh toàn cầu',
    'dashboard.active_conflicts': 'Xung đột đang diễn ra',
    'dashboard.natural_disasters': 'Thiên tai',
    'dashboard.market_alerts': 'Cảnh báo thị trường',
    'dashboard.risk_level': 'Mức độ rủi ro',
    'dashboard.elevated': 'CAO',
    'dashboard.global_hotspots': 'Điểm nóng Toàn cầu',
    'dashboard.top_events': 'Sự kiện Nổi bật',
    'dashboard.financial_markets': 'Thị trường Tài chính',
    'dashboard.conflict_zones': 'Vùng Xung đột',
    'dashboard.active_disasters': 'Thiên tai đang hoạt động',
    'dashboard.ai_briefing': 'Báo cáo Tình báo AI',

    // Global News
    'news.title': 'Tin tức Tình báo Toàn cầu',
    'news.subtitle': 'Nguồn tin toàn cầu được AI phân tích theo thời gian thực',
    'news.all': 'Tất cả',
    'news.economy': 'Kinh tế',
    'news.politics': 'Chính trị',
    'news.markets': 'Thị trường',
    'news.health': 'Y tế',
    'news.disaster': 'Thiên tai',
    'news.science': 'Khoa học',

    // Economy
    'economy.title': 'Giám sát Kinh tế Toàn cầu',
    'economy.subtitle': 'Theo dõi GDP, lạm phát, thất nghiệp và nợ công các nền kinh tế lớn',
    'economy.gdp_chart': 'GDP theo Quốc gia (Nghìn tỷ USD)',
    'economy.inflation_chart': 'Lạm phát vs Thất nghiệp (%)',
    'economy.indicators': 'Chỉ số Kinh tế',
    'economy.country': 'Quốc gia',
    'economy.gdp': 'GDP (T)',
    'economy.growth': 'Tăng trưởng',
    'economy.inflation': 'Lạm phát',
    'economy.unemployment': 'Thất nghiệp',
    'economy.debt_gdp': 'Nợ/GDP',

    // Markets
    'markets.title': 'Giám sát Thị trường Tài chính',
    'markets.subtitle': 'Theo dõi thời gian thực tiền điện tử, hàng hóa và chỉ số toàn cầu',
    'markets.chart_24h': 'Biểu đồ 24h',
    'markets.heatmap': 'Bản đồ Nhiệt Thị trường',

    // Conflicts
    'conflicts.title': 'Theo dõi Xung đột',
    'conflicts.subtitle': 'Giám sát các cuộc xung đột quân sự và tình hình an ninh toàn cầu',
    'conflicts.map': 'Bản đồ Xung đột',
    'conflicts.region': 'Khu vực',
    'conflicts.status': 'Trạng thái',
    'conflicts.parties': 'Các bên',
    'conflicts.casualties': 'Thương vong',
    'conflicts.recent_events': 'Sự kiện Gần đây',

    // Disasters
    'disasters.title': 'Giám sát Thiên tai',
    'disasters.subtitle': 'Theo dõi động đất, bão, cháy rừng và lũ lụt trên toàn thế giới',
    'disasters.map': 'Bản đồ Thiên tai',
    'disasters.magnitude': 'Cường độ',
    'disasters.affected': 'Bị ảnh hưởng',

    // AI Reports
    'ai.title': 'Báo cáo Tình báo AI',
    'ai.subtitle': 'Phân tích, tóm tắt và đánh giá rủi ro do AI tạo ra',
    'ai.generated': 'AI tạo',
    'ai.daily_brief': 'Báo cáo Hàng ngày',
    'ai.risk_analysis': 'Phân tích Rủi ro',
    'ai.economic_intel': 'Tình báo Kinh tế',
    'ai.threat_intel': 'Tình báo Đe dọa',

    // AI Insights
    'insight.global_risk': 'Chỉ số Rủi ro Toàn cầu',
    'insight.elevated': 'CAO',
    'insight.risk_detail': 'Nhiều cuộc xung đột và thiên tai đang diễn ra góp phần làm tăng mức độ rủi ro toàn cầu.',
    'insight.market_sentiment': 'Tâm lý Thị trường',
    'insight.cautious': 'THẬN TRỌNG',
    'insight.market_detail': 'Tín hiệu trái chiều từ các ngân hàng trung ương. Tiền điện tử mạnh lên trong khi thị trường năng lượng vẫn biến động.',
    'insight.top_trend': 'Xu hướng Hàng đầu',
    'insight.energy_crisis': 'Khủng hoảng Năng lượng',
    'insight.trend_detail': 'Các biện pháp an ninh năng lượng EU đang chi phối các cuộc thảo luận chính sách. Dự kiến ảnh hưởng đến chuỗi cung ứng toàn cầu.',

    // Language
    'lang.switch': 'Ngôn ngữ',
  },
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.news': 'Global News',
    'nav.economy': 'Economy',
    'nav.markets': 'Markets',
    'nav.conflicts': 'Conflicts',
    'nav.disasters': 'Disasters',
    'nav.ai_reports': 'AI Reports',
    'sidebar.title': 'Global Intel',
    'sidebar.subtitle': 'Dashboard',

    'topbar.live': 'LIVE',

    'dashboard.title': 'Global Intelligence Dashboard',
    'dashboard.subtitle': 'Real-time monitoring of global events, markets, and security',
    'dashboard.active_conflicts': 'Active Conflicts',
    'dashboard.natural_disasters': 'Natural Disasters',
    'dashboard.market_alerts': 'Market Alerts',
    'dashboard.risk_level': 'Risk Level',
    'dashboard.elevated': 'ELEVATED',
    'dashboard.global_hotspots': 'Global Hotspots',
    'dashboard.top_events': 'Top Events',
    'dashboard.financial_markets': 'Financial Markets',
    'dashboard.conflict_zones': 'Conflict Zones',
    'dashboard.active_disasters': 'Active Disasters',
    'dashboard.ai_briefing': 'AI Intelligence Briefing',

    'news.title': 'Global News Intelligence',
    'news.subtitle': 'AI-curated global news feed with real-time analysis',
    'news.all': 'All',
    'news.economy': 'Economy',
    'news.politics': 'Politics',
    'news.markets': 'Markets',
    'news.health': 'Health',
    'news.disaster': 'Disaster',
    'news.science': 'Science',

    'economy.title': 'Global Economy Monitor',
    'economy.subtitle': 'Track GDP, inflation, unemployment and debt across major economies',
    'economy.gdp_chart': 'GDP by Country (Trillions USD)',
    'economy.inflation_chart': 'Inflation vs Unemployment (%)',
    'economy.indicators': 'Economic Indicators',
    'economy.country': 'Country',
    'economy.gdp': 'GDP (T)',
    'economy.growth': 'Growth',
    'economy.inflation': 'Inflation',
    'economy.unemployment': 'Unemployment',
    'economy.debt_gdp': 'Debt/GDP',

    'markets.title': 'Financial Market Monitor',
    'markets.subtitle': 'Real-time tracking of crypto, commodities, and global indices',
    'markets.chart_24h': '24h Chart',
    'markets.heatmap': 'Market Heatmap',

    'conflicts.title': 'Conflict Tracker',
    'conflicts.subtitle': 'Monitoring active military conflicts and security situations worldwide',
    'conflicts.map': 'Conflict Map',
    'conflicts.region': 'Region',
    'conflicts.status': 'Status',
    'conflicts.parties': 'Parties',
    'conflicts.casualties': 'Casualties',
    'conflicts.recent_events': 'Recent Events',

    'disasters.title': 'Disaster Monitor',
    'disasters.subtitle': 'Tracking earthquakes, hurricanes, wildfires, and floods worldwide',
    'disasters.map': 'Disaster Map',
    'disasters.magnitude': 'Magnitude',
    'disasters.affected': 'Affected',

    'ai.title': 'AI Intelligence Reports',
    'ai.subtitle': 'AI-generated analysis, summaries, and risk assessments',
    'ai.generated': 'AI Generated',
    'ai.daily_brief': 'Daily Brief',
    'ai.risk_analysis': 'Risk Analysis',
    'ai.economic_intel': 'Economic Intel',
    'ai.threat_intel': 'Threat Intel',

    'insight.global_risk': 'Global Risk Index',
    'insight.elevated': 'ELEVATED',
    'insight.risk_detail': 'Multiple active conflicts and natural disasters contributing to elevated global risk levels.',
    'insight.market_sentiment': 'Market Sentiment',
    'insight.cautious': 'CAUTIOUS',
    'insight.market_detail': 'Mixed signals from central banks. Crypto showing strength while energy markets remain volatile.',
    'insight.top_trend': 'Top Trend',
    'insight.energy_crisis': 'Energy Crisis',
    'insight.trend_detail': 'EU energy security measures dominating policy discussions. Impact on global supply chains expected.',

    'lang.switch': 'Language',
  },
};

export const useI18n = create<I18nStore>((set, get) => ({
  locale: 'vi',
  setLocale: (locale) => set({ locale }),
  t: (key: string) => {
    const { locale } = get();
    return translations[locale][key] || key;
  },
}));
