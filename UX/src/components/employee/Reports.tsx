import { useState, useRef } from 'react';
import { FileText, Download, Calendar } from 'lucide-react';

/**
 * Reports Component
 * Δημιουργία και εμφάνιση αναφορών για τους πόρους του δήμου
 * Παρέχει:
 * - Φίλτρα για προσαρμογή αναφοράς (ημερομηνίες, τύπος, κατάσταση)
 * - Προεπισκόπηση αναφοράς με γραφήματα
 * - Εξαγωγή σε PDF/Excel
 */
export function Reports() {
  // State για τα φίλτρα αναφοράς
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    resourceType: '',
    status: ''
  });

  // State για εμφάνιση της αναφοράς
  const [showReport, setShowReport] = useState(false);
  // Reference για scroll στην αναφορά
  const reportRef = useRef<HTMLDivElement>(null);

  /**
   * Mock data - Δεδομένα αναφοράς
   * Σε πραγματική εφαρμογή θα υπολογίζονταν βάση των φίλτρων
   */
  const [reportData] = useState({
    totalResources: 245,
    activeLoans: 8,
    pendingRequests: 12,
    completedTransactions: 156,
    resourcesByCategory: [
      { category: 'Μηχανήματα', count: 45 },
      { category: 'Οχήματα', count: 68 },
      { category: 'Εξοπλισμός', count: 87 },
      { category: 'Εργαλεία', count: 32 },
      { category: 'Υλικά Κατασκευών', count: 13 }
    ]
  });

  const categories = ['Μηχανήματα', 'Οχήματα', 'Εξοπλισμός', 'Εργαλεία', 'Υλικά Κατασκευών', 'Άλλο'];

  const handleExport = (format: 'pdf' | 'excel') => {
    // Mock export - σε πραγματική εφαρμογή θα δημιουργούσε και θα κατέβαζε το αρχείο
    console.log(`Exporting report as ${format}`, filters);
    alert(`Η αναφορά εξάγεται ως ${format.toUpperCase()}...`);
  };

  const handleGenerateReport = () => {
    setShowReport(true);
    // Scroll to report after a small delay to ensure it's rendered
    setTimeout(() => {
      reportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div>
      <h2 className="text-3xl text-white mb-8">Αναφορές</h2>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
        <h3 className="text-xl text-white mb-4">Φίλτρα Αναφοράς</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Από Ημερομηνία</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Έως Ημερομηνία</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Τύπος Πόρου</label>
            <select
              value={filters.resourceType}
              onChange={(e) => setFilters({ ...filters, resourceType: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
            >
              <option value="" className="bg-slate-800">Όλοι οι τύποι</option>
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Κατάσταση</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
            >
              <option value="" className="bg-slate-800">Όλες οι καταστάσεις</option>
              <option value="available" className="bg-slate-800">Διαθέσιμο</option>
              <option value="in-use" className="bg-slate-800">Σε Χρήση</option>
              <option value="lent" className="bg-slate-800">Δανεισμένο</option>
              <option value="pending" className="bg-slate-800">Σε Αναμονή</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleGenerateReport}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg transition-all shadow-lg"
          >
            <FileText className="w-5 h-5" />
            Προβολή Αναφοράς
          </button>
          <button
            onClick={() => {
              setFilters({ startDate: '', endDate: '', resourceType: '', status: '' });
              setShowReport(false);
            }}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Καθαρισμός Φίλτρων
          </button>
        </div>
      </div>

      {/* Report Preview */}
      {showReport && (
        <div ref={reportRef} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6 animate-fade-in">
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-400" />
            <p className="text-green-300">Η αναφορά δημιουργήθηκε επιτυχώς!</p>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-white">Προεπισκόπηση Αναφοράς</h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleExport('pdf')}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </button>
              <button
                onClick={() => handleExport('excel')}
                className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Excel</span>
              </button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">Συνολικοί Πόροι</p>
              <p className="text-3xl text-white">{reportData.totalResources}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">Ενεργοί Δανεισμοί</p>
              <p className="text-3xl text-white">{reportData.activeLoans}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">Εκκρεμείς Αιτήσεις</p>
              <p className="text-3xl text-white">{reportData.pendingRequests}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">Ολοκληρωμένες Συναλλαγές</p>
              <p className="text-3xl text-white">{reportData.completedTransactions}</p>
            </div>
          </div>

          {/* Resources by Category */}
          <div>
            <h4 className="text-lg text-white mb-4">Πόροι ανά Κατηγορία</h4>
            <div className="space-y-3">
              {reportData.resourcesByCategory.map((item, index) => {
                const percentage = (item.count / reportData.totalResources) * 100;
                return (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{item.category}</span>
                      <span className="text-white">{item.count}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Report Info */}
      <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-300 mb-1">Πληροφορίες Αναφοράς</p>
            <p className="text-sm text-blue-200">
              Οι αναφορές δημιουργούνται σε πραγματικό χρόνο με βάση τα επιλεγμένα φίλτρα. 
              Μπορείτε να εξάγετε τα δεδομένα σε μορφή PDF ή Excel για περαιτέρω ανάλυση και αρχειοθέτηση.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}