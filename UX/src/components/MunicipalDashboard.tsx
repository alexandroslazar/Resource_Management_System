import { useState } from 'react';
import { Building2, LogOut, Package, MapPin, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { OwnResourcesView } from './OwnResourcesView';
import { OtherMunicipalitiesView } from './OtherMunicipalitiesView';
import { BorrowResourcesView } from './BorrowResourcesView';
import { LendResourcesView } from './LendResourcesView';

interface MunicipalDashboardProps {
  onLogout: () => void;
}

type ViewType = 'home' | 'own-resources' | 'other-municipalities' | 'borrow' | 'lend';

export function MunicipalDashboard({ onLogout }: MunicipalDashboardProps) {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  const renderView = () => {
    switch (currentView) {
      case 'own-resources':
        return <OwnResourcesView onBack={() => setCurrentView('home')} />;
      case 'other-municipalities':
        return <OtherMunicipalitiesView onBack={() => setCurrentView('home')} />;
      case 'borrow':
        return <BorrowResourcesView onBack={() => setCurrentView('home')} />;
      case 'lend':
        return <LendResourcesView onBack={() => setCurrentView('home')} />;
      default:
        return null;
    }
  };

  if (currentView !== 'home') {
    return renderView();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-gray-900">efficiencity</h1>
                <p className="text-sm text-gray-600">Πίνακας Ελέγχου Υπαλλήλου</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Έξοδος</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl text-gray-900 mb-2">Καλώς ήρθατε</h2>
          <p className="text-xl text-gray-600">Επιλέξτε μια λειτουργία για να συνεχίσετε</p>
        </div>

        {/* Action Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Own Resources */}
          <button
            onClick={() => setCurrentView('own-resources')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-blue-500 text-left"
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors flex-shrink-0">
                <Package className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl mb-2 text-gray-900">Διαθέσιμοι Πόροι Δήμου</h3>
                <p className="text-gray-600 mb-4">
                  Προβολή όλων των διαθέσιμων πόρων του δήμου σας
                </p>
                <div className="inline-flex items-center text-blue-600 group-hover:text-blue-700">
                  <span>Προβολή</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </div>
          </button>

          {/* Other Municipalities */}
          <button
            onClick={() => setCurrentView('other-municipalities')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-green-500 text-left"
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-600 transition-colors flex-shrink-0">
                <MapPin className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl mb-2 text-gray-900">Πόροι Άλλων Δήμων</h3>
                <p className="text-gray-600 mb-4">
                  Δείτε τους διαθέσιμους πόρους από άλλους δήμους
                </p>
                <div className="inline-flex items-center text-green-600 group-hover:text-green-700">
                  <span>Προβολή</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </div>
          </button>

          {/* Borrow Resources */}
          <button
            onClick={() => setCurrentView('borrow')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-orange-500 text-left"
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-600 transition-colors flex-shrink-0">
                <ArrowDownToLine className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl mb-2 text-gray-900">Δανεισμός Πόρων</h3>
                <p className="text-gray-600 mb-4">
                  Ζητήστε δανεισμό πόρων από άλλους δήμους
                </p>
                <div className="inline-flex items-center text-orange-600 group-hover:text-orange-700">
                  <span>Υποβολή Αιτήματος</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </div>
          </button>

          {/* Lend Resources */}
          <button
            onClick={() => setCurrentView('lend')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-purple-500 text-left"
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-600 transition-colors flex-shrink-0">
                <ArrowUpFromLine className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl mb-2 text-gray-900">Δανεισμός σε Άλλους</h3>
                <p className="text-gray-600 mb-4">
                  Διαθέστε πόρους για δανεισμό σε άλλους δήμους
                </p>
                <div className="inline-flex items-center text-purple-600 group-hover:text-purple-700">
                  <span>Διαχείριση</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Statistics Summary */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl mb-6 text-gray-900">Σύνοψη Δραστηριότητας</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl text-blue-600 mb-2">24</div>
              <div className="text-gray-600">Διαθέσιμοι Πόροι</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-green-600 mb-2">12</div>
              <div className="text-gray-600">Ενεργοί Δήμοι</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-orange-600 mb-2">5</div>
              <div className="text-gray-600">Δανεισμοί</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-purple-600 mb-2">8</div>
              <div className="text-gray-600">Δανεισμένοι Πόροι</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
