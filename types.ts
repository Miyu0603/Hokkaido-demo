export type TabType = 'itinerary' | 'checklist' | 'cost' | 'shopping' | 'info';

export interface LocationDetail {
  name: string;
  description: string;
  address?: string;
  mapCode?: string;
  phone?: string;
  mapUrl?: string; // Google Maps URL
  imageUrl?: string;
}

export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  type: 'transport' | 'activity' | 'food' | 'hotel' | 'shopping';
  isHighlight?: boolean;
  detail?: LocationDetail;
}

export interface DaySchedule {
  id: string;
  dateStr: string;
  dayLabel: string;
  weatherCityId?: string; // For future specific city weather
  items: ItineraryItem[];
}

export interface CostItem {
  id: string;
  date: string;
  item: string;
  amount: number;
  currency: 'JPY' | 'TWD';
  payer: 'Payer1' | 'Payer2';
  method: 'split' | 'manual'; // split = 50/50
  note?: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  isBought: boolean;
  price?: number;
  shop?: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  isChecked: boolean;
  category?: 'carry-on' | 'checked' | 'general';
}