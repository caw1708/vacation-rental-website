document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('gallery-modal');
    const closeBtn = document.querySelector('.close-modal');
    const galleryTitle = document.getElementById('gallery-title');
    const galleryGrid = document.getElementById('gallery-grid');

    // Close modal when clicking close button
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
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
});

// Function to show gallery for selected room
function showGallery(roomType) {
    const modal = document.getElementById('gallery-modal');
    const galleryTitle = document.getElementById('gallery-title');
    const galleryGrid = document.getElementById('gallery-grid');
    
    // Clear existing content
    galleryGrid.innerHTML = '';

    // Set gallery title
    const titles = {
        'bedroom': 'Bedroom Gallery',
        'bathroom': 'Bathroom Gallery',
        'laundry': 'Laundry Room Gallery',
        'other': 'Additional Views'
    };
    galleryTitle.textContent = titles[roomType];

    // Get current floor from URL
    const floor = window.location.pathname.split('/').pop().replace('.html', '');
    
    // Load images for the selected room
    // In a real implementation, you would load these dynamically from the server
    // For now, we'll assume a fixed number of images per room
    const imagePath = `images/${floor}/${roomType === 'other' ? 'other/' : ''}`;
    const numberOfImages = roomType === 'other' ? 5 : 3; // Adjust based on actual number of images

    for (let i = 1; i <= numberOfImages; i++) {
        const img = document.createElement('img');
        img.src = `${imagePath}${roomType === 'other' ? i : roomType + i}.jpg`;
        img.alt = `${titles[roomType]} - Image ${i}`;
        
        // Add click handler for full-screen view
        img.addEventListener('click', function() {
            openFullscreen(this.src);
        });
        
        galleryGrid.appendChild(img);
    }

    // Show modal
    modal.classList.add('active');
}

// Function to open image in fullscreen
function openFullscreen(imageSrc) {
    const fullscreenModal = document.createElement('div');
    fullscreenModal.className = 'modal fullscreen-modal active';
    fullscreenModal.innerHTML = `
        <span class="close-modal">&times;</span>
        <img src="${imageSrc}" alt="Fullscreen view">
    `;

    document.body.appendChild(fullscreenModal);

    // Close handlers
    const closeBtn = fullscreenModal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        fullscreenModal.remove();
    });

    fullscreenModal.addEventListener('click', (e) => {
        if (e.target === fullscreenModal) {
            fullscreenModal.remove();
        }
    });
} 