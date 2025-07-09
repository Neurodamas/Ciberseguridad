/* ===========================================
   NEURODAMAS - CIBERSEGURIDAD Y IA
   Archivo: script.js
   Descripción: Funcionalidades interactivas
   =========================================== */

// ===========================================
// NAVEGACIÓN SUAVE
// ===========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================================
// ANIMACIONES AL HACER SCROLL
// ===========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todos los elementos con clase fade-in
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ===========================================
// CAMBIO DE FONDO DEL HEADER AL HACER SCROLL
// ===========================================
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// ===========================================
// CONTADORES ANIMADOS PARA ESTADÍSTICAS
// ===========================================
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
        const suffix = target.replace(/[0-9]/g, '');
        
        let current = 0;
        const increment = numericValue / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + suffix;
        }, 20);
    });
};

// ===========================================
// ACTIVAR CONTADORES CUANDO LA SECCIÓN SEA VISIBLE
// ===========================================
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===========================================
// EFECTO PARALLAX PARA LA SECCIÓN HERO
// ===========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===========================================
// ELEMENTOS FLOTANTES DINÁMICOS
// ===========================================
const floatingElements = document.querySelectorAll('.floating-element');
floatingElements.forEach((element, index) => {
    const randomSize = Math.random() * 40 + 20;
    const randomLeft = Math.random() * 80 + 10;
    const randomDelay = Math.random() * 6;
    
    element.style.width = randomSize + 'px';
    element.style.height = randomSize + 'px';
    element.style.left = randomLeft + '%';
    element.style.animationDelay = randomDelay + 's';
});

// ===========================================
// EFECTOS ADICIONALES AL CARGAR LA PÁGINA
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
    // Animación de aparición del logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            logo.style.transition = 'all 0.8s ease';
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Animación de aparición de los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            link.style.transition = 'all 0.6s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 700 + (index * 100));
    });
});

// Expansión de tarjeta Deepfakes
document.addEventListener('DOMContentLoaded', function() {
    const deepfakesCard = document.getElementById('deepfakes-card');
    if (deepfakesCard) {
        deepfakesCard.addEventListener('click', function(e) {
            // Cerrar otras tarjetas si hay más expandibles
            document.querySelectorAll('.card-expandable.expanded').forEach(card => {
                if (card !== deepfakesCard) card.classList.remove('expanded');
            });
            // Alternar expansión
            deepfakesCard.classList.toggle('expanded');
        });
    }
});

// Expansión animada de tarjetas de amenazas
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.card-expandable').forEach(card => {
        card.addEventListener('click', function(e) {
            // Cerrar otras tarjetas
            document.querySelectorAll('.card-expandable.expanded').forEach(other => {
                if (other !== card) other.classList.remove('expanded');
            });
            // Alternar expansión
            card.classList.toggle('expanded');
        });
    });
});

// ===========================================
// FUNCIONES PARA OPTIMIZAR RENDIMIENTO
// ===========================================
function debounce(func, wait) {
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

// Debounce aplicado a scroll (puedes usarlo si agregas más lógica)
const debouncedScrollHandler = debounce(() => {
    // Código adicional si deseas optimizar más eventos de scroll
}, 10);

// ===========================================
// MANEJO DE ERRORES Y COMPATIBILIDAD
// ===========================================
if (!window.IntersectionObserver) {
    // Fallback: mostrar inmediatamente los elementos si no hay soporte
    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('visible');
    });
}

// ===========================================
// FUNCIONES DE UTILIDAD
// ===========================================
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
}
 // Modo oscuro con bombilla
        const darkModeToggle = document.getElementById('darkModeToggle');
        const bulb = document.getElementById('bulb');
        function setDarkMode(on) {
            document.body.classList.toggle('dark-mode', on);
            bulb.textContent = on ? '💡' : '💡';
            bulb.style.color = on ? '#00f5ff' : '#FFD600';
        }
        // Guardar preferencia en localStorage
        if (localStorage.getItem('darkMode') === 'true') setDarkMode(true);

        darkModeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', isDark);
            bulb.style.color = isDark ? '#00f5ff' : '#FFD600';
        });
        // Inicializa color de bombilla
        bulb.style.color = document.body.classList.contains('dark-mode') ? '#00f5ff' : '#FFD600';

// ===========================================
// EVENTOS ADICIONALES
// ===========================================
window.addEventListener('resize', debounce(() => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.height = window.innerHeight + 'px';
    }
}, 250));
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.card-expandable').forEach(card => {
        card.addEventListener('click', function(e) {
            // Cerrar otras tarjetas
            document.querySelectorAll('.card-expandable.expanded').forEach(other => {
                if (other !== card) other.classList.remove('expanded');
            });
            // Alternar expansión
            card.classList.toggle('expanded');
        });
    });
});
window.addEventListener('load', () => {
    document.body.classList.remove('loading');
    
    const floatingContainer = document.querySelector('.floating-elements');
    if (floatingContainer && floatingContainer.children.length < 5) {
        for (let i = 0; i < 2; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            floatingContainer.appendChild(element);
        }
    }
});

// ===========================================
// CONSOLE LOG PARA DEBUGGING
// ===========================================
console.log('🧠 Neurodamas - Script cargado correctamente');
console.log('📊 Funcionalidades activas:');
console.log('   ✅ Navegación suave');
console.log('   ✅ Animaciones al scroll');
console.log('   ✅ Contadores animados');
console.log('   ✅ Efecto parallax');
console.log('   ✅ Elementos flotantes');
