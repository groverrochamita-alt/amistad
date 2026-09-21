# 🌟 Día de la Amistad - 21 de Septiembre

## Estructura
```
amistad/
├── backend/    → NestJS + Prisma + PostgreSQL
└── frontend/   → React + Vite + Framer Motion
```

## Levantar el proyecto

### 1. Backend (terminal 1)
```bash
cd backend
npm run start:dev
```
Corre en: http://localhost:3000

### 2. Frontend (terminal 2)
```bash
cd frontend
npm run dev
```
Corre en: http://localhost:5173

## Endpoints del backend
- POST /visitas → guarda un visitante
- GET  /visitas → lista todos los visitantes

## Ver registros en Prisma Studio
```bash
cd backend
npx prisma studio
```
Abre en: http://localhost:5555
