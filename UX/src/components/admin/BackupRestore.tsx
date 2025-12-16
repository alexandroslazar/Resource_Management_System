import { useState } from 'react';
import { Download, Upload, Database, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface Backup {
  id: string;
  filename: string;
  type: 'full' | 'incremental';
  size: string;
  timestamp: string;
  status: 'completed' | 'failed';
}

export function BackupRestore() {
  const [backups] = useState<Backup[]>([
    { id: '1', filename: 'backup_full_20251209_030000.sql', type: 'full', size: '2.4 GB', timestamp: '2025-12-09 03:00', status: 'completed' },
    { id: '2', filename: 'backup_incr_20251208_030000.sql', type: 'incremental', size: '156 MB', timestamp: '2025-12-08 03:00', status: 'completed' },
    { id: '3', filename: 'backup_full_20251207_030000.sql', type: 'full', size: '2.3 GB', timestamp: '2025-12-07 03:00', status: 'completed' },
    { id: '4', filename: 'backup_incr_20251206_030000.sql', type: 'incremental', size: '142 MB', timestamp: '2025-12-06 03:00', status: 'completed' }
  ]);

  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<Backup | null>(null);
  const [showSuccess, setShowSuccess] = useState('');

  const handleStartBackup = (type: 'full' | 'incremental', destination: string) => {
    console.log(`Starting ${type} backup to ${destination}`);
    setShowSuccess('backup');
    setShowBackupModal(false);
    setTimeout(() => setShowSuccess(''), 5000);
  };

  const handleRestore = (backupId: string) => {
    console.log(`Restoring backup: ${backupId}`);
    setShowSuccess('restore');
    setShowRestoreModal(false);
    setSelectedBackup(null);
    setTimeout(() => setShowSuccess(''), 5000);
  };

  return (
    <div>
      <h2 className="text-3xl text-white mb-8">Backup / Restore</h2>

      {showSuccess && (
        <div className={`mb-6 border rounded-lg p-4 flex items-center gap-3 animate-fade-in ${
          showSuccess === 'backup'
            ? 'bg-green-500/20 border-green-500/50'
            : 'bg-blue-500/20 border-blue-500/50'
        }`}>
          <CheckCircle className={`w-6 h-6 ${showSuccess === 'backup' ? 'text-green-400' : 'text-blue-400'}`} />
          <div>
            <p className={showSuccess === 'backup' ? 'text-green-400' : 'text-blue-400'}>
              {showSuccess === 'backup' ? 'Backup Ξεκίνησε!' : 'Restore Ολοκληρώθηκε!'}
            </p>
            <p className={`text-sm ${showSuccess === 'backup' ? 'text-green-300' : 'text-blue-300'}`}>
              {showSuccess === 'backup' 
                ? 'Το backup εκτελείται στο παρασκήνιο. Θα ειδοποιηθείτε όταν ολοκληρωθεί.'
                : 'Τα δεδομένα επαναφέρθηκαν επιτυχώς. Η ενέργεια καταγράφηκε στο Audit Log.'}
            </p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <button
          onClick={() => setShowBackupModal(true)}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/30 transition-all text-left group"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl text-white mb-2">Δημιουργία Backup</h3>
              <p className="text-gray-300">Εκτέλεση νέου backup της βάσης δεδομένων</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setShowRestoreModal(true)}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/30 transition-all text-left group"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl text-white mb-2">Επαναφορά Δεδομένων</h3>
              <p className="text-gray-300">Restore από υπάρχον backup</p>
            </div>
          </div>
        </button>
      </div>

      {/* Backup History */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl text-white mb-4">Ιστορικό Backups</h3>
        <div className="space-y-3">
          {backups.map((backup) => (
            <div
              key={backup.id}
              className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    backup.type === 'full'
                      ? 'bg-green-500/20'
                      : 'bg-blue-500/20'
                  }`}>
                    <Database className={`w-5 h-5 ${
                      backup.type === 'full' ? 'text-green-400' : 'text-blue-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white mb-1 truncate">{backup.filename}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                      <span className={`px-2 py-1 rounded text-xs ${
                        backup.type === 'full'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {backup.type === 'full' ? 'Πλήρες' : 'Αυξητικό'}
                      </span>
                      <span>{backup.size}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {backup.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedBackup(backup);
                      setShowRestoreModal(true);
                    }}
                    className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm"
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => console.log('Download backup:', backup.id)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Backup Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-xl p-6 max-w-md w-full border border-white/20">
            <h3 className="text-xl text-white mb-4">Δημιουργία Backup</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleStartBackup(
                formData.get('type') as 'full' | 'incremental',
                formData.get('destination') as string
              );
            }} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Τύπος Backup</label>
                <select
                  name="type"
                  required
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-400"
                >
                  <option value="full" className="bg-slate-800">Πλήρες Backup</option>
                  <option value="incremental" className="bg-slate-800">Αυξητικό Backup</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Πηγή Δεδομένων</label>
                <select
                  name="source"
                  required
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-400"
                >
                  <option value="db" className="bg-slate-800">Database</option>
                  <option value="logs" className="bg-slate-800">Logs</option>
                  <option value="config" className="bg-slate-800">Configuration</option>
                  <option value="all" className="bg-slate-800">Όλα</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Προορισμός</label>
                <select
                  name="destination"
                  required
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-400"
                >
                  <option value="cloud" className="bg-slate-800">Cloud Storage</option>
                  <option value="local" className="bg-slate-800">Local Storage</option>
                </select>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-300">
                  Το backup μπορεί να διαρκέσει αρκετά λεπτά ανάλογα με το μέγεθος των δεδομένων.
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBackupModal(false)}
                  className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                >
                  Ακύρωση
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all"
                >
                  Εκκίνηση Backup
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Restore Modal */}
      {showRestoreModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-xl p-6 max-w-md w-full border border-white/20">
            <h3 className="text-xl text-white mb-4">Επαναφορά Δεδομένων</h3>
            
            {selectedBackup && (
              <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-300 mb-1">Επιλεγμένο Backup:</p>
                <p className="text-white truncate">{selectedBackup.filename}</p>
              </div>
            )}

            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-red-400 mb-2">Προσοχή - Υψηλή Επικινδυνότητα</p>
                  <p className="text-sm text-red-300">
                    Η επαναφορά θα αντικαταστήσει όλα τα τρέχοντα δεδομένα. 
                    Αυτή η ενέργεια δεν μπορεί να αναιρεθεί.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowRestoreModal(false);
                  setSelectedBackup(null);
                }}
                className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                Ακύρωση
              </button>
              <button
                onClick={() => handleRestore(selectedBackup?.id || backups[0].id)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg transition-all"
              >
                Επιβεβαίωση Restore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
