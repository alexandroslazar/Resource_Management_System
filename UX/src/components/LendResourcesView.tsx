import { ArrowLeft, ArrowUpFromLine, CheckCircle, XCircle, Clock, Package, MapPin } from 'lucide-react';
import { useState } from 'react';

interface LendResourcesViewProps {
  onBack: () => void;
}

interface LendRequest {
  id: number;
  municipality: string;
  resource: string;
  quantity: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
}

const initialRequests: LendRequest[] = [
  {
    id: 1,
    municipality: 'Δήμος Πειραιά',
    resource: 'Φορτηγά Απορριμμάτων',
    quantity: 3,
    startDate: '2025-12-10',
    endDate: '2025-12-17',
    reason: 'Αυξημένες ανάγκες λόγω εορταστικής περιόδου',
    status: 'pending',
    requestDate: '2025-12-05',
  },
  {
    id: 2,
    municipality: 'Δήμος Καλλιθέας',
    resource: 'Εργατικό Προσωπικό',
    quantity: 8,
    startDate: '2025-12-08',
    endDate: '2025-12-15',
    reason: 'Ειδικό πρόγραμμα καθαριότητας',
    status: 'pending',
    requestDate: '2025-12-04',
  },
  {
    id: 3,
    municipality: 'Δήμος Αμαρουσίου',
    resource: 'Εξοπλισμός Καθαριότητας',
    quantity: 5,
    startDate: '2025-12-12',
    endDate: '2025-12-20',
    reason: 'Συντήρηση δημοτικών χώρων',
    status: 'approved',
    requestDate: '2025-12-03',
  },
  {
    id: 4,
    municipality: 'Δήμος Γλυφάδας',
    resource: 'Μικρά Οχήματα',
    quantity: 2,
    startDate: '2025-12-06',
    endDate: '2025-12-13',
    reason: 'Συντήρηση εξοπλισμού δήμου',
    status: 'rejected',
    requestDate: '2025-12-02',
  },
];

export function LendResourcesView({ onBack }: LendResourcesViewProps) {
  const [requests, setRequests] = useState<LendRequest[]>(initialRequests);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const handleApprove = (id: number) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'approved' as const } : req
    ));
  };

  const handleReject = (id: number) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'rejected' as const } : req
    ));
  };

  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(req => req.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <div className="flex items-center space-x-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg">
            <Clock className="w-4 h-4" />
            <span>Εκκρεμεί</span>
          </div>
        );
      case 'approved':
        return (
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg">
            <CheckCircle className="w-4 h-4" />
            <span>Εγκρίθηκε</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-700 rounded-lg">
            <XCircle className="w-4 h-4" />
            <span>Απορρίφθηκε</span>
          </div>
        );
    }
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;

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
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                <ArrowUpFromLine className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-gray-900">Δανεισμός σε Άλλους Δήμους</h1>
                <p className="text-sm text-gray-600">Διαχείριση αιτημάτων δανεισμού</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Συνολικά Αιτήματα</span>
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl text-gray-900">{requests.length}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Εκκρεμή</span>
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="text-3xl text-yellow-600">{pendingCount}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Εγκεκριμένα</span>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl text-green-600">{approvedCount}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Απορριφθέντα</span>
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-3xl text-red-600">
              {requests.filter(r => r.status === 'rejected').length}
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 bg-white rounded-xl p-2 shadow-lg inline-flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === 'all' ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Όλα
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === 'pending' ? 'bg-yellow-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Εκκρεμή
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === 'approved' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Εγκεκριμένα
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === 'rejected' ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Απορριφθέντα
          </button>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl text-gray-900">{request.municipality}</h3>
                        {getStatusBadge(request.status)}
                      </div>
                      <p className="text-gray-600 text-sm mb-1">
                        Υποβλήθηκε στις {new Date(request.requestDate).toLocaleDateString('el-GR')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Πόρος</div>
                    <div className="flex items-center space-x-2">
                      <Package className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-900">{request.resource}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                        x{request.quantity}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Περίοδος</div>
                    <div className="text-gray-900">
                      {new Date(request.startDate).toLocaleDateString('el-GR')} - {new Date(request.endDate).toLocaleDateString('el-GR')}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-1">Αιτιολογία</div>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{request.reason}</p>
                </div>

                {request.status === 'pending' && (
                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleReject(request.id)}
                      className="px-6 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <XCircle className="w-5 h-5" />
                      <span>Απόρριψη</span>
                    </button>
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="px-6 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Έγκριση</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl text-gray-900 mb-2">Δεν υπάρχουν αιτήματα</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'Δεν έχουν υποβληθεί αιτήματα δανεισμού'
                : `Δεν υπάρχουν ${filter === 'pending' ? 'εκκρεμή' : filter === 'approved' ? 'εγκεκριμένα' : 'απορριφθέντα'} αιτήματα`
              }
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
