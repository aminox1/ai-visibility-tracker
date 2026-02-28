# 🚀 AI Visibility Tracker

> **Application web professionnelle pour tracker la visibilité d'une marque sur les moteurs de recherche IA (ChatGPT, Gemini, Perplexity)**

[![Made with React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)](https://nodejs.org/)

---

## 🎯 Fonctionnalités principales

✅ **Analyse multi-plateformes** - ChatGPT (GPT-4), Gemini Pro & Perplexity  
✅ **Détection intelligente** - Citations, positions, contexte d'apparition  
✅ **Analyse concurrentielle** - Identification automatique des compétiteurs  
✅ **Recommandations actionnables** - Conseils personnalisés basés sur l'analyse  
✅ **Score de visibilité** - Métrique 0-100 pour mesurer votre présence IA  
✅ **Suivi historique** - Évolution dans le temps (stockage en mémoire)  
✅ **Interface moderne** - UI/UX professionnelle avec Tailwind CSS  

---

## 🛠️ Stack technique

### Frontend
- **React 18** + **TypeScript** - Framework moderne et type-safe
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Design system utility-first
- **Lucide React** - Icônes modernes
- **Axios** - Client HTTP

### Backend
- **Node.js 20** + **Express** - API REST performante
- **OpenAI SDK** - Intégration GPT-4
- **Google Generative AI** - Intégration Gemini
- **Perplexity API** - Recherche augmentée par IA

---

## 📦 Installation rapide

### Prérequis
- Node.js 20+ installé
- API keys pour OpenAI, Google Gemini, et Perplexity

### 1️⃣ Installation Backend

```bash
cd backend
npm install

# Configurer les variables d'environnement
cp .env.example .env
```

**Éditer le fichier `.env`** avec vos clés API :
```env
PORT=3001
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxx
GOOGLE_API_KEY=AIzaxxxxxxxxxxxxxxxxxx
PERPLEXITY_API_KEY=pplx-xxxxxxxxxxxxxx
NODE_ENV=development
```

**Obtenir les API keys :**
- **OpenAI** : https://platform.openai.com/api-keys
- **Google Gemini** : https://makersuite.google.com/app/apikey
- **Perplexity** : https://www.perplexity.ai/settings/api

```bash
# Démarrer le serveur backend
npm run dev
```
✅ Backend lancé sur `http://localhost:3001`

### 2️⃣ Installation Frontend

**Ouvrir un NOUVEAU terminal** :
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend lancé sur `http://localhost:3000`

---

## 🎨 Utilisation

1. **Ouvrir** `http://localhost:3000` dans votre navigateur
2. **Entrer un domaine** (ex: `searchable.com`, `peec.ai`)
3. **Sélectionner le secteur** (SEO, Marketing, AI Tools)
4. **Cliquer sur "Analyser"**

---

## 🏗️ Architecture

```
ai-visibility-tracker/
│
├── backend/                      # API Node.js
│   ├── src/
│   │   ├── server.js            # Point d'entrée Express
│   │   ├── routes/
│   │   │   └── analysis.js      # Routes d'analyse
│   │   └── services/
│   │       └── aiService.js     # Logique IA
│   └── package.json
│
├── frontend/                     # Application React
│   ├── src/
│   │   ├── components/          # Composants React
│   │   ├── services/
│   │   │   └── api.ts           # Client API
│   │   └── App.tsx
│   └── package.json
│
└── README.md
```

---

## 📝 Développé pour SEO AI Systems

**Objectif :** Démontrer la capacité à concevoir et développer une feature produit complète en utilisant l'IA comme accélérateur.

**Critères d'évaluation :**
- ✅ Compréhension du problème produit
- ✅ Qualité de la réflexion sur la visibilité dans les LLMs
- ✅ Pertinence des recommandations
- ✅ Utilisation de l'IA comme accélérateur de développement

---

## 👨‍💻 Auteur

**Mohamed Amine Moumeni**  
Portfolio : [https://portfolio-mohamed-amine-moumeni.vercel.app/](https://portfolio-mohamed-amine-moumeni.vercel.app/)

---

**🚀 Prêt à lancer l'analyse ? Ouvrez http://localhost:3000 !**
