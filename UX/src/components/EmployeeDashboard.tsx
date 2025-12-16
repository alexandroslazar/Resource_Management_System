import { useState } from 'react';
import { 
  LogOut, 
  Package, 
  FileText, 
  Upload, 
  CheckCircle,
  Building2,
  Menu,
  X
} from 'lucide-react';
import { ResourceRegistration } from './employee/ResourceRegistration';
import { PendingApprovals } from './employee/PendingApprovals';
import { Reports } from './employee/Reports';
import { MyResources } from './employee/MyResources';
import { OtherMunicipalityResources } from './employee/OtherMunicipalityResources';

interface EmployeeDashboardProps {
  onLogout: () => void;
}

/**
 * Τύποι views που μπορεί να εμφανιστούν στο Employee Dashboard
 */
type View = 'register' | 'my-resources' | 'other-resources' | 'approvals' | 'reports';

/**
 * Employee Dashboard Component
 * Κύριο dashboard για υπαλλήλους δήμου με πρόσβαση σε:
 * - Καταγραφή νέων πόρων
 * - Διαχείριση των πόρων του δήμου τους
 * - Προβολή και αίτηση πόρων από άλλους δήμους
 * - Διαχείριση εκκρεμών αιτήσεων
 * - Δημιουργία αναφορών
 */
export function EmployeeDashboard({ onLogout }: EmployeeDashboardProps) {
  // State για το τρέχον view που εμφανίζεται
  const [currentView, setCurrentView] = useState<View>('register');
  // State για το άνοιγμα/κλείσιμο του mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Στοιχεία μενού του sidebar
   * Κάθε στοιχείο περιέχει: id, εικονίδιο και ετικέτα
   */
  const menuItems = [
    { id: 'register' as const, icon: Upload, label: 'Καταγραφή Πόρων' },
    { id: 'my-resources' as const, icon: Package, label: 'Οι Πόροι Μου' },
    { id: 'other-resources' as const, icon: Building2, label: 'Πόροι Άλλων Δήμων' },
    { id: 'approvals' as const, icon: CheckCircle, label: 'Εκκρεμείς Αιτήσεις' },
    { id: 'reports' as const, icon: FileText, label: 'Αναφορές' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header - Περιέχει το λογότυπο, πληροφορίες χρήστη και κουμπί αποσύνδεσης */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Αριστερό τμήμα: Mobile menu button & Logo */}
            <div className="flex items-center gap-4">
              {/* Κουμπί mobile menu - εμφανίζεται μόνο σε μικρές οθόνες */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              {/* Logo της εφαρμογής */}
              <h1 className="text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                efficiencity
              </h1>
            </div>
            {/* Δεξί τμήμα: Πληροφορίες χρήστη & Logout */}
            <div className="flex items-center gap-4">
              {/* Πληροφορίες χρήστη - κρυφές σε πολύ μικρές οθόνες */}
              <div className="hidden sm:block text-right">
                <p className="text-white">Υπάλληλος Δήμου</p>
                <p className="text-sm text-gray-300">Δήμος Αθηναίων</p>
              </div>
              {/* Κουμπί αποσύνδεσης */}
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
        {/* Sidebar Navigation - Πλαϊνό μενού με τις επιλογές */}
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
            {/* Δυναμική δημιουργία κουμπιών μενού */}
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setIsMobileMenuOpen(false); // Κλείσιμο mobile menu μετά την επιλογή
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' // Ενεργό view
                      : 'text-gray-300 hover:bg-white/10' // Ανενεργό view
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile overlay - Σκοτεινό φόντο όταν είναι ανοιχτό το mobile menu */}
        {isMobileMenuOpen && (
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}

        {/* Main Content - Κύριο περιεχόμενο που αλλάζει ανάλογα με το επιλεγμένο view */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Conditional rendering ανάλογα με το τρέχον view */}
          {currentView === 'register' && <ResourceRegistration />}
          {currentView === 'my-resources' && <MyResources />}
          {currentView === 'other-resources' && <OtherMunicipalityResources />}
          {currentView === 'approvals' && <PendingApprovals />}
          {currentView === 'reports' && <Reports />}
        </main>
      </div>
    </div>
  );
}