// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeFormValidation();
    initializeParticleEffects();
    initializeGallery();
});

// Navegación
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Efecto de scroll en la navegación
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle del menú móvil
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navegación suave
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Indicador de sección activa
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Efectos de scroll
function initializeScrollEffects() {
    // Parallax para el hero
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Animaciones de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observar elementos con atributo data-aos
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// Animaciones y efectos neón
function initializeAnimations() {
    // Efecto de escritura para el título principal
    const titleMain = document.querySelector('.title-main');
    if (titleMain) {
        const text = titleMain.textContent;
        titleMain.textContent = '';
        titleMain.style.borderRight = '3px solid var(--neon-green)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                titleMain.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            } else {
                setTimeout(() => {
                    titleMain.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Efectos hover para cards
    const cards = document.querySelectorAll('.neon-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            addGlowEffect(card);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            removeGlowEffect(card);
        });
    });

    // Efectos para botones
    const buttons = document.querySelectorAll('.cta-button, .submit-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            createRippleEffect(button);
        });
    });

    // Efectos para oportunidades
    const opportunityItems = document.querySelectorAll('.opportunity-item');
    opportunityItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.opportunity-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.opportunity-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Efectos de partículas
function initializeParticleEffects() {
    const heroParticles = document.querySelector('.hero-particles');
    if (!heroParticles) return;

    // Crear partículas dinámicas
    for (let i = 0; i < 50; i++) {
        createParticle(heroParticles);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const colors = ['var(--neon-green)', 'var(--neon-blue)', 'var(--neon-gold)'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        box-shadow: 0 0 10px ${color};
    `;
    
    // Posición aleatoria
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    container.appendChild(particle);
    
    // Animación de la partícula
    animateParticle(particle);
    
    // Remover después de la animación
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 4000);
}

function animateParticle(particle) {
    const duration = 3000 + Math.random() * 2000;
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress < 1) {
            // Movimiento ondulatorio
            const x = Math.sin(progress * Math.PI * 2) * 50;
            const y = progress * -100;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = Math.sin(progress * Math.PI);
            
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// Galería interactiva
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            openLightbox(item);
        });
    });
}

function openLightbox(item) {
    const img = item.querySelector('img');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${img.src}" alt="${img.alt}">
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;
    
    const lightboxImg = lightbox.querySelector('img');
    lightboxImg.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 0 50px rgba(0, 255, 127, 0.3);
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: var(--neon-green);
        font-size: 2rem;
        cursor: pointer;
        text-shadow: 0 0 10px var(--neon-green);
    `;
    
    document.body.appendChild(lightbox);
    
    // Animación de entrada
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    // Cerrar lightbox
    const closeLightbox = () => {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            if (lightbox.parentNode) {
                lightbox.parentNode.removeChild(lightbox);
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// Validación del formulario
function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    // Validación en tiempo real
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            clearFieldError(input);
        });
    });
    
    // Envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            submitForm(form);
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    // Validaciones específicas
    switch (field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Por favor ingresa un email válido';
            }
            break;
        default:
            if (value.length < 2) {
                isValid = false;
                message = 'Este campo debe tener al menos 2 caracteres';
            }
    }
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'Este campo es obligatorio';
    }
    
    if (!isValid) {
        showFieldError(field, message);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#ff4444';
    field.style.boxShadow = '0 0 15px rgba(255, 68, 68, 0.3)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ff4444;
        font-size: 0.9rem;
        margin-top: 5px;
        text-shadow: 0 0 5px #ff4444;
    `;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = 'rgba(0, 255, 127, 0.3)';
    field.style.boxShadow = 'none';
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function submitForm(form) {
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.querySelector('span').textContent;
    
    // Animación de envío
    submitButton.querySelector('span').textContent = 'Enviando...';
    submitButton.style.background = 'var(--neon-blue)';
    submitButton.style.borderColor = 'var(--neon-blue)';
    submitButton.style.color = 'var(--dark-bg)';
    
    // Simular envío (aquí se integraría con un backend real)
    setTimeout(() => {
        submitButton.querySelector('span').textContent = '¡Enviado!';
        submitButton.style.background = 'var(--neon-green)';
        submitButton.style.borderColor = 'var(--neon-green)';
        
        // Mostrar mensaje de éxito
        showSuccessMessage();
        
        // Resetear formulario
        setTimeout(() => {
            form.reset();
            submitButton.querySelector('span').textContent = originalText;
            submitButton.style.background = 'transparent';
            submitButton.style.borderColor = 'var(--neon-green)';
            submitButton.style.color = 'var(--neon-green)';
        }, 3000);
    }, 2000);
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = '¡Gracias por tu interés! Te contactaremos pronto.';
    
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 255, 127, 0.1);
        border: 2px solid var(--neon-green);
        color: var(--neon-green);
        padding: 20px 40px;
        border-radius: 10px;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 0 30px var(--neon-green);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 300);
    }, 3000);
}

// Efectos auxiliares
function addGlowEffect(element) {
    element.style.boxShadow = '0 0 30px rgba(0, 255, 127, 0.3), 0 20px 40px rgba(0, 0, 0, 0.3)';
}

function removeGlowEffect(element) {
    element.style.boxShadow = 'none';
}

function createRippleEffect(button) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: 50%;
        top: 50%;
        margin-left: ${-size/2}px;
        margin-top: ${-size/2}px;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Función para scroll suave a secciones
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Agregar estilos CSS dinámicos para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--neon-green) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .particle {
        animation: particle-float 4s ease-out forwards;
    }
    
    @keyframes particle-float {
        0% {
            opacity: 0;
            transform: translateY(0px);
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateY(-100px);
        }
    }
`;

document.head.appendChild(style);

// Optimización de rendimiento
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    // Aquí se pueden agregar animaciones que necesiten optimización
    ticking = false;
}

// Event listeners optimizados
window.addEventListener('scroll', requestTick);
window.addEventListener('resize', requestTick);

