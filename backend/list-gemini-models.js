import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

async function listGeminiModels() {
  console.log('🔍 Listing available Gemini models...\n');
  
  const apiKey = process.env.GOOGLE_API_KEY;
  console.log(`API Key: ${apiKey ? apiKey.substring(0, 10) + '...' : 'NOT FOUND'}\n`);
  
  try {
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    
    console.log('✅ Available models:');
    console.log('='.repeat(50));
    
    const models = response.data.models || [];
    models.forEach(model => {
      if (model.supportedGenerationMethods?.includes('generateContent')) {
        console.log(`\n📦 ${model.name}`);
        console.log(`   Display Name: ${model.displayName}`);
        console.log(`   Description: ${model.description || 'N/A'}`);
      }
    });
    
    console.log('\n' + '='.repeat(50));
    console.log(`\nTotal models with generateContent: ${models.filter(m => m.supportedGenerationMethods?.includes('generateContent')).length}`);
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

listGeminiModels();
