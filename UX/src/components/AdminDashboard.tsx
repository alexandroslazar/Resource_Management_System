import { useState } from 'react';
import { 
  LogOut, 
  Users, 
  Menu,
  X,
  Shield
} from 'lucide-react';
import { RBACManagement } from './admin/RBACManagement';
import { AuditLog } from './admin/AuditLog';

interface AdminDashboardProps {
  onLogout: () => void;
}

/**
 * Τύποι views για το Admin Dashboard
 */
type View = 'rbac' | 'audit';

/**
 * Admin Dashboard Component
 * Κύριο dashboard για διαχειριστές συστήματος με πρόσβαση σε:
 * - Διαχείριση Χρηστών & Ρόλων (RBAC - Role-Based Access Control)
 * - Audit Log (Καταγραφή όλων των ενεργειών χρηστών)
 * 
 * Παρέχει πλήρη έλεγχο του συστήματος και των δικαιωμάτων πρόσβασης
 */
export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  // State για το τρέχον view
  const [currentView, setCurrentView] = useState<View>('rbac');
  // State για mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Στοιχεία μενού sidebar
   * Περιέχει μόνο τις 2 βασικές λειτουργίες διαχείρισης
   */
  const menuItems = [
    { id: 'rbac' as const, icon: Users, label: 'Διαχείριση Χρηστών & Ρόλων (RBAC)' },
    { id: 'audit' as const, icon: Shield, label: 'Audit Log' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
      {/* Header - Κεφαλίδα με πληροφορίες διαχειριστή */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile menu toggle button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              {/* Application logo */}
              <h1 className="text-2xl bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                efficiencity
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Admin user information */}
              <div className="hidden sm:block text-right">
                <p className="text-white">Διαχειριστής Συστήματος</p>
                <p className="text-sm text-gray-300">Admin Panel</p>
              </div>
              {/* Logout button */}
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
        {/* Sidebar - Πλαϊνό μενού διαχείρισης */}
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
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-left">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile overlay - Σκοτεινό overlay για mobile menu */}
        {isMobileMenuOpen && (
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}

        {/* Main Content - Κύριο περιεχόμενο */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* RBAC Management View */}
          {currentView === 'rbac' && <RBACManagement />}
          {/* Audit Log View */}
          {currentView === 'audit' && <AuditLog />}
        </main>
      </div>
    </div>
  );
}