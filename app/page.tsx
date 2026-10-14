'use client';

import React, { useState } from 'react';
import { 
  Thermometer, 
  Gauge, 
  Activity, 
  AlertTriangle, 
  RefreshCw, 
  History, 
  Settings, 
  FileText, 
  LayoutDashboard,
  Download,
  Info,
  CheckCircle2,
  X,
  Printer,
  FileCheck
} from 'lucide-react';

export default function HVACMonitorApp() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history' | 'diagnostics' | 'info'>('dashboard');
  const [isTestActive, setIsTestActive] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<'temp' | 'pressure' | 'vibration' | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRunDiagnostics = () => {
    setIsTestActive(true);
    setTimeout(() => setIsTestActive(false), 6000);
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsReportModalOpen(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navigation Bar */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row items-center justify-between shadow-lg gap-4 sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            HVAC HEALTH MONITOR
          </h1>
          <span className={`px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider flex items-center space-x-2 border transition-all duration-300 ${
            isTestActive 
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.4)] animate-pulse' 
              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
          }`}>
            {isTestActive ? <AlertTriangle className="w-4 h-4 text-amber-400 animate-bounce" /> : <span className="w-2 h-2 rounded-full mr-1 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />}
            <span>{isTestActive ? 'ALERT ACTIVE' : 'SYSTEM NOMINAL'}</span>
          </span>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center space-x-1 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800 shadow-inner">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'history', label: 'History & Reports', icon: History },
            { id: 'diagnostics', label: 'Diagnostics', icon: Settings },
            { id: 'info', label: 'Project Info', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* Prominent Warning Banner */}
      {isTestActive && (
        <div className="bg-gradient-to-r from-amber-600 via-red-600 to-amber-600 border-y-2 border-amber-300 px-8 py-5 flex items-center justify-between shadow-[0_0_40px_rgba(245,158,11,0.6)] animate-pulse z-40">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-2xl">
              <AlertTriangle className="w-8 h-8 text-white animate-bounce" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-wide uppercase">⚠️ Warning: Filter Clog / High Pressure Detected!</h2>
              <p className="text-xs text-amber-100 font-medium">Manual syringe test in progress. Differential pressure threshold exceeded on MPXV7002DP sensor.</p>
            </div>
          </div>
          <span className="bg-black/30 text-white px-4 py-2 rounded-xl text-xs font-black tracking-widest uppercase border border-white/30">
            Action Required
          </span>
        </div>
      )}

      {/* Screen 1: Dashboard Home */}
      {activeTab === 'dashboard' && (
        <div className="flex-1 p-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Component 1: Temperature Sensor Card */}
          <div 
            onClick={() => setSelectedSensor('temp')}
            className="bg-slate-900/90 rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:border-cyan-500 transition-all"
          >
            <div className="absolute top-3 right-3 text-cyan-400/50 group-hover:text-cyan-400 transition">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center justify-between text-slate-400 mb-2 pr-6">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">1. Temperature Sensor</span>
                <Thermometer className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-black text-white tracking-tight">22.4°C</span>
                <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">Optimal</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">DS18B20 Probe — Supply Air (GPIO4)[cite: 1]</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-bold">
              <span>Click for Detailed Specs &rarr;</span>
              <span className="text-slate-500">1-Wire Protocol</span>
            </div>
          </div>

          {/* Component 2: Airflow / Pressure Sensor Card */}
          <div 
            onClick={() => setSelectedSensor('pressure')}
            className={`rounded-2xl p-6 shadow-2xl border-2 flex flex-col justify-between relative overflow-hidden transition-all duration-300 cursor-pointer ${
              isTestActive 
                ? 'bg-slate-900/95 border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.4)] ring-4 ring-amber-500/20 scale-[1.02]' 
                : 'bg-slate-900/90 border-slate-800 hover:border-blue-500'
            }`}
          >
            <div className="absolute top-3 right-3 text-blue-400/50 hover:text-blue-400 transition">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2 pr-6">
                <span className={`text-xs font-bold uppercase tracking-widest ${isTestActive ? 'text-amber-400 font-black' : 'text-blue-400'}`}>
                  2. Airflow Pressure
                </span>
                <Gauge className={`w-5 h-5 ${isTestActive ? 'text-amber-400 animate-spin' : 'text-blue-400'}`} />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className={`text-4xl font-black tracking-tight ${isTestActive ? 'text-amber-300 text-5xl' : 'text-white'}`}>
                  {isTestActive ? '6.8 kPa' : '0.85 kPa'}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded border ${
                  isTestActive 
                    ? 'bg-amber-500/30 text-amber-200 border-amber-400 font-black animate-bounce' 
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {isTestActive ? '⚠️ CLOGGED' : 'Clean Filter'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">MPXV7002DP + MCP3008 ADC[cite: 1]</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-blue-400 font-bold">
              <span>Click for Detailed Specs &rarr;</span>
              <span className="text-slate-500">SPI Bus</span>
            </div>
          </div>

          {/* Component 3: Vibration Sensor Card */}
          <div 
            onClick={() => setSelectedSensor('vibration')}
            className="bg-slate-900/90 rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:border-emerald-500 transition-all"
          >
            <div className="absolute top-3 right-3 text-emerald-400/50 group-hover:text-emerald-400 transition">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center justify-between text-slate-400 mb-2 pr-6">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">3. Vibration Sensor</span>
                <Activity className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-black text-white tracking-tight">&lt;1 mm/s RMS</span>
                <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">Nominal</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Kit Vibration Module (GPIO17)[cite: 1]</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-bold">
              <span>Click for Detailed Specs &rarr;</span>
              <span className="text-slate-500">Digital GPIO</span>
            </div>
          </div>

        </div>
      )}

      {/* Screen 2: Historical Trends & Analytics & Report Generation */}
      {activeTab === 'history' && (
        <div className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-white tracking-wide">Historical Performance & Reports</h2>
              <p className="text-xs text-slate-400">Review multi-hour telemetry trends and generate automated engineering audit reports.</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] transition disabled:opacity-50"
              >
                {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileCheck className="w-4 h-4" />}
                <span>{isGenerating ? 'Compiling Report...' : 'Generate Telemetry Report'}</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800">
            <h3 className="text-sm font-bold text-cyan-400 mb-4 tracking-wide uppercase text-xs">Temperature Fluctuations (Last 24 Hours)</h3>
            <div className="h-40 bg-slate-950/60 rounded-xl flex items-end p-4 space-x-2 border border-slate-800/60">
              {[30, 35, 40, 50, 55, 60, 65, 62, 58, 52, 48, 45, 42, 50, 56, 61, 68, 70, 65, 60].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t shadow-[0_0_10px_rgba(34,211,238,0.3)]" />
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800">
            <h3 className="text-sm font-bold text-cyan-400 mb-3 tracking-wide uppercase text-xs">Event Log & Alert History</h3>
            <div className="divide-y divide-slate-800 text-xs">
              <div className="py-3 flex justify-between items-center bg-amber-500/5 px-3 rounded-lg border border-amber-500/20 my-2">
                <span className="font-bold text-amber-300 flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span>[10:15 AM] High pressure spike recorded via manual syringe test</span>
                </span>
                <span className="text-amber-300 font-black bg-amber-500/20 px-3 py-1 rounded border border-amber-500/40 uppercase tracking-wider">Warning Triggered</span>
              </div>
              <div className="py-3 flex justify-between items-center px-3">
                <span className="font-medium text-slate-300">[08:00 AM] System boot sequence completed successfully on Raspberry Pi 4[cite: 1]</span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">Normal</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Screen 3: System Diagnostics */}
      {activeTab === 'diagnostics' && (
        <div className="flex-1 p-6 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Sensor Self-Tests</h3>
            <div className="space-y-3">
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">DS18B20 Temperature Probe</p>
                  <p className="text-[10px] text-slate-400">Pin: GPIO4 / 3.3V Verified[cite: 1]</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-lg">Online</span>
              </div>
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">MPXV7002DP Pressure Sensor</p>
                  <p className="text-[10px] text-slate-400">Connected via MCP3008 ADC Chip[cite: 1]</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-lg">Active</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">Manual Testing Trigger</h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">Simulate airflow resistance changes using the 60 mL syringe and silicone tubing connected to the differential pressure port[cite: 1]. Triggers the massive full-screen alert banner.</p>
            </div>
            <button 
              onClick={handleRunDiagnostics}
              className="w-full bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-[0_0_25px_rgba(245,158,11,0.5)] transition flex items-center justify-center space-x-2"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Run Syringe Pressure Test (Trigger Alert)</span>
            </button>
          </div>
        </div>
      )}

      {/* Screen 4: Project Info */}
      {activeTab === 'info' && (
        <div className="flex-1 p-6 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4">Hardware & Architecture</h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /><span><strong>Brain:</strong> Raspberry Pi 4 Model B in official enclosure[cite: 1]</span></li>
              <li className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /><span><strong>Sensors:</strong> DS18B20 Temp Probe, MPXV7002DP Airflow Sensor, Kit Vibration Module[cite: 1]</span></li>
              <li className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /><span><strong>ADC Converter:</strong> MCP3008 10-bit analog-to-digital converter[cite: 1]</span></li>
            </ul>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4">Budget & Team Summary</h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /><span><strong>Total Estimated Cost:</strong> CAD $77 (leveraging instructor kit components)[cite: 1]</span></li>
              <li className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /><span><strong>Presentation Format:</strong> Tablet dashboard interface paired with physical tabletop demo rig.</span></li>
            </ul>
          </div>
        </div>
      )}

      {/* DETAILED SENSOR INSPECTOR MODAL POPUP */}
      {selectedSensor && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-3xl p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setSelectedSensor(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedSensor === 'temp' && (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/30">
                    <Thermometer className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">1. DS18B20 Temperature Probe</h3>
                    <p className="text-xs text-cyan-400">Waterproof Stainless Steel Sensor (~1m cable)[cite: 1]</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p><strong>Role & Function:</strong> Measures supply air temperature in the HVAC duct to verify thermal baseline efficiency (Optimal: 18°C – 25°C).</p>
                  <p><strong>Wiring & Pinout:</strong> Uses the 1-Wire protocol. Connected to 3.3V, Ground, and routed through a 4.7 kΩ pull-up resistor to **GPIO4** on the T-cobbler breakout board[cite: 1].</p>
                </div>
              </div>
            )}

            {selectedSensor === 'pressure' && (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/30">
                    <Gauge className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">2. MPXV7002DP Differential Pressure Sensor</h3>
                    <p className="text-xs text-blue-400">Airflow & Filter-Clog Monitoring via MCP3008 ADC[cite: 1]</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p><strong>Role & Function:</strong> Detects filter clogging by measuring differential pressure drops across airflow paths. Tested manually using a **60 mL syringe and silicone tubing**[cite: 1].</p>
                  <p><strong>Wiring & Pinout:</strong> Analog voltage output feeds into the **MCP3008 10-bit ADC chip**. Communicates safely with the Raspberry Pi 4 via SPI bus (MOSI, MISO, SCLK, CE0) at 3.3V logic[cite: 1].</p>
                </div>
              </div>
            )}

            {selectedSensor === 'vibration' && (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/30">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">3. Kit Vibration Module</h3>
                    <p className="text-xs text-emerald-400">Mechanical Shaking & Predictive Maintenance[cite: 1]</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p><strong>Role & Function:</strong> Detects mechanical vibration, motor shaking, or loose housing components to simulate blower fan failure alerts.</p>
                  <p><strong>Wiring & Pinout:</strong> Blue board with brass spring sensor. VCC connected to 3.3V, GND to ground, and digital output (**DO**) connected to **GPIO17**[cite: 1].</p>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setSelectedSensor(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GENERATED REPORT PREVIEW MODAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-3xl p-8 shadow-2xl relative my-8">
            <button 
              onClick={() => setIsReportModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-800">
              <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/30">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">HVAC Health Monitor - Official Engineering Report</h3>
                <p className="text-xs text-slate-400">Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-300 bg-slate-950 p-6 rounded-2xl border border-slate-800 max-h-[60vh] overflow-y-auto">
              <div className="space-y-1">
                <h4 className="text-cyan-400 font-bold uppercase tracking-wider text-sm">1. Executive Summary</h4>
                <p>This automated report summarizes telemetry data streamed from the Raspberry Pi 4 IoT HVAC health monitoring rig. The system tracks thermal efficiency, differential airflow resistance, and mechanical vibration in real-time[cite: 1].</p>
              </div>

              <div className="space-y-1 pt-2">
                <h4 className="text-cyan-400 font-bold uppercase tracking-wider text-sm">2. Hardware Telemetry Status</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li><strong>Supply Temperature (DS18B20):</strong> 22.4°C (Within optimal range of 18°C – 25°C)[cite: 1].</li>
                  <li><strong>Airflow Pressure (MPXV7002DP + MCP3008):</strong> 0.85 kPa nominal (Filter clean status verified)[cite: 1].</li>
                  <li><strong>Vibration Analysis (GPIO17 Module):</strong> &lt;1 mm/s RMS (Nominal structural stability)[cite: 1].</li>
                </ul>
              </div>

              <div className="space-y-1 pt-2">
                <h4 className="text-cyan-400 font-bold uppercase tracking-wider text-sm">3. Recent Incident Logs</h4>
                <p>• [10:15 AM] High pressure spike recorded during manual syringe test (Warning state successfully triggered and validated)[cite: 1].</p>
                <p>• [08:00 AM] System boot sequence verified on Raspberry Pi 4 Model B[cite: 1].</p>
              </div>

              <div className="space-y-1 pt-2">
                <h4 className="text-cyan-400 font-bold uppercase tracking-wider text-sm">4. Project Budget Summary</h4>
                <p>Total estimated project expenditure: <strong>CAD $77</strong>, successfully leveraging instructor starter kit components (Raspberry Pi 4, breadboard, T-cobbler, and jumper wires)[cite: 1].</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end space-x-3">
              <button 
                onClick={() => window.print()}
                className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                <span>Print / Save PDF</span>
              </button>
              <button 
                onClick={() => setIsReportModalOpen(false)}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Control Panel */}
      <footer className="bg-slate-900/80 backdrop-blur-md border-t border-slate-800 px-6 py-4 mt-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-400 font-medium">
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>Connected to Raspberry Pi 4 telemetry stream</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-950/60 px-3 py-1 rounded-full border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-xs text-slate-300 font-bold tracking-wider">LIVE BOOTH MODE</span>
          </div>
        </div>
      </footer>
    </main>
  );
}