import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Clock, Activity } from 'lucide-react';
import { api, type Analysis } from '../services/api';

interface HistoryViewProps {
  domain: string;
}

export default function HistoryView({ domain }: HistoryViewProps) {
  const [history, setHistory] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (domain) {
      loadHistory();
    }
  }, [domain]);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await api.getHistory(domain);
      setHistory(data);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <p className="mt-2 text-gray-600">Chargement de l'historique...</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <Activity className="w-12 h-12 text-blue-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Première analyse pour ce domaine</h3>
        <p className="text-gray-600">
          Les prochaines analyses seront comparées à celle-ci pour suivre votre évolution.
        </p>
      </div>
    );
  }

  // Prepare chart data (reverse to show oldest first)
  const chartData = [...history].reverse().map((analysis, index) => ({
    name: `#${index + 1}`,
    date: new Date(analysis.timestamp).toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }),
    score: analysis.visibilityScore,
    fullDate: new Date(analysis.timestamp).toLocaleString('fr-FR'),
  }));

  // Calculate evolution
  const firstScore = history[history.length - 1].visibilityScore;
  const lastScore = history[0].visibilityScore;
  const evolution = lastScore - firstScore;

  return (
    <div className="mt-8 space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">{history.length}</span>
          </div>
          <p className="text-sm text-gray-600">Analyses effectuées</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-8 h-8 text-green-600" />
            <span className="text-3xl font-bold text-gray-900">{lastScore}%</span>
          </div>
          <p className="text-sm text-gray-600">Score actuel</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className={`w-8 h-8 ${evolution >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            <span className={`text-3xl font-bold ${evolution >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {evolution > 0 ? '+' : ''}{evolution}%
            </span>
          </div>
          <p className="text-sm text-gray-600">Évolution totale</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Évolution du score de visibilité</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              label={{ value: 'Analyses', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              domain={[0, 100]}
              label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600">{payload[0].payload.fullDate}</p>
                      <p className="text-lg font-bold text-primary-600">
                        Score: {payload[0].value}%
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#2563eb" 
              strokeWidth={3}
              dot={{ fill: '#2563eb', r: 5 }}
              activeDot={{ r: 7 }}
              name="Score de visibilité"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Historique des analyses</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Score</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Plateformes</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Requête</th>
              </tr>
            </thead>
            <tbody>
              {history.map((analysis) => (
                <tr key={analysis.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(analysis.timestamp).toLocaleString('fr-FR')}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                      analysis.visibilityScore >= 70 ? 'bg-green-100 text-green-800' :
                      analysis.visibilityScore >= 40 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {analysis.visibilityScore}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {analysis.results.filter(r => r.isMentioned).length}/{analysis.results.filter(r => !r.error).length}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">
                    {analysis.query}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
