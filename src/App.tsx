import React from 'react';
import { BookOpen } from 'lucide-react';
import { AppProvider, useAppStore } from './context/AppContext';
import SearchBook from './components/SearchBook';
import ReaderView from './components/ReaderView';

const AppContent: React.FC = () => {
  const { currentBook, setCurrentBook } = useAppStore();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm p-4 flex justify-between items-center z-10">
        <h1 
          className="text-xl font-bold text-blue-600 cursor-pointer flex items-center gap-2" 
          onClick={() => setCurrentBook(null)}
        >
          <BookOpen size={24} />
          Book AI Analyst
        </h1>
        {currentBook && (
          <button 
            onClick={() => setCurrentBook(null)}
            className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition"
          >
            Volver a Buscar
          </button>
        )}
      </nav>

      <main className="flex-1 flex flex-col">
        {!currentBook ? <SearchBook /> : <ReaderView />}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}