import { useState, useEffect } from 'react';

export const useTextSelection = () => {
  const [selection, setSelection] = useState<{ text: string; x: number; y: number } | null>(null);

  useEffect(() => {
    // Detectamos cuando el usuario hace clic para limpiar selecciones previas
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // EXCEPCIÓN CLAVE: Si el clic es en el botón flotante, no limpiamos la selección
      if (target.closest('button')) {
        return; 
      }
      setSelection(null);
    };

    const handleMouseUp = (e: MouseEvent) => {
      // Usamos un pequeño retraso para asegurar que el navegador registre la selección en el textarea
      setTimeout(() => {
        let text = '';
        const activeElement = document.activeElement;

        // Comprobamos si el usuario está seleccionando texto DENTRO de un textarea
        if (activeElement && (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT')) {
          const ta = activeElement as HTMLTextAreaElement;
          const start = ta.selectionStart;
          const end = ta.selectionEnd;
          
          if (start !== undefined && end !== undefined && start !== end) {
            text = ta.value.substring(start, end).trim();
          }
        } else {
          // Selección de texto normal en el resto de la página
          const activeSelection = window.getSelection();
          if (activeSelection && !activeSelection.isCollapsed) {
            text = activeSelection.toString().trim();
          }
        }

        if (text) {
          // Guardamos las coordenadas del ratón (cliente) para posicionar el botón de forma fija
          setSelection({
            text,
            x: e.clientX,
            y: e.clientY - 20
          });
        } else {
          setSelection(null);
        }
      }, 10);
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return { selection, clearSelection: () => setSelection(null) };
};
