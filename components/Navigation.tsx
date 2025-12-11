import React from 'react';
import { TabType } from '../types';
import { CalendarIcon, CheckSquareIcon, WalletIcon, ShoppingBagIcon, InfoIcon } from './Icons';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'itinerary', label: '行程', icon: CalendarIcon },
    { id: 'checklist', label: '清單', icon: CheckSquareIcon },
    { id: 'cost', label: '記帳', icon: WalletIcon },
    { id: 'shopping', label: '購物', icon: ShoppingBagIcon },
    { id: 'info', label: '資訊', icon: InfoIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe-bottom z-40">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                isActive ? 'text-hokkaido-blue' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <tab.icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-2' : 'stroke-[1.5]'}`} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};