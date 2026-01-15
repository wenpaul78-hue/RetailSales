import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Employee } from '../types';

interface SalesPersonSelectionPageProps {
  onBack: () => void;
  employees: Employee[];
  selectedId?: string | null;
  onConfirm: (employee: Employee | null) => void;
}

export const SalesPersonSelectionPage: React.FC<SalesPersonSelectionPageProps> = ({ 
  onBack, 
  employees, 
  selectedId, 
  onConfirm 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSelection, setCurrentSelection] = useState<string | null>(selectedId || null);

  const filteredEmployees = employees.filter(emp => 
    emp.name.includes(searchQuery) || emp.phone.includes(searchQuery)
  );

  const handleConfirm = () => {
    const employee = employees.find(e => e.id === currentSelection) || null;
    onConfirm(employee);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
       {/* Header */}
       <header className="flex items-center px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-50">
        <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2 flex-1 text-center pr-6">选择员工</h1>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-white">
          <div className="flex items-center gap-3">
              <div className="flex-1 bg-[#f5f5f5] rounded-lg px-4 py-2.5 flex items-center">
                  <input 
                      type="text" 
                      placeholder="请输入员工名字/手机号"
                      className="w-full bg-transparent text-sm focus:outline-none text-gray-800 placeholder:text-gray-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
              </div>
              <button className="text-sm font-bold text-gray-900">搜索</button>
          </div>
      </div>

      {/* Employee List */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
          {filteredEmployees.map(employee => (
              <div 
                key={employee.id}
                className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 cursor-pointer active:opacity-70"
                onClick={() => setCurrentSelection(employee.id)}
              >
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                          {employee.avatar ? (
                              <img src={employee.avatar} className="w-full h-full object-cover" />
                          ) : (
                              <div className="w-full h-full bg-gray-300"></div>
                          )}
                      </div>
                      <div>
                          <div className="text-sm font-bold text-gray-900">{employee.name}</div>
                          <div className="text-xs text-gray-500">{employee.phone}</div>
                      </div>
                  </div>
                  
                  {/* Radio Button */}
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${currentSelection === employee.id ? 'border-[#004e45] bg-white' : 'border-gray-300'}`}>
                      {currentSelection === employee.id && (
                          <div className="w-3 h-3 rounded-full bg-[#004e45]"></div>
                      )}
                  </div>
              </div>
          ))}
          
          {filteredEmployees.length === 0 && (
              <div className="text-center py-10 text-gray-400 text-xs">暂无员工信息</div>
          )}
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 max-w-md mx-auto z-50">
          <button 
            onClick={handleConfirm}
            className="w-full bg-[#004e45] text-white font-bold py-3 rounded-lg active:opacity-90 transition-opacity"
          >
              确定
          </button>
      </div>
    </div>
  );
};