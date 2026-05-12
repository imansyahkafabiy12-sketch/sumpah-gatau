import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, TrendingUp, Users, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

const data = [
  { name: 'Mon', stress: 4, mood: 8 },
  { name: 'Tue', stress: 5, mood: 7 },
  { name: 'Wed', stress: 7, mood: 4 },
  { name: 'Thu', stress: 8, mood: 3 },
  { name: 'Fri', stress: 9, mood: 2 },
  { name: 'Sat', stress: 6, mood: 5 },
  { name: 'Sun', stress: 5, mood: 6 },
];

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">Counselor Dashboard</h1>
          <p className="text-gray-400 text-sm">Privacy-first aggregate view of student emotional well-being.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="bg-white/5 border-white/10 text-gray-300">Export Report</Button>
          <Button variant="primary" className="bg-purple-600 hover:bg-purple-500">View Active Alerts</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-purple-400 mb-2">
            <Users className="w-5 h-5" />
            <span className="font-medium">Active Students</span>
          </div>
          <div className="text-3xl font-semibold text-white">1,204</div>
          <p className="text-sm text-green-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +12% this month
          </p>
        </div>
        
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-orange-400 mb-2">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Elevated Stress</span>
          </div>
          <div className="text-3xl font-semibold text-white">84</div>
          <p className="text-sm text-gray-400 mt-2">Students showing burnout</p>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-blue-400 mb-2">
            <ShieldAlert className="w-5 h-5" />
            <span className="font-medium">Consent Given</span>
          </div>
          <div className="text-3xl font-semibold text-white">12</div>
          <p className="text-sm text-gray-400 mt-2">Awaiting counselor contact</p>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-emerald-400 mb-2">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">Resolved Cases</span>
          </div>
          <div className="text-3xl font-semibold text-white">45</div>
          <p className="text-sm text-gray-400 mt-2">This semester</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6 md:p-8 rounded-3xl">
          <h2 className="text-xl font-medium text-white mb-6">School-wide Emotional Trends</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#f3f4f6' }}
                  itemStyle={{ color: '#f3f4f6' }}
                />
                <Area type="monotone" dataKey="stress" stroke="#f97316" fillOpacity={1} fill="url(#colorStress)" name="Academic Stress" />
                <Area type="monotone" dataKey="mood" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMood)" name="Overall Mood" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 md:p-8 rounded-3xl flex flex-col">
          <h2 className="text-xl font-medium text-white mb-6">AI Approach Suggestions</h2>
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            
            <div className="p-4 bg-white/5 border border-orange-500/20 rounded-2xl relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-orange-400">Class 11-Science B</span>
                <span className="text-xs text-gray-500">High Priority</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                "Multiple students from 11-Science B have reported extreme academic exhaustion over the last 2 weeks. AI suggests organizing a brief stress-management session for this class."
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-purple-500/20 rounded-2xl relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500" />
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-purple-400">Student #4092 (Consent Given)</span>
                <span className="text-xs text-gray-500">Awaiting Contact</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-3">
                "Student has shown signs of emotional withdrawal and family pressure. They have consented to be contacted by BK."
              </p>
              <Button size="sm" variant="secondary" className="w-full">Initiate Contact</Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
