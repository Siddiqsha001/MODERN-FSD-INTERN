// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Dark mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Destination filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('.destination-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            destinationCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Gallery filters
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            galleryFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Budget range slider
    const rangeInput = document.querySelector('.range');
    const budgetValue = document.querySelector('.budget-value');

    if (rangeInput && budgetValue) {
        rangeInput.addEventListener('input', function() {
            budgetValue.textContent = '$' + this.value;
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function highlightNavLink() {
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // Destination view buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const destinationName = this.closest('.destination-info').querySelector('h3').textContent;
            alert(`You selected: ${destinationName}. This would take you to a detailed page about this destination.`);
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value.trim() === '') {
                alert('Please enter your email address');
                return;
            }
            alert(`Thank you for subscribing with ${emailInput.value}! You will now receive our travel updates.`);
            emailInput.value = '';
        });
    }

    // Trip planning form
    const plannerForm = document.querySelector('.planner-form');
    if (plannerForm) {
        const generateBtn = plannerForm.querySelector('button');
        if (generateBtn) {
            generateBtn.addEventListener('click', function() {
                const destination = plannerForm.querySelector('input[type="text"]').value;
                if (destination.trim() === '') {
                    alert('Please enter a destination');
                    return;
                }
                alert(`Creating your custom itinerary for ${destination}. This would generate a personalized travel plan based on your preferences.`);
            });
        }
    }

    // Load more buttons (destinations & gallery)
    const loadMoreBtns = document.querySelectorAll('.load-more');
    loadMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('This would load more items. In a full implementation, this would fetch additional content from a server.');
        });
    });

    // Animated counters for statistics (if added)
    function animateCounters() {
        const counterElements = document.querySelectorAll('.counter');
        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = parseInt(counter.innerText);
            const increment = Math.ceil(target / 100);
            
            if (count < target) {
                counter.innerText = count + increment;
                setTimeout(() => animateCounters(), 20);
            } else {
                counter.innerText = target;
            }
        });
    }

    // Interactive map placeholder
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', function() {
            alert('This would initialize an interactive map with destinations. In a full implementation, this could use Google Maps or Mapbox API.');
        });
    }

    // Image lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }

    // Add parallax effect to the hero section
    window.addEventListener('scroll', function() {
        const parallaxContainer = document.querySelector('.parallax-container');
        if (parallaxContainer) {
            const scrollValue = window.scrollY;
            parallaxContainer.style.backgroundPositionY = (scrollValue * 0.5) + 'px';
        }
    });

    // Initialize view more button for itinerary
    const viewMoreBtn = document.querySelector('.view-more');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            alert('This would show the complete detailed itinerary. In a full implementation, this would expand to show more days and activities.');
        });
    }
});

// Simulated API call for search functionality
function searchDestinations(query) {
    // This is a placeholder function that would normally connect to a backend
    console.log(`Searching for: ${query}`);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { name: 'Paris, France', type: 'city' },
                { name: 'Bali, Indonesia', type: 'beach' },
                { name: 'Swiss Alps', type: 'mountain' },
                { name: 'Tokyo, Japan', type: 'city' }
            ].filter(dest => dest.name.toLowerCase().includes(query.toLowerCase())));
        }, 500);
    });
}

// Initialize search functionality
const searchInput = document.querySelector('.search-container input');
const searchBtn = document.querySelector('.search-btn');

if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query === '') {
            alert('Please enter a destination to search');
            return;
        }
        
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        searchDestinations(query).then(results => {
            searchBtn.innerHTML = '<i class="fas fa-search"></i>';
            
            if (results.length === 0) {
                alert('No destinations found matching your search');
            } else {
                let resultText = 'Found the following destinations:\n\n';
                results.forEach(dest => {
                    resultText += `${dest.name} (${dest.type})\n`;
                });
                alert(resultText);
                // In a real app, this would update the UI with search results
            }
        });
    });
    
    // Also trigger search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}
