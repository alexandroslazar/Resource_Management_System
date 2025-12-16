import { useState } from 'react';
import { Building2, Users, Shield, ArrowRight } from 'lucide-react';
import { UserType } from '../App';

interface UserSelectionProps {
  onSelectUser: (type: UserType) => void;
  onLogin: (loggedIn: boolean) => void;
}

export function UserSelection({ onSelectUser, onLogin }: UserSelectionProps) {
  const [selectedType, setSelectedType] = useState<UserType>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const userTypes = [
    {
      type: 'employee' as const,
      title: 'Υπάλληλος Δήμου',
      description: 'Καταγραφή, αίτηση, έγκριση και διαχείριση πόρων',
      icon: Building2,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      type: 'citizen' as const,
      title: 'Πολίτης',
      description: 'Προβολή στατιστικών και διαθέσιμων πόρων',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      type: 'admin' as const,
      title: 'Διαχειριστής',
      description: 'RBAC, monitoring, backup και auditing',
      icon: Shield,
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedType) {
      setError('Παρακαλώ επιλέξτε τύπο χρήστη');
      return;
    }
    
    if (!username || !password) {
      setError('Παρακαλώ συμπληρώστε όλα τα πεδία');
      return;
    }

    // Mock login - σε πραγματική εφαρμογή θα γινόταν έλεγχος με backend
    onSelectUser(selectedType);
    onLogin(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            efficiencity
          </h1>
          <p className="text-xl text-gray-300">
            Σύστημα Διαχείρισης Πόρων Δήμων
          </p>
        </div>

        {!selectedType ? (
          /* User Type Selection */
          <div className="grid md:grid-cols-3 gap-6">
            {userTypes.map((userType) => {
              const Icon = userType.icon;
              return (
                <button
                  key={userType.type}
                  onClick={() => setSelectedType(userType.type)}
                  className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all hover:scale-105 hover:shadow-2xl"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${userType.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl text-white mb-3">
                    {userType.title}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {userType.description}
                  </p>
                  <div className="flex items-center text-blue-400 group-hover:text-blue-300">
                    <span className="mr-2">Επιλογή</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* Login Form */
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <button
              onClick={() => {
                setSelectedType(null);
                setError('');
                setUsername('');
                setPassword('');
              }}
              className="text-gray-300 hover:text-white mb-6 flex items-center"
            >
              ← Επιστροφή
            </button>

            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${userTypes.find(u => u.type === selectedType)?.gradient} flex items-center justify-center mb-6 mx-auto`}>
              {(() => {
                const Icon = userTypes.find(u => u.type === selectedType)?.icon;
                return Icon ? <Icon className="w-8 h-8 text-white" /> : null;
              })()}
            </div>

            <h2 className="text-2xl text-white text-center mb-2">
              {userTypes.find(u => u.type === selectedType)?.title}
            </h2>
            <p className="text-gray-300 text-center mb-8">
              Συνδεθείτε για να συνεχίσετε
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">
                  Όνομα Χρήστη
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder="Εισάγετε όνομα χρήστη"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Κωδικός Πρόσβασης
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder="Εισάγετε κωδικό"
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3 rounded-lg bg-gradient-to-r ${userTypes.find(u => u.type === selectedType)?.gradient} text-white hover:shadow-lg transition-all`}
              >
                Σύνδεση
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
