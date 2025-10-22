// Navigation handling
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Remove active class from all nav buttons
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
        // Add active class to corresponding nav button
        const activeBtn = document.querySelector(`.nav-btn[data-page="${pageId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        window.scrollTo(0, 0);
    }
}

// Form handlers
function handleSubmit(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

function handleRegistration(event) {
    event.preventDefault();
    alert('Registration successful! Check your email for confirmation details.');
    event.target.reset();
}

// Countdown Timer Functionality
function initializeCountdowns() {
    // Event dates (YYYY, MM-1, DD, HH, MM, SS)
    const eventDates = [
        new Date(2025, 9, 23, 15, 0, 0), // Championship Series
        new Date(2025, 10, 4, 14, 0, 0),  // Team Racing
        new Date(2025, 10, 11, 13, 0, 0)  // Beginner's Cup
    ];

    function updateCountdown(index) {
        const now = new Date().getTime();
        const eventDate = eventDates[index].getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            document.getElementById(`days-${index+1}`).innerText = '00';
            document.getElementById(`hours-${index+1}`).innerText = '00';
            document.getElementById(`minutes-${index+1}`).innerText = '00';
            document.getElementById(`seconds-${index+1}`).innerText = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById(`days-${index+1}`).innerText = formatTime(days);
        document.getElementById(`hours-${index+1}`).innerText = formatTime(hours);
        document.getElementById(`minutes-${index+1}`).innerText = formatTime(minutes);
        document.getElementById(`seconds-${index+1}`).innerText = formatTime(seconds);
    }

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    // Initialize all countdowns
    for (let i = 0; i < eventDates.length; i++) {
        updateCountdown(i);
        setInterval(() => updateCountdown(i), 1000);
    }
}

// Mobile navigation toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Gallery modal functionality
function openModal(index) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    if (galleryItems[index]) {
        modal.style.display = 'block';
        modalImg.src = galleryItems[index].src;
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Close modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCountdowns();
    
    // Add mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-btn');
    navLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });
});