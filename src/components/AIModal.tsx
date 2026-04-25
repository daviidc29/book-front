import React, { useState, useEffect } from 'react';
import { useAppStore } from '../context/AppContext';
import { API_URL } from '../utils/api';

interface AIModalProps {
  word: string;
  context: string;
  onClose: () => void;
}

const AIModal: React.FC<AIModalProps> = ({ word, context, onClose }) => {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { currentBook, addToHistory } = useAppStore();
  const hasFetched = React.useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchAnalysis = async () => {
      try {
        const res = await fetch(`${API_URL}/api/analysis/word-context`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            palabra: word,
            libro: currentBook?.title,
            autor: currentBook?.author,
            parrafo: context
          })
        });
        
        if (!res.ok) {
           throw new Error(`Error del servidor: ${res.status}`);
        }

        const rawText = await res.text();
        console.log("Respuesta cruda del backend:", rawText);

        if (!rawText) {
          throw new Error("El backend devolvió una respuesta vacía.");
        }

        const data = JSON.parse(rawText);
        // Leemos la propiedad que devuelve Java (analisisLiterario o analisis_literario)
        const respuestaIA = data.analisisLiterario || data.analisis_literario;
        setResponse(respuestaIA);
        addToHistory({ word, context, response: respuestaIA });
      } catch (error) {
        console.error("Error capturado en frontend:", error);
        setResponse("Error al contactar con la IA. Revisa la consola del backend de Spring Boot o n8n.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [word, context, currentBook, addToHistory]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-lg w-96 shadow-2xl transform transition-all">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">✨ Análisis Literario</h3>
        <p className="text-sm text-gray-500 mb-4">Palabra: <strong>{word}</strong></p>
        
        <div className="min-h-[100px] max-h-[300px] overflow-y-auto bg-blue-50/50 p-4 rounded text-gray-800 whitespace-pre-wrap border border-blue-100">
          {loading ? <div className="animate-pulse flex items-center gap-2 text-blue-600 font-medium">Consultando agente de IA...</div> : <p>{response}</p>}
        </div>

        <button onClick={onClose} className="mt-4 w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition shadow-md">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AIModal;
