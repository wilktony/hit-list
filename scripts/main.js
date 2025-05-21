document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    // Add scroll event for navbar background change
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate offset with navbar height
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For now, we'll just alert a success message
            alert('Message sent successfully! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple validation
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would normally send the email to a server
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
    
    // Add animation effect for appearing elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animateElements = document.querySelectorAll('.section-header, .about-content, .music-item, .tour-date, .gallery-item, .contact-container');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    /* // Add a custom class when element appears
    document.querySelectorAll('.appear').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
     */
    
    // Play button hover effect for music items
    const musicItems = document.querySelectorAll('.music-item');
    
    musicItems.forEach(item => {
        item.addEventListener('click', function() {
            // Here you would normally play the music or redirect to a music platform
            // For now, we'll just alert a message
            const albumTitle = this.querySelector('.music-info h3').textContent;
            alert(`Playing ${albumTitle}`);
        });
    });
    
    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    window.addEventListener('scroll', function() {
        if (heroSection && heroImage) {
            const scrollPosition = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        }
    });
});
