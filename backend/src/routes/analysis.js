import express from 'express';
import {
  queryOpenAI,
  queryGemini,
  queryPerplexity,
  generateQueries,
  generateRecommendations,
} from '../services/aiService.js';

const router = express.Router();

// In-memory storage for tracking history (replace with MongoDB in production)
const analysisHistory = new Map();

/**
 * GET /api/analysis/status
 * Check API configuration status
 */
router.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    apis: {
      openai: !!process.env.OPENAI_API_KEY,
      google: !!process.env.GOOGLE_API_KEY,
      perplexity: !!process.env.PERPLEXITY_API_KEY,
    },
    timestamp: new Date().toISOString(),
  });
});

/**
 * POST /api/analysis/run
 * Run visibility analysis for a domain
 */
router.post('/run', async (req, res) => {
  try {
    const { domain, industry = 'SEO' } = req.body;

    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' });
    }

    console.log(`🔍 Starting analysis for: ${domain} (${industry})`);
    console.log(`🔑 API Keys configured:`, {
      openai: !!process.env.OPENAI_API_KEY,
      google: !!process.env.GOOGLE_API_KEY,
      perplexity: !!process.env.PERPLEXITY_API_KEY,
    });

    // Generate relevant queries
    const queries = generateQueries(domain, industry);
    console.log(`📋 Generated ${queries.length} queries`);

    // Pick the most relevant query (first one is usually most specific)
    // In production, you could test multiple queries
    const testQuery = queries[0];
    console.log(`🤖 Testing query: "${testQuery}"`);

    const results = await Promise.allSettled([
      queryOpenAI(testQuery, domain),
      queryGemini(testQuery, domain),
      queryPerplexity(testQuery, domain),
    ]);

    const analysisResults = results.map(r => {
      if (r.status === 'fulfilled') {
        return r.value;
      } else {
        console.error('API call failed:', r.reason);
        return {
          platform: 'Unknown',
          isMentioned: false,
          position: null,
          context: '',
          competitors: [],
          fullResponse: `Error: ${r.reason?.message || 'Unknown error'}`,
          timestamp: new Date().toISOString(),
          error: true,
        };
      }
    });

    // Generate recommendations
    const recommendations = generateRecommendations(analysisResults, domain);

    // Calculate visibility score
    const visibilityScore = calculateVisibilityScore(analysisResults);

    const analysis = {
      id: Date.now().toString(),
      domain,
      industry,
      query: testQuery,
      results: analysisResults,
      recommendations,
      visibilityScore,
      timestamp: new Date().toISOString(),
    };

    // Store in history
    if (!analysisHistory.has(domain)) {
      analysisHistory.set(domain, []);
    }
    analysisHistory.get(domain).push(analysis);

    console.log(`✅ Analysis complete. Score: ${visibilityScore}%`);

    res.json(analysis);
  } catch (error) {
    console.error('❌ Analysis error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Analysis failed', 
      message: error.message,
      details: error.toString()
    });
  }
});

/**
 * GET /api/analysis/history/:domain
 * Get analysis history for a domain
 */
router.get('/history/:domain', (req, res) => {
  const { domain } = req.params;
  const history = analysisHistory.get(domain) || [];
  res.json(history);
});

/**
 * GET /api/analysis/all
 * Get all tracked domains
 */
router.get('/all', (req, res) => {
  const allDomains = Array.from(analysisHistory.keys()).map(domain => ({
    domain,
    lastAnalysis: analysisHistory.get(domain).slice(-1)[0],
    totalAnalyses: analysisHistory.get(domain).length,
  }));
  res.json(allDomains);
});

/**
 * Calculate visibility score (0-100)
 */
function calculateVisibilityScore(results) {
  const validResults = results.filter(r => !r.error);
  if (validResults.length === 0) return 0;

  let score = 0;
  const mentionCount = validResults.filter(r => r.isMentioned).length;
  
  // Base score: 40 points for being mentioned
  score += (mentionCount / validResults.length) * 40;

  // Position bonus: 30 points
  const positions = validResults.filter(r => r.position !== null).map(r => r.position);
  if (positions.length > 0) {
    const avgPosition = positions.reduce((a, b) => a + b, 0) / positions.length;
    const positionScore = Math.max(0, 30 - (avgPosition - 1) * 5);
    score += positionScore;
  }

  // Context quality: 20 points
  const contextsLength = validResults.filter(r => r.context).reduce((sum, r) => sum + r.context.length, 0);
  score += Math.min(20, contextsLength / 50);

  // Consistency: 10 points
  score += (mentionCount === validResults.length) ? 10 : (mentionCount / validResults.length) * 10;

  return Math.round(Math.min(100, score));
}

export default router;
