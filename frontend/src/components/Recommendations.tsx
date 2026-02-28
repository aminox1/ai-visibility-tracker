import { Lightbulb, AlertTriangle, CheckSquare } from 'lucide-react';
import type { Recommendation } from '../services/api';

interface RecommendationsProps {
  recommendations: Recommendation[];
}

export default function Recommendations({ recommendations }: RecommendationsProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-orange-500 bg-orange-50';
      case 'low':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'medium':
        return <Lightbulb className="w-5 h-5 text-orange-600" />;
      case 'low':
        return <CheckSquare className="w-5 h-5 text-blue-600" />;
      default:
        return <Lightbulb className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Priorité Haute';
      case 'medium':
        return 'Priorité Moyenne';
      case 'low':
        return 'Priorité Basse';
      default:
        return 'Priorité';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
        <Lightbulb className="w-6 h-6 text-yellow-500" />
        <span>💡 Recommandations</span>
      </h3>

      <div className="space-y-4">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className={`border-l-4 rounded-lg p-5 ${getPriorityColor(rec.priority)}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 flex-1">
                {getPriorityIcon(rec.priority)}
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-bold text-gray-500 uppercase">
                      {rec.category}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-white rounded-full font-semibold">
                      {getPriorityLabel(rec.priority)}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{rec.title}</h4>
                  <p className="text-sm text-gray-700">{rec.description}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 uppercase mb-2">
                Actions à mettre en place:
              </p>
              <ul className="space-y-2">
                {rec.actions.map((action, i) => (
                  <li key={i} className="flex items-start space-x-2 text-sm text-gray-700">
                    <span className="text-primary-600 font-bold">•</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Strategy Summary */}
      <div className="mt-6 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-4 border border-primary-200">
        <h4 className="font-bold text-gray-900 mb-2">🎯 Stratégie globale</h4>
        <p className="text-sm text-gray-700">
          Pour améliorer votre visibilité IA, concentrez-vous sur la création de contenu
          structuré de qualité, l'obtention de citations sur des sites d'autorité, et une
          présence active dans les communautés pertinentes. Les LLMs valorisent les sources
          fiables et les contenus exhaustifs.
        </p>
      </div>
    </div>
  );
}
