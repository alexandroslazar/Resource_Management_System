import { useState } from 'react';
import { Search, Send, Package, Building2, CheckCircle } from 'lucide-react';

interface SearchResult {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  municipality: string;
  distance: string;
}

export function ResourceRequest() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [quantityNeeded, setQuantityNeeded] = useState('');
  const [justification, setJustification] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResource, setSelectedResource] = useState<SearchResult | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const categories = ['Μηχανήματα', 'Οχήματα', 'Εξοπλισμός', 'Εργαλεία', 'Υλικά Κατασκευών', 'Άλλο'];

  // Mock search results
  const mockResults: SearchResult[] = [
    { id: '1', name: 'Γερανός 20 Τόνων', category: 'Μηχανήματα', quantity: 2, unit: 'Τεμάχια', municipality: 'Δήμος Πειραιά', distance: '8 km' },
    { id: '2', name: 'Γερανός 15 Τόνων', category: 'Μηχανήματα', quantity: 1, unit: 'Τεμάχια', municipality: 'Δήμος Καλλιθέας', distance: '5 km' },
    { id: '3', name: 'Φορτηγό με Γερανό', category: 'Οχήματα', quantity: 3, unit: 'Τεμάχια', municipality: 'Δήμος Χαλανδρίου', distance: '10 km' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    // Mock search - σε πραγματική εφαρμογή θα γινόταν αναζήτηση στη βάση
    setSearchResults(mockResults.filter(r => 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (category && r.category === category)
    ));
  };

  const handleSubmitRequest = () => {
    if (!selectedResource || !quantityNeeded || !justification) {
      return;
    }

    // Mock submission
    console.log('Submitting request:', {
      resource: selectedResource,
      quantity: quantityNeeded,
      justification
    });

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSearchQuery('');
      setCategory('');
      setQuantityNeeded('');
      setJustification('');
      setSearchResults([]);
      setSelectedResource(null);
      setHasSearched(false);
    }, 3000);
  };

  return (
    <div>
      <h2 className="text-3xl text-white mb-8">Αίτηση Πόρων</h2>

      {showSuccess && (
        <div className="mb-6 bg-green-500/20 border border-green-500/50 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <div>
            <p className="text-green-400">Αίτηση Υποβλήθηκε!</p>
            <p className="text-sm text-green-300">Η αίτησή σας καταχωρήθηκε με κατάσταση "Σε αναμονή έγκρισης".</p>
          </div>
        </div>
      )}

      {/* Search Form */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
        <h3 className="text-xl text-white mb-4">Αναζήτηση Πόρων</h3>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Όνομα/Τύπος Πόρου</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="π.χ. Γερανός"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Κατηγορία</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
              >
                <option value="" className="bg-slate-800">Όλες οι κατηγορίες</option>
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg transition-all shadow-lg"
          >
            <Search className="w-5 h-5" />
            Αναζήτηση
          </button>
        </form>
      </div>

      {/* Search Results */}
      {hasSearched && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
          <h3 className="text-xl text-white mb-4">
            Αποτελέσματα Αναζήτησης ({searchResults.length})
          </h3>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedResource?.id === result.id
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
                  onClick={() => setSelectedResource(result)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white mb-1">{result.name}</h4>
                      <p className="text-sm text-gray-400 mb-2">{result.category}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                        <Building2 className="w-4 h-4" />
                        <span>{result.municipality}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Διαθέσιμα: {result.quantity} {result.unit}</span>
                        <span className="text-gray-400">{result.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">Δεν βρέθηκαν πόροι που να ταιριάζουν με τα κριτήρια αναζήτησης.</p>
          )}
        </div>
      )}

      {/* Request Form */}
      {selectedResource && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl text-white mb-4">Υποβολή Αίτησης</h3>
          
          <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 mb-6">
            <p className="text-blue-300">
              Επιλεγμένος Πόρος: <span className="text-white">{selectedResource.name}</span> από <span className="text-white">{selectedResource.municipality}</span>
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Ποσότητα που Χρειάζεστε *</label>
              <input
                type="number"
                min="1"
                max={selectedResource.quantity}
                value={quantityNeeded}
                onChange={(e) => setQuantityNeeded(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                placeholder={`Μέγιστο: ${selectedResource.quantity} ${selectedResource.unit}`}
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Αιτιολόγηση *</label>
              <textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                placeholder="Εξηγήστε γιατί χρειάζεστε τον πόρο και πώς θα χρησιμοποιηθεί..."
              />
            </div>

            <button
              onClick={handleSubmitRequest}
              disabled={!quantityNeeded || !justification}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              Υποβολή Αίτησης
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
