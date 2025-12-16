import { ArrowLeft, ArrowDownToLine, MapPin, Calendar, Package, Check } from 'lucide-react';
import { useState } from 'react';

interface BorrowResourcesViewProps {
  onBack: () => void;
}

const availableMunicipalities = [
  { id: 1, name: 'Δήμος Θεσσαλονίκης' },
  { id: 2, name: 'Δήμος Πατρών' },
  { id: 3, name: 'Δήμος Ηρακλείου' },
  { id: 4, name: 'Δήμος Λάρισας' },
  { id: 5, name: 'Δήμος Βόλου' },
];

const resourceTypes = [
  { id: 1, name: 'Φορτηγά Απορριμμάτων', category: 'Οχήματα' },
  { id: 2, name: 'Μικρά Οχήματα', category: 'Οχήματα' },
  { id: 3, name: 'Εργατικό Προσωπικό', category: 'Ανθρώπινοι Πόροι' },
  { id: 4, name: 'Διοικητικό Προσωπικό', category: 'Ανθρώπινοι Πόροι' },
  { id: 5, name: 'Εξοπλισμός Καθαριότητας', category: 'Εξοπλισμός' },
  { id: 6, name: 'Εργαλεία Συντήρησης', category: 'Εξοπλισμός' },
];

export function BorrowResourcesView({ onBack }: BorrowResourcesViewProps) {
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [selectedResource, setSelectedResource] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedMunicipality('');
      setSelectedResource('');
      setQuantity('1');
      setStartDate('');
      setEndDate('');
      setReason('');
    }, 3000);
  };

  const isFormValid = selectedMunicipality && selectedResource && quantity && startDate && endDate && reason;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
                <ArrowDownToLine className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-gray-900">Δανεισμός Πόρων</h1>
                <p className="text-sm text-gray-600">Υποβολή αιτήματος δανεισμού</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {submitted ? (
          /* Success Message */
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl text-gray-900 mb-4">Το Αίτημα Υποβλήθηκε Επιτυχώς!</h2>
            <p className="text-gray-600 mb-6">
              Το αίτημα δανεισμού σας έχει σταλεί στον επιλεγμένο δήμο. Θα ενημερωθείτε για την απόφαση σύντομα.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-green-50 text-green-700 rounded-lg">
              <Package className="w-5 h-5 mr-2" />
              <span>Αριθμός Αναφοράς: #BR-{Math.floor(Math.random() * 10000)}</span>
            </div>
          </div>
        ) : (
          /* Request Form */
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 border-b border-gray-200">
              <h2 className="text-xl text-gray-900 mb-2">Φόρμα Αιτήματος Δανεισμού</h2>
              <p className="text-gray-600">Συμπληρώστε τα παρακάτω πεδία για να υποβάλετε αίτημα</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Municipality Selection */}
              <div>
                <label className="block text-gray-900 mb-2">
                  <MapPin className="w-5 h-5 inline mr-2" />
                  Δήμος Δανειστής
                </label>
                <select
                  value={selectedMunicipality}
                  onChange={(e) => setSelectedMunicipality(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                >
                  <option value="">Επιλέξτε δήμο...</option>
                  {availableMunicipalities.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Resource Type Selection */}
              <div>
                <label className="block text-gray-900 mb-2">
                  <Package className="w-5 h-5 inline mr-2" />
                  Τύπος Πόρου
                </label>
                <select
                  value={selectedResource}
                  onChange={(e) => setSelectedResource(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                >
                  <option value="">Επιλέξτε τύπο πόρου...</option>
                  {resourceTypes.map((r) => (
                    <option key={r.id} value={r.name}>
                      {r.name} ({r.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-gray-900 mb-2">
                  Ποσότητα
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Date Range */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 mb-2">
                    <Calendar className="w-5 h-5 inline mr-2" />
                    Ημερομηνία Έναρξης
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-900 mb-2">
                    <Calendar className="w-5 h-5 inline mr-2" />
                    Ημερομηνία Λήξης
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-gray-900 mb-2">
                  Αιτιολογία Αιτήματος
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  placeholder="Περιγράψτε γιατί χρειάζεστε τον συγκεκριμένο πόρο..."
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onBack}
                  className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Ακύρωση
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  <ArrowDownToLine className="w-5 h-5" />
                  <span>Υποβολή Αιτήματος</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Info Box */}
        {!submitted && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-blue-900 mb-2">💡 Σημαντικές Πληροφορίες</h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>• Τα αιτήματα εξετάζονται εντός 24 ωρών</li>
              <li>• Η έγκριση εξαρτάται από τη διαθεσιμότητα των πόρων</li>
              <li>• Θα λάβετε ειδοποίηση μόλις το αίτημα εγκριθεί ή απορριφθεί</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
