import React, { useState } from 'react';
import { AIMode } from './components/AIMode';
import { ManualMode } from './components/ManualMode';
import { ResultsTable } from './components/ResultsTable';
import { GeneratedDataRow } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'ai' | 'manual'>('ai');
  const [data, setData] = useState<GeneratedDataRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = (newData: GeneratedDataRow[]) => {
    setData(newData);
    setIsLoading(false);
    setError(null);
  };

  const handleError = (msg: string) => {
    setError(msg);
    setIsLoading(false);
  };

  const startLoading = () => {
    setIsLoading(true);
    setError(null);
    setData([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">GenData <span className="text-blue-600">TDM</span></span>
            </div>
            <div className="text-sm text-gray-500 hidden sm:block bg-gray-100 px-3 py-1 rounded-full font-medium">
              v1.0 Demo Técnica
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4 tracking-tight">
            Generador de Datos Sintéticos
          </h1>
          <p className="text-lg text-slate-600">
            Crea datos de prueba (Test Data) realistas y estructurados en segundos utilizando Inteligencia Artificial.
          </p>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">Seleccionar modo</label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
              value={activeTab}
              onChange={(e) => {
                setActiveTab(e.target.value as 'ai' | 'manual');
                setData([]);
                setError(null);
              }}
            >
              <option value="ai">Lenguaje Natural (IA)</option>
              <option value="manual">Selección Manual</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 justify-center" aria-label="Tabs">
                <button
                  onClick={() => {
                    setActiveTab('ai');
                    setData([]);
                    setError(null);
                  }}
                  className={`
                    whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all duration-200
                    ${activeTab === 'ai'
                      ? 'border-blue-600 text-blue-600 bg-blue-50/50 rounded-t-lg'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Modo Inteligente (IA)
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('manual');
                    setData([]);
                    setError(null);
                  }}
                  className={`
                    whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all duration-200
                    ${activeTab === 'manual'
                      ? 'border-blue-600 text-blue-600 bg-blue-50/50 rounded-t-lg'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    Selección Manual
                  </div>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md shadow-sm animate-fade-in">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white shadow-lg shadow-slate-200/50 rounded-2xl overflow-hidden border border-slate-100 p-6 sm:p-8">
            {activeTab === 'ai' ? (
              <AIMode
                onStart={startLoading}
                onSuccess={handleSuccess}
                onError={handleError}
                isGenerating={isLoading}
              />
            ) : (
              <ManualMode
                onStart={startLoading}
                onSuccess={handleSuccess}
                onError={handleError}
                isGenerating={isLoading}
              />
            )}
          </div>

          <ResultsTable data={data} isLoading={isLoading} />

        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} GenData TDM. Demo profesional by edudev.
        </div>
      </footer>
    </div>
  );
}

export default App;