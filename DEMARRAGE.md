# 🚀 GUIDE DE DÉMARRAGE - AI Visibility Tracker

## ✅ Projet créé avec succès !

Tous les fichiers sont installés dans **D:\AI Visibility Tracker**

---

## 📝 ÉTAPE IMPORTANTE : Configurer les API Keys

### 1️⃣ Obtenir les clés API

Vous avez besoin de 3 API keys (gratuit pour commencer) :

#### **OpenAI (ChatGPT)**
- 🌐 Aller sur : https://platform.openai.com/api-keys
- ➕ Cliquer sur "Create new secret key"
- 📋 Copier la clé (commence par `sk-proj-...`)
- 💡 Crédit gratuit : $5 pour commencer

#### **Google Gemini**
- 🌐 Aller sur : https://makersuite.google.com/app/apikey
- ➕ Cliquer sur "Create API key"
- 📋 Copier la clé (commence par `AIza...`)
- 💡 Totalement gratuit !

#### **Perplexity AI**
- 🌐 Aller sur : https://www.perplexity.ai/settings/api
- ➕ Créer un compte et générer une clé
- 📋 Copier la clé (commence par `pplx-...`)
- 💡 Crédit gratuit pour tester

---

### 2️⃣ Configurer le fichier `.env`

**Ouvrir le fichier :** `D:\AI Visibility Tracker\backend\.env`

**Remplacer avec vos vraies clés :**
```env
PORT=3001
OPENAI_API_KEY=sk-proj-VOTRE_VRAIE_CLE_ICI
GOOGLE_API_KEY=AIzaVOTRE_VRAIE_CLE_ICI
PERPLEXITY_API_KEY=pplx-VOTRE_VRAIE_CLE_ICI
NODE_ENV=development
```

⚠️ **Important :** Ne partagez JAMAIS ces clés publiquement !

---

## 🎬 LANCER L'APPLICATION

### Terminal 1 : Backend

```bash
cd "D:\AI Visibility Tracker\backend"
npm run dev
```

✅ Vous devriez voir :
```
🚀 Server running on http://localhost:3001
📊 API ready at http://localhost:3001/api
```

### Terminal 2 : Frontend

**Ouvrir un NOUVEAU terminal PowerShell/CMD**

```bash
cd "D:\AI Visibility Tracker\frontend"
npm run dev
```

✅ Vous devriez voir :
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:3000/
```

---

## 🧪 TESTER L'APPLICATION

1. **Ouvrir votre navigateur :** http://localhost:3000

2. **Entrer un domaine à tester :**
   - `searchable.com` (concurrent mentionné dans l'exercice)
   - `peec.ai` (concurrent mentionné)
   - `semrush.com` (leader du SEO)
   - Votre propre domaine !

3. **Sélectionner le secteur :** SEO, Marketing, AI Tools, etc.

4. **Cliquer sur "Analyser la visibilité IA"**

5. **Attendre 10-30 secondes** pendant que l'app interroge les 3 LLMs

6. **Voir les résultats :**
   - Score de visibilité (0-100)
   - Citations sur ChatGPT, Gemini, Perplexity
   - Concurrents identifiés
   - Recommandations personnalisées

---

## 📊 Ce que fait l'application

1. **Génère des requêtes pertinentes** selon votre secteur
2. **Interroge 3 LLMs** en parallèle (ChatGPT, Gemini, Perplexity)
3. **Détecte si votre marque est mentionnée** et à quelle position
4. **Identifie vos concurrents** automatiquement
5. **Calcule un score de visibilité** (0-100)
6. **Génère des recommandations** pour améliorer votre présence

---

## 🎯 POUR LA PRÉSENTATION

### Points à mettre en avant :

✅ **Architecture full-stack** : React + TypeScript + Node.js
✅ **3 APIs IA** : OpenAI, Gemini, Perplexity
✅ **Analyse intelligente** : Détection, position, contexte
✅ **Algorithme de scoring** : Métrique 0-100 basée sur 4 critères
✅ **Recommandations automatiques** : Stratégie de contenu adaptée aux LLMs
✅ **Interface moderne** : Tailwind CSS, responsive, UX soignée

### Démo suggérée :

1. Montrer l'interface (claire et professionnelle)
2. Lancer une analyse avec `searchable.com`
3. Expliquer les résultats :
   - Score de visibilité
   - Plateformes mentionnant la marque
   - Position dans les réponses
   - Concurrents détectés
4. Présenter les recommandations générées
5. Expliquer l'approche technique (algorithmes, APIs)

---

## 🛠️ Structure du projet

```
D:\AI Visibility Tracker\
├── backend/
│   ├── src/
│   │   ├── server.js           # Serveur Express
│   │   ├── routes/
│   │   │   └── analysis.js     # Routes API
│   │   └── services/
│   │       └── aiService.js    # Logique IA
│   └── .env                    # ⚠️ VOS CLÉS API ICI
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Composants React
│   │   │   ├── Dashboard.tsx
│   │   │   ├── SearchForm.tsx
│   │   │   ├── AnalysisResults.tsx
│   │   │   ├── PlatformResults.tsx
│   │   │   ├── Recommendations.tsx
│   │   │   └── VisibilityScore.tsx
│   │   ├── services/
│   │   │   └── api.ts          # Client API
│   │   └── App.tsx
│   └── vite.config.ts
│
└── README.md                    # Documentation complète
```

---

## ⚠️ Problèmes courants

### ❌ "Cannot GET /api/..."
**Solution :** Le backend n'est pas lancé → `cd backend && npm run dev`

### ❌ "401 Unauthorized" ou "API Error"
**Solution :** Les clés API sont incorrectes → Vérifier le fichier `.env`

### ❌ "CORS Error"
**Solution :** Backend et frontend doivent tourner ensemble

### ❌ "Module not found"
**Solution :** `npm install` dans le bon dossier

---

## 🎓 Améliorations futures (pour discussion)

En production, on pourrait ajouter :
- 📊 **Graphiques d'évolution** avec Recharts
- 🗄️ **Base de données** MongoDB pour historique
- 🔐 **Authentification** utilisateur
- 📧 **Notifications** par email/webhook
- 🚀 **Analyse multi-requêtes** (10-15 requêtes au lieu d'une)
- 🏆 **Comparaison concurrents** directe
- 📄 **Export PDF** des rapports

---

## 📞 Support

Si vous avez des questions ou problèmes :
- Vérifier que les 3 clés API sont valides
- S'assurer que les 2 serveurs (backend + frontend) tournent
- Consulter les logs dans les terminaux

---

**🚀 PRÊT À IMPRESSIONNER ! Bonne chance pour votre présentation ! 🎯**

---

**Développé par Mohamed Amine Moumeni**
Portfolio : https://portfolio-mohamed-amine-moumeni.vercel.app/
