import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function testGeminiFlash() {
  console.log('🧪 Testing Gemini 2.5 Flash...\n');
  
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent('What are the best SEO tools? List 3 popular ones.');
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ SUCCESS! Gemini 2.5 Flash works!\n');
    console.log('Response:');
    console.log('='.repeat(50));
    console.log(text);
    console.log('='.repeat(50));
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

testGeminiFlash();
