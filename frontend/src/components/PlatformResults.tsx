import { Hash, MessageSquare, Users as UsersIcon } from 'lucide-react';
import type { AnalysisResult } from '../services/api';

interface PlatformResultsProps {
  results: AnalysisResult[];
  query: string;
}

export default function PlatformResults({ results, query }: PlatformResultsProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'chatgpt':
        return '🤖';
      case 'gemini':
        return '💎';
      case 'perplexity':
        return '🔮';
      default:
        return '🤖';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'chatgpt':
        return 'border-green-500 bg-green-50';
      case 'gemini':
        return 'border-blue-500 bg-blue-50';
      case 'perplexity':
        return 'border-purple-500 bg-purple-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        📊 Résultats par plateforme
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Requête testée: <span className="font-semibold">"{query}"</span>
      </p>

      <div className="space-y-4">
        {results.map((result, idx) => (
          <div
            key={idx}
            className={`border-l-4 rounded-lg p-5 ${getPlatformColor(result.platform)}`}
          >
            {/* Platform Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{getPlatformIcon(result.platform)}</span>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">{result.platform}</h4>
                  {result.error ? (
                    <span className="text-xs text-red-600 font-medium">❌ Erreur API</span>
                  ) : result.isMentioned ? (
                    <span className="text-xs text-green-700 font-medium">✅ Marque citée</span>
                  ) : (
                    <span className="text-xs text-gray-600 font-medium">❌ Non citée</span>
                  )}
                </div>
              </div>

              {result.isMentioned && result.position && (
                <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full">
                  <Hash className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-bold text-gray-900">Position {result.position}</span>
                </div>
              )}
            </div>

            {/* Context */}
            {result.context && (
              <div className="mb-3 bg-white p-3 rounded-lg border border-gray-200">
                <div className="flex items-start space-x-2">
                  <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5" />
                  <p className="text-sm text-gray-700 italic">"{result.context}"</p>
                </div>
              </div>
            )}

            {/* Competitors */}
            {result.competitors && result.competitors.length > 0 && (
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="flex items-start space-x-2 mb-2">
                  <UsersIcon className="w-4 h-4 text-gray-500 mt-0.5" />
                  <span className="text-xs font-semibold text-gray-700 uppercase">
                    Concurrents mentionnés
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 ml-6">
                  {result.competitors.slice(0, 8).map((competitor, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-300"
                    >
                      {competitor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Full Response Toggle */}
            {!result.error && (
              <details className="mt-3">
                <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900 font-medium">
                  Voir la réponse complète →
                </summary>
                <div className="mt-2 p-3 bg-white rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-700 whitespace-pre-wrap">{result.fullResponse}</p>
                </div>
              </details>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
