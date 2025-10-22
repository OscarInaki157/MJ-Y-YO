// Contador de tiempo juntos - TU FECHA DE ANIVERSARIO
function updateCounter() {
    const startDate = new Date('2023-10-20'); // ¡Tu fecha especial!
    const now = new Date();
    
    const diff = now - startDate;
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    let timeText = `Llevamos juntos: `;
    
    if (years > 0) {
        timeText += `${years} año${years > 1 ? 's' : ''}, `;
    }
    if (months > 0) {
        timeText += `${months} mes${months > 1 ? 'es' : ''}, `;
    }
    timeText += `${days} día${days > 1 ? 's' : ''}, `;
    timeText += `${hours} hora${hours > 1 ? 's' : ''} y `;
    timeText += `${minutes} minuto${minutes > 1 ? 's' : ''}`;
    
    document.getElementById('contador').textContent = timeText;
}

// Animación de la línea del tiempo - CORREGIDO
function initTimelineAnimation() {
    const events = document.querySelectorAll('.event-content, .polaroid');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 200 * Array.from(events).indexOf(entry.target));
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    events.forEach(event => {
        observer.observe(event);
    });
}

// Sorpresa final mejorada
function initSurprise() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    
    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', function() {
            // Crear confeti inmediatamente
            createConfetti();
            
            // Mensajes personalizados para tu aniversario
            const surprises = [
                "¡20 de Octubre de 2023 - El día que todo comenzó! 💖",
                "Cada momento contigo es especial desde aquel octubre 🥰",
                "Desde octubre del 2023, eres mi persona favorita ✨",
                "El 20-10-2023 marcó el inicio de nuestra hermosa historia 💝"
            ];
            
            const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
            
            // Animación del botón
            this.style.transform = 'scale(0.95)';
            this.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a24)';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.textContent = randomSurprise;
                this.style.transform = 'scale(1)';
            }, 300);
            
            // Deshabilitar botón después de click
            setTimeout(() => {
                this.disabled = true;
            }, 1000);
        });
    }
}

// Efecto confeti mejorado
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#f368e0'];
    const container = document.querySelector('body');
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.position = 'fixed';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.zIndex = '9999';
        confetti.style.opacity = '0.8';
        
        // Animación única para cada confeti
        const animationDuration = Math.random() * 3 + 2;
        confetti.style.animation = `confetti-fall ${animationDuration}s linear forwards`;
        
        container.appendChild(confetti);
        
        // Remover confeti después de la animación
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, animationDuration * 1000);
    }
}

// Añadir estilos de confeti al CSS dinámicamente
function addConfettiStyles() {
    if (!document.querySelector('#confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.textContent = `
            @keyframes confetti-fall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            .confetti {
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }
}

// Inicializar todo cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
    updateCounter();
    initTimelineAnimation();
    initSurprise();
    addConfettiStyles();
    
    // Actualizar contador cada minuto
    setInterval(updateCounter, 60000);
});

// Efecto parallax suave en el scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const portada = document.querySelector('.portada');
    if (portada) {
        portada.style.backgroundPosition = `center ${rate}px`;
    }
});