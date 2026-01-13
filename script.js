// Scroll-triggered fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill cards and project cards for fade-in effect
document.querySelectorAll('.skill-card, .project-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add subtle mouse parallax to profile circle
const profileCircle = document.querySelector('.profile-circle');

if (profileCircle) {
    document.addEventListener('mousemove', (e) => {
        const rect = profileCircle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const angleX = (e.clientY - centerY) / 100;
        const angleY = (e.clientX - centerX) / 100;
        
        profileCircle.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });

    document.addEventListener('mouseleave', () => {
        profileCircle.style.transform = 'rotateX(0) rotateY(0)';
    });
}

// Add glow effect on hover for cards
document.querySelectorAll('.skill-card, .project-card, .contact-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});

// Prevent navigation logo from affecting smooth scroll
document.querySelector('.nav-logo').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.style.color = 'var(--text-primary)';
            });
            
            const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.style.color = 'var(--primary-color)';
            }
        }
    });
});

// Add interactive ripple effect on button clicks
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        // Animate ripple
        const size = Math.max(rect.width, rect.height);
        const animate = ripple.animate([
            {
                width: '0px',
                height: '0px',
                opacity: 1
            },
            {
                width: size * 2 + 'px',
                height: size * 2 + 'px',
                opacity: 0
            }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        animate.onfinish = () => ripple.remove();
    });
});

// Debounce function for performance
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

// Update navbar on scroll
window.addEventListener('scroll', debounce(() => {
    const nav = document.querySelector('.glassmorphic-nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.2)';
    } else {
        nav.style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.1)';
    }
}, 100));

// Particle animation performance optimization
const particles = document.querySelectorAll('.particle');
const particleAnimation = particles.length > 0;

if (particleAnimation && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    // Animation is already handled by CSS
    console.log('Particles animated via CSS');
}

// Accessibility: Respect prefers-reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none !important';
        el.style.transition = '0s !important';
    });
}

console.log('Portfolio script loaded successfully!');
