import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
  onSubmit: (domain: string, industry: string) => void;
  loading: boolean;
}

export default function SearchForm({ onSubmit, loading }: SearchFormProps) {
  const [domain, setDomain] = useState('');
  const [industry, setIndustry] = useState('SEO');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim()) {
      onSubmit(domain.trim(), industry);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Domain Input */}
        <div className="md:col-span-2">
          <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
            Nom de domaine ou marque
          </label>
          <input
            type="text"
            id="domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Ex: searchable.com, peec.ai"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            disabled={loading}
            required
          />
        </div>

        {/* Industry Select */}
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
            Secteur d'activité
          </label>
          <select
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            disabled={loading}
          >
            <option value="SEO">SEO</option>
            <option value="Marketing">Marketing</option>
            <option value="Analytics">Analytics</option>
            <option value="AI Tools">AI Tools</option>
            <option value="SaaS">SaaS</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Développement Web">Développement Web</option>
            <option value="Design">Design</option>
            <option value="DevOps">DevOps</option>
            <option value="Tech/Startup">Tech/Startup</option>
            <option value="Consulting">Consulting</option>
            <option value="Finance">Finance</option>
            <option value="Éducation">Éducation</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-4">
        <button
          type="submit"
          disabled={loading || !domain.trim()}
          className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center space-x-2"
        >
          <Search className="w-5 h-5" />
          <span>{loading ? 'Analyse en cours...' : 'Analyser la visibilité IA'}</span>
        </button>
      </div>
    </form>
  );
}
