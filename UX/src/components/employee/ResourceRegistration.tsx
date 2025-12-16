import { useState } from 'react';
import { Save, CheckCircle } from 'lucide-react';

export function ResourceRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    category: '',
    description: '',
    unit: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    'Μηχανήματα',
    'Οχήματα',
    'Εξοπλισμός',
    'Εργαλεία',
    'Υλικά Κατασκευών',
    'Άλλο'
  ];

  const units = [
    'Τεμάχια',
    'Κιλά',
    'Μέτρα',
    'Λίτρα',
    'Τόνοι'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock save - σε πραγματική εφαρμογή θα γινόταν αποθήκευση στη βάση
    console.log('Saving resource:', formData);
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        name: '',
        quantity: '',
        category: '',
        description: '',
        unit: ''
      });
    }, 3000);
  };

  return (
    <div>
      <h2 className="text-3xl text-white mb-8">Καταγραφή Πόρων</h2>

      {showSuccess && (
        <div className="mb-6 bg-green-500/20 border border-green-500/50 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <div>
            <p className="text-green-400">Επιτυχής Καταγραφή!</p>
            <p className="text-sm text-green-300">Ο πόρος καταχωρήθηκε επιτυχώς στο σύστημα.</p>
          </div>
        </div>
      )}

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 sm:p-8 border border-white/20">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">
                Όνομα Πόρου *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="π.χ. Εκσκαφέας Κοματσού"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                Κατηγορία *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
              >
                <option value="">Επιλέξτε κατηγορία</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-800">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                Ποσότητα *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="π.χ. 5"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                Μονάδα Μέτρησης *
              </label>
              <select
                required
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
              >
                <option value="">Επιλέξτε μονάδα</option>
                {units.map((unit) => (
                  <option key={unit} value={unit} className="bg-slate-800">
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Περιγραφή
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-none"
              placeholder="Προσθέστε λεπτομέρειες για τον πόρο..."
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setFormData({
                name: '',
                quantity: '',
                category: '',
                description: '',
                unit: ''
              })}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              Καθαρισμός
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg transition-all shadow-lg"
            >
              <Save className="w-5 h-5" />
              Αποθήκευση
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
