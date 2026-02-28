interface VisibilityScoreProps {
  score: number;
}

export default function VisibilityScore({ score }: VisibilityScoreProps) {
  const getScoreColor = () => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 50) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreLabel = () => {
    if (score >= 80) return '🎉 Excellente visibilité !';
    if (score >= 50) return '⚡ Visibilité moyenne';
    return '⚠️ Faible visibilité';
  };

  const getScoreDescription = () => {
    if (score >= 80) return 'Votre marque est bien positionnée sur les LLMs. Continuez sur cette lancée !';
    if (score >= 50) return 'Votre marque est présente mais peut être mieux positionnée. Consultez les recommandations.';
    return 'Votre marque a besoin d\'améliorer sa présence sur les LLMs. Actions prioritaires requises.';
  };

  return (
    <div className={`rounded-xl p-6 border-2 ${getScoreColor()}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold">{getScoreLabel()}</h3>
        <div className="text-4xl font-bold">{score}/100</div>
      </div>
      <p className="text-sm opacity-90">{getScoreDescription()}</p>
      
      {/* Progress Bar */}
      <div className="mt-4 bg-white bg-opacity-50 rounded-full h-3 overflow-hidden">
        <div
          className="h-full transition-all duration-500 rounded-full"
          style={{
            width: `${score}%`,
            background: score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'
          }}
        />
      </div>
    </div>
  );
}
