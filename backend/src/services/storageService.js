import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = path.join(__dirname, '../../data');
const HISTORY_FILE = path.join(DATA_DIR, 'analyses-history.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize history file if it doesn't exist
if (!fs.existsSync(HISTORY_FILE)) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify([]), 'utf8');
}

/**
 * Save an analysis to history
 */
export function saveAnalysis(analysis) {
  try {
    const history = readHistory();
    history.push(analysis);
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf8');
    console.log(`💾 Analysis saved for ${analysis.domain}`);
    return true;
  } catch (error) {
    console.error('Error saving analysis:', error);
    return false;
  }
}

/**
 * Read all history
 */
export function readHistory() {
  try {
    const data = fs.readFileSync(HISTORY_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading history:', error);
    return [];
  }
}

/**
 * Get history for a specific domain
 */
export function getDomainHistory(domain) {
  const history = readHistory();
  return history
    .filter(a => a.domain.toLowerCase() === domain.toLowerCase())
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

/**
 * Get all unique domains analyzed
 */
export function getAllDomains() {
  const history = readHistory();
  const domains = [...new Set(history.map(a => a.domain))];
  return domains.sort();
}

/**
 * Get recent analyses (last N)
 */
export function getRecentAnalyses(limit = 10) {
  const history = readHistory();
  return history
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit);
}
