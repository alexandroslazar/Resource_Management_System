import { useState } from 'react';
import { LogOut, TrendingUp, Search, Menu, X, Package, Activity, BarChart3, Receipt } from 'lucide-react';

interface CitizenDashboardProps {
  onLogout: () => void;
}

/**
 * Interface για τα στατιστικά δεδομένα
 */
interface StatData {
  totalResources: number;
  inUse: number;
  available: number;
  resourcesByCategory: { category: string; count: number }[];
}

/**
 * Τύποι views που διατίθενται στους πολίτες
 */
type View = 'search' | 'statistics' | 'transactions';

/**
 * Citizen Dashboard Component
 * Δημόσιο dashboard για πολίτες με δυνατότητα:
 * - Αναζήτησης διαθέσιμων πόρων
 * - Προβολής στατιστικών δήμου
 * - Προβολής ιστορικού συναλλαγών
 * Παρέχει διαφάνεια στη διαχείριση δημοτικών πόρων
 */
export function CitizenDashboard({ onLogout }: CitizenDashboardProps) {
  // State για το τρέχον view
  const [currentView, setCurrentView] = useState<View>('search');
  // State για mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State για φίλτρα αναζήτησης
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  // State για αποτελέσματα αναζήτησης
  const [searchResults, setSearchResults] = useState<any[]>([]);
  // State για να γνωρίζουμε αν έχει γίνει αναζήτηση
  const [hasSearched, setHasSearched] = useState(false);

  /**
   * Στοιχεία μενού sidebar
   */
  const menuItems = [
    { id: 'search' as const, icon: Search, label: 'Αναζήτηση Πόρων' },
    { id: 'statistics' as const, icon: BarChart3, label: 'Προβολή Στατιστικών' },
    { id: 'transactions' as const, icon: Receipt, label: 'Προβολή Συναλλαγών' }
  ];

  /**
   * Mock data - Στατιστικά δεδομένα
   * Σε πραγματική εφαρμογή θα προέρχονταν από API
   */
  const stats: StatData = {
    totalResources: 245,
    inUse: 58,
    available: 187,
    resourcesByCategory: [
      { category: 'Μηχανήματα', count: 45 },
      { category: 'Οχήματα', count: 68 },
      { category: 'Εξοπλισμός', count: 87 },
      { category: 'Εργαλεία', count: 32 },
      { category: 'Υλικά Κατασκευών', count: 13 }
    ]
  };

  /**
   * Mock data - Πρόσφατες συναλλαγές του δήμου
   */
  const recentActions = [
    { id: '1', action: 'Δανεισμός Εκσκαφέα', municipality: 'Προς Δήμο Πειραιά', date: '2025-12-09', status: 'completed' },
    { id: '2', action: 'Λήψη Αντλίας Νερού', municipality: 'Από Δήμο Καλλιθέας', date: '2025-12-08', status: 'completed' },
    { id: '3', action: 'Καταγραφή Νέου Οχήματος', municipality: 'Δήμος Αθηναίων', date: '2025-12-07', status: 'completed' },
    { id: '4', action: 'Επιστροφή Γερανού', municipality: 'Προς Δήμο Χαλανδρίου', date: '2025-12-06', status: 'completed' },
    { id: '5', action: 'Δανεισμός Ηλεκτρογεννήτριας', municipality: 'Προς Δήμο Γλυφάδας', date: '2025-12-05', status: 'completed' },
    { id: '6', action: 'Λήψη Φορτηγού', municipality: 'Από Δήμο Αμαρουσίου', date: '2025-12-04', status: 'completed' }
  ];

  // Διαθέσιμες κατηγορίες πόρων
  const categories = ['Μηχανήματα', 'Οχήματα', 'Εξοπλισμός', 'Εργαλεία', 'Υλικά Κατασκευών'];

  /**
   * Mock data - Αποτελέσματα αναζήτησης
   */
  const mockSearchResults = [
    { id: '1', name: 'Γερανός 20 Τόνων', category: 'Μηχανήματα', status: 'Διαθέσιμο', municipality: 'Δήμος Πειραιά' },
    { id: '2', name: 'Φορτηγό Iveco', category: 'Οχήματα', status: 'Σε Χρήση', municipality: 'Δήμος Αμαρουσίου' },
    { id: '3', name: 'Αντλία Λυμάτων', category: 'Εξοπλισμός', status: 'Διαθέσιμο', municipality: 'Δήμος Περιστερίου' },
    { id: '4', name: 'Ηλεκτρογεννήτρια 100KW', category: 'Μηχανήματα', status: 'Διαθέσιμο', municipality: 'Δήμος Χαλανδρίου' }
  ];

  /**
   * Χειρισμός αναζήτησης πόρων
   * Φιλτράρει τα αποτελέσματα με βάση τα επιλεγμένα κριτήρια
   */
  const handleSearch = () => {
    setHasSearched(true);
    let results = mockSearchResults;
    
    // Φιλτράρισμα βάση κατηγορίας
    if (filterType) {
      results = results.filter(r => r.category === filterType);
    }
    
    // Φιλτράρισμα βάση κατάστασης
    if (filterStatus) {
      const statusMap: Record<string, string> = {
        'available': 'Διαθέσιμο',
        'in-use': 'Σε Χρήση',
        'lent': 'Δανεισμένο'
      };
      results = results.filter(r => r.status === statusMap[filterStatus]);
    }
    
    setSearchResults(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header - Κεφαλίδα με λογότυπο και πληροφορίες χρήστη */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              {/* Logo */}
              <h1 className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                efficiencity
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {/* User info */}
              <div className="hidden sm:block text-right">
                <p className="text-white">Πολίτης</p>
                <p className="text-sm text-gray-300">Δήμος Αθηναίων</p>
              </div>
              {/* Logout button */}
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Αποσύνδεση</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar Navigation */}
        <aside className={`
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:static
          inset-y-0 left-0
          z-40
          w-64
          bg-white/5 backdrop-blur-lg
          border-r border-white/10
          transition-transform duration-300
          pt-20 lg:pt-0
        `}>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile overlay */}
        {isMobileMenuOpen && (
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Search View - Αναζήτηση Πόρων */}
          {currentView === 'search' && (
            <div>
              <h2 className="text-3xl text-white mb-8">Αναζήτηση Πόρων</h2>

              {/* Search Filters Section */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
                <h3 className="text-xl text-white mb-4">Φίλτρα Αναζήτησης</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Resource Type Filter */}
                  <div>
                    <label className="block text-gray-300 mb-2">Τύπος Πόρου</label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                    >
                      <option value="" className="bg-slate-800">Όλοι οι τύποι</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-gray-300 mb-2">Κατάσταση</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                    >
                      <option value="" className="bg-slate-800">Όλες οι καταστάσεις</option>
                      <option value="available" className="bg-slate-800">Διαθέσιμο</option>
                      <option value="in-use" className="bg-slate-800">Σε Χρήση</option>
                      <option value="lent" className="bg-slate-800">Δανεισμένο</option>
                    </select>
                  </div>

                  {/* Search Button */}
                  <div className="flex items-end">
                    <button
                      onClick={handleSearch}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all shadow-lg"
                    >
                      <Search className="w-5 h-5" />
                      Αναζήτηση
                    </button>
                  </div>
                </div>
              </div>

              {/* Search Results Display */}
              {hasSearched && (
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl text-white mb-4">
                    Αποτελέσματα ({searchResults.length})
                  </h3>
                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.map((result) => (
                        <div
                          key={result.id}
                          className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all"
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                              <Package className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white mb-1 truncate">{result.name}</h4>
                              <p className="text-sm text-gray-400">{result.category}</p>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Κατάσταση:</span>
                              <span className={`${
                                result.status === 'Διαθέσιμο' ? 'text-green-400' : 'text-yellow-400'
                              }`}>
                                {result.status}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Δήμος:</span>
                              <span className="text-white text-xs">{result.municipality}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">
                      Δεν βρέθηκαν πόροι με τα επιλεγμένα κριτήρια.
                    </p>
                  )}
                </div>
              )}

              {/* Info message when search hasn't been performed */}
              {!hasSearched && (
                <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-4">
                  <p className="text-purple-300">
                    Επιλέξτε φίλτρα και πατήστε "Αναζήτηση" για να δείτε διαθέσιμους πόρους.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Statistics View - Προβολή Στατιστικών */}
          {currentView === 'statistics' && (
            <div>
              <h2 className="text-3xl text-white mb-8">Στατιστικά Πόρων</h2>

              {/* General Statistics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="w-8 h-8 text-purple-400" />
                    <p className="text-gray-300">Συνολικοί Πόροι</p>
                  </div>
                  <p className="text-4xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {stats.totalResources}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="w-8 h-8 text-blue-400" />
                    <p className="text-gray-300">Σε Χρήση</p>
                  </div>
                  <p className="text-4xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {stats.inUse}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-8 h-8 text-green-400" />
                    <p className="text-gray-300">Διαθέσιμοι</p>
                  </div>
                  <p className="text-4xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {stats.available}
                  </p>
                </div>
              </div>

              {/* Resources by Category Chart */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
                <h3 className="text-xl text-white mb-6">Πόροι ανά Κατηγορία</h3>
                <div className="space-y-4">
                  {stats.resourcesByCategory.map((item, index) => {
                    const percentage = (item.count / stats.totalResources) * 100;
                    return (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-300">{item.category}</span>
                          <span className="text-white">{item.count} ({percentage.toFixed(1)}%)</span>
                        </div>
                        {/* Progress bar */}
                        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-4">
                <p className="text-purple-300">
                  Τα στατιστικά ενημερώνονται σε πραγματικό χρόνο και παρέχουν πλήρη διαφάνεια στη διαχείριση των δημοτικών πόρων.
                </p>
              </div>
            </div>
          )}

          {/* Transactions View - Προβολή Συναλλαγών */}
          {currentView === 'transactions' && (
            <div>
              <h2 className="text-3xl text-white mb-8">Πρόσφατες Συναλλαγές</h2>

              {/* Transactions History List */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
                <h3 className="text-xl text-white mb-6">Ιστορικό Ενεργειών Δήμου</h3>
                <div className="space-y-3">
                  {recentActions.map((action) => (
                    <div
                      key={action.id}
                      className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          {/* Action description */}
                          <p className="text-white mb-1">{action.action}</p>
                          {/* Municipality involved */}
                          <p className="text-sm text-gray-400">{action.municipality}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* Transaction date */}
                          <span className="text-sm text-gray-300">{new Date(action.date).toLocaleDateString('el-GR')}</span>
                          {/* Status badge */}
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/50">
                            Ολοκληρώθηκε
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Information Box */}
              <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-4">
                <p className="text-purple-300">
                  Ως πολίτης, έχετε πρόσβαση σε δημόσια στατιστικά και πληροφορίες για τη διαχείριση των πόρων του δήμου σας. 
                  Αυτή η διαφάνεια προάγει την εμπιστοσύνη και την ενημέρωση της κοινότητας.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
