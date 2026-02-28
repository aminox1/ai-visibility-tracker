# ⚡ Démarrage ultra-rapide

## 🚀 Installation en 3 minutes

### Terminal 1 - Backend

```bash
cd "D:\AI Visibility Tracker\backend"
npm install
```

**Créer le fichier `.env` dans le dossier backend :**
```bash
PORT=3001
OPENAI_API_KEY=sk-proj-votre-clé-ici
GOOGLE_API_KEY=AIzavotre-clé-ici
PERPLEXITY_API_KEY=pplx-votre-clé-ici
NODE_ENV=development
```

```bash
npm run dev
```

✅ Backend ready on `http://localhost:3001`

---

### Terminal 2 - Frontend

```bash
cd "D:\AI Visibility Tracker\frontend"
npm install
npm run dev
```

✅ Frontend ready on `http://localhost:3000`

---

## 🧪 Premier test

1. Ouvrir `http://localhost:3000`
2. Entrer : `searchable.com`
3. Secteur : `SEO`
4. Cliquer "Analyser"

---

## 🔑 Obtenir les API Keys

### OpenAI (ChatGPT)
1. Aller sur https://platform.openai.com/api-keys
2. Créer une clé API
3. Copier `sk-proj-...`

### Google Gemini
1. Aller sur https://makersuite.google.com/app/apikey
2. Créer une clé API
3. Copier `AIza...`

### Perplexity
1. Aller sur https://www.perplexity.ai/settings/api
2. Créer une clé API
3. Copier `pplx-...`

---

## ⚠️ Troubleshooting

### ❌ "Cannot GET /api/analysis/run"
➡️ Le backend n'est pas démarré. Lancer `npm run dev` dans `/backend`

### ❌ "API Error: 401"
➡️ Vérifier que les clés API sont correctes dans `.env`

### ❌ "CORS Error"
➡️ S'assurer que le backend est sur le port 3001 et le frontend sur 3000

### ❌ "Module not found"
➡️ Relancer `npm install` dans le dossier concerné

---

## 📊 Exemples de domaines à tester

- `searchable.com` (concurrent direct)
- `peec.ai` (concurrent)
- `babylovegrowth.ai` (concurrent)
- `semrush.com` (leader SEO)
- Votre propre domaine !

---

**Prêt à tracker ! 🎯**
