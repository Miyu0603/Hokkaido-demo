import React from 'react';
import { PhoneIcon } from '../components/Icons';

export const InfoView: React.FC = () => {
  return (
    <div className="p-4 pb-24 overflow-y-auto bg-snow-white h-full">
      <h2 className="text-xl font-serif font-bold text-hokkaido-dark mb-6">實用資訊</h2>

      <div className="space-y-6">
        <section className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-red-500">
          <h3 className="font-bold text-lg mb-3 flex items-center">
            <PhoneIcon className="w-5 h-5 mr-2 text-red-500" />
            緊急聯絡
          </h3>
          <div className="space-y-3">
            <a href="tel:119" className="flex justify-between items-center py-2 border-b border-gray-100">
              <span>救護車 / 火警</span>
              <span className="font-mono font-bold text-red-600">119</span>
            </a>
            <a href="tel:110" className="flex justify-between items-center py-2 border-b border-gray-100">
              <span>警察局</span>
              <span className="font-mono font-bold text-red-600">110</span>
            </a>
            <a href="tel:+81-3-3280-7111" className="block py-2">
              <span className="block text-sm text-gray-500">台北駐日經濟文化代表處 (札幌分處)</span>
              <span className="font-mono font-bold text-blue-600">011-222-2930</span>
            </a>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="font-bold text-lg mb-3">天氣與穿著</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-2">
            12月中旬札幌平均氣溫約 -4°C 至 2°C。請務必採取「洋蔥式穿法」。
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>室內暖氣強，內層不要穿太厚的高領。</li>
            <li>鞋子必須防滑、防水 (建議噴防水噴霧)。</li>
            <li>圍巾、手套、毛帽是必備品。</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="font-bold text-lg mb-3">連結</h3>
          <div className="grid grid-cols-2 gap-3">
            <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="block p-3 bg-gray-50 rounded text-center text-sm font-medium hover:bg-gray-100">Google Maps</a>
            <a href="https://translate.google.com/" target="_blank" rel="noreferrer" className="block p-3 bg-gray-50 rounded text-center text-sm font-medium hover:bg-gray-100">Google Translate</a>
            <a href="https://vjw-lp.digital.go.jp/en/" target="_blank" rel="noreferrer" className="block p-3 bg-gray-50 rounded text-center text-sm font-medium hover:bg-gray-100">Visit Japan Web</a>
            <a href="https://www.jrhokkaido.co.jp/" target="_blank" rel="noreferrer" className="block p-3 bg-gray-50 rounded text-center text-sm font-medium hover:bg-gray-100">JR Hokkaido</a>
          </div>
        </section>
      </div>
    </div>
  );
};