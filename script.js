// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inquiry-form');
    const checkIn = document.getElementById('check-in');
    const checkOut = document.getElementById('check-out');

    // Set minimum date for check-in to today
    const today = new Date().toISOString().split('T')[0];
    checkIn.min = today;

    // Update check-out minimum date when check-in changes
    checkIn.addEventListener('change', function() {
        checkOut.min = this.value;
        if (checkOut.value && checkOut.value < this.value) {
            checkOut.value = this.value;
        }
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !phone || !message) {
            alert('Please fill in all required fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Phone validation (basic)
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number');
            return;
        }

        // Here you would typically send the form data to your server
        // For now, we'll just show a success message
        alert('Thank you for your inquiry! We will get back to you soon.');
        form.reset();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        }

        lastScroll = currentScroll;
    });

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
}); 