import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useAppStore } from '../context/AppContext';
import { useTextSelection } from '../hooks/useTextSelection';
import AIModal from './AIModal';

const ReaderView: React.FC = () => {
  const { currentBook } = useAppStore();
  const { selection, clearSelection } = useTextSelection();
  const [isModalOpen, setModalOpen] = useState(false);
  const [contextText, setContextText] = useState("");

  if (!currentBook) return <div className="p-4">Selecciona un libro para leer.</div>;

  return (
    <div className="relative flex flex-col lg:flex-row h-[calc(100vh-68px)] w-full bg-gray-50 overflow-hidden">
      
      {/* COLUMNA IZQUIERDA: Lector del Libro Real (Iframe) */}
      <div className="w-full lg:w-2/3 h-[50vh] lg:h-full border-b lg:border-b-0 lg:border-r border-gray-200">
        {currentBook.readUrl ? (
          <iframe
            src={currentBook.readUrl}
            className="w-full h-full border-0"
            title={`Lector de ${currentBook.title}`}
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-gray-100 p-8 text-center">
            <BookOpen size={64} className="mb-4 text-gray-300" />
            <p className="text-xl font-semibold text-gray-700">Vista previa no disponible</p>
            <p className="text-sm mt-2 max-w-md">
              Open Library no tiene un visor digital gratuito disponible para esta edición específica.
            </p>
          </div>
        )}
      </div>

      {/* COLUMNA DERECHA: Zona de Análisis para la IA */}
      <div className="w-full lg:w-1/3 h-full p-6 flex flex-col bg-white overflow-y-auto shadow-inner">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{currentBook.title}</h2>
        <p className="text-gray-600 mb-6 font-medium">Por: {currentBook.author}</p>

        <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
          <span>📝</span> Zona de Análisis
        </h3>
        
        <textarea
          className="w-full flex-1 min-h-[200px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-lg leading-relaxed shadow-sm"
          placeholder="Escribe o pega aquí un fragmento del libro que estés leyendo..."
          value={contextText}
          onChange={(e) => setContextText(e.target.value)}
        />
        <p className="text-xs text-gray-400 mt-2 text-center">
          Selecciona cualquier palabra de la caja de texto superior para activar el agente.
        </p>

        {/* El botón ahora usa position: 'fixed' para anclarse correctamente a la pantalla */}
        {selection && !isModalOpen && (
          <button
            onMouseDown={(e) => {
              e.preventDefault(); // Evitamos que se pierda el foco del textarea
              setModalOpen(true);
            }}
            style={{ 
              position: 'fixed',
              top: selection.y, 
              left: selection.x, 
              transform: 'translate(-50%, -100%)', 
              marginTop: '-10px',
              zIndex: 9998
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-2xl hover:bg-blue-700 transition font-bold flex items-center gap-2 border-2 border-white cursor-pointer"
          >
            ✨ Preguntar a la IA
          </button>
        )}
      </div>

      {isModalOpen && selection && (
        <AIModal 
           word={selection.text} 
           context={contextText || "Sin contexto proporcionado"} 
           onClose={() => { setModalOpen(false); clearSelection(); }} 
        />
      )}
    </div>
  );
};

export default ReaderView;
