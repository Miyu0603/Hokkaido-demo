import React, { useState, useEffect } from 'react';
import { CostItem } from '../types';
import { PlusIcon, TrashIcon, CalculatorIcon, EditIcon } from '../components/Icons';
import { Modal } from '../components/Modal';

// Mock GAS interaction for local demo, real app would fetch from constants.APP_CONFIG.GAS_API_URL
const useCosts = () => {
  const [costs, setCosts] = useState<CostItem[]>(() => {
    const saved = localStorage.getItem('hokkaido_costs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('hokkaido_costs', JSON.stringify(costs));
  }, [costs]);

  const addCost = (cost: CostItem) => setCosts(prev => [cost, ...prev]);
  const updateCost = (updatedCost: CostItem) => {
    setCosts(prev => prev.map(c => c.id === updatedCost.id ? updatedCost : c));
  };
  const removeCost = (id: string) => setCosts(prev => prev.filter(c => c.id !== id));

  return { costs, addCost, updateCost, removeCost };
};

export const CostView: React.FC = () => {
  const { costs, addCost, updateCost, removeCost } = useCosts();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCalcModalOpen, setIsCalcModalOpen] = useState(false);
  
  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<'JPY' | 'TWD'>('JPY');
  const [payer, setPayer] = useState<'Payer1' | 'Payer2'>('Payer1');

  const openAddModal = () => {
    setEditingId(null);
    setItem('');
    setAmount('');
    setCurrency('JPY');
    setPayer('Payer1');
    setIsAddModalOpen(true);
  };

  const openEditModal = (cost: CostItem) => {
    setEditingId(cost.id);
    setItem(cost.item);
    setAmount(cost.amount.toString());
    setCurrency(cost.currency);
    setPayer(cost.payer);
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item || !amount) return;

    if (editingId) {
       // Update existing
       const existing = costs.find(c => c.id === editingId);
       if (existing) {
         updateCost({
            ...existing,
            item,
            amount: parseFloat(amount),
            currency,
            payer
         });
       }
    } else {
       // Create new
       const newCost: CostItem = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        item,
        amount: parseFloat(amount),
        currency,
        payer,
        method: 'split'
      };
      addCost(newCost);
    }
    
    setIsAddModalOpen(false);
  };

  // Calculations
  const totalJPY = costs.filter(c => c.currency === 'JPY').reduce((acc, c) => acc + c.amount, 0);
  const totalTWD = costs.filter(c => c.currency === 'TWD').reduce((acc, c) => acc + c.amount, 0);

  // Simple settlement logic
  const calcSettlement = (curr: 'JPY' | 'TWD') => {
    const paidBy1 = costs.filter(c => c.currency === curr && c.payer === 'Payer1').reduce((a, c) => a + c.amount, 0);
    const paidBy2 = costs.filter(c => c.currency === curr && c.payer === 'Payer2').reduce((a, c) => a + c.amount, 0);
    const total = paidBy1 + paidBy2;
    const share = total / 2;
    const diff = paidBy1 - share; // + means 1 overpaid, - means 2 overpaid

    return { paidBy1, paidBy2, diff };
  };

  const settleJPY = calcSettlement('JPY');
  const settleTWD = calcSettlement('TWD');

  return (
    <div className="p-4 pb-24 min-h-full bg-snow-white">
      {/* Summary Header */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Total Expenses</p>
          <div className="flex flex-col mt-1">
             <span className="text-xl font-bold text-hokkaido-blue">¥ {totalJPY.toLocaleString()}</span>
             <span className="text-sm font-medium text-gray-600">$ {totalTWD.toLocaleString()}</span>
          </div>
        </div>
        <button 
          onClick={() => setIsCalcModalOpen(true)}
          className="p-3 bg-gray-50 rounded-full text-gray-600 hover:bg-gray-100"
        >
          <CalculatorIcon className="w-6 h-6" />
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {costs.length === 0 && <p className="text-center text-gray-400 py-10">No expenses yet.</p>}
        {costs.map(cost => (
          <div key={cost.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
             <div className="flex-1">
                <p className="font-bold text-hokkaido-dark">{cost.item}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500 mt-0.5">
                   <span className="bg-gray-100 px-1.5 py-0.5 rounded">{cost.payer === 'Payer1' ? '付1' : '付2'}</span>
                   <span>{cost.date}</span>
                </div>
             </div>
             <div className="flex items-center space-x-3">
                <span className={`font-mono font-bold ${cost.currency === 'JPY' ? 'text-blue-600' : 'text-green-600'}`}>
                  {cost.currency === 'JPY' ? '¥' : '$'}{cost.amount.toLocaleString()}
                </span>
                <button onClick={() => openEditModal(cost)} className="text-gray-400 hover:text-blue-500">
                  <EditIcon className="w-4 h-4" />
                </button>
                <button onClick={() => removeCost(cost.id)} className="text-gray-300 hover:text-red-500">
                  <TrashIcon className="w-4 h-4" />
                </button>
             </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button 
        onClick={openAddModal}
        className="fixed bottom-20 right-4 w-14 h-14 bg-hokkaido-blue text-white rounded-full shadow-lg flex items-center justify-center hover:bg-sky-700 active:scale-95 transition-transform z-30"
      >
        <PlusIcon className="w-8 h-8" />
      </button>

      {/* Add/Edit Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={editingId ? "編輯消費" : "新增消費"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">項目</label>
            <input 
              value={item} onChange={e => setItem(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" 
              placeholder="e.g. 午餐"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">金額</label>
              <input 
                type="number" value={amount} onChange={e => setAmount(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" 
                placeholder="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">幣別</label>
              <select 
                value={currency} onChange={e => setCurrency(e.target.value as any)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              >
                <option value="JPY">JPY (¥)</option>
                <option value="TWD">TWD ($)</option>
              </select>
            </div>
          </div>
          <div>
              <label className="block text-sm font-medium text-gray-700">付款人</label>
              <div className="mt-1 flex space-x-4">
                {['Payer1', 'Payer2'].map((p) => (
                  <label key={p} className="inline-flex items-center">
                    <input type="radio" className="form-radio text-blue-600" 
                      checked={payer === p} onChange={() => setPayer(p as any)} 
                    />
                    <span className="ml-2">{p}</span>
                  </label>
                ))}
              </div>
          </div>
          <button type="submit" className="w-full bg-hokkaido-blue text-white py-2 rounded-lg font-bold shadow-md">
            {editingId ? "Update" : "Save"}
          </button>
        </form>
      </Modal>

      {/* Calc Modal */}
      <Modal isOpen={isCalcModalOpen} onClose={() => setIsCalcModalOpen(false)} title="結算 (平均分攤)">
         <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
               <h4 className="font-bold text-blue-800 mb-2">日幣結算 (JPY)</h4>
               <p className="text-sm">Payer 1 付: ¥{settleJPY.paidBy1}</p>
               <p className="text-sm">Payer 2 付: ¥{settleJPY.paidBy2}</p>
               <div className="mt-3 pt-3 border-t border-blue-200 font-bold">
                 {Math.abs(settleJPY.diff) < 1 ? '已結清' : (
                   settleJPY.diff > 0 
                    ? `Payer 2 給 Payer 1: ¥${Math.round(settleJPY.diff)}`
                    : `Payer 1 給 Payer 2: ¥${Math.round(Math.abs(settleJPY.diff))}`
                 )}
               </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
               <h4 className="font-bold text-green-800 mb-2">台幣結算 (TWD)</h4>
               <p className="text-sm">Payer 1 付: ${settleTWD.paidBy1}</p>
               <p className="text-sm">Payer 2 付: ${settleTWD.paidBy2}</p>
               <div className="mt-3 pt-3 border-t border-green-200 font-bold">
                 {Math.abs(settleTWD.diff) < 1 ? '已結清' : (
                   settleTWD.diff > 0 
                    ? `Payer 2 給 Payer 1: $${Math.round(settleTWD.diff)}`
                    : `Payer 1 給 Payer 2: $${Math.round(Math.abs(settleTWD.diff))}`
                 )}
               </div>
            </div>
         </div>
      </Modal>
    </div>
  );
};
