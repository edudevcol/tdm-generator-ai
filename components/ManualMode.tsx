import React, { useState } from 'react';
import { Button } from './Button';
import { AVAILABLE_FIELDS } from '../types';
import { generateDataFromFields } from '../services/geminiService';

interface ManualModeProps {
  onStart: () => void;
  onSuccess: (data: any[]) => void;
  onError: (error: string) => void;
  isGenerating: boolean;
}

export const ManualMode: React.FC<ManualModeProps> = ({ onStart, onSuccess, onError, isGenerating }) => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [count, setCount] = useState<number>(5);

  const toggleField = (id: string) => {
    setSelectedFields(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    if (selectedFields.length === 0) return;
    
    onStart();
    try {
      // Find labels for better prompting
      const fieldLabels = selectedFields.map(id => 
        AVAILABLE_FIELDS.find(f => f.id === id)?.label || id
      );
      
      const data = await generateDataFromFields(fieldLabels, count);
      onSuccess(data);
    } catch (err: any) {
      onError(err.message || "Error desconocido");
    }
  };

  const categories = Array.from(new Set(AVAILABLE_FIELDS.map(f => f.category)));

  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'personal': return 'Información Personal';
      case 'financial': return 'Datos Financieros';
      case 'business': return 'Negocios y Empleo';
      case 'location': return 'Ubicación';
      default: return cat;
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'personal': 
        return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
      case 'financial':
        return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      case 'business':
        return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
      case 'location':
        return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
      default: return null;
    }
  }

  return (
    <div className="space-y-8">
      
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
           <label htmlFor="count" className="block text-sm font-semibold text-gray-700 mb-3 flex justify-between">
            <span>Cantidad de registros a generar</span>
            <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 font-mono">
              {count}
            </span>
          </label>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">1</span>
            <input
              type="range"
              id="count"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-xs text-gray-500">50</span>
          </div>
        </div>

        <div className="space-y-8">
          {categories.map(category => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                <span className="text-gray-400 bg-gray-50 p-1.5 rounded-md">
                  {getCategoryIcon(category)}
                </span>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  {getCategoryLabel(category)}
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {AVAILABLE_FIELDS.filter(f => f.category === category).map(field => (
                  <button 
                    key={field.id}
                    onClick={() => toggleField(field.id)}
                    className={`
                      relative flex items-center px-4 py-3 border rounded-lg transition-all duration-200 group text-left
                      ${selectedFields.includes(field.id) 
                        ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500 shadow-sm' 
                        : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'}
                    `}
                  >
                    <div className={`
                      w-5 h-5 rounded border mr-3 flex items-center justify-center transition-colors
                      ${selectedFields.includes(field.id) 
                        ? 'bg-blue-600 border-blue-600' 
                        : 'bg-white border-gray-300 group-hover:border-gray-400'}
                    `}>
                      {selectedFields.includes(field.id) && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm font-medium ${selectedFields.includes(field.id) ? 'text-blue-900' : 'text-gray-700'}`}>
                      {field.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button 
          onClick={handleGenerate} 
          isLoading={isGenerating}
          disabled={selectedFields.length === 0}
          className="w-full sm:w-auto min-w-[160px]"
        >
          Generar {count} Registros
        </Button>
      </div>
    </div>
  );
};