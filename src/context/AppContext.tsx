import React, { createContext, useContext, useState } from 'react';
import { Book, AIHistory } from '../types';

interface AppContextType {
  currentBook: Book | null;
  history: AIHistory[];
  setCurrentBook: (book: Book | null) => void;
  addToHistory: (entry: AIHistory) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppStore = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppStore debe usarse dentro de un AppProvider");
  return ctx;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [history, setHistory] = useState<AIHistory[]>([]);

  const addToHistory = React.useCallback((entry: AIHistory) => {
    setHistory((prev) => [entry, ...prev]);
  }, []);

  return (
    <AppContext.Provider value={{ currentBook, history, setCurrentBook, addToHistory }}>
      {children}
    </AppContext.Provider>
  );
};
