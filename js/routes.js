// Funcionalidad para rutas y mapas interactivos

// Datos de rutas detalladas
const routesData = {
    palmar: {
        name: "Vereda El Palmar",
        description: "Ruta hacia las Cascadas de Palo Blanco y trapiches paneleros",
        steps: [
            "Salir del centro de Maripí por la calle principal hacia el norte",
            "Continuar por 3 km hasta el cruce de la vereda El Palmar",
            "Tomar desvío a la izquierda (señalizado)",
            "Continuar 5 km por vía destapada en buen estado",
            "Llegar al área de parqueadero de las cascadas",
            "Caminata de 15 minutos hasta las cascadas principales"
        ],
        tips: [
            "Vía transitable en vehículo convencional",
            "Mejor visitarla en la mañana",
            "Llevar zapatos antideslizantes para las cascadas",
            "Posibilidad de almorzar en trapiches locales"
        ],
        duration: "45 minutos en vehículo + 15 min caminando",
        difficulty: "Fácil"
    },
    yanaca: {
        name: "Sendero Pico Yanacá",
        description: "Ascenso al punto más alto de la región con vistas panorámicas",
        steps: [
            "Contratar guía local obligatorio en el centro de Maripí",
            "Dirigirse en vehículo 4x4 hasta el inicio del sendero (8 km)",
            "Inicio de caminata en el punto de control",
            "Ascenso por sendero marcado durante 2-3 horas",
            "Parada en mirador intermedio (opcional)",
            "Ascenso final hasta la cima (1 hora adicional)",
            "Descenso por el mismo sendero (2-3 horas)"
        ],
        tips: [
            "Obligatorio contratar guía certificado",
            "Iniciar muy temprano (5:00 AM)",
            "Llevar abundante agua y snacks",
            "Ropa abrigada para la cima",
            "Cámara para las vistas panorámicas",
            "Informar en el hotel sobre el itinerario"
        ],
        duration: "8-10 horas (día completo)",
        difficulty: "Difícil"
    },
    minas: {
        name: "Vereda Las Minas",
        description: "Visita a las minas de esmeraldas y sitios históricos de extracción",
        steps: [
            "Coordinar visita previa con operadores locales",
            "Salir en vehículo 4x4 desde el centro (obligatorio)",
            "Recorrido de 35 minutos por vía destapada",
            "Llegada al área de minas activas",
            "Tour guiado por las instalaciones (2 horas)",
            "Visita a minas históricas abandonadas",
            "Regreso por la misma ruta"
        ],
        tips: [
            "Reservar con anticipación",
            "Vehículo 4x4 obligatorio",
            "Seguir estrictamente las normas de seguridad",
            "No está permitido extraer material",
            "Llevar cédula de identidad",
            "Casco de seguridad proporcionado en el sitio"
        ],
        duration: "Medio día (4-5 horas)",
        difficulty: "Moderado"
    },
    rio: {
        name: "Sendero Río Minero",
        description: "Caminata ecológica siguiendo el curso del río principal",
        steps: [
            "Inicio en el puente del río en el centro del pueblo",
            "Seguir sendero marcado río arriba por la margen derecha",
            "Primera parada: zona de pesca (1 km)",
            "Continuar hasta la confluencia con quebrada La Cristalina",
            "Zona de avistamiento de aves (mirador natural)",
            "Regreso por la margen izquierda (sendero circular)",
            "Llegada al punto de inicio"
        ],
        tips: [
            "Sendero bien marcado y seguro",
            "Ideal para familias con niños",
            "Llevar binoculares para observación de aves",
            "Mejor en horas de la mañana",
            "Posibilidad de pesca deportiva (con permiso)",
            "Área de picnic disponible"
        ],
        duration: "2-3 horas caminando",
        difficulty: "Fácil"
    },
    cafe: {
        name: "Ruta del Café",
        description: "Circuito por las fincas cafeteras de las veredas altas",
        steps: [
            "Salida desde el centro hacia las veredas altas",
            "Primera parada: Finca El Recuerdo (10 km)",
            "Tour del proceso de cultivo y beneficio",
            "Segunda parada: Finca La Esperanza (8 km adicionales)",
            "Degustación de café y almuerzo campesino",
            "Tercera parada: Cooperativa Cafetera (5 km)",
            "Compra de café y productos derivados",
            "Regreso al centro por vía panorámica"
        ],
        tips: [
            "Coordinar visitas con las fincas",
            "Mejor época: temporada de cosecha (octubre-enero)",
            "Llevar dinero para compras",
            "Almuerzo incluido en algunas fincas",
            "Aprender sobre el proceso completo",
            "Excelente para fotografía"
        ],
        duration: "Día completo (8 horas)",
        difficulty: "Fácil"
    },
    panela: {
        name: "Ruta de la Panela",
        description: "Tour por los trapiches tradicionales y proceso de elaboración",
        steps: [
            "Salida hacia la vereda El Palmar",
            "Primera parada: Trapiche Don Carlos",
            "Observación del proceso de molienda",
            "Segunda parada: Trapiche La Esperanza",
            "Participación en el proceso de cocción",
            "Tercera parada: Cooperativa Panelera",
            "Degustación de productos derivados",
            "Compra de panela y dulces tradicionales"
        ],
        tips: [
            "Mejor visitarla en días de producción",
            "Coordinar con los trapicheros",
            "Llevar ropa que se pueda ensuciar",
            "Degustación de guarapo fresco",
            "Aprender sobre técnicas tradicionales",
            "Comprar productos directamente del productor"
        ],
        duration: "Medio día (4-5 horas)",
        difficulty: "Fácil"
    }
};

// Función para mostrar ruta detallada
function showRoute(routeId) {
    const route = routesData[routeId];
    if (!route) return;

    // Crear modal con información detallada
    const modal = document.createElement('div');
    modal.className = 'route-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${route.name}</h3>
                <span class="close-modal" onclick="closeRouteModal()">&times;</span>
            </div>
            <div class="modal-body">
                <p class="route-description">${route.description}</p>
                
                <div class="route-info-grid">
                    <div class="info-box">
                        <strong>Duración:</strong> ${route.duration}
                    </div>
                    <div class="info-box">
                        <strong>Dificultad:</strong> ${route.difficulty}
                    </div>
                </div>

                <h4>Paso a paso:</h4>
                <ol class="route-steps-list">
                    ${route.steps.map(step => `<li>${step}</li>`).join('')}
                </ol>

                <h4>Recomendaciones:</h4>
                <ul class="route-tips-list">
                    ${route.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>

                <div class="modal-actions">
                    <button class="action-btn" onclick="shareRoute('${routeId}')">
                        📱 Compartir Ruta
                    </button>
                    <button class="action-btn" onclick="downloadRoute('${routeId}')">
                        📥 Descargar GPS
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // Animación de entrada
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Función para cerrar modal
function closeRouteModal() {
    const modal = document.querySelector('.route-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Función para compartir ruta
function shareRoute(routeId) {
    const route = routesData[routeId];
    const shareText = `🗺️ Ruta: ${route.name}\n📍 Maripí, Boyacá\n⏱️ ${route.duration}\n🔗 Más info: ${window.location.href}`;
    
    if (navigator.share) {
        navigator.share({
            title: route.name,
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback para navegadores que no soportan Web Share API
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Ruta copiada al portapapeles');
        });
    }
}

// Función para descargar coordenadas GPS (simulado)
function downloadRoute(routeId) {
    const route = routesData[routeId];
    
    // Coordenadas simuladas para cada ruta
    const coordinates = {
        palmar: "5.5461, -73.8547",
        yanaca: "5.5678, -73.8234",
        minas: "5.5234, -73.8789",
        rio: "5.5456, -73.8456",
        cafe: "5.5567, -73.8345",
        panela: "5.5461, -73.8547"
    };

    const gpsData = `Ruta: ${route.name}
Coordenadas: ${coordinates[routeId]}
Duración: ${route.duration}
Dificultad: ${route.difficulty}

Descripción: ${route.description}

Pasos:
${route.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

Recomendaciones:
${route.tips.map(tip => `• ${tip}`).join('\n')}`;

    // Crear y descargar archivo
    const blob = new Blob([gpsData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ruta_${routeId}_maripi.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Archivo GPS descargado');
}

// Función para mostrar notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Interactividad del mapa
document.addEventListener('DOMContentLoaded', function() {
    const mapPoints = document.querySelectorAll('.map-point');
    
    mapPoints.forEach(point => {
        point.addEventListener('click', function() {
            const info = this.getAttribute('data-info');
            showMapPointInfo(info, this);
        });
        
        point.addEventListener('mouseenter', function() {
            const tooltip = this.querySelector('.point-tooltip');
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(-100%) scale(1)';
        });
        
        point.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.point-tooltip');
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(-100%) scale(0.8)';
        });
    });
});

// Función para mostrar información del punto del mapa
function showMapPointInfo(info, element) {
    // Información detallada para cada punto
    const pointsInfo = {
        "Cascadas de Palo Blanco": {
            description: "Hermosas cascadas naturales ideales para ecoturismo",
            activities: ["Senderismo", "Fotografía", "Baño natural"],
            access: "Vía destapada 8 km desde el centro",
            duration: "45 minutos en vehículo"
        },
        "Pico Yanacá": {
            description: "Punto más alto de la región con vistas panorámicas",
            activities: ["Montañismo", "Observación", "Fotografía"],
            access: "Sendero de montaña, requiere guía",
            duration: "8-10 horas (día completo)"
        },
        "Minas de Esmeraldas": {
            description: "Sitios históricos de extracción de esmeraldas",
            activities: ["Tour educativo", "Historia", "Geología"],
            access: "Vía 4x4, 15 km desde el centro",
            duration: "Medio día con tour"
        },
        "Centro de Maripí": {
            description: "Corazón del municipio con servicios y comercio",
            activities: ["Compras", "Gastronomía", "Hospedaje"],
            access: "Acceso directo por carretera",
            duration: "Base para todas las actividades"
        },
        "Trapiches Paneleros": {
            description: "Centros de producción tradicional de panela",
            activities: ["Tour educativo", "Degustación", "Compras"],
            access: "Vías rurales, vehículo recomendado",
            duration: "Medio día"
        },
        "Fincas Cafeteras": {
            description: "Cultivos de café de altura con tours disponibles",
            activities: ["Tour del café", "Degustación", "Compras"],
            access: "Veredas altas, vehículo necesario",
            duration: "Día completo"
        },
        "Río Minero": {
            description: "Río principal ideal para actividades acuáticas",
            activities: ["Pesca", "Observación de aves", "Senderismo"],
            access: "Sendero desde el centro",
            duration: "2-3 horas"
        }
    };

    const pointInfo = pointsInfo[info];
    if (!pointInfo) return;

    // Crear popup de información
    const popup = document.createElement('div');
    popup.className = 'map-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h4>${info}</h4>
            <p>${pointInfo.description}</p>
            <div class="popup-details">
                <div class="detail-row">
                    <strong>Actividades:</strong> ${pointInfo.activities.join(', ')}
                </div>
                <div class="detail-row">
                    <strong>Acceso:</strong> ${pointInfo.access}
                </div>
                <div class="detail-row">
                    <strong>Duración:</strong> ${pointInfo.duration}
                </div>
            </div>
            <button class="popup-close" onclick="closeMapPopup()">&times;</button>
        </div>
    `;

    // Posicionar popup cerca del punto
    const rect = element.getBoundingClientRect();
    popup.style.position = 'fixed';
    popup.style.left = rect.left + 'px';
    popup.style.top = (rect.top - 200) + 'px';
    popup.style.zIndex = '1000';

    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.classList.add('active');
    }, 10);
}

// Función para cerrar popup del mapa
function closeMapPopup() {
    const popup = document.querySelector('.map-popup');
    if (popup) {
        popup.classList.remove('active');
        setTimeout(() => {
            popup.remove();
        }, 300);
    }
}

// Cerrar popup al hacer clic fuera
document.addEventListener('click', function(e) {
    if (!e.target.closest('.map-popup') && !e.target.closest('.map-point')) {
        closeMapPopup();
    }
});

// Cerrar modal al hacer clic fuera
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('route-modal')) {
        closeRouteModal();
    }
});

// Función para contactar negocio (reutilizada de script.js)
function contactBusiness(businessName, phone) {
    const message = `Hola, estoy interesado en información sobre ${businessName} en Maripí, Boyacá. ¿Podrían ayudarme?`;
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

