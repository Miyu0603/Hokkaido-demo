import React, { useState } from 'react';
import { ITINERARY_DATA } from '../constants';
import { ItineraryItem } from '../types';
import { Modal } from '../components/Modal';
import { PlaneIcon, BedIcon, UtensilsIcon, CameraIcon, ShoppingBagIcon, CarIcon, MapPinIcon, PhoneIcon } from '../components/Icons';

export const ItineraryView: React.FC = () => {
  const [selectedDayId, setSelectedDayId] = useState(ITINERARY_DATA[0].id);
  const [selectedItem, setSelectedItem] = useState<ItineraryItem | null>(null);

  const currentDay = ITINERARY_DATA.find((d) => d.id === selectedDayId) || ITINERARY_DATA[0];

  const getIcon = (type: ItineraryItem['type']) => {
    switch (type) {
      case 'transport': return <PlaneIcon className="w-5 h-5" />;
      case 'hotel': return <BedIcon className="w-5 h-5" />;
      case 'food': return <UtensilsIcon className="w-5 h-5" />;
      case 'shopping': return <ShoppingBagIcon className="w-5 h-5" />;
      case 'activity': return <CameraIcon className="w-5 h-5" />;
      default: return <MapPinIcon className="w-5 h-5" />;
    }
  };

  const getMapLink = (detail: NonNullable<ItineraryItem['detail']>) => {
    if (detail.mapUrl) return detail.mapUrl;
    if (detail.address) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(detail.address)}`;
    return null;
  };

  return (
    <div className="flex flex-col h-full bg-snow-white">
      {/* Day Selector - Fixed Grid for 5 items */}
      <div className="bg-white shadow-sm px-2 py-3 sticky top-0 z-10">
        <div className="grid grid-cols-5 gap-2">
          {ITINERARY_DATA.map((day) => (
            <button
              key={day.id}
              onClick={() => setSelectedDayId(day.id)}
              className={`flex flex-col items-center justify-center py-2 rounded-lg transition-all ${
                selectedDayId === day.id
                  ? 'bg-hokkaido-blue text-white shadow-md transform scale-105'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              <span className="text-[10px] opacity-90 uppercase font-bold tracking-wider">{day.dayLabel}</span>
              <span className="text-xs font-bold leading-tight mt-0.5">{day.dateStr.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
          {currentDay.items.map((item) => {
            const hasDetail = !!item.detail;
            return (
              <div key={item.id} className="relative pl-6 group">
                {/* Dot */}
                <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                  item.isHighlight ? 'bg-red-500' : 'bg-hokkaido-blue'
                }`} />
                
                {/* Time */}
                <span className="text-xs font-semibold text-gray-500 mb-1 block font-mono">
                  {item.time}
                </span>

                {/* Card */}
                <div 
                  onClick={() => hasDetail && setSelectedItem(item)}
                  className={`p-4 rounded-xl shadow-sm border transition-all ${
                    hasDetail 
                      ? 'cursor-pointer active:scale-[0.98] hover:shadow-md' 
                      : 'cursor-default opacity-90'
                  } ${
                    item.isHighlight 
                      ? 'bg-gradient-to-br from-white to-blue-50 border-blue-100' 
                      : 'bg-white border-gray-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                     <h3 className="font-bold text-hokkaido-dark">{item.title}</h3>
                     <div className={`text-gray-400 ${item.isHighlight ? 'text-hokkaido-blue' : ''}`}>
                       {getIcon(item.type)}
                     </div>
                  </div>
                  {item.detail?.name && (
                     <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.detail.name}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <Modal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.title}
      >
        {selectedItem && selectedItem.detail ? (
          <div className="space-y-4">
             {/* Images removed as per request */}
             
             <div>
               <h4 className="font-bold text-lg text-hokkaido-blue">{selectedItem.detail.name}</h4>
               <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                 {selectedItem.detail.description}
               </p>
             </div>

             <div className="bg-gray-50 p-4 rounded-lg space-y-3 text-sm">
                {selectedItem.detail.mapCode && (
                  <div className="flex items-center text-gray-700">
                    <CarIcon className="w-5 h-5 mr-3 text-hokkaido-blue" />
                    <div>
                      <span className="block text-xs text-gray-400">MapCode (Navi)</span>
                      <span className="font-mono font-bold tracking-wider select-all">{selectedItem.detail.mapCode}</span>
                    </div>
                  </div>
                )}
                {selectedItem.detail.phone && (
                  <div className="flex items-center text-gray-700">
                    <PhoneIcon className="w-5 h-5 mr-3 text-hokkaido-blue" />
                    <a href={`tel:${selectedItem.detail.phone}`} className="underline decoration-dotted">
                      {selectedItem.detail.phone}
                    </a>
                  </div>
                )}
                {selectedItem.detail.address && (
                  <div className="flex items-start text-gray-700">
                    <MapPinIcon className="w-5 h-5 mr-3 mt-0.5 text-hokkaido-blue flex-shrink-0" />
                    <span className="select-all">{selectedItem.detail.address}</span>
                  </div>
                )}
             </div>

             {getMapLink(selectedItem.detail) && (
               <a 
                 href={getMapLink(selectedItem.detail)!} 
                 target="_blank" 
                 rel="noreferrer"
                 className="block w-full py-3 bg-hokkaido-blue text-white text-center rounded-lg font-bold shadow-md hover:bg-sky-700 transition-colors"
               >
                 Open Google Maps
               </a>
             )}
          </div>
        ) : (
          <p className="text-gray-500">沒有更多詳細資訊。</p>
        )}
      </Modal>
    </div>
  );
};