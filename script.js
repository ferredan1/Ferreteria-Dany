// ============================================
// CONFIGURACIÓN
// ============================================
const WHATSAPP_NUMBER = '5491120345160';
const WHATSAPP_MESSAGE_PREFIX = 'Hola, me contacto desde la web de Ferretería Dany.\n\n';

// ============================================
// UTILIDADES DE PERFORMANCE
// ============================================
// Throttle function para optimizar eventos de scroll/resize
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce function
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// RequestAnimationFrame wrapper para scroll
let scrollTicking = false;
function onScroll(callback) {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            callback();
            scrollTicking = false;
        });
        scrollTicking = true;
    }
}

// ============================================
// MENÚ MÓVIL
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
        const isActive = navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive);
        menuToggle.setAttribute('aria-label', isActive ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
        }
    });
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
            menuToggle.focus();
        }
    });
}

// ============================================
// FUNCIONES DE WHATSAPP
// ============================================

/**
 * Genera el mensaje de WhatsApp con los datos del formulario
 */
function generateWhatsAppMessage(formData) {
    const { name, phone, service, message } = formData;
    
    const serviceNames = {
        herramientas: 'Herramientas',
        'materiales-construccion': 'Materiales de construcción',
        electricidad: 'Electricidad',
        plomeria: 'Plomería',
        pintureria: 'Pinturería',
        jardin: 'Jardín',
        otro: 'Otro'
    };
    
    const serviceName = serviceNames[service] || service;
    
    const whatsappMessage = 
        WHATSAPP_MESSAGE_PREFIX +
        `Nombre: ${name}\n` +
        `Teléfono: ${phone}\n` +
        `Tipo de consulta: ${serviceName}\n\n` +
        `Mensaje:\n${message}`;
    
    return encodeURIComponent(whatsappMessage);
}

/**
 * Abre WhatsApp con el mensaje pre-armado
 */
function openWhatsApp(message) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, '_blank');
}

/**
 * Valida el formulario antes de enviar
 */
function validateForm(formData) {
    const { name, phone, service, message } = formData;
    
    if (!name || name.trim().length < 2) {
        alert('Por favor, ingresá tu nombre');
        return false;
    }
    
    if (!phone || phone.trim().length < 8) {
        alert('Por favor, ingresá un teléfono válido');
        return false;
    }
    
    // Service ahora es opcional
    // if (!service) {
    //     alert('Por favor, seleccioná un tipo de consulta');
    //     return false;
    // }
    
    if (!message || message.trim().length < 10) {
        alert('Por favor, contanos qué necesitás (mínimo 10 caracteres)');
        return false;
    }
    
    return true;
}

// ============================================
// MANEJO DEL FORMULARIO
// ============================================
const quoteForm = document.getElementById('quoteForm');
const formSuccess = document.getElementById('formSuccess');

if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            service: document.getElementById('service').value,
            message: document.getElementById('message').value.trim()
        };
        
        // Validar todos los campos antes de enviar
        let allValid = true;
        const formInputsArray = Array.from(formInputs);
        formInputsArray.forEach(input => {
            if (!validateField(input)) {
                allValid = false;
            }
        });
        
        if (allValid && validateForm(formData)) {
            // Generar mensaje de WhatsApp con todos los datos
            const whatsappMessage = generateWhatsAppMessage(formData);
            
            // Guardar el mensaje para el botón de retry
            const whatsappRetryLink = document.getElementById('whatsappRetryLink');
            if (whatsappRetryLink) {
                whatsappRetryLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
            }
            
            // Abrir WhatsApp directamente
            openWhatsApp(whatsappMessage);
            
            // Mostrar mensaje de éxito después de un breve delay
            setTimeout(() => {
                quoteForm.style.display = 'none';
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 500);
            
            // Opcional: Aquí podrías enviar los datos a un backend
            // fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
        } else {
            // Scroll al primer campo con error
            const firstError = document.querySelector('#quoteForm .error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => firstError.focus(), 300);
            }
        }
    });
}

// ============================================
// GLOBOS DE WHATSAPP
// ============================================
const bubbles = document.querySelectorAll('.bubble');
bubbles.forEach(bubble => {
    bubble.addEventListener('click', function(e) {
        e.preventDefault();
        const message = this.dataset.message || 'Hola, me contacto desde la web de Ferretería Dany.';
        const encodedMessage = encodeURIComponent(message);
        openWhatsApp(encodedMessage);
    });
});

// ============================================
// BOTONES DE WHATSAPP
// ============================================
const floatingWhatsApp = document.getElementById('floatingWhatsApp');
const ctaButton = document.getElementById('ctaButton');
const whatsappLink = document.getElementById('whatsappLink');
const contactWhatsApp = document.getElementById('contactWhatsApp');
const headerWhatsApp = document.getElementById('headerWhatsApp');

const defaultMessage = encodeURIComponent(
    WHATSAPP_MESSAGE_PREFIX + 
    'Me gustaría consultar sobre productos disponibles y solicitar una cotización.'
);

function setupWhatsAppButton(button, message = defaultMessage) {
    if (button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp(message);
        });
    }
}

setupWhatsAppButton(floatingWhatsApp);
setupWhatsAppButton(whatsappLink);
setupWhatsAppButton(contactWhatsApp);
setupWhatsAppButton(headerWhatsApp);

const contactWhatsApp2 = document.getElementById('contactWhatsApp2');
setupWhatsAppButton(contactWhatsApp2);

const heroPresupuesto = document.getElementById('heroPresupuesto');
if (heroPresupuesto) {
    heroPresupuesto.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('presupuesto').scrollIntoView({ behavior: 'smooth' });
    });
}

const heroWhatsApp = document.getElementById('heroWhatsApp');
const finalWhatsApp = document.getElementById('finalWhatsApp');
const serviceCTAs = document.querySelectorAll('.service-cta');
const servicesWhatsApp = document.getElementById('servicesWhatsApp');
const benefitWhatsApp = document.getElementById('benefitWhatsApp');
const objectionsWhatsApp = document.getElementById('objectionsWhatsApp');
const faqWhatsApp = document.getElementById('faqWhatsApp');

setupWhatsAppButton(heroWhatsApp);
setupWhatsAppButton(finalWhatsApp);
setupWhatsAppButton(servicesWhatsApp);
setupWhatsAppButton(benefitWhatsApp);
setupWhatsAppButton(objectionsWhatsApp);
setupWhatsAppButton(faqWhatsApp);

serviceCTAs.forEach(cta => {
    setupWhatsAppButton(cta);
});

// ============================================
// FAQ ACCORDION
// ============================================
// FAQ Accordion - Solución simplificada y robusta
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) {
        console.warn('No se encontraron elementos FAQ');
        return;
    }
    
    console.log(`Inicializando FAQ: ${faqItems.length} items`);
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) {
            console.warn(`FAQ item ${index} incompleto`);
            return;
        }
        
        // Estado inicial cerrado
        item.classList.remove('active');
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.style.overflow = 'hidden';
        answer.style.display = 'block';
        
        // Remover listeners anteriores si existen
        const newQuestion = question.cloneNode(true);
        question.parentNode.replaceChild(newQuestion, question);
        
        // Event listener directo
        newQuestion.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Click en FAQ item', index);
            
            const isActive = item.classList.contains('active');
            
            // Cerrar todos los demás
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                        otherAnswer.style.padding = '0';
                    }
                }
            });
            
            if (isActive) {
                // Cerrar
                item.classList.remove('active');
                answer.style.maxHeight = '0';
                answer.style.padding = '0';
            } else {
                // Abrir
                item.classList.add('active');
                
                // Medir altura real del contenido
                answer.style.maxHeight = 'none';
                const height = answer.scrollHeight;
                answer.style.maxHeight = '0';
                
                // Forzar reflow
                void answer.offsetHeight;
                
                // Animar a la altura real
                requestAnimationFrame(() => {
                    answer.style.maxHeight = height + 'px';
                    answer.style.padding = '';
                });
            }
        });
    });
    
    console.log('FAQ inicializado');
}

// ============================================
// PROCESO CARRUSEL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('processCarousel');
    const prevBtn = document.getElementById('processPrev');
    const nextBtn = document.getElementById('processNext');
    const dots = document.querySelectorAll('.process-dot');
    const steps = document.querySelectorAll('.process-step-carousel');
    
    if (!carousel || !prevBtn || !nextBtn || steps.length === 0) return;
    
    let currentStep = 0;
    let autoPlayInterval = null;
    
    function showStep(index) {
        // Remover active de todos
        steps.forEach((step, i) => {
            step.classList.remove('active');
            if (i === index) {
                step.classList.add('active');
            }
        });
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
        currentStep = index;
    }
    
    function nextStep() {
        const next = (currentStep + 1) % steps.length;
        showStep(next);
    }
    
    function prevStep() {
        const prev = (currentStep - 1 + steps.length) % steps.length;
        showStep(prev);
    }
    
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextStep, 5000);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    nextBtn.addEventListener('click', () => {
        nextStep();
        stopAutoPlay();
        startAutoPlay();
    });
    
    prevBtn.addEventListener('click', () => {
        prevStep();
        stopAutoPlay();
        startAutoPlay();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showStep(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });
    
    // Iniciar auto-play
    startAutoPlay();
    
    // Pausar al hacer hover sobre el carrusel
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
});

// ============================================
// ABOUT ACCORDION
// ============================================
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    if (header) {
        header.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Cerrar todos los demás
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle del item actual
            item.classList.toggle('active', !isActive);
        });
    }
});

// ============================================
// SCROLL REVEAL CON INTERSECTION OBSERVER
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Opcional: dejar de observar después de mostrar para mejor performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// ============================================
// CONTADORES ANIMADOS
// ============================================
function animateCounter(element, target, format, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const statItem = element.closest('.stat-item');
    const prefixElement = statItem.querySelector('.stat-prefix');
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            // Valor final según el formato
            if (format === 'years') {
                element.textContent = '30';
                if (prefixElement) prefixElement.textContent = '+';
            } else if (format === 'products') {
                element.textContent = '10.000';
                if (prefixElement) prefixElement.textContent = '+';
            } else if (format === 'clients') {
                element.textContent = '1000';
                if (prefixElement) prefixElement.textContent = '+';
            } else if (format === 'branches') {
                element.textContent = '2';
                if (prefixElement) prefixElement.textContent = '';
            } else {
                element.textContent = target.toString();
            }
            clearInterval(timer);
        } else {
            // Animación durante el conteo
            const num = Math.floor(start);
            if (format === 'products' && num >= 1000) {
                element.textContent = (num / 1000).toFixed(1).replace('.', ',') + '.000';
                if (prefixElement) prefixElement.textContent = '+';
            } else if (format === 'years') {
                element.textContent = num.toString();
                if (prefixElement) prefixElement.textContent = '+';
            } else if (format === 'clients') {
                element.textContent = num.toString();
                if (prefixElement) prefixElement.textContent = '+';
            } else if (format === 'branches') {
                element.textContent = num.toString();
                if (prefixElement) prefixElement.textContent = '';
            } else {
                element.textContent = num.toString();
            }
        }
    }, 16);
}

const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && statNumber.dataset.target) {
                const target = parseInt(statNumber.dataset.target);
                const format = statNumber.dataset.format || '';
                animateCounter(statNumber, target, format);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observar elementos con clases de animación
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        if (el.classList.contains('slide-up')) {
            el.style.transform = 'translateY(30px)';
        }
        observer.observe(el);
    });
    
    // Observar estadísticas para contadores
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        const statNumber = item.querySelector('.stat-number');
        if (statNumber && statNumber.dataset.target) {
            // Inicializar en 0
            statNumber.textContent = '0';
            const prefixElement = item.querySelector('.stat-prefix');
            if (prefixElement) {
                // Mostrar el prefijo desde el inicio según el formato
                const format = statNumber.dataset.format || '';
                if (format !== 'branches') {
                    prefixElement.textContent = '+';
                    prefixElement.style.visibility = 'visible';
                    prefixElement.style.opacity = '1';
                } else {
                    prefixElement.textContent = '';
                    prefixElement.style.visibility = 'hidden';
                }
            }
            // Observar el item para animar cuando sea visible
            statsObserver.observe(item);
        }
    });
    
    // Botón "Pedir presupuesto" - scroll al formulario
    const heroPresupuestoBtn = document.getElementById('heroPresupuesto');
    if (heroPresupuestoBtn) {
        heroPresupuestoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const formSection = document.getElementById('presupuesto');
            if (formSection) {
                const headerOffset = 100;
                const elementPosition = formSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Observar todos los elementos con clase fade-in
    const elementsToAnimate = document.querySelectorAll(
        '.service-item.service-compact, .benefit-item, .testimonial-card, .contact-card-primary, .quote-card, .faq-item, .process-step-simple, .about-mission, .contact-cta-final'
    );
    
    elementsToAnimate.forEach((element, index) => {
        observer.observe(element);
    });
    
    // Observar elementos con animaciones fade-in y slide-up
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => {
        if (!el.classList.contains('visible')) {
            el.style.opacity = '0';
            if (el.classList.contains('slide-up')) {
                el.style.transform = 'translateY(30px)';
            }
            observer.observe(el);
        }
    });
    
    
    // Smooth scroll ya está manejado arriba, no duplicar
});

// ============================================
// SMOOTH SCROLL PARA ENLACES INTERNOS (UNIFICADO)
// ============================================
// Ya está manejado en DOMContentLoaded, no duplicar

// ============================================
// MEJORAS DE UX
// ============================================

// Formatear teléfono mientras se escribe
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Solo números
        if (value.length > 0) {
            // Formato argentino: 11 1234-5678
            if (value.length <= 2) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 2) + ' ' + value.slice(2);
            } else {
                value = value.slice(0, 2) + ' ' + value.slice(2, 6) + '-' + value.slice(6, 10);
            }
        }
        e.target.value = value;
    });
}

// Animación del botón flotante al hacer scroll (optimizado)
let lastScrollTop = 0;
window.addEventListener('scroll', throttle(() => {
    onScroll(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (floatingWhatsApp) {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling down
                floatingWhatsApp.style.transform = 'translateY(100px)';
                floatingWhatsApp.style.opacity = '0.5';
            } else {
                // Scrolling up
                floatingWhatsApp.style.transform = 'translateY(0)';
                floatingWhatsApp.style.opacity = '1';
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}, 100), { passive: true });

// ============================================
// VALIDACIÓN EN TIEMPO REAL
// ============================================
const formInputs = document.querySelectorAll('#quoteForm input, #quoteForm select, #quoteForm textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
            this.style.borderColor = '#f44336';
        } else {
            this.style.borderColor = '#e0e0e0';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.style.borderColor = '#4caf50';
        }
    });
});

// ============================================
// CARRUSELES
// ============================================


// Carrusel de Testimonios estilo Google Maps
function initTestimonialsCarousel() {
    const carousel = document.getElementById('testimonialsCarousel');
    const prevBtn = document.getElementById('testimonialsPrev');
    const nextBtn = document.getElementById('testimonialsNext');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    const cards = carousel.querySelectorAll('.testimonial-card-google');
    const cardWidth = cards[0]?.offsetWidth || 380;
    const gap = 24;
    let scrollPosition = 0;
    
    function updateButtons() {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        prevBtn.style.opacity = scrollPosition <= 0 ? '0.5' : '1';
        prevBtn.style.pointerEvents = scrollPosition <= 0 ? 'none' : 'auto';
        nextBtn.style.opacity = scrollPosition >= maxScroll - 10 ? '0.5' : '1';
        nextBtn.style.pointerEvents = scrollPosition >= maxScroll - 10 ? 'none' : 'auto';
    }
    
    function scrollCarousel(direction) {
        const scrollAmount = cardWidth + gap;
        scrollPosition = carousel.scrollLeft + (direction === 'next' ? scrollAmount : -scrollAmount);
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
    
    nextBtn.addEventListener('click', () => {
        scrollCarousel('next');
    });
    
    prevBtn.addEventListener('click', () => {
        scrollCarousel('prev');
    });
    
    carousel.addEventListener('scroll', () => {
        scrollPosition = carousel.scrollLeft;
        updateButtons();
    });
    
    // Touch events para móvil
    let startX = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        carousel.scrollLeft += diff;
        startX = currentX;
    });
    
    carousel.addEventListener('touchend', () => {
        isDragging = false;
        scrollPosition = carousel.scrollLeft;
        updateButtons();
    });
    
    updateButtons();
    
    // Recalcular en resize (optimizado)
    window.addEventListener('resize', debounce(() => {
        scrollPosition = carousel.scrollLeft;
        updateButtons();
    }, 250), { passive: true });
}

// Carrusel de Productos Destacados
function initProductsCarousel() {
    const carousel = document.getElementById('productsCarousel');
    const prevBtn = document.getElementById('productsPrev');
    const nextBtn = document.getElementById('productsNext');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const cards = carousel.querySelectorAll('.product-card');
    const gap = 24;
    
    function calculateVisibleCards() {
        const cardWidth = cards[0]?.offsetWidth || 300;
        const containerWidth = carousel.offsetWidth;
        const visibleCards = Math.floor(containerWidth / (cardWidth + gap));
        return Math.max(1, visibleCards);
    }
    
    function getMaxIndex() {
        const visibleCards = calculateVisibleCards();
        return Math.max(0, cards.length - visibleCards);
    }
    
    function updateCarousel() {
        const cardWidth = cards[0]?.offsetWidth || 300;
        const translateX = -currentIndex * (cardWidth + gap);
        carousel.style.transform = `translateX(${translateX}px)`;
        
        const maxIndex = getMaxIndex();
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
    }
    
    nextBtn.addEventListener('click', () => {
        const maxIndex = getMaxIndex();
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    updateCarousel();
    
    window.addEventListener('resize', debounce(() => {
        const maxIndex = getMaxIndex();
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        updateCarousel();
    }, 250), { passive: true });
}

// FAQ ya inicializado arriba, no duplicar


// ============================================
// HEADER STICKY CON SOMBRA (OPTIMIZADO)
// ============================================
const header = document.getElementById('mainHeader') || document.querySelector('.header');
if (header) {
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', throttle(() => {
        onScroll(updateHeader);
    }, 50), { passive: true });
    
    // Inicializar
    updateHeader();
}

// ============================================
// OCULTAR WHATSAPP AL LLEGAR AL FOOTER (OPTIMIZADO)
// ============================================
const footer = document.querySelector('.footer');

if (floatingWhatsApp && footer) {
    function checkFooterVisibility() {
        const footerRect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Si el footer está visible en la pantalla, ocultar WhatsApp
        if (footerRect.top < viewportHeight - 100) {
            floatingWhatsApp.classList.add('hidden');
        } else {
            floatingWhatsApp.classList.remove('hidden');
        }
    }
    
    window.addEventListener('scroll', throttle(() => {
        onScroll(checkFooterVisibility);
    }, 100), { passive: true });
    
    // Inicializar
    checkFooterVisibility();
}

// ============================================
// VALIDACIÓN EN TIEMPO REAL DEL FORMULARIO
// ============================================
const formInputs = document.querySelectorAll('#quoteForm input, #quoteForm select, #quoteForm textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
    
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateField(this);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remover mensajes de error previos
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.classList.remove('error');
    
    // Validaciones específicas
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo es obligatorio';
    } else if (field.type === 'tel' && value && value.length < 8) {
        isValid = false;
        errorMessage = 'Ingresá un teléfono válido';
    } else if (field.id === 'name' && value && value.length < 2) {
        isValid = false;
        errorMessage = 'El nombre debe tener al menos 2 caracteres';
    } else if (field.id === 'message' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = errorMessage;
        errorDiv.style.color = 'var(--accent)';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        field.parentElement.appendChild(errorDiv);
    }
    
    return isValid;
}

// ============================================
// CONTADOR ANIMADO EN STATS
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

const statNumbers = document.querySelectorAll('.about-stat-number');
if (statNumbers.length > 0) {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                
                if (!isNaN(number) && number > 0) {
                    entry.target.dataset.animated = 'true';
                    const originalText = text;
                    animateCounter(entry.target, number, 2000);
                    
                    // Restaurar texto original si tiene prefijos
                    setTimeout(() => {
                        if (originalText.includes('+') || originalText.includes('CABA')) {
                            entry.target.textContent = originalText;
                        }
                    }, 2100);
                }
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar FAQ inmediatamente
    initFAQ();
    
    // También intentar después de un pequeño delay por si acaso
    setTimeout(function() {
        initFAQ();
    }, 100);
    
    // Carruseles ya inicializados en DOMContentLoaded
    
    // Smooth scroll mejorado para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ============================================
// BOTÓN FLOTANTE WHATSAPP - CAMBIO DE TEXTO SEGÚN SCROLL
// ============================================
const floatingWhatsApp = document.getElementById('floatingWhatsApp');
const floatingText = document.getElementById('floatingText');

if (floatingWhatsApp && floatingText) {
    let lastScrollY = window.scrollY;
    const scrollThreshold = window.innerHeight * 0.5; // Cambia a mitad de la pantalla
    
    function updateFloatingText() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > scrollThreshold) {
            floatingText.textContent = 'Respondemos en el día';
        } else {
            floatingText.textContent = '¿Te cotizamos ahora?';
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Actualizar al cargar
    updateFloatingText();
    
    // Actualizar al hacer scroll (optimizado)
    window.addEventListener('scroll', throttle(() => {
        onScroll(updateFloatingText);
    }, 100), { passive: true });
}

// ============================================
// CONSOLE LOG PARA DEBUG (opcional)
// ============================================
console.log('Ferretería Dany - Landing Page cargada correctamente');

