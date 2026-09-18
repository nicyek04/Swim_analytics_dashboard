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
    // Fetch data from your local Node backend
    const fetchData = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const swimmersRes = await axios.get(`${API_BASE}/api/swimmers`);
        const performanceRes = await axios.get(`${API_BASE}/api/performance`);
        setSwimmers(swimmersRes.data);
        setPerformance(performanceRes.data);
      } catch (error) {
        console.error("Error fetching data. Is your backend running?", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <h2>Swim Squad Pro</h2>
        <ul>
          <li>Dashboard Overview</li>
          <li>Student Roster</li>
          <li>Performance Analytics</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <h1>Dashboard Overview</h1>

        <div className="card">
          <h2>50m Freestyle Progress (Alex)</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={performance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line type="monotone" dataKey="time_seconds" stroke="#3b82f6" strokeWidth={3} name="Time (Seconds)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2>Recent Training Roster</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Squad</th>
                <th>Main Stroke</th>
              </tr>
            </thead>
            <tbody>
              {swimmers.map((swimmer) => (
                <tr key={swimmer.id}>
                  <td>{swimmer.id}</td>
                  <td>{swimmer.name}</td>
                  <td>{swimmer.squad}</td>
                  <td>{swimmer.main_stroke}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}