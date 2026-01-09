# Ferretería Dany - Landing Page

Landing page profesional para Ferretería Dany, con más de 30 años de experiencia en CABA y Gran Buenos Aires.

## 🚀 Características

- **Diseño Responsive**: Optimizado para móviles, tablets y desktop
- **Performance**: Carga rápida y optimizada
- **SEO**: Meta tags, Schema.org y Open Graph configurados
- **Accesibilidad**: Navegación por teclado y estructura semántica
- **Conversión**: Formularios optimizados con integración a WhatsApp
- **Tipografía Profesional**: Poppins para títulos, Inter para cuerpo

## 📁 Estructura del Proyecto

```
ferreteria-dany/
├── index.html          # Página principal
├── styles.css          # Estilos principales
├── script.js           # JavaScript funcional
├── vercel.json         # Configuración de Vercel
└── README.md           # Este archivo
```

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 con variables CSS
- JavaScript vanilla
- Google Fonts (Poppins + Inter)

## 📦 Instalación Local

No requiere instalación. Solo abre `index.html` en tu navegador o usa un servidor local:

```bash
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node.js (si tienes serve instalado)
npx serve .

# Opción 3: PHP
php -S localhost:8000
```

## 🚀 Despliegue

### GitHub

1. Inicializa el repositorio Git (si no está inicializado):
```bash
git init
git add .
git commit -m "Initial commit: Landing page Ferretería Dany"
```

2. Crea un nuevo repositorio en GitHub

3. Conecta tu repositorio local con GitHub:
```bash
git remote add origin https://github.com/TU_USUARIO/ferreteria-dany.git
git branch -M main
git push -u origin main
```

### Vercel

1. **Opción A: Desde GitHub (Recomendado)**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub
   - Haz clic en "New Project"
   - Importa el repositorio `ferreteria-dany`
   - Vercel detectará automáticamente que es un sitio estático
   - Haz clic en "Deploy"

2. **Opción B: Desde Vercel CLI**
```bash
# Instala Vercel CLI
npm i -g vercel

# Despliega
vercel

# Para producción
vercel --prod
```

## ⚙️ Configuración

### Variables de Entorno

No se requieren variables de entorno para este proyecto estático.

### Dominio Personalizado

1. En Vercel, ve a tu proyecto
2. Settings → Domains
3. Agrega tu dominio personalizado
4. Configura los DNS según las instrucciones de Vercel

## 📝 Notas

- El formulario de contacto se integra con WhatsApp
- Las imágenes de servicios usan Unsplash (considera reemplazarlas con imágenes propias)
- El número de WhatsApp está configurado en `script.js`

## 📄 Licencia

© 2024 Ferretería Dany. Todos los derechos reservados.
