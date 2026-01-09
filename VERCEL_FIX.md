# 🔧 Solución al Error 404 en Vercel

## Problema
Error: `404: NOT_FOUND` - `DEPLOYMENT_NOT_FOUND`

## Solución Aplicada
Se eliminó `vercel.json` para que Vercel detecte automáticamente el sitio estático.

## Pasos para Re-desplegar en Vercel

### 1. Eliminar el Proyecto Actual (si existe)
1. Ve a https://vercel.com/dashboard
2. Encuentra el proyecto `Ferreteria-Dany`
3. Settings → Delete Project

### 2. Crear Nuevo Proyecto
1. Haz clic en **"Add New Project"**
2. Selecciona el repositorio `Ferreteria-Dany`
3. **IMPORTANTE**: En la configuración:
   - **Framework Preset**: Selecciona **"Other"** o **"Static Site"**
   - **Root Directory**: Deja en **blanco** (no pongas nada)
   - **Build Command**: Deja en **blanco**
   - **Output Directory**: Deja en **blanco**
   - **Install Command**: Deja en **blanco**

4. Haz clic en **"Deploy"**

### 3. Verificar
- Vercel debería detectar automáticamente que es un sitio estático
- El despliegue debería completarse en 1-2 minutos
- Tu sitio estará disponible en: `ferreteria-dany.vercel.app` (o similar)

## Si Sigue Fallando

### Opción Alternativa: Usar Netlify
1. Ve a https://netlify.com
2. "Add new site" → "Import an existing project"
3. Conecta con GitHub
4. Selecciona `Ferreteria-Dany`
5. Deploy settings:
   - Build command: (vacío)
   - Publish directory: (vacío o `/`)
6. Deploy

### Verificar Archivos en GitHub
Asegúrate de que estos archivos estén en la raíz del repositorio:
- ✅ `index.html`
- ✅ `styles.css`
- ✅ `script.js`
- ✅ `.gitignore`

Puedes verificar en: https://github.com/ferredan1/Ferreteria-Dany

