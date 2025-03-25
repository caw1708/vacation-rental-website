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

    // Contact form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                checkIn: document.getElementById('check-in').value,
                checkOut: document.getElementById('check-out').value,
                message: document.getElementById('message').value
            };

            // Here you would typically send this to your server
            // For now, we'll just create a formatted email body
            const emailBody = `
                New Booking Inquiry:
                
                Name: ${formData.name}
                Email: ${formData.email}
                Phone: ${formData.phone}
                Check-in Date: ${formData.checkIn}
                Check-out Date: ${formData.checkOut}
                Message: ${formData.message}
            `;

            // Create mailto link with multiple recipients
            const mailtoLink = `mailto:ariane.dresp@freent.de,weberjoachim@me.com,constiweber@icloud.com?subject=New Booking Inquiry&body=${encodeURIComponent(emailBody)}`;
            
            // Open email client
            window.location.href = mailtoLink;

            // Clear form
            form.reset();
        });
    }

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

    // Floor toggle functionality
    function toggleFloor(floorId) {
        const content = document.getElementById(floorId);
        const icon = content.previousElementSibling.querySelector('.toggle-icon');
        
        if (content.classList.contains('active')) {
            content.classList.remove('active');
            icon.textContent = '+';
        } else {
            content.classList.add('active');
            icon.textContent = '-';
        }
    }

    // Make toggleFloor function globally available
    window.toggleFloor = toggleFloor;

    // Image preview modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <div class="modal-content">
            <img src="" alt="Preview">
        </div>
    `;
    document.body.appendChild(modal);

    // Add click handlers to all gallery images
    const galleryImages = document.querySelectorAll('.featured-grid img, .room-gallery img');
    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.close-modal');

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.classList.add('active');
            modalImg.src = this.src;
            modalImg.alt = this.alt;
        });
    });

    // Close modal when clicking close button or outside the image
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });

    // Function to load additional photos
    function loadAdditionalPhotos(floorId) {
        const container = document.getElementById(`${floorId}-other`);
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';

        // Add a loading indicator
        container.innerHTML = '<div class="loading">Loading additional photos...</div>';

        // In a real implementation, you would fetch the list of images from the server
        // For now, we'll handle this client-side when images are added to the folders
        const images = container.querySelectorAll('img');
        if (images.length === 0) {
            container.innerHTML = '<p class="no-photos">Additional photos will appear here when added.</p>';
        }
    }

    // Load additional photos when a floor section is opened
    const floorSections = ['basement', 'ground', 'first', 'second'];
    floorSections.forEach(floor => {
        const content = document.getElementById(floor);
        if (content) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.target.classList.contains('active')) {
                        loadAdditionalPhotos(floor);
                    }
                });
            });

            observer.observe(content, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
    });

    // Add styles for the additional photos section
    const style = document.createElement('style');
    style.textContent = `
        .additional-views {
            margin-top: 1rem;
        }
        .loading {
            text-align: center;
            padding: 2rem;
            color: #666;
        }
        .no-photos {
            text-align: center;
            padding: 2rem;
            color: #666;
            font-style: italic;
        }
    `;
    document.head.appendChild(style);
}); 