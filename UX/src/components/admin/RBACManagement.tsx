import { useState } from 'react';
import { UserPlus, Edit, UserX, Shield, CheckCircle } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'approver' | 'viewer';
  municipality: string;
  status: 'active' | 'inactive';
}

export function RBACManagement() {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Γιώργος Παπαδόπουλος', email: 'g.papadopoulos@athens.gr', role: 'employee', municipality: 'Δήμος Αθηναίων', status: 'active' },
    { id: '2', name: 'Μαρία Κωνσταντίνου', email: 'm.konstantinou@piraeus.gr', role: 'approver', municipality: 'Δήμος Πειραιά', status: 'active' },
    { id: '3', name: 'Νίκος Αλεξόπουλος', email: 'n.alexopoulos@kallithea.gr', role: 'employee', municipality: 'Δήμος Καλλιθέας', status: 'active' },
    { id: '4', name: 'Ελένη Δημητρίου', email: 'e.dimitriou@admin.gr', role: 'admin', municipality: 'Κεντρικό Σύστημα', status: 'active' }
  ]);

  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showSuccess, setShowSuccess] = useState('');

  const roleLabels: Record<User['role'], { label: string; color: string; permissions: string[] }> = {
    admin: { 
      label: 'Διαχειριστής', 
      color: 'bg-red-500/20 text-red-400 border-red-500/50',
      permissions: ['Πλήρης πρόσβαση', 'Διαχείριση χρηστών', 'System config']
    },
    approver: { 
      label: 'Εγκριτής', 
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
      permissions: ['Έγκριση αιτήσεων', 'Διαχείριση πόρων', 'Αναφορές']
    },
    employee: { 
      label: 'Υπάλληλος', 
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      permissions: ['Καταγραφή πόρων', 'Υποβολή αιτήσεων', 'Προβολή']
    },
    viewer: { 
      label: 'Θεατής', 
      color: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
      permissions: ['Μόνο προβολή']
    }
  };

  const handleSaveUser = (userData: Partial<User>) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userData } : u));
      setShowSuccess('updated');
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'viewer',
        municipality: userData.municipality || '',
        status: 'active'
      };
      setUsers([...users, newUser]);
      setShowSuccess('created');
    }
    
    setEditingUser(null);
    setShowAddUser(false);
    setTimeout(() => setShowSuccess(''), 3000);
  };

  const handleDeactivateUser = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' as const : 'active' as const } : u
    ));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-3xl text-white">Διαχείριση Χρηστών & Ρόλων (RBAC)</h2>
        <button
          onClick={() => setShowAddUser(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg transition-all shadow-lg"
        >
          <UserPlus className="w-5 h-5" />
          Νέος Χρήστης
        </button>
      </div>

      {showSuccess && (
        <div className="mb-6 bg-green-500/20 border border-green-500/50 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <div>
            <p className="text-green-400">
              {showSuccess === 'created' ? 'Χρήστης Δημιουργήθηκε!' : 'Χρήστης Ενημερώθηκε!'}
            </p>
            <p className="text-sm text-green-300">Οι αλλαγές καταχωρήθηκαν στο Audit Log.</p>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-300">Όνομα</th>
                <th className="px-6 py-4 text-left text-sm text-gray-300">Email</th>
                <th className="px-6 py-4 text-left text-sm text-gray-300">Ρόλος</th>
                <th className="px-6 py-4 text-left text-sm text-gray-300">Δήμος</th>
                <th className="px-6 py-4 text-left text-sm text-gray-300">Κατάσταση</th>
                <th className="px-6 py-4 text-right text-sm text-gray-300">Ενέργειες</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white">{user.name}</td>
                  <td className="px-6 py-4 text-gray-300">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs border ${roleLabels[user.role].color}`}>
                      {roleLabels[user.role].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{user.municipality}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs border ${
                      user.status === 'active'
                        ? 'bg-green-500/20 text-green-400 border-green-500/50'
                        : 'bg-gray-500/20 text-gray-400 border-gray-500/50'
                    }`}>
                      {user.status === 'active' ? 'Ενεργός' : 'Ανενεργός'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                        title="Επεξεργασία"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeactivateUser(user.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                        title={user.status === 'active' ? 'Απενεργοποίηση' : 'Ενεργοποίηση'}
                      >
                        <UserX className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permissions Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {Object.entries(roleLabels).map(([role, info]) => (
          <div key={role} className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <span className={`px-3 py-1 rounded-full text-xs border ${info.color}`}>
                {info.label}
              </span>
            </div>
            <ul className="space-y-1">
              {info.permissions.map((perm, idx) => (
                <li key={idx} className="text-sm text-gray-300">• {perm}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Add/Edit User Modal */}
      {(showAddUser || editingUser) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-xl p-6 max-w-md w-full border border-white/20">
            <h3 className="text-xl text-white mb-4">
              {editingUser ? 'Επεξεργασία Χρήστη' : 'Νέος Χρήστης'}
            </h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSaveUser({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                role: formData.get('role') as User['role'],
                municipality: formData.get('municipality') as string
              });
            }} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Όνομα</label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={editingUser?.name}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue={editingUser?.email}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Ρόλος</label>
                <select
                  name="role"
                  required
                  defaultValue={editingUser?.role}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-400"
                >
                  {Object.entries(roleLabels).map(([role, info]) => (
                    <option key={role} value={role} className="bg-slate-800">{info.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Δήμος</label>
                <input
                  name="municipality"
                  type="text"
                  required
                  defaultValue={editingUser?.municipality}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-400"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddUser(false);
                    setEditingUser(null);
                  }}
                  className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                >
                  Ακύρωση
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg transition-all"
                >
                  Αποθήκευση
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
