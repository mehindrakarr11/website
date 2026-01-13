// Loading Screen with Progress Animation
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const progressFill = document.getElementById('progressFill');
    
    // Animate progress bar
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
        }
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
    }, 100);
    
    // Hide loader after animation completes
    setTimeout(() => {
        if (progressFill) {
            progressFill.style.width = '100%';
        }
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 300);
    }, 2000);
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to dark mode
const savedTheme = localStorage.getItem('theme');
const currentTheme = savedTheme || 'dark';

// Set initial theme immediately
html.setAttribute('data-theme', currentTheme);

function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Initialize icon
updateThemeIcon(currentTheme);

// Add click event listener
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

// Live Time Display
function updateLiveTime() {
    const timeDisplay = document.getElementById('timeDisplay');
    if (!timeDisplay) return;
    
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// Update time every second
setInterval(updateLiveTime, 1000);
updateLiveTime(); // Initial call

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
    
    lastScroll = currentScroll;
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// Typing Animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const text = typingElement.getAttribute('data-text') || 'Your Name';
        setTimeout(() => {
            typeWriter(typingElement, text, 150);
        }, 2000);
    }
});

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const isDecimal = target % 1 !== 0;
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = isDecimal ? target.toFixed(1) + '+' : target + '+';
            clearInterval(timer);
        } else {
            element.textContent = isDecimal ? Math.floor(start * 10) / 10 + '+' : Math.floor(start) + '+';
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate counters
            if (entry.target.classList.contains('stat-item')) {
                const counter = entry.target.querySelector('.counter');
                if (counter && !counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                }
            }
            
            // Animate section titles
            if (entry.target.classList.contains('section-title')) {
                entry.target.classList.add('visible');
            }
            
            // Animate about paragraphs
            if (entry.target.classList.contains('about-paragraph')) {
                entry.target.classList.add('visible');
            }
            
            // Animate about content text wrapper
            if (entry.target.classList.contains('about-content-text')) {
                const paragraphs = entry.target.querySelectorAll('.about-paragraph');
                paragraphs.forEach((p, index) => {
                    setTimeout(() => {
                        p.classList.add('visible');
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Observe project cards, skill categories, contact items, about paragraphs
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .contact-item, .about-paragraph, .about-content-text');
    animateElements.forEach(el => {
        if (el.classList.contains('about-paragraph')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        } else if (!el.classList.contains('about-content-text')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });
});

// Save contact messages to localStorage and file
function saveContactMessage(name, email, subject, message) {
    const messageData = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    // Get existing messages from localStorage
    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    
    // Add new message
    messages.push(messageData);
    
    // Save back to localStorage
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    // Also save to a downloadable file format
    downloadMessageToFile(messageData);
    
    return messageData;
}

// Download individual message as JSON file
function downloadMessageToFile(messageData) {
    const dataStr = JSON.stringify(messageData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `contact_message_${messageData.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Download all messages as a single file (for admin use)
function downloadAllMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    if (messages.length === 0) {
        alert('No messages to download.');
        return;
    }
    
    const dataStr = JSON.stringify(messages, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `all_contact_messages_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Save the message
        saveContactMessage(name, email, subject, message);

        // Show success message with animation
        const button = contactForm.querySelector('button');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add admin function to download all messages (accessible via console)
    window.downloadAllContactMessages = downloadAllContactMessages;
    console.log('💡 Admin Tip: Type downloadAllContactMessages() in console to download all contact messages');
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const floatingShapes = document.querySelectorAll('.floating-shape');
    
    if (hero && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        
        floatingShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
    .counter.animated {
        animation: countUp 0.5s ease;
    }
    @keyframes countUp {
        from {
            transform: scale(0.8);
        }
        to {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Set year in footer to 2025
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = '2025';
    }
});

// Add mouse move parallax effect
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Old cursor trail code removed - using custom cursor instead

// Custom Cursor
const cursor = document.getElementById('customCursor');
const cursorDot = cursor?.querySelector('.cursor-dot');
const cursorOutline = cursor?.querySelector('.cursor-outline');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let outlineX = 0;
let outlineY = 0;

// Update cursor position
function updateCursor() {
    // Smooth movement for dot (fast)
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    // Slower movement for outline (follows behind)
    outlineX += (mouseX - outlineX) * 0.08;
    outlineY += (mouseY - outlineY) * 0.08;
    
    if (cursorDot && cursorOutline) {
        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
    }
    
    requestAnimationFrame(updateCursor);
}

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (cursor) {
        cursor.style.display = 'block';
    }
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    if (cursor) {
        cursor.style.display = 'none';
    }
});

// Show cursor when entering window
document.addEventListener('mouseenter', () => {
    if (cursor) {
        cursor.style.display = 'block';
    }
});

// Cursor hover effects for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, .nav-link, .social-link, .project-link');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorDot) {
            cursorDot.style.width = '12px';
            cursorDot.style.height = '12px';
            cursorDot.style.background = '#8b5cf6';
        }
        if (cursorOutline) {
            cursorOutline.style.width = '50px';
            cursorOutline.style.height = '50px';
            cursorOutline.style.borderColor = '#8b5cf6';
        }
    });
    
    el.addEventListener('mouseleave', () => {
        if (cursorDot) {
            cursorDot.style.width = '8px';
            cursorDot.style.height = '8px';
            cursorDot.style.background = '#ffffff';
        }
        if (cursorOutline) {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        }
    });
});

// Initialize cursor animation
if (cursor) {
    cursor.style.display = 'none';
    updateCursor();
}
