import React, { useState } from 'react';
import { Button } from './Button';
import { generateDataFromPrompt } from '../services/geminiService';

interface AIModeProps {
  onStart: () => void;
  onSuccess: (data: any[]) => void;
  onError: (error: string) => void;
  isGenerating: boolean;
}

export const AIMode: React.FC<AIModeProps> = ({ onStart, onSuccess, onError, isGenerating }) => {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    onStart();
    try {
      const data = await generateDataFromPrompt(prompt);
      onSuccess(data);
    } catch (err: any) {
      onError(err.message || "Error desconocido");
    }
  };

  const suggestions = [
    "Genera 10 usuarios con nombre, email corporativo y puesto de trabajo en tecnología.",
    "Crea una lista de 5 productos farmacéuticos con ID, nombre, fecha de caducidad y precio en euros.",
    "Necesito 5 direcciones ficticias de Madrid con código postal y barrio."
  ];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex gap-3">
        <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 className="text-sm font-semibold text-blue-800 mb-1">Asistente Inteligente</h3>
          <p className="text-sm text-blue-700 leading-relaxed">
            Describe exactamente qué datos necesitas. El modelo de IA interpretará tu petición y generará una estructura JSON adecuada.
            Puedes especificar cantidad, idioma, formato y reglas de negocio simples.
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="prompt" className="block text-sm font-semibold text-gray-700 mb-2">
          Instrucciones para la generación
        </label>
        <textarea
          id="prompt"
          rows={5}
          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-base sm:text-sm border-gray-300 rounded-lg p-3 border hover:border-blue-400 transition-colors"
          placeholder="Ej: Genera 10 clientes con nombre, saldo en cuenta, estado (activo/inactivo) y fecha de último acceso."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div>
        <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Sugerencias rápidas:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => setPrompt(s)}
              className="text-xs bg-gray-100 hover:bg-white hover:border-blue-300 border border-transparent text-gray-700 px-3 py-1.5 rounded-full transition-all shadow-sm"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button 
          onClick={handleGenerate} 
          isLoading={isGenerating}
          disabled={!prompt.trim()}
          className="w-full sm:w-auto min-w-[140px]"
        >
          Generar con IA
        </Button>
      </div>
    </div>
  );
};