import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { ItineraryView } from './views/ItineraryView';
import { CostView } from './views/CostView';
import { ChecklistView } from './views/ChecklistView';
import { ShoppingView } from './views/ShoppingView';
import { InfoView } from './views/InfoView';
import { TabType } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('itinerary');

  const renderContent = () => {
    switch (activeTab) {
      case 'itinerary':
        return <ItineraryView />;
      case 'cost':
        return <CostView />;
      case 'checklist':
        return <ChecklistView />;
      case 'shopping':
        return <ShoppingView />;
      case 'info':
        return <InfoView />;
      default:
        return <ItineraryView />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-gray-50 shadow-2xl overflow-hidden relative">
      <Header />
      <main className="flex-1 overflow-hidden relative">
        {renderContent()}
      </main>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;