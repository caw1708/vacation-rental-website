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
        'bedroom1': 'First Bedroom Gallery',
        'bedroom2': 'Second Bedroom Gallery',
        'bedroom3': 'Third Bedroom Gallery',
        'bedroom4': 'Fourth Bedroom Gallery',
        'bedroom5': 'Fifth Bedroom Gallery',
        'bathroom': 'Bathroom Gallery',
        'living': 'Living Room Gallery',
        'kitchen': 'Kitchen Gallery',
        'dining': 'Dining Room Gallery',
        'other': 'Additional Views'
    };
    galleryTitle.textContent = titles[roomType];

    // Get current floor from URL
    const floor = window.location.pathname.split('/').pop().replace('.html', '');
    
    // Define image paths based on floor and room type
    let imagePaths = [];
    const basePath = `images/${floor}/`;

    switch(floor) {
        case 'ground':
            switch(roomType) {
                case 'living':
                    imagePaths = [
                        'ground living.jpg',
                        'ground living (1).jpg',
                        'ground living (2).jpg'
                    ];
                    break;
                case 'kitchen':
                    imagePaths = ['ground kitchen.jpg'];
                    break;
                case 'dining':
                    imagePaths = [
                        'ground dinning.jpg',
                        'Ground dinning (1).jpg',
                        'Ground dining(2).jpg'
                    ];
                    break;
                case 'bedroom':
                    imagePaths = ['ground room1.jpg'];
                    break;
                case 'bathroom':
                    imagePaths = ['ground bathroom.jpg'];
                    break;
                case 'other':
                    imagePaths = ['ground(5).jpg'];
                    break;
            }
            break;
        case 'first':
            switch(roomType) {
                case 'bedroom1':
                    imagePaths = [
                        'first room1.jpg',
                        'first room1().jpg'
                    ];
                    break;
                case 'bedroom2':
                    imagePaths = [
                        'first room2.jpg',
                        'first room2().jpg',
                        'first room2(1).jpg'
                    ];
                    break;
                case 'bedroom3':
                    imagePaths = ['first room3.jpg'];
                    break;
                case 'bedroom4':
                    imagePaths = [
                        'first room4.jpg',
                        'first room4().jpg'
                    ];
                    break;
                case 'bedroom5':
                    imagePaths = [
                        'first room5.jpg',
                        'first room5().jpg'
                    ];
                    break;
                case 'bathroom':
                    imagePaths = [
                        'first bathroom.jpg',
                        'first bathroom (1).jpg',
                        'first bathroom (2).jpg'
                    ];
                    break;
            }
            break;
        case 'second':
            switch(roomType) {
                case 'bedroom1':
                    imagePaths = [
                        'second bedroom1.jpg',
                        'second bedroom1(1).jpg'
                    ];
                    break;
                case 'bedroom2':
                    imagePaths = ['second bedroom2.jpg'];
                    break;
                case 'bathroom':
                    imagePaths = [
                        'second bathroom.jpg',
                        'second bathroom(1).jpg'
                    ];
                    break;
            }
            break;
        case 'basement':
            switch(roomType) {
                case 'bedroom':
                    imagePaths = [
                        'basement room.jpg',
                        'basement room(1).jpg',
                        'basement room().jpg'
                    ];
                    break;
                case 'bathroom':
                    imagePaths = ['basement bathroom.jpg'];
                    break;
            }
            break;
    }

    // Load images
    imagePaths.forEach(path => {
        const img = document.createElement('img');
        img.src = basePath + path;
        img.alt = `${titles[roomType]} - ${path}`;
        
        // Add click handler for full-screen view
        img.addEventListener('click', function() {
            openFullscreen(this.src);
        });
        
        galleryGrid.appendChild(img);
    });

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