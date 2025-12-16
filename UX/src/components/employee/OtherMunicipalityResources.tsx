import { useState } from 'react';
import { Search, Building2, Package, Send, CheckCircle } from 'lucide-react';

/**
 * Interface για πόρο άλλου δήμου
 */
interface Resource {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  municipality: string;
  distance: string;
}

/**
 * Interface για εκκρεμή αίτηση πόρου
 */
interface PendingRequest {
  id: string;
  resourceName: string;
  quantity: number;
  municipality: string;
  status: string;
  date: string;
}

/**
 * Other Municipality Resources Component
 * Ενσωματωμένο component που συνδυάζει:
 * 1. Περιήγηση πόρων άλλων δήμων (Browse tab)
 * 2. Αίτηση δανεισμού πόρων (Request tab)
 * 
 * Παρέχει πλήρη ροή αίτησης πόρων με καταγραφή στο σύστημα
 */
export function OtherMunicipalityResources() {
  // State για το ενεργό tab (περιήγηση ή αίτηση)
  const [activeTab, setActiveTab] = useState<'browse' | 'request'>('browse');
  
  // States για την περιήγηση πόρων
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterMunicipality, setFilterMunicipality] = useState('');
  
  // States για τη φόρμα αίτησης
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [quantityNeeded, setQuantityNeeded] = useState('');
  const [justification, setJustification] = useState('');
  const [searchResults, setSearchResults] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  // State για τις εκκρεμείς αιτήσεις του χρήστη
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);

  /**
   * Mock data - Διαθέσιμοι πόροι από άλλους δήμους
   * Σε πραγματική εφαρμογή θα προέρχονταν από API
   */
  const resources: Resource[] = [
    { id: '1', name: 'Γερανός 20 Τόνων', category: 'Μηχανήματα', quantity: 1, unit: 'Τεμάχια', municipality: 'Δήμος Πειραιά', distance: '8 km' },
    { id: '2', name: 'Ασφαλτόστρωση', category: 'Υλικά Κατασκευών', quantity: 2000, unit: 'Κιλά', municipality: 'Δήμος Καλλιθέας', distance: '5 km' },
    { id: '3', name: 'Αντλία Λυμάτων', category: 'Εξοπλισμός', quantity: 3, unit: 'Τεμάχια', municipality: 'Δήμος Περιστερίου', distance: '12 km' },
    { id: '4', name: 'Φορτηγό Iveco', category: 'Οχήματα', quantity: 2, unit: 'Τεμάχια', municipality: 'Δήμος Αμαρουσίου', distance: '15 km' },
    { id: '5', name: 'Χωματουργικά Εργαλεία', category: 'Εργαλεία', quantity: 50, unit: 'Τεμάχια', municipality: 'Δήμος Γλυφάδας', distance: '18 km' },
    { id: '6', name: 'Ηλεκτρογεννήτρια 100KW', category: 'Μηχανήματα', quantity: 1, unit: 'Τεμάχια', municipality: 'Δήμος Χαλανδρίου', distance: '10 km' },
    { id: '7', name: 'Γερανός 15 Τόνων', category: 'Μηχανήματα', quantity: 1, unit: 'Τεμάχια', municipality: 'Δήμος Καλλιθέας', distance: '5 km' },
    { id: '8', name: 'Φορτηγό με Γερανό', category: 'Οχήματα', quantity: 3, unit: 'Τεμάχια', municipality: 'Δήμος Χαλανδρίου', distance: '10 km' },
  ];

  // Διαθέσιμες κατηγορίες πόρων
  const categories = ['Μηχανήματα', 'Οχήματα', 'Εξοπλισμός', 'Εργαλεία', 'Υλικά Κατασκευών', 'Άλλο'];
  // Εξαγωγή μοναδικών δήμων από τους διαθέσιμους πόρους
  const municipalities = [...new Set(resources.map(r => r.municipality))];

  /**
   * Φιλτράρισμα πόρων βάση των κριτηρίων αναζήτησης
   */
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || resource.category === filterCategory;
    const matchesMunicipality = !filterMunicipality || resource.municipality === filterMunicipality;
    return matchesSearch && matchesCategory && matchesMunicipality;
  });

  /**
   * Χειρισμός αναζήτησης πόρων για αίτηση
   * Φιλτράρει τους διαθέσιμους πόρους βάση όνομα/κατηγορία
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setSearchResults(resources.filter(r => 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (category && r.category === category)
    ));
  };

  /**
   * Υποβολή αίτησης δανεισμού πόρου
   * Δημιουργεί νέα αίτηση με κατάσταση "Σε αναμονή έγκρισης"
   * και την προσθέτει στη λίστα εκκρεμών αιτήσεων
   */
  const handleSubmitRequest = () => {
    if (!selectedResource || !quantityNeeded || !justification) {
      return;
    }

    // Δημιουργία νέας αίτησης με status "Σε αναμονή έγκρισης"
    const newRequest: PendingRequest = {
      id: `REQ-${Date.now()}`,
      resourceName: selectedResource.name,
      quantity: parseInt(quantityNeeded),
      municipality: selectedResource.municipality,
      status: 'Σε αναμονή έγκρισης',
      date: new Date().toISOString()
    };

    setPendingRequests([...pendingRequests, newRequest]);

    console.log('Submitting request:', {
      resource: selectedResource,
      quantity: quantityNeeded,
      justification,
      status: 'Σε αναμονή έγκρισης'
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
      <h2 className="text-3xl text-white mb-8">Πόροι Άλλων Δήμων</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('browse')}
          className={`px-6 py-3 rounded-lg transition-all ${
            activeTab === 'browse'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          Περιήγηση Πόρων
        </button>
        <button
          onClick={() => setActiveTab('request')}
          className={`px-6 py-3 rounded-lg transition-all ${
            activeTab === 'request'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          Αίτηση Πόρων
        </button>
      </div>

      {/* Browse Tab */}
      {activeTab === 'browse' && (
        <>
          {/* Filters */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Αναζήτηση πόρου..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
              >
                <option value="" className="bg-slate-800">Όλες οι κατηγορίες</option>
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                ))}
              </select>

              <select
                value={filterMunicipality}
                onChange={(e) => setFilterMunicipality(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
              >
                <option value="" className="bg-slate-800">Όλοι οι δήμοι</option>
                {municipalities.map(mun => (
                  <option key={mun} value={mun} className="bg-slate-800">{mun}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 mb-6">
            <p className="text-blue-300">
              Προβολή διαθέσιμων πόρων από γειτονικούς δήμους. Μπορείτε να υποβάλετε αίτηση δανεισμού από την καρτέλα "Αίτηση Πόρων".
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/30 transition-all hover:scale-105"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg text-white mb-1 truncate">{resource.name}</h3>
                    <p className="text-sm text-gray-400">{resource.category}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">{resource.municipality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Ποσότητα:</span>
                    <span className="text-white">{resource.quantity} {resource.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Απόσταση:</span>
                    <span className="text-white">{resource.distance}</span>
                  </div>
                </div>

                <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg transition-all">
                  Προβολή Λεπτομερειών
                </button>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Δεν βρέθηκαν διαθέσιμοι πόροι</p>
            </div>
          )}
        </>
      )}

      {/* Request Tab */}
      {activeTab === 'request' && (
        <>
          {showSuccess && (
            <div className="mb-6 bg-green-500/20 border border-green-500/50 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-green-400">Αίτηση Υποβλήθηκε!</p>
                <p className="text-sm text-green-300">Η αίτησή σας καταχωρήθηκε στο σύστημα με κατάσταση "Σε αναμονή έγκρισης".</p>
              </div>
            </div>
          )}

          {/* Pending Requests */}
          {pendingRequests.length > 0 && (
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
              <h3 className="text-xl text-white mb-4">Οι Αιτήσεις Μου</h3>
              <div className="space-y-3">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <p className="text-white mb-1">{request.resourceName}</p>
                        <p className="text-sm text-gray-400">
                          {request.quantity} τεμ. από {request.municipality}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-300">
                          {new Date(request.date).toLocaleDateString('el-GR')}
                        </span>
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full border border-yellow-500/50">
                          {request.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
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
        </>
      )}
    </div>
  );
}