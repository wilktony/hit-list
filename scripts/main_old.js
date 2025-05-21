// DOM Elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const navLinksLi = document.querySelectorAll('.nav-links li');
const testimonialSlider = document.querySelector('.testimonials-slider');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const contactForm = document.getElementById('contactForm');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinksLi.forEach(li => {
    li.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Testimonial Slider
let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial');

// Initially hide all testimonials except the first one
testimonials.forEach((testimonial, index) => {
    if (index !== 0) {
        testimonial.style.display = 'none';
    }
});

// Show a specific slide
function showSlide(n) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.style.display = 'none';
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show the current testimonial and activate the corresponding dot
    testimonials[n].style.display = 'block';
    dots[n].classList.add('active');
}

// Next/previous controls
function nextSlide() {
    currentSlide++;
    if (currentSlide >= testimonials.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = testimonials.length - 1;
    }
    showSlide(currentSlide);
}

// Event listeners for slider controls
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Dot indicators
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// Music player functionality (for demonstration)
const musicItems = document.querySelectorAll('.music-item');

musicItems.forEach(item => {
    const playOverlay = item.querySelector('.play-overlay');
    
    playOverlay.addEventListener('click', () => {
        // This would typically call an audio player function
        // For demo purposes, we'll just toggle a "playing" class
        musicItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('playing');
            }
        });
        
        item.classList.toggle('playing');
        
        // Alert for demo purposes
        const musicTitle = item.querySelector('.music-info h3').textContent;
        alert(`Playing: ${musicTitle}`);
    });
});

// Contact Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Normally, you would send this data to a server
        // For demo purposes, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been received. We'll get back to you shortly.`);
        
        // Reset the form
        contactForm.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Calculate the distance to scroll
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Fade in elements on scroll
const fadeElements = document.querySelectorAll('.about-content, .music-item, .service-card');

function fadeInOnScroll() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100 && elementBottom > 0) {
            element.classList.add('fade-in');
        }
    });
}

// Add fade-in class to CSS
const style = document.createElement('style');
style.innerHTML = `
    .about-content, .music-item, .service-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Listen for scroll events
window.addEventListener('scroll', fadeInOnScroll);
// Trigger once on page load
fadeInOnScroll();

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            // Normally, this would be sent to a server
            // For demo purposes, we'll just show an alert
            alert(`Thank you for subscribing to our newsletter with: ${email}`);
            
            // Reset the form
            newsletterForm.reset();
        }
    });
}

// Add active class to current section in navigation
function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// Add active class style to CSS
const activeStyle = document.createElement('style');
activeStyle.innerHTML = `
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeStyle);

// Listen for scroll events for navigation highlighting
window.addEventListener('scroll', highlightCurrentSection);
// Trigger once on page load
highlightCurrentSection();
