import React, { useState, useEffect } from 'react';
import { INITIAL_CHECKLIST_PREP, INITIAL_CHECKLIST_LUGGAGE } from '../constants';
import { ChecklistItem } from '../types';

export const ChecklistView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'prep' | 'luggage'>('prep');
  const [prepList, setPrepList] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('hokkaido_prep');
    return saved ? JSON.parse(saved) : INITIAL_CHECKLIST_PREP;
  });
  const [luggageList, setLuggageList] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('hokkaido_luggage');
    return saved ? JSON.parse(saved) : INITIAL_CHECKLIST_LUGGAGE;
  });

  useEffect(() => {
    localStorage.setItem('hokkaido_prep', JSON.stringify(prepList));
  }, [prepList]);

  useEffect(() => {
    localStorage.setItem('hokkaido_luggage', JSON.stringify(luggageList));
  }, [luggageList]);

  const toggleItem = (id: string, listType: 'prep' | 'luggage') => {
    if (listType === 'prep') {
      setPrepList(prev => prev.map(item => item.id === id ? { ...item, isChecked: !item.isChecked } : item));
    } else {
      setLuggageList(prev => prev.map(item => item.id === id ? { ...item, isChecked: !item.isChecked } : item));
    }
  };

  const renderList = (items: ChecklistItem[], type: 'prep' | 'luggage') => (
    <div className="space-y-2 mt-4">
      {items.map(item => (
        <label key={item.id} className="flex items-center bg-white p-3 rounded-lg shadow-sm active:bg-gray-50 transition-colors">
          <input 
            type="checkbox" 
            checked={item.isChecked}
            onChange={() => toggleItem(item.id, type)}
            className="w-5 h-5 text-hokkaido-blue rounded border-gray-300 focus:ring-hokkaido-blue"
          />
          <span className={`ml-3 ${item.isChecked ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
            {item.text}
          </span>
          {item.category && item.category !== 'general' && (
            <span className={`ml-auto text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
              item.category === 'carry-on' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
            }`}>
              {item.category === 'carry-on' ? '隨身' : '托運'}
            </span>
          )}
        </label>
      ))}
    </div>
  );

  return (
    <div className="p-4 pb-24 h-full bg-snow-white overflow-y-auto">
      <div className="flex bg-gray-200 rounded-lg p-1 mb-4">
        <button 
          onClick={() => setActiveTab('prep')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === 'prep' ? 'bg-white text-hokkaido-blue shadow-sm' : 'text-gray-500'
          }`}
        >
          行前準備
        </button>
        <button 
          onClick={() => setActiveTab('luggage')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === 'luggage' ? 'bg-white text-hokkaido-blue shadow-sm' : 'text-gray-500'
          }`}
        >
          行李清單
        </button>
      </div>

      <h2 className="text-lg font-bold text-gray-700 mb-2">
        {activeTab === 'prep' ? '準備事項' : '打包檢查'}
      </h2>
      
      {activeTab === 'prep' 
        ? renderList(prepList, 'prep')
        : renderList(luggageList, 'luggage')
      }
    </div>
  );
};