// ============================================
// CONFIGURACIÓN
// ============================================
const WHATSAPP_NUMBER = '5491120345160';

// ============================================
// HERO SLIDER
// ============================================
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    // Remover active de todos los slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Agregar active al slide actual
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    currentSlide = index;
}

function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    showSlide(next);
}

function prevSlide() {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prev);
}

// Inicializar slider
if (slides.length > 0) {
    showSlide(0);
    
    // Auto-play cada 5 segundos
    setInterval(nextSlide, 5000);
    
    // Controles
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
}

// ============================================
// TABS (ABOUT SECTION)
// ============================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remover active de todos
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Agregar active al seleccionado
        button.classList.add('active');
        const targetPanel = document.getElementById(targetTab);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});

// ============================================
// FAQ ACCORDION
// ============================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Cerrar todos los demás
            faqItems.forEach(faq => {
                if (faq !== item) {
                    faq.classList.remove('active');
                }
            });
            
            // Toggle del item actual
            item.classList.toggle('active', !isActive);
        });
    }
});

// ============================================
// FORMULARIO WHATSAPP
// ============================================
function generateWhatsAppMessage(formData) {
    const serviceNames = {
        'herramientas': 'Herramientas',
        'materiales-construccion': 'Materiales de construcción',
        'electricidad': 'Electricidad',
        'plomeria': 'Plomería',
        'pintureria': 'Pinturería',
        'jardin': 'Jardín',
        'otro': 'Otro'
    };
    
    let message = 'Hola, me contacto desde la web de Ferretería Dany.\n\n';
    message += `*Nombre:* ${formData.name}\n`;
    message += `*Teléfono:* ${formData.phone}\n`;
    message += `*Rubro:* ${serviceNames[formData.service] || formData.service}\n`;
    message += `*Mensaje:*\n${formData.message}\n\n`;
    message += 'Gracias por contactarnos.';
    
    return encodeURIComponent(message);
}

const quoteForm = document.getElementById('quoteForm');
const formSuccess = document.getElementById('formSuccess');
const whatsappRetryLink = document.getElementById('whatsappRetryLink');

if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            service: document.getElementById('service').value,
            message: document.getElementById('message').value.trim()
        };
        
        // Validación básica
        if (!formData.name || !formData.phone || !formData.service || !formData.message) {
            alert('Por favor, completá todos los campos requeridos.');
            return;
        }
        
        // Generar mensaje y abrir WhatsApp
        const message = generateWhatsAppMessage(formData);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
        
        // Ocultar formulario y mostrar éxito
        quoteForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Actualizar link de retry
        if (whatsappRetryLink) {
            whatsappRetryLink.href = whatsappUrl;
        }
        
        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');
    });
}

// ============================================
// MENÚ MÓVIL
// ============================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// HEADER STICKY
// ============================================
const header = document.querySelector('.main-header');

if (header) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    });
}

