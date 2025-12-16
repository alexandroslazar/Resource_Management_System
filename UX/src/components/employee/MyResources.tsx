import { useState } from 'react';
import { Search, Package, Edit, Trash2 } from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  status: 'available' | 'in-use' | 'lent';
  municipality: string;
}

export function MyResources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Mock data
  const resources: Resource[] = [
    { id: '1', name: 'Εκσκαφέας Κοματσού', category: 'Μηχανήματα', quantity: 2, unit: 'Τεμάχια', status: 'available', municipality: 'Δήμος Αθηναίων' },
    { id: '2', name: 'Φορτηγό Mercedes', category: 'Οχήματα', quantity: 5, unit: 'Τεμάχια', status: 'in-use', municipality: 'Δήμος Αθηναίων' },
    { id: '3', name: 'Αντλία Νερού', category: 'Εξοπλισμός', quantity: 10, unit: 'Τεμάχια', status: 'available', municipality: 'Δήμος Αθηναίων' },
    { id: '4', name: 'Τσιμέντο', category: 'Υλικά Κατασκευών', quantity: 500, unit: 'Κιλά', status: 'available', municipality: 'Δήμος Αθηναίων' },
    { id: '5', name: 'Γεννήτρια 50KW', category: 'Μηχανήματα', quantity: 3, unit: 'Τεμάχια', status: 'lent', municipality: 'Δήμος Αθηναίων' },
  ];

  const categories = ['Μηχανήματα', 'Οχήματα', 'Εξοπλισμός', 'Εργαλεία', 'Υλικά Κατασκευών', 'Άλλο'];

  const statusLabels: Record<Resource['status'], { label: string; color: string }> = {
    available: { label: 'Διαθέσιμο', color: 'bg-green-500/20 text-green-400 border-green-500/50' },
    'in-use': { label: 'Σε Χρήση', color: 'bg-blue-500/20 text-blue-400 border-blue-500/50' },
    lent: { label: 'Δανεισμένο', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || resource.category === filterCategory;
    const matchesStatus = !filterStatus || resource.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div>
      <h2 className="text-3xl text-white mb-8">Οι Πόροι Μου</h2>

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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
          >
            <option value="" className="bg-slate-800">Όλες οι καταστάσεις</option>
            <option value="available" className="bg-slate-800">Διαθέσιμο</option>
            <option value="in-use" className="bg-slate-800">Σε Χρήση</option>
            <option value="lent" className="bg-slate-800">Δανεισμένο</option>
          </select>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-white mb-1">{resource.name}</h3>
                  <p className="text-sm text-gray-400">{resource.category}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs border ${statusLabels[resource.status].color}`}>
                {statusLabels[resource.status].label}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Ποσότητα</p>
                <p className="text-white">{resource.quantity} {resource.unit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Δήμος</p>
                <p className="text-white">{resource.municipality}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-white/10">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors">
                <Edit className="w-4 h-4" />
                <span>Επεξεργασία</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
                <span>Διαγραφή</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Δεν βρέθηκαν πόροι</p>
        </div>
      )}
    </div>
  );
}
