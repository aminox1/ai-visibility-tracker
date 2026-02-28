import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

// Lazy initialization of API clients
let openaiClient = null;
let genAIClient = null;

function getOpenAI() {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

function getGemini() {
  if (!genAIClient) {
    genAIClient = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  }
  return genAIClient;
}

/**
 * Generate relevant queries based on domain/brand
 */
export function generateQueries(domain, industry) {
  const brandName = domain.replace(/\.(com|fr|io|ai|net|org)$/i, '');
  
  // Industry-specific query templates for better relevance
  const industryTemplates = {
    'Finance': [
      'What are the best fintech apps?',
      'What are the best digital banks?',
      'Best mobile banking apps 2026',
      'Top financial services platforms',
      'Best personal finance tools',
    ],
    'SEO': [
      'What are the best SEO tools?',
      'Top SEO platforms for keyword research',
      'Best SEO software comparison',
      'SEO tools for agencies',
      'Best alternatives to Ahrefs and Semrush',
    ],
    'Marketing': [
      'What are the best marketing automation tools?',
      'Top email marketing platforms',
      'Best marketing software 2026',
      'Marketing tools comparison',
      'Best CRM and marketing platforms',
    ],
    'Analytics': [
      'What are the best analytics tools?',
      'Top web analytics platforms',
      'Best alternatives to Google Analytics',
      'Analytics software comparison',
      'Best data analytics tools for businesses',
    ],
    'AI Tools': [
      'What are the best AI tools?',
      'Top AI platforms for businesses',
      'Best AI software 2026',
      'AI tools comparison',
      'Leading AI assistants and tools',
    ],
    'SaaS': [
      'What are the best SaaS tools?',
      'Top SaaS platforms 2026',
      'Best cloud software solutions',
      'SaaS tools comparison',
      'Leading SaaS companies',
    ],
    'E-commerce': [
      'What are the best ecommerce platforms?',
      'Top online store builders',
      'Best ecommerce software 2026',
      'Shopify vs competitors',
      'Best ecommerce tools for small business',
    ],
    'Développement Web': [
      'What are the best web development tools?',
      'Top developer tools and IDEs',
      'Best frameworks for web development',
      'Web development platforms comparison',
      'Best tools for frontend developers',
    ],
    'Design': [
      'What are the best design tools?',
      'Top graphic design software',
      'Best UI/UX design platforms',
      'Design tools comparison',
      'Best alternatives to Figma and Adobe',
    ],
  };

  // Get industry-specific queries or fallback to generic
  const baseQueries = industryTemplates[industry] || [
    `What are the best ${industry} tools?`,
    `Top ${industry} platforms in 2026`,
    `${industry} software comparison`,
    `Leading ${industry} companies`,
    `Best ${industry} solutions for businesses`,
  ];

  // Add brand-specific queries
  const brandQueries = [
    `Best alternatives to ${brandName}`,
    `${brandName} vs competitors`,
    `Is ${brandName} worth it?`,
  ];

  return [...baseQueries, ...brandQueries];
}

/**
 * Query ChatGPT (OpenAI)
 */
export async function queryOpenAI(query, domain) {
  // Skip OpenAI if quota exceeded
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'skip') {
    console.log('⏭️  OpenAI skipped (no credits or API key not configured)');
    return createErrorResult('ChatGPT', 'API quota exceeded - skipped');
  }

  try {
    const openai = getOpenAI();
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant providing detailed information about companies and products. Always cite specific brands and companies when relevant.',
        },
        {
          role: 'user',
          content: query,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0].message.content;
    return analyzeMention(content, domain, 'ChatGPT');
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    return createErrorResult('ChatGPT', error.message);
  }
}

/**
 * Query Google Gemini
 */
export async function queryGemini(query, domain) {
  try {
    const genAI = getGemini();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(query);
    const response = await result.response;
    const content = response.text();

    return analyzeMention(content, domain, 'Gemini');
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    return createErrorResult('Gemini', error.message);
  }
}

/**
 * Query Perplexity AI
 */
export async function queryPerplexity(query, domain) {
  // Skip Perplexity if API key is not configured
  if (!process.env.PERPLEXITY_API_KEY || process.env.PERPLEXITY_API_KEY === 'skip') {
    console.log('⏭️  Perplexity skipped (no API key configured)');
    return createErrorResult('Perplexity', 'API key not configured - skipped');
  }

  try {
    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'Be precise and informative. Cite specific brands and companies.',
          },
          {
            role: 'user',
            content: query,
          },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices[0].message.content;
    return analyzeMention(content, domain, 'Perplexity');
  } catch (error) {
    console.error('Perplexity API Error:', error.message);
    return createErrorResult('Perplexity', error.message);
  }
}

/**
 * Analyze if domain/brand is mentioned in the response
 */
function analyzeMention(content, domain, platform) {
  const brandName = domain.replace(/\.(com|fr|io|ai|net|org)$/i, '');
  const lowerContent = content.toLowerCase();
  const lowerBrand = brandName.toLowerCase();
  const lowerDomain = domain.toLowerCase();

  // Check if mentioned
  const mentionedBrand = lowerContent.includes(lowerBrand);
  const mentionedDomain = lowerContent.includes(lowerDomain);
  const isMentioned = mentionedBrand || mentionedDomain;

  // Find position (sentence index)
  let position = null;
  if (isMentioned) {
    const sentences = content.split(/[.!?]+/);
    position = sentences.findIndex(s => 
      s.toLowerCase().includes(lowerBrand) || 
      s.toLowerCase().includes(lowerDomain)
    ) + 1;
  }

  // Extract competitors (other domains/brands mentioned)
  const competitors = extractCompetitors(content, brandName);

  // Context extraction
  let context = '';
  if (isMentioned) {
    const sentences = content.split(/[.!?]+/);
    const mentionIndex = sentences.findIndex(s => 
      s.toLowerCase().includes(lowerBrand) || 
      s.toLowerCase().includes(lowerDomain)
    );
    if (mentionIndex !== -1) {
      context = sentences.slice(Math.max(0, mentionIndex - 1), mentionIndex + 2).join('. ').trim();
    }
  }

  return {
    platform,
    isMentioned,
    position,
    context,
    competitors,
    fullResponse: content,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Extract competitor mentions from content
 */
function extractCompetitors(content, excludeBrand) {
  // Known competitor brands across different industries
  const knownCompetitors = [
    // SEO Tools
    'Ahrefs', 'Moz', 'Majestic', 'Semrush', 'SEMrush', 'Screaming Frog', 'SpyFu', 'SERanking', 'Serpstat', 'BrightEdge', 'Conductor',
    // Analytics
    'Google Analytics', 'Adobe Analytics', 'Mixpanel', 'Amplitude', 'Heap', 'Matomo', 'Plausible',
    // Marketing
    'HubSpot', 'Marketo', 'Pardot', 'ActiveCampaign', 'Mailchimp', 'SendGrid', 'Klaviyo',
    // CMS
    'WordPress', 'Shopify', 'Wix', 'Squarespace', 'Webflow', 'Drupal', 'Joomla',
    // Other
    'Salesforce', 'Zendesk', 'Intercom', 'Drift', 'Hootsuite', 'Buffer', 'Canva', 'Figma', 'Notion', 'Asana', 'Trello', 'Monday'
  ];

  // Common words to exclude (not brands)
  const commonWords = [
    'The', 'This', 'That', 'These', 'Those', 'What', 'When', 'Where', 'How', 'Why', 'Who',
    'However', 'Therefore', 'Moreover', 'Furthermore', 'Nevertheless', 'Otherwise',
    'Top', 'Best', 'All', 'One', 'Some', 'Many', 'Most', 'More', 'Less', 'Few',
    'First', 'Second', 'Third', 'Last', 'Next', 'Previous', 'Good', 'Better', 'Great',
    'Suites', 'Suite', 'Tool', 'Tools', 'Platform', 'Platforms', 'Service', 'Services',
    'Free', 'Paid', 'Premium', 'Pro', 'Basic', 'Standard', 'Advanced', 'Enterprise',
    'Industry', 'Market', 'Business', 'Company', 'Companies', 'Website', 'Websites',
    'SEO', 'API', 'SaaS', 'AI', 'ML', 'CRM', 'CMS', 'PPC', 'ROI', 'KPI',
    'Here', 'There', 'Each', 'Every', 'Both', 'Either', 'Neither', 'Other', 'Another',
    'Key', 'Main', 'Major', 'Minor', 'Popular', 'Common', 'Useful', 'Helpful'
  ];

  const competitors = new Set();
  const lowerExclude = excludeBrand.toLowerCase();

  // First, check for known competitors
  knownCompetitors.forEach(competitor => {
    const regex = new RegExp(`\\b${competitor}\\b`, 'gi');
    if (regex.test(content) && competitor.toLowerCase() !== lowerExclude) {
      competitors.add(competitor);
    }
  });

  // Then, extract other potential brands (CamelCase, domains)
  const patterns = [
    /\b([A-Z][a-z]+(?:[A-Z][a-z]+)+)\b/g, // CamelCase brands (at least 2 parts)
    /\b([a-z]+\.(?:com|ai|io|fr|net|org))\b/gi, // Domains
  ];

  patterns.forEach(pattern => {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const candidate = match[1];
      if (candidate && 
          candidate.length > 3 && 
          candidate.toLowerCase() !== lowerExclude &&
          !commonWords.includes(candidate)) {
        competitors.add(candidate);
      }
    }
  });

  return Array.from(competitors).slice(0, 10); // Top 10
}

/**
 * Create error result object
 */
function createErrorResult(platform, errorMessage) {
  return {
    platform,
    isMentioned: false,
    position: null,
    context: '',
    competitors: [],
    fullResponse: `Error: ${errorMessage}`,
    timestamp: new Date().toISOString(),
    error: true,
  };
}

/**
 * Generate recommendations based on analysis results
 */
export function generateRecommendations(results, domain) {
  const recommendations = [];
  const mentionCount = results.filter(r => r.isMentioned).length;
  const totalPlatforms = results.filter(r => !r.error).length;

  // Overall visibility
  if (mentionCount === 0) {
    recommendations.push({
      priority: 'high',
      category: 'Visibility',
      title: 'Aucune mention détectée',
      description: `${domain} n'apparaît sur aucun des ${totalPlatforms} LLMs testés. Votre visibilité IA est critique.`,
      actions: [
        'Créer du contenu optimisé pour les LLMs (guides, comparatifs, études de cas)',
        'Obtenir des mentions sur des sites d\'autorité',
        'Développer une présence active dans les communautés pertinentes',
      ],
    });
  } else if (mentionCount < totalPlatforms) {
    recommendations.push({
      priority: 'medium',
      category: 'Visibility',
      title: 'Visibilité partielle',
      description: `${domain} apparaît sur ${mentionCount}/${totalPlatforms} plateformes. Il y a une marge d'amélioration.`,
      actions: [
        'Analyser pourquoi certains LLMs ne vous mentionnent pas',
        'Renforcer votre présence sur les plateformes non-couvertes',
      ],
    });
  }

  // Position analysis
  const avgPosition = results
    .filter(r => r.position !== null)
    .reduce((sum, r) => sum + r.position, 0) / mentionCount || 0;

  if (avgPosition > 3) {
    recommendations.push({
      priority: 'medium',
      category: 'Positioning',
      title: 'Position tardive dans les réponses',
      description: `En moyenne, vous êtes mentionné en position ${avgPosition.toFixed(1)}. Visez les 3 premières positions.`,
      actions: [
        'Devenir une référence incontournable dans votre niche',
        'Multiplier les contenus qui positionnent votre expertise',
        'Obtenir des citations sur des sources premium',
      ],
    });
  }

  // Competitor analysis
  const allCompetitors = new Set();
  results.forEach(r => r.competitors.forEach(c => allCompetitors.add(c)));

  if (allCompetitors.size > 5) {
    recommendations.push({
      priority: 'medium',
      category: 'Competition',
      title: 'Forte concurrence détectée',
      description: `${allCompetitors.size} concurrents identifiés dans les réponses des LLMs.`,
      actions: [
        `Analyser les concurrents principaux: ${Array.from(allCompetitors).slice(0, 5).join(', ')}`,
        'Identifier leurs points forts et créer du contenu différenciant',
        'Se positionner sur des niches spécifiques',
      ],
    });
  }

  // Content strategy
  recommendations.push({
    priority: 'high',
    category: 'Content Strategy',
    title: 'Optimisation pour les LLMs',
    description: 'Stratégie de contenu adaptée aux modèles de langage',
    actions: [
      'Créer des guides complets et structurés (format markdown)',
      'Publier des études de cas avec données chiffrées',
      'Obtenir des backlinks depuis des sites d\'autorité',
      'Participer activement aux discussions sur Product Hunt, Reddit, etc.',
      'Optimiser votre présence sur Wikipedia et sites de référence',
    ],
  });

  return recommendations;
}
