import React, { useState, useEffect } from 'react';
import { ShoppingItem } from '../types';
import { PlusIcon, TrashIcon, EditIcon } from '../components/Icons';
import { Modal } from '../components/Modal';

export const ShoppingView: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem('hokkaido_shopping');
    return saved ? JSON.parse(saved) : [];
  });
  const [newItem, setNewItem] = useState('');
  
  // Edit State
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [editName, setEditName] = useState('');

  // Delete State
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('hokkaido_shopping', JSON.stringify(items));
  }, [items]);

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setItems(prev => [
      { id: Date.now().toString(), name: newItem, isBought: false },
      ...prev
    ]);
    setNewItem('');
  };

  const toggleBought = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, isBought: !i.isBought } : i));
  };

  const promptDelete = (id: string) => {
     setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
        setItems(prev => prev.filter(i => i.id !== deleteId));
        setDeleteId(null);
    }
  };

  const openEditModal = (item: ShoppingItem) => {
    setEditingItem(item);
    setEditName(item.name);
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editName.trim()) return;
    
    setItems(prev => prev.map(i => i.id === editingItem.id ? { ...i, name: editName } : i));
    setEditingItem(null);
  };

  return (
    <div className="p-4 pb-24 h-full bg-snow-white flex flex-col">
      <h2 className="text-xl font-serif font-bold text-hokkaido-dark mb-4">必買清單 (Must Buy)</h2>
      
      <form onSubmit={addItem} className="flex mb-6 shadow-sm rounded-lg overflow-hidden">
        <input
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          className="flex-1 border-none p-3 focus:ring-0 text-gray-800 bg-white placeholder-gray-400"
          placeholder="六花亭 奶油夾心餅..."
        />
        <button type="submit" className="bg-hokkaido-blue text-white px-5 font-bold hover:bg-sky-700 transition-colors">
          <PlusIcon className="w-6 h-6" />
        </button>
      </form>

      <div className="flex-1 overflow-y-auto space-y-3">
        {items.length === 0 && <p className="text-gray-400 text-center mt-10">清單是空的，快加點東西！</p>}
        {items.map(item => (
          <div key={item.id} className={`flex items-center justify-between p-4 rounded-xl shadow-sm border transition-all ${item.isBought ? 'bg-gray-100 border-gray-100' : 'bg-white border-blue-50'}`}>
             <div className="flex items-center flex-1 cursor-pointer" onClick={() => toggleBought(item.id)}>
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center flex-shrink-0 transition-colors ${item.isBought ? 'bg-gray-400 border-gray-400' : 'border-hokkaido-blue bg-white'}`}>
                  {item.isBought && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className={`text-lg font-medium ${item.isBought ? 'text-gray-400 line-through decoration-gray-400' : 'text-gray-800'}`}>
                  {item.name}
                </span>
             </div>
             <div className="flex items-center ml-2 space-x-1">
               <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); openEditModal(item); }} 
                className="p-2 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-50 transition-colors"
               >
                 <EditIcon className="w-5 h-5" />
               </button>
               <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); promptDelete(item.id); }} 
                className="p-2 text-gray-300 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
               >
                 <TrashIcon className="w-5 h-5" />
               </button>
             </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={!!editingItem} onClose={() => setEditingItem(null)} title="編輯項目">
         <form onSubmit={saveEdit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">名稱</label>
              <input 
                value={editName} onChange={e => setEditName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-white text-lg" 
                autoFocus
              />
            </div>
            <button type="submit" className="w-full bg-hokkaido-blue text-white py-3 rounded-lg font-bold shadow-md hover:bg-sky-700 transition-colors">
              更新
            </button>
         </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="確認刪除">
         <div className="space-y-4">
           <p className="text-gray-600">確定要刪除此項目嗎？</p>
           <div className="flex gap-3">
             <button 
               onClick={() => setDeleteId(null)}
               className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors"
             >
               取消
             </button>
             <button 
               onClick={confirmDelete}
               className="flex-1 py-2 bg-red-500 text-white rounded-lg font-bold shadow-md hover:bg-red-600 transition-colors"
             >
               刪除
             </button>
           </div>
         </div>
      </Modal>
    </div>
  );
};