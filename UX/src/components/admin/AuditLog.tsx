import { useState } from 'react';
import { Shield, User, Database, Settings, FileText, Search, Download } from 'lucide-react';

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  category: 'user' | 'resource' | 'system' | 'backup';
  details: string;
  ipAddress: string;
}

export function AuditLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const auditEntries: AuditEntry[] = [
    {
      id: '1',
      timestamp: '2025-12-09 14:30:25',
      user: 'admin@efficiencity.gr',
      action: 'Δημιουργία χρήστη',
      category: 'user',
      details: 'Νέος χρήστης: m.konstantinou@piraeus.gr με ρόλο Approver',
      ipAddress: '192.168.1.100'
    },
    {
      id: '2',
      timestamp: '2025-12-09 13:45:12',
      user: 'g.papadopoulos@athens.gr',
      action: 'Έγκριση αίτησης',
      category: 'resource',
      details: 'Εγκρίθηκε αίτηση #1234 για δανεισμό Εκσκαφέα',
      ipAddress: '192.168.1.105'
    },
    {
      id: '3',
      timestamp: '2025-12-09 03:00:00',
      user: 'system',
      action: 'Αυτόματο Backup',
      category: 'backup',
      details: 'Ολοκληρώθηκε πλήρες backup της βάσης δεδομένων (2.4GB)',
      ipAddress: 'localhost'
    },
    {
      id: '4',
      timestamp: '2025-12-08 16:22:45',
      user: 'admin@efficiencity.gr',
      action: 'Τροποποίηση ρόλου',
      category: 'user',
      details: 'Αλλαγή ρόλου χρήστη n.alexopoulos@kallithea.gr από Employee σε Approver',
      ipAddress: '192.168.1.100'
    },
    {
      id: '5',
      timestamp: '2025-12-08 15:10:33',
      user: 'admin@efficiencity.gr',
      action: 'Επανεκκίνηση υπηρεσίας',
      category: 'system',
      details: 'Επανεκκίνηση Cache Service λόγω χαμηλής απόδοσης',
      ipAddress: '192.168.1.100'
    },
    {
      id: '6',
      timestamp: '2025-12-08 14:05:18',
      user: 'g.papadopoulos@athens.gr',
      action: 'Καταγραφή πόρου',
      category: 'resource',
      details: 'Καταγραφή νέου πόρου: Γεννήτρια 50KW',
      ipAddress: '192.168.1.105'
    },
    {
      id: '7',
      timestamp: '2025-12-08 11:30:00',
      user: 'm.konstantinou@piraeus.gr',
      action: 'Απόρριψη αίτησης',
      category: 'resource',
      details: 'Απορρίφθηκε αίτηση #1230 λόγω έλλειψης διαθεσιμότητας',
      ipAddress: '192.168.1.110'
    }
  ];

  const categoryIcons = {
    user: User,
    resource: Database,
    system: Settings,
    backup: FileText
  };

  const categoryColors = {
    user: 'from-blue-500 to-cyan-500',
    resource: 'from-purple-500 to-pink-500',
    system: 'from-orange-500 to-red-500',
    backup: 'from-green-500 to-emerald-500'
  };

  const filteredEntries = auditEntries.filter(entry => {
    const matchesSearch = 
      entry.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || entry.category === filterCategory;
    const matchesDate = !filterDate || entry.timestamp.startsWith(filterDate);
    return matchesSearch && matchesCategory && matchesDate;
  });

  const handleExport = () => {
    console.log('Exporting audit log...');
    alert('Το Audit Log εξάγεται ως PDF...');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-3xl text-white">Audit Log</h2>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg transition-all shadow-lg"
        >
          <Download className="w-5 h-5" />
          Εξαγωγή
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Αναζήτηση στο log..."
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-400 transition-colors"
          >
            <option value="" className="bg-slate-800">Όλες οι κατηγορίες</option>
            <option value="user" className="bg-slate-800">Χρήστες</option>
            <option value="resource" className="bg-slate-800">Πόροι</option>
            <option value="system" className="bg-slate-800">Σύστημα</option>
            <option value="backup" className="bg-slate-800">Backup</option>
          </select>

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-400 transition-colors"
          />
        </div>
      </div>

      {/* Audit Entries */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto">
          <div className="space-y-3 p-6">
            {filteredEntries.map((entry) => {
              const Icon = categoryIcons[entry.category];
              return (
                <div
                  key={entry.id}
                  className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${categoryColors[entry.category]} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <p className="text-white mb-1">{entry.action}</p>
                          <p className="text-sm text-gray-300">{entry.details}</p>
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {entry.timestamp}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {entry.user}
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          {entry.ipAddress}
                        </span>
                        <span className={`px-2 py-0.5 rounded bg-gradient-to-r ${categoryColors[entry.category]} text-white`}>
                          {entry.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredEntries.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Δεν βρέθηκαν καταχωρήσεις</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-orange-500/20 border border-orange-500/50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-orange-300 mb-1">Πληροφορίες Audit Log</p>
            <p className="text-sm text-orange-200">
              Όλες οι κρίσιμες ενέργειες καταγράφονται αυτόματα στο Audit Log για λόγους ασφάλειας και 
              συμμόρφωσης. Τα logs διατηρούνται για τουλάχιστον 12 μήνες και μπορούν να εξαχθούν για 
              περαιτέρω ανάλυση.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
