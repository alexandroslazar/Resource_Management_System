import { useState } from 'react';
import { Activity, Cpu, Database, HardDrive, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
  service: string;
}

export function SystemMonitoring() {
  const [refreshing, setRefreshing] = useState(false);

  const systemMetrics = {
    cpu: { usage: 45, status: 'normal' as const },
    memory: { usage: 68, total: 16, used: 10.88, status: 'normal' as const },
    disk: { usage: 72, total: 500, used: 360, status: 'warning' as const },
    uptime: { days: 45, hours: 12, minutes: 34 }
  };

  const services = [
    { name: 'API Server', status: 'running' as const, responseTime: '45ms', uptime: '99.9%' },
    { name: 'Database', status: 'running' as const, responseTime: '12ms', uptime: '99.8%' },
    { name: 'Web Server', status: 'running' as const, responseTime: '28ms', uptime: '99.9%' },
    { name: 'Cache Service', status: 'warning' as const, responseTime: '156ms', uptime: '98.5%' }
  ];

  const [alerts] = useState<Alert[]>([
    { id: '1', type: 'warning', message: 'Χαμηλή απόδοση Cache Service - Response time > 150ms', timestamp: '2025-12-09 14:23', service: 'Cache' },
    { id: '2', type: 'warning', message: 'Disk usage πάνω από 70%', timestamp: '2025-12-09 13:45', service: 'Storage' },
    { id: '3', type: 'info', message: 'Scheduled backup ολοκληρώθηκε επιτυχώς', timestamp: '2025-12-09 03:00', service: 'Backup' }
  ]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleRestartService = (serviceName: string) => {
    console.log(`Restarting service: ${serviceName}`);
    alert(`Επανεκκίνηση υπηρεσίας: ${serviceName}`);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-3xl text-white">Παρακολούθηση Συστήματος</h2>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg transition-all shadow-lg disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
          Ανανέωση
        </button>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-300">CPU Usage</p>
                <p className="text-2xl text-white">{systemMetrics.cpu.usage}%</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
              style={{ width: `${systemMetrics.cpu.usage}%` }}
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-300">Memory</p>
                <p className="text-2xl text-white">{systemMetrics.memory.usage}%</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
              style={{ width: `${systemMetrics.memory.usage}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {systemMetrics.memory.used}GB / {systemMetrics.memory.total}GB
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <HardDrive className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-300">Disk Space</p>
                <p className="text-2xl text-white">{systemMetrics.disk.usage}%</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all"
              style={{ width: `${systemMetrics.disk.usage}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {systemMetrics.disk.used}GB / {systemMetrics.disk.total}GB
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-gray-300">Uptime</p>
              <p className="text-xl text-white">
                {systemMetrics.uptime.days}d {systemMetrics.uptime.hours}h
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            System running stable
          </p>
        </div>
      </div>

      {/* Services Status */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
        <h3 className="text-xl text-white mb-4">Κατάσταση Υπηρεσιών</h3>
        <div className="space-y-3">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white/5 rounded-lg p-4 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-3 h-3 rounded-full ${
                  service.status === 'running' ? 'bg-green-500' : 'bg-yellow-500'
                } animate-pulse`} />
                <div>
                  <p className="text-white">{service.name}</p>
                  <p className="text-sm text-gray-400">Response Time: {service.responseTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Uptime</p>
                  <p className="text-white">{service.uptime}</p>
                </div>
                {service.status === 'warning' && (
                  <button
                    onClick={() => handleRestartService(service.name)}
                    className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 text-sm rounded-lg transition-colors"
                  >
                    Επανεκκίνηση
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl text-white mb-4">Ειδοποιήσεις & Alerts</h3>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-lg p-4 border flex items-start gap-3 ${
                alert.type === 'error'
                  ? 'bg-red-500/20 border-red-500/50'
                  : alert.type === 'warning'
                  ? 'bg-yellow-500/20 border-yellow-500/50'
                  : 'bg-blue-500/20 border-blue-500/50'
              }`}
            >
              <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${
                alert.type === 'error'
                  ? 'text-red-400'
                  : alert.type === 'warning'
                  ? 'text-yellow-400'
                  : 'text-blue-400'
              }`} />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                  <p className={`${
                    alert.type === 'error'
                      ? 'text-red-300'
                      : alert.type === 'warning'
                      ? 'text-yellow-300'
                      : 'text-blue-300'
                  }`}>
                    {alert.message}
                  </p>
                  <span className="text-xs text-gray-400">{alert.timestamp}</span>
                </div>
                <p className="text-sm text-gray-400">Service: {alert.service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
