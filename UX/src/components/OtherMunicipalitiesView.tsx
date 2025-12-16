import { ArrowLeft, MapPin, Package, Truck, HardHat, Wrench, Search } from 'lucide-react';
import { useState } from 'react';

interface OtherMunicipalitiesViewProps {
  onBack: () => void;
}

const municipalities = [
  {
    id: 1,
    name: 'Δήμος Θεσσαλονίκης',
    distance: '502 km',
    resources: [
      { name: 'Φορτηγά Απορριμμάτων', available: 5, icon: Truck },
      { name: 'Εργατικό Προσωπικό', available: 15, icon: HardHat },
      { name: 'Εξοπλισμός Καθαριότητας', available: 8, icon: Wrench },
    ],
    totalResources: 28,
    status: 'active',
  },
  {
    id: 2,
    name: 'Δήμος Πατρών',
    distance: '215 km',
    resources: [
      { name: 'Φορτηγά Απορριμμάτων', available: 3, icon: Truck },
      { name: 'Εργατικό Προσωπικό', available: 12, icon: HardHat },
      { name: 'Μικρά Οχήματα', available: 6, icon: Truck },
    ],
    totalResources: 21,
    status: 'active',
  },
  {
    id: 3,
    name: 'Δήμος Ηρακλείου',
    distance: '340 km',
    resources: [
      { name: 'Εργατικό Προσωπικό', available: 20, icon: HardHat },
      { name: 'Εξοπλισμός Καθαριότητας', available: 12, icon: Wrench },
      { name: 'Εργαλεία Συντήρησης', available: 18, icon: Wrench },
    ],
    totalResources: 50,
    status: 'active',
  },
  {
    id: 4,
    name: 'Δήμος Λάρισας',
    distance: '355 km',
    resources: [
      { name: 'Φορτηγά Απορριμμάτων', available: 4, icon: Truck },
      { name: 'Μικρά Οχήματα', available: 8, icon: Truck },
      { name: 'Εργατικό Προσωπικό', available: 10, icon: HardHat },
    ],
    totalResources: 22,
    status: 'active',
  },
  {
    id: 5,
    name: 'Δήμος Βόλου',
    distance: '326 km',
    resources: [
      { name: 'Εξοπλισμός Καθαριότητας', available: 15, icon: Wrench },
      { name: 'Εργαλεία Συντήρησης', available: 22, icon: Wrench },
      { name: 'Εργατικό Προσωπικό', available: 8, icon: HardHat },
    ],
    totalResources: 45,
    status: 'active',
  },
];

export function OtherMunicipalitiesView({ onBack }: OtherMunicipalitiesViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMunicipalities = municipalities.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-gray-900">Πόροι Άλλων Δήμων</h1>
                <p className="text-sm text-gray-600">Διαθέσιμοι πόροι για δανεισμό</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Αναζήτηση δήμου..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Ενεργοί Δήμοι</span>
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl text-gray-900">{municipalities.length}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Συνολικοί Διαθέσιμοι Πόροι</span>
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl text-green-600">
              {municipalities.reduce((sum, m) => sum + m.totalResources, 0)}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Μέση Απόσταση</span>
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
            <div className="text-3xl text-gray-900">345 km</div>
          </div>
        </div>

        {/* Municipalities List */}
        <div className="space-y-6">
          {filteredMunicipalities.map((municipality) => (
            <div key={municipality.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Municipality Header */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl text-gray-900 mb-1">{municipality.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>📍 {municipality.distance}</span>
                        <span>• {municipality.totalResources} Διαθέσιμοι Πόροι</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                    Ενεργός
                  </div>
                </div>
              </div>

              {/* Resources Grid */}
              <div className="p-6">
                <h4 className="text-gray-600 mb-4">Διαθέσιμοι Πόροι:</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {municipality.resources.map((resource, idx) => {
                    const Icon = resource.icon;
                    return (
                      <div key={idx} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-gray-900 truncate">{resource.name}</div>
                          <div className="text-green-600">{resource.available} Διαθέσιμοι</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMunicipalities.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl text-gray-900 mb-2">Δεν βρέθηκαν δήμοι</h3>
            <p className="text-gray-600">Δοκιμάστε μια διαφορετική αναζήτηση</p>
          </div>
        )}
      </main>
    </div>
  );
}
