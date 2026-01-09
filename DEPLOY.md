# 🚀 Guía de Despliegue - GitHub y Vercel

## Paso 1: Preparar el repositorio Git

Abre PowerShell o Terminal en la carpeta del proyecto y ejecuta:

```bash
# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: Landing page Ferretería Dany"
```

## Paso 2: Crear repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** (arriba a la derecha) → **"New repository"**
3. Nombre del repositorio: `ferreteria-dany` (o el que prefieras)
4. Descripción: "Landing page para Ferretería Dany"
5. **NO marques** "Initialize this repository with a README" (ya tenemos uno)
6. Haz clic en **"Create repository"**

## Paso 3: Conectar y subir a GitHub

GitHub te mostrará comandos. Ejecuta estos en tu terminal:

```bash
# Conectar con GitHub (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/ferreteria-dany.git

# Cambiar a rama main
git branch -M main

# Subir el código
git push -u origin main
```

Si te pide autenticación:
- Usa un **Personal Access Token** (no tu contraseña)
- Crea uno en: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Permisos necesarios: `repo` (todos los permisos de repositorio)

## Paso 4: Desplegar en Vercel

### Opción A: Desde la Web (Más fácil)

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Sign Up"** o **"Log In"**
3. Elige **"Continue with GitHub"** (recomendado)
4. Autoriza Vercel para acceder a tus repositorios
5. Haz clic en **"Add New Project"**
6. Selecciona el repositorio `ferreteria-dany`
7. Vercel detectará automáticamente que es un sitio estático
8. **Framework Preset**: Deja "Other" o "Static Site"
9. **Root Directory**: Deja en blanco (o `./`)
10. Haz clic en **"Deploy"**
11. ¡Listo! Tu sitio estará en línea en menos de 1 minuto

### Opción B: Desde Vercel CLI

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Desplegar (desde la carpeta del proyecto)
vercel

# Seguir las instrucciones en pantalla
# Para producción:
vercel --prod
```

## Paso 5: Configurar dominio personalizado (Opcional)

1. En Vercel, ve a tu proyecto
2. Settings → **Domains**
3. Agrega tu dominio (ej: `ferreteriadany.com.ar`)
4. Configura los DNS en tu proveedor de dominio:
   - Agrega un registro **CNAME** apuntando a `cname.vercel-dns.com`
   - O un registro **A** con la IP que Vercel te indique

## ✅ Verificación

Después del despliegue, verifica:

- ✅ El sitio carga correctamente
- ✅ Los estilos se aplican bien
- ✅ El formulario funciona
- ✅ El botón de WhatsApp funciona
- ✅ Las imágenes se ven correctamente

## 🔄 Actualizaciones Futuras

Para actualizar el sitio después de hacer cambios:

```bash
# Hacer cambios en los archivos
# Luego:
git add .
git commit -m "Descripción de los cambios"
git push
```

Vercel detectará automáticamente los cambios y desplegará una nueva versión.

## 📝 Notas Importantes

- **No subas** `node_modules/` (ya está en `.gitignore`)
- **No subas** archivos sensibles (contraseñas, API keys)
- El archivo `vercel.json` ya está configurado
- El sitio es completamente estático, no requiere build

## 🆘 Problemas Comunes

### Error: "Repository not found"
- Verifica que el nombre del repositorio sea correcto
- Verifica que tengas permisos en el repositorio

### Error: "Authentication failed"
- Usa un Personal Access Token en lugar de tu contraseña
- Verifica que el token tenga permisos `repo`

### Vercel no detecta el sitio
- Verifica que `vercel.json` esté en la raíz
- Asegúrate de que `index.html` esté en la raíz del proyecto

## 📞 Soporte

Si tienes problemas, revisa:
- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de GitHub](https://docs.github.com)

