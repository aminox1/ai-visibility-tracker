import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { api, type Analysis } from '../services/api';
import SearchForm from './SearchForm';
import AnalysisResults from './AnalysisResults';
import HistoryView from './HistoryView';

export default function Dashboard() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async (domain: string, industry: string) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await api.runAnalysis(domain, industry);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Trackez votre visibilité sur les LLMs
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez si votre marque est citée par ChatGPT, Gemini et Perplexity.
          Identifiez vos concurrents et obtenez des recommandations actionnables.
        </p>
      </div>

      {/* Search Form */}
      <SearchForm onSubmit={handleAnalysis} loading={loading} />

      {/* Error Display */}
      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm font-medium">❌ {error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mt-12 text-center">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Analyse en cours...</p>
          <p className="text-sm text-gray-500 mt-2">
            Interrogation de ChatGPT, Gemini et Perplexity
          </p>
        </div>
      )}

      {/* Results */}
      {analysis && !loading && (
        <>
          <AnalysisResults analysis={analysis} />
          <HistoryView domain={analysis.domain} />
        </>
      )}

      {/* Empty State */}
      {!analysis && !loading && !error && (
        <div className="mt-16 text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Lancez votre première analyse
          </h3>
          <p className="text-gray-500">
            Entrez un nom de domaine ci-dessus pour commencer
          </p>
        </div>
      )}
    </div>
  );
}
