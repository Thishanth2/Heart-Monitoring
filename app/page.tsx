'use client';

import { useEffect, useState } from 'react';
import MetricCard from './components/MetricCard';
import ECGWaveform from './components/ECGWaveform';

interface HealthMetrics {
  heartRate: number;
  oxygenLevel: number;
  respiratoryRate: number;
}

export default function Home() {
  const [metrics, setMetrics] = useState<HealthMetrics>({
    heartRate: 72,
    oxygenLevel: 98,
    respiratoryRate: 16
  });

  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setMetrics({
        heartRate: Math.floor(Math.random() * (85 - 60) + 60),
        oxygenLevel: Math.floor(Math.random() * (100 - 95) + 95),
        respiratoryRate: Math.floor(Math.random() * (20 - 12) + 12)
      });
      setLastUpdated(new Date());
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Determine status based on values
  const getHeartRateStatus = (hr: number): 'normal' | 'warning' | 'critical' => {
    if (hr >= 60 && hr <= 100) return 'normal';
    if (hr >= 50 && hr < 60 || hr > 100 && hr <= 120) return 'warning';
    return 'critical';
  };

  const getOxygenStatus = (spo2: number): 'normal' | 'warning' | 'critical' => {
    if (spo2 >= 95) return 'normal';
    if (spo2 >= 90) return 'warning';
    return 'critical';
  };

  const getRespiratoryStatus = (rr: number): 'normal' | 'warning' | 'critical' => {
    if (rr >= 12 && rr <= 20) return 'normal';
    if (rr >= 10 && rr < 12 || rr > 20 && rr <= 25) return 'warning';
    return 'critical';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/80">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                ❤️ Heart Health Monitor
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Real-time vital signs monitoring
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Last Updated
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {mounted ? lastUpdated.toLocaleTimeString() : '-'}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="Heart Rate"
            value={metrics.heartRate}
            unit="BPM"
            icon="💓"
            status={getHeartRateStatus(metrics.heartRate)}
            normalRange="60-100 BPM"
          />

          <MetricCard
            title="Oxygen Level"
            value={metrics.oxygenLevel}
            unit="%"
            icon="🫁"
            status={getOxygenStatus(metrics.oxygenLevel)}
            normalRange="95-100%"
          />

          <MetricCard
            title="Respiratory Rate"
            value={metrics.respiratoryRate}
            unit="breaths/min"
            icon="🌬️"
            status={getRespiratoryStatus(metrics.respiratoryRate)}
            normalRange="12-20 breaths/min"
          />
        </div>

        {/* ECG Waveform Monitor */}
        <div className="mt-8">
          <ECGWaveform heartRate={metrics.heartRate} />
        </div>

        {/* Info Section */}
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            📊 About Your Vitals
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h3 className="mb-2 font-medium text-gray-900 dark:text-white">Heart Rate (BPM)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Measures the number of times your heart beats per minute. A normal resting heart rate ranges from 60 to 100 BPM.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-gray-900 dark:text-white">Oxygen Saturation (SpO2)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Indicates the percentage of oxygen in your blood. Normal levels are 95% or higher.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-gray-900 dark:text-white">Respiratory Rate</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The number of breaths you take per minute. Normal range is 12 to 20 breaths per minute.
              </p>
            </div>
          </div>
        </div>

        {/* Status Legend */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Status Indicators</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-green-500"></span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Normal - All vitals within healthy range</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-yellow-500"></span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Warning - Vitals slightly outside normal range</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-red-500"></span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Critical - Immediate attention needed</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/80">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            ⚕️ Heart Health Monitoring System - For demonstration purposes only. Consult healthcare professionals for medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
