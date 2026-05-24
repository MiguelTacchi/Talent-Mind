# TalentMind

Plataforma de recrutamento inteligente com análise de currículos por IA.

## Requisitos

- **Node.js v22+** (obrigatório — usa SQLite nativo do Node 22)
- npm

Verifique sua versão: `node --version`

## Instalação e uso

```bash
# 1. Instalar dependências raiz (concurrently)
npm install

# 2. Instalar dependências do backend e frontend
npm run install:all

# 3. Rodar tudo junto
npm run dev
```

Acesse: **http://localhost:5173**  
API: **http://localhost:3001**

---

## Rodar separado (se preferir)

**Terminal 1 — Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## Configurar IA (opcional)

Edite `backend/.env` e adicione sua chave Gemini:

```env
GEMINI_API_KEY=sua_chave_aqui
```

Obtenha grátis em: https://aistudio.google.com/apikey

Sem a chave o sistema funciona normalmente — currículos são recebidos e armazenados, mas a pontuação retorna valor padrão.

---

## Estrutura

```
talentmind/
├── package.json            ← scripts raiz (dev, install:all)
├── backend/
│   ├── server.js           ← API Express — Node.js puro, sem TypeScript
│   ├── .env                ← JWT_SECRET, GEMINI_API_KEY, PORT...
│   └── package.json
└── frontend/
    ├── src/
    │   ├── lib/api.ts            ← cliente HTTP tipado
    │   ├── contexts/AuthContext.tsx  ← auth JWT real
    │   └── pages/                ← todas as páginas conectadas à API
    └── package.json
```

## Banco de dados

SQLite em `backend/database.sqlite` — criado automaticamente na primeira execução.  
Nenhuma configuração extra necessária.

Tabelas: `users`, `jobs`, `resumes`
