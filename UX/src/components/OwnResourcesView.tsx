import { ArrowLeft, Package, Truck, HardHat, Users, Wrench, AlertCircle } from 'lucide-react';

interface OwnResourcesViewProps {
  onBack: () => void;
}

const resources = [
  {
    id: 1,
    name: 'Φορτηγά Απορριμμάτων',
    icon: Truck,
    total: 12,
    available: 8,
    inUse: 4,
    category: 'Οχήματα',
    status: 'good',
  },
  {
    id: 2,
    name: 'Εργατικό Προσωπικό',
    icon: HardHat,
    total: 45,
    available: 32,
    inUse: 13,
    category: 'Ανθρώπινοι Πόροι',
    status: 'good',
  },
  {
    id: 3,
    name: 'Εξοπλισμός Καθαριότητας',
    icon: Wrench,
    total: 28,
    available: 15,
    inUse: 13,
    category: 'Εξοπλισμός',
    status: 'warning',
  },
  {
    id: 4,
    name: 'Διοικητικό Προσωπικό',
    icon: Users,
    total: 20,
    available: 18,
    inUse: 2,
    category: 'Ανθρώπινοι Πόροι',
    status: 'good',
  },
  {
    id: 5,
    name: 'Μικρά Οχήματα',
    icon: Truck,
    total: 8,
    available: 3,
    inUse: 5,
    category: 'Οχήματα',
    status: 'critical',
  },
  {
    id: 6,
    name: 'Εργαλεία Συντήρησης',
    icon: Wrench,
    total: 50,
    available: 42,
    inUse: 8,
    category: 'Εξοπλισμός',
    status: 'good',
  },
];

export function OwnResourcesView({ onBack }: OwnResourcesViewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'good':
        return 'Καλή Διαθεσιμότητα';
      case 'warning':
        return 'Μέτρια Διαθεσιμότητα';
      case 'critical':
        return 'Χαμηλή Διαθεσιμότητα';
      default:
        return 'Άγνωστη';
    }
  };

  const totalAvailable = resources.reduce((sum, r) => sum + r.available, 0);
  const totalInUse = resources.reduce((sum, r) => sum + r.inUse, 0);

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
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Package className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-gray-900">Διαθέσιμοι Πόροι Δήμου</h1>
                <p className="text-sm text-gray-600">Δήμος Αθηναίων</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Συνολικοί Πόροι</span>
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl text-gray-900">{totalAvailable + totalInUse}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Διαθέσιμοι</span>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-3xl text-green-600">{totalAvailable}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Σε Χρήση</span>
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            </div>
            <div className="text-3xl text-orange-600">{totalInUse}</div>
          </div>
        </div>

        {/* Resources List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl text-gray-900">Λεπτομέρειες Πόρων</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {resources.map((resource) => {
              const Icon = resource.icon;
              const availabilityPercentage = (resource.available / resource.total) * 100;
              
              return (
                <div key={resource.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-gray-900">{resource.name}</h3>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {resource.category}
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1 text-sm">
                            <span className="text-gray-600">Διαθεσιμότητα</span>
                            <span className="text-gray-900">{resource.available}/{resource.total}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${availabilityPercentage}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-green-600">
                            ✓ {resource.available} Διαθέσιμοι
                          </span>
                          <span className="text-orange-600">
                            ● {resource.inUse} Σε χρήση
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`px-4 py-2 rounded-lg border ${getStatusColor(resource.status)}`}>
                      {getStatusText(resource.status)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alert */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-900">
              <span>Προσοχή: </span>
              <span>Τα Μικρά Οχήματα έχουν χαμηλή διαθεσιμότητα. Εξετάστε το ενδεχόμενο δανεισμού από άλλους δήμους.</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
