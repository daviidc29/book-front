import React, { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { useAppStore } from '../context/AppContext';
import { Book } from '../types';

const SearchBook: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const { setCurrentBook } = useAppStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`);
      if (!res.ok) throw new Error("Error en la respuesta de Open Library");
      
      const data = await res.json();
      
      const mappedBooks: Book[] = data.docs.map((doc: any) => ({
        id: doc.key,
        title: doc.title,
        author: doc.author_name && doc.author_name.length > 0 ? doc.author_name[0] : 'Autor desconocido',
        coverUrl: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : undefined,
        readUrl: (doc.ia && doc.ia.length > 0) ? `https://archive.org/embed/${doc.ia[0]}?ui=embed` : undefined,
        readerType: (doc.ia && doc.ia.length > 0) ? 'EMBED' : 'FALLBACK'
      }));
      
      setResults(mappedBooks);
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Busca un libro para analizar</h2>
        <form onSubmit={handleSearch} className="flex justify-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Título, autor o palabra clave..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center gap-2 transition">
            <Search size={20} />
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((book) => (
          <div key={book.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition">
            <div className="h-48 bg-gray-200 flex justify-center items-center overflow-hidden">
              {book.coverUrl ? (
                <img src={book.coverUrl} alt={book.title} className="h-full object-cover" />
              ) : (
                <BookOpen size={48} className="text-gray-400" />
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg leading-tight mb-1">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{book.author}</p>
              </div>
              <button
                onClick={() => setCurrentBook(book)}
                className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition font-semibold"
              >
                Leer y Analizar
              </button>
            </div>
          </div>
        ))}
        {!loading && results.length === 0 && query && (
           <p className="col-span-full text-center text-gray-500">No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBook;
