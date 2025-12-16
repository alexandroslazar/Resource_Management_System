import { Building2, Users } from 'lucide-react';
import type { UserType } from '../App';

interface LoginScreenProps {
  onSelectUserType: (type: UserType) => void;
}

export function LoginScreen({ onSelectUserType }: LoginScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl mb-4 text-gray-900">efficiencity</h1>
          <p className="text-xl text-gray-600">Διαχείριση Δημοτικών Πόρων</p>
        </div>

        {/* User Type Selection */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Employee Card */}
          <button
            onClick={() => onSelectUserType('employee')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-blue-500"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <Building2 className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h2 className="text-2xl mb-2 text-gray-900">Υπάλληλος Δήμου</h2>
                <p className="text-gray-600">
                  Διαχείριση και κατανομή πόρων μεταξύ δήμων
                </p>
              </div>
              <div className="mt-4 px-6 py-2 bg-blue-50 rounded-lg text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                Είσοδος →
              </div>
            </div>
          </button>

          {/* Citizen Card */}
          <button
            onClick={() => onSelectUserType('citizen')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-indigo-500"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                <Users className="w-12 h-12 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h2 className="text-2xl mb-2 text-gray-900">Πολίτης</h2>
                <p className="text-gray-600">
                  Παρακολούθηση ενεργειών και διαφάνεια δήμου
                </p>
              </div>
              <div className="mt-4 px-6 py-2 bg-indigo-50 rounded-lg text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                Είσοδος →
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Πλατφόρμα διαμοιρασμού πόρων μεταξύ δήμων</p>
        </div>
      </div>
    </div>
  );
}
