# 🏪 Ferretería Dany - Landing Page Premium

Landing page moderna y responsive para Ferretería Dany, diseñada para convertir visitas en consultas por WhatsApp.

## 🎯 Características

- ✅ **HTML5, CSS3, JavaScript Vanilla** - Sin frameworks
- ✅ **Mobile-first** - Diseño responsive
- ✅ **Animaciones suaves** - Scroll reveal con IntersectionObserver
- ✅ **WhatsApp integrado** - Mensajes pre-armados automáticamente
- ✅ **Branding profesional** - Blanco + Rojo corporativo
- ✅ **Optimizado para conversión** - Múltiples CTAs estratégicos

## 📁 Estructura de Archivos

```
ferreteria-dany/
├── index.html      # Estructura HTML principal
├── styles.css      # Estilos CSS con variables :root
├── script.js       # Funcionalidades JavaScript
└── README-LANDING.md
```

## 🚀 Cómo usar

### Opción 1: Abrir directamente
Simplemente abre `index.html` en tu navegador.

### Opción 2: Servidor local (recomendado)
```bash
# Con Python
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego visita: `http://localhost:8000`

## ⚙️ Configuración

### Cambiar número de WhatsApp
Edita `script.js` línea 4:
```javascript
const WHATSAPP_NUMBER = '5491154625634'; // Tu número aquí
```

### Personalizar colores
Edita `styles.css` variables :root (líneas 3-8):
```css
:root {
    --color-red: #d32f2f;        /* Rojo corporativo */
    --color-white: #ffffff;       /* Blanco */
    --color-dark: #1f1f1f;        /* Gris oscuro */
    /* ... */
}
```

## 📱 Secciones de la Landing

1. **Hero** - Título principal + badge "Disponible ahora"
2. **Formulario de Cotización** - Formulario que genera mensaje de WhatsApp
3. **Servicios** - Qué hace la ferretería
4. **Beneficios** - Por qué elegirnos
5. **Testimonios** - Reseñas de clientes
6. **Contacto** - Datos de contacto
7. **CTA Final** - Botón grande rojo

## 🎨 Branding

- **Blanco**: #ffffff
- **Rojo**: #d32f2f
- **Gris oscuro**: #1f1f1f
- **Gris claro**: #f5f5f5

## 📝 Personalización

### Agregar más servicios
Edita `index.html` sección "services-grid" y agrega más `.service-card`.

### Modificar testimonios
Edita `index.html` sección "testimonials-slider" y agrega más `.testimonial-card`.

### Cambiar horarios
Edita `index.html` sección "contact-section" donde dice "Horarios".

## 🔧 Funcionalidades JavaScript

- ✅ Validación de formulario
- ✅ Generación automática de mensaje WhatsApp
- ✅ Scroll reveal con IntersectionObserver
- ✅ Botón flotante WhatsApp
- ✅ Formateo automático de teléfono
- ✅ Smooth scroll
- ✅ Animaciones al hacer scroll

## 📦 Despliegue

### Vercel
1. Sube los archivos a GitHub
2. Conecta con Vercel
3. Configura el build command vacío (es HTML estático)
4. Deploy!

### Netlify
1. Arrastra la carpeta a Netlify Drop
2. ¡Listo!

### GitHub Pages
1. Sube a un repositorio
2. Activa GitHub Pages
3. Selecciona la rama main

## 📞 Soporte

Para modificar el contenido, edita directamente los archivos HTML, CSS y JS según tus necesidades.

---

**Desarrollado para Ferretería Dany** 🛠️

