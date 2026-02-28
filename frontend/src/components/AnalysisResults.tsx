import { Eye, Trophy, TrendingUp, Users } from 'lucide-react';
import type { Analysis } from '../services/api';
import VisibilityScore from './VisibilityScore';
import PlatformResults from './PlatformResults';
import Recommendations from './Recommendations';

interface AnalysisResultsProps {
  analysis: Analysis;
}

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const mentionedCount = analysis.results.filter(r => r.isMentioned).length;
  const totalPlatforms = analysis.results.filter(r => !r.error).length;

  return (
    <div className="mt-8 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Visibility Score */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{analysis.visibilityScore}%</span>
          </div>
          <p className="text-sm opacity-90">Score de visibilité</p>
        </div>

        {/* Mentions */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Eye className="w-8 h-8 text-green-600" />
            <span className="text-3xl font-bold text-gray-900">
              {mentionedCount}/{totalPlatforms}
            </span>
          </div>
          <p className="text-sm text-gray-600">Plateformes citant votre marque</p>
        </div>

        {/* Competitors */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-orange-600" />
            <span className="text-3xl font-bold text-gray-900">
              {new Set(analysis.results.flatMap(r => r.competitors)).size}
            </span>
          </div>
          <p className="text-sm text-gray-600">Concurrents identifiés</p>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <span className="text-3xl font-bold text-gray-900">
              {analysis.recommendations.length}
            </span>
          </div>
          <p className="text-sm text-gray-600">Recommandations</p>
        </div>
      </div>

      {/* Visibility Score Detail */}
      <VisibilityScore score={analysis.visibilityScore} />

      {/* Platform Results */}
      <PlatformResults results={analysis.results} query={analysis.query} />

      {/* Recommendations */}
      <Recommendations recommendations={analysis.recommendations} />

      {/* Analysis Info */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <p className="text-sm text-gray-600">
          <strong>Domaine analysé:</strong> {analysis.domain} •{' '}
          <strong>Secteur:</strong> {analysis.industry} •{' '}
          <strong>Requête testée:</strong> "{analysis.query}" •{' '}
          <strong>Date:</strong> {new Date(analysis.timestamp).toLocaleString('fr-FR')}
        </p>
      </div>
    </div>
  );
}
