import axios from 'axios';

const API_BASE_URL = '/api';

export interface AnalysisResult {
  platform: string;
  isMentioned: boolean;
  position: number | null;
  context: string;
  competitors: string[];
  fullResponse: string;
  timestamp: string;
  error?: boolean;
}

export interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  category: string;
  title: string;
  description: string;
  actions: string[];
}

export interface Analysis {
  id: string;
  domain: string;
  industry: string;
  query: string;
  results: AnalysisResult[];
  recommendations: Recommendation[];
  visibilityScore: number;
  timestamp: string;
}

export const api = {
  async runAnalysis(domain: string, industry: string = 'SEO'): Promise<Analysis> {
    const response = await axios.post(`${API_BASE_URL}/analysis/run`, {
      domain,
      industry,
    });
    return response.data;
  },

  async getHistory(domain: string): Promise<Analysis[]> {
    const response = await axios.get(`${API_BASE_URL}/analysis/history/${domain}`);
    return response.data;
  },

  async getAllDomains(): Promise<any[]> {
    const response = await axios.get(`${API_BASE_URL}/analysis/all`);
    return response.data;
  },
};
