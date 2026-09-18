import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';

interface Swimmer {
  id: number;
  name: string;
  squad: string;
  main_stroke: string;
}

interface Performance {
  week: string;
  time_seconds: number;
}

export default function App() {
  const [swimmers, setSwimmers] = useState<Swimmer[]>([]);
  const [performance, setPerformance] = useState<Performance[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const swimmersRes = await axios.get(`${API_BASE}/api/swimmers`);
        const performanceRes = await axios.get(`${API_BASE}/api/performance`);
        setSwimmers(swimmersRes.data);
        setPerformance(performanceRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-screen w-full font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8 tracking-wide text-blue-400">Swim Analytics</h2>
        <ul className="space-y-4">
          <li className="px-4 py-2 bg-slate-800 rounded-lg cursor-pointer font-medium text-blue-300">Dashboard</li>
          <li className="px-4 py-2 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors text-slate-300">Student Roster</li>
          <li className="px-4 py-2 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors text-slate-300">Performance</li>
          <li className="px-4 py-2 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors text-slate-300">Settings</li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-slate-500 mt-2">Track athlete metrics and roster updates.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Performance Chart Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-700 mb-6">50m Freestyle Progress (Alex)</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <LineChart data={performance} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="time_seconds" 
                    stroke="#3b82f6" 
                    strokeWidth={4} 
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6 }}
                    name="Seconds" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Roster Table Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-700 mb-6">Recent Training Roster</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-100 text-slate-500 text-sm tracking-wider">
                    <th className="pb-3 px-2 font-medium">ID</th>
                    <th className="pb-3 px-2 font-medium">NAME</th>
                    <th className="pb-3 px-2 font-medium">SQUAD</th>
                    <th className="pb-3 px-2 font-medium">MAIN STROKE</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  {swimmers.map((swimmer) => (
                    <tr key={swimmer.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-2 text-slate-400 font-medium">{swimmer.id}</td>
                      <td className="py-4 px-2 font-semibold text-slate-800">{swimmer.name}</td>
                      <td className="py-4 px-2">
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                          {swimmer.squad}
                        </span>
                      </td>
                      <td className="py-4 px-2">{swimmer.main_stroke}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}