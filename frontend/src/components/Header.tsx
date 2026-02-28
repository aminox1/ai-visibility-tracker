import { Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                AI Visibility Tracker
              </h1>
              <p className="text-sm text-gray-600">
                Analysez votre visibilité sur ChatGPT, Gemini & Perplexity
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Développé par</p>
            <p className="text-sm font-semibold text-gray-800">Mohamed Amine Moumeni</p>
          </div>
        </div>
      </div>
    </header>
  );
}
