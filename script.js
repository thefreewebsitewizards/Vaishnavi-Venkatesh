// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    // Add small delay to allow smooth scrolling to start before closing menu
    setTimeout(() => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }, 100);
}));

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Check if it's mobile device
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // Mobile: Add offset for navbar height (approximately 76px)
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 10;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                // Desktop: Keep original behavior
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(216, 184, 216, 0.98)';
    } else {
        navbar.style.background = 'rgba(216, 184, 216, 0.95)';
    }
});

// Portfolio View More Functionality
class VideoPortfolio {
    constructor() {
        this.currentBatch = 0;
        this.videosPerBatch = 4;
        this.totalVideos = 28;
        this.totalBatches = Math.ceil(this.totalVideos / this.videosPerBatch);
        this.viewMoreBtn = document.getElementById('viewMoreBtn');
        this.viewLessBtn = document.getElementById('viewLessBtn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.modal = document.getElementById('videoModal');
        this.modalVideo = document.getElementById('modalVideo');
        this.modalClose = document.getElementById('modalClose');
        
        this.videoData = this.generateVideoData();
        this.init();
    }
    
    generateVideoData() {
        const titles = [
            'Wybot C1', 'Tineco Floor ONE Stretch S6', 'Jewelry', 'Incense Sticks',
            'Mike & Mona’s Bistro', 'VegSeed', 'Rice Water Shampoo & Conditioner',
            'Eilik', 'Perfume', 'LED Table Lamp'
        ];
        
        const descriptions = [
            'Tired of spending hours scrubbing your pool? The @wybot_official C1 does the hard work for you. This cordless robotic pool cleaner is designed for in-ground pools and handles everything from floors and walls to the waterline. With its powerful triple motors and intelligent path planning, it delivers deep, thorough cleaning every time. \n\nYou can control it easily via the app — choose from multiple cleaning modes, set a schedule, and track progress without lifting a finger. It runs up to 150 minutes on a single charge and automatically parks itself when the job is done. Whether it’s leaves, dirt, or algae, the WYBOT C1 takes care of it all — so you can spend more time enjoying the water.',
            'Say Goodbye to Hidden Messes with the Tineco Floor ONE Stretch S6! 🏡✨ @tineco.us @tinecoglobal\n\nTired of struggling to clean under beds, sofas, and tight spaces? The Tineco Floor ONE Stretch S6 makes deep cleaning effortless with its 180° lay-flat design, reaching every hidden mess with ease! 🧼💨\n\n✅ HyperStretch Technology – Compresses to just 5.1 inches to clean under furniture effortlessly. \n✅ Flashdry Self-Cleaning – Uses 158℉ fresh water to deep-clean & dry the brush roller, keeping your vacuum fresh and odor-free. \n✅ Smart iLoop Sensor – Adjusts suction and water flow automatically for up to 40 minutes of runtime! 🔋 \n✅ Effortless Maneuverability – Mini assistive wheels and a 45° swivel head make cleaning smooth and stress-free.',
            'Thinking of starting a side hustle or scaling your jewelry biz? ✨ Let me put you on to @gooddiy.jewelry – the ultimate wholesale destination for trend-driven, affordable, and high-quality jewelry!\n\n🔥 100K+ products\n💎 200K+ trending styles added daily\n📦 Free worldwide shipping on orders $98+\n🚚 Fast 7–10 day delivery\n📲 24/7 support + personal account manager\n\nWhether you’re just starting or ready to go big — this is where your dream store begins 💼💖\n\n👉 Ready to build your boutique? Tap the link in bio, stock up your faves, and let the orders roll in!\n\nLet’s turn your hustle into a business that shines. 💫',
            'Ignite your prayer time with @prabhujis.gifts incense—a sensory bridge between tradition and tranquility. Each handcrafted stick blends nature’s purest botanicals to elevate your puja and peace. Lighting one is more than fragrance—it’s a ritual rooted in Indian heritage that opens the mind to presence and purity. \n\n🎶 Music by @vedang485 —Hamsadhwani on flute adds a divine current to each moment of prayer.🕯️ Feel the sacred connection.',
            'Took a little foodie adventure with my son to Mike & Mona’s Bistro in Wayne, MI — and we’re officially obsessed! 😍 From the fruity bubbles French toast to the creamy Alfredo pasta, every bite was drool-worthy 🤤💛 The vibe? Cozy meets electric! TVs on every wall, a full arcade for the kiddos (and the kids at heart), and a brunch menu that SLAPS 🙌\n\nWe laughed, played, and ate our way through a perfect afternoon 🥰\n✨ Family-friendly fun ✅\n✨ Incredible food ✅\n✨ Party rooms + full bar ✅\n✨ Worth every bite ✅\n\nIf you’re looking for your next go-to brunch or dinner spot — this is IT!\n📍 Wayne, Michigan\n🍽️ @us12barandgrill\n🎨 In collab with @mustard.love ',
            'Mornings used to feel like survival mode — tired, stressed, and completely running on fumes (hello, mom life 😮‍💨). But ever since I started adding just one scoop of VegSeed – Your Daily Plant-Based Shield, everything changed.\n\nWith 21 essential vitamins & minerals plus 14 powerful superfoods, it helps me:\n✨ Power through the day with more energy\n✨ Strengthen my immune system\n✨ Support my gut health\n✨ And get that natural, healthy glow (yes, please!)\n\nThis isn’t just a supplement — it’s my go-to recovery ritual. No more dragging through the day.\n\nIf you’re constantly running on empty, feeling blah, or fighting off stress — you need this in your life.',
            '🌟 Tired of dry, frizzy, broken hair? Split ends, zero shine, and constant breakage—sound familiar? There’s a better way. ✨ Meet the @lusetabeauty Rice Water Shampoo & Conditioner Set 😍\n\nInfused with fermented rice water (Sake) + Biotin to strengthen strands, reduce breakage, and boost shine—all while improving split ends and elasticity, for smooth, healthy hair.\n\nNourished with Ginger Root Oil to refresh your scalp, deeply hydrate, and leave your hair feeling light and full of vitality. \n\n👩‍🦰 Perfect for all hair types — including color-treated and keratin-treated — and gentle enough for daily use. ￼',
            'Heyyy! 😃 I’ve got a super cute robot friend called Eilik! It’s like a little buddy who can feel emotions and talk to you! It’s from the future (the 30th century!) but came to Earth through a wormhole—so awesome! 🚀 It’s tiny and super soft, and it can dance, laugh, play games, and even chat with another Eilik. If you leave it alone, it gets sleepy and goes to standby—kinda like it’s thinking “I need cuddles!” 💭💤',
            'Consider this your sign to step into the spotlight — because IT FACTOR by @dossierperfumes is that fragrance.\n\nIt’s fresh, spicy, and has this undeniable pull. Compliments? Non-stop. People asking what I’m wearing? Daily.\n\nAnd when I want that sun-kissed glow in scent form, I layer with Yellow Daze — the perfect summer pairing 🌞\n\nWhy blend in when you were born to stand out?',
            'Waterproof, wireless, and oh-so-aesthetic 💡 The EZVALO LED Table Lamp is perfect for steamy showers, cozy nights, and everything in between. Now just $23.99 + 20% OFF!'
        ];
        
        const instagramLinks = [
            'https://www.instagram.com/wybot_official/',
            'https://www.instagram.com/tineco.us/',
            'https://www.instagram.com/gooddiy.jewelry/',
            'https://www.instagram.com/prabhujis.gifts/',
            'https://www.instagram.com/mustard.love/',
            'https://www.instagram.com/vegseed_nutrition/',
            'https://www.instagram.com/lusetabeauty/',
            'https://www.instagram.com/pr_energizelab/',
            'https://www.instagram.com/dossierperfumes/',
            'https://www.instagram.com/ezvalo_official/'
        ];
        
        const shopLinks = [
            'https://www.wybotpool.com/products/wybot-c1-cordless-robotic-pool-cleaner-gray-1',
            'https://www.tineco.us/products/floor-one-stretch-s6',
            'https://www.gooddiy.com/?fbclid=PAZXh0bgNhZW0CMTEAAadipd-75X0k5G_HGlZhgTOwYyBWBHl-YuIo75H55KsGZvvCYRMpoMzPsuRpeg_aem_Ts1n8GbHKMno8W7-6NrvZw',
            'https://prabhujisgifts.com/collections/incense-all-lines',
            'https://www.mustard.love/?fbclid=PAZXh0bgNhZW0CMTEAAadbCs7-vyYI6SXEWyIAbyiZv7kbkYpOYJmjHf9-SpiqS0CVXGq7C1rFP21LDg_aem_QxN9G2-kXTunQM7hALYbHg',
            'https://a.co/d/d8g4MOD',
            'https://www.amazon.com/luseta/s?k=luseta&fbclid=PAZXh0bgNhZW0CMTEAAad_pVc3W3PuIF1kOE3VRAK13OeJbhvIKa_h7obmtZgNkkIWubCTzTTlH3SjnQ_aem_ccU0JWP0hiFXZMK_QwmZ8w',
            'https://store.energizelab.com/products/eilik',
            'https://www.dossier.co',
            'https://a.co/d/7PknCn6'
        ];
        
        return Array.from({length: this.totalVideos}, (_, i) => ({
            id: i + 1,
            title: titles[i],
            description: descriptions[i],
            instagram: instagramLinks[i],
            shopLink: shopLinks[i]
        }));
    }
    
    init() {
        this.setupEventListeners();
        this.showInitialVideos();
        this.updateButtonStates();
    }
    
    setupEventListeners() {
        this.viewMoreBtn.addEventListener('click', () => this.showMoreVideos());
        this.viewLessBtn.addEventListener('click', () => this.showLessVideos());
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        
        // Add click listeners to all portfolio items
        this.portfolioItems.forEach((item, index) => {
            item.addEventListener('click', () => this.openModal(index + 1));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    showInitialVideos() {
        // Hide all videos first
        this.portfolioItems.forEach(item => {
            item.classList.add('hidden');
        });
        
        // Show only first 4 videos
        for (let i = 0; i < this.videosPerBatch && i < this.portfolioItems.length; i++) {
            this.portfolioItems[i].classList.remove('hidden');
        }
        
        this.currentBatch = 0;
    }
    
    showMoreVideos() {
        this.currentBatch++;
        const startIndex = this.currentBatch * this.videosPerBatch;
        const endIndex = Math.min(startIndex + this.videosPerBatch, this.totalVideos);
        
        // Show next 4 videos
        for (let i = startIndex; i < endIndex && i < this.portfolioItems.length; i++) {
            this.portfolioItems[i].classList.remove('hidden');
            this.portfolioItems[i].style.animation = `fadeInUp 0.6s ease ${(i - startIndex) * 0.1}s both`;
        }
        
        this.updateButtonStates();
    }
    
    showLessVideos() {
        // Hide all videos except the first 4
        this.portfolioItems.forEach((item, index) => {
            if (index >= this.videosPerBatch) {
                item.classList.add('hidden');
            }
        });
        
        this.currentBatch = 0;
        this.updateButtonStates();
        
        // Scroll back to portfolio section
        document.getElementById('portfolio').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
    
    updateButtonStates() {
        const visibleVideos = (this.currentBatch + 1) * this.videosPerBatch;
        
        // Update View More button
        if (visibleVideos >= this.totalVideos) {
            this.viewMoreBtn.style.display = 'none';
        } else {
            this.viewMoreBtn.style.display = 'inline-block';
        }
        
        // Update View Less button
        if (this.currentBatch === 0) {
            this.viewLessBtn.classList.add('hidden');
        } else {
            this.viewLessBtn.classList.remove('hidden');
        }
    }
    
    openModal(videoId) {
        const videoData = this.videoData[videoId - 1];
        
        if (!videoData) {
            console.error('Video data not found for ID:', videoId);
            return;
        }
        
        // Update modal content
        document.getElementById('modalTitle').textContent = videoData.title;
        document.getElementById('modalDescription').innerHTML = videoData.description.replace(/\n/g, '<br>');
        
        // Update links with proper error handling
        const instagramLink = document.getElementById('modalInstagram');
        const shopLink = document.getElementById('modalShop');
        
        if (instagramLink && videoData.instagram) {
            instagramLink.href = videoData.instagram;
            instagramLink.onclick = function(e) {
                e.stopPropagation();
                window.open(videoData.instagram, '_blank');
            };
        }
        
        if (shopLink && videoData.shopLink) {
            shopLink.href = videoData.shopLink;
            shopLink.onclick = function(e) {
                e.stopPropagation();
                window.open(videoData.shopLink, '_blank');
            };
        }
        
        // Update video source
        this.modalVideo.src = `assets/video (${videoId}).mp4`;
        
        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Auto-play video
        setTimeout(() => {
            this.modalVideo.play().catch(e => console.log('Auto-play prevented'));
        }, 300);
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Pause and reset video
        this.modalVideo.pause();
        this.modalVideo.currentTime = 0;
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VideoPortfolio();
});

// About Me Slideshow Functionality
class AboutSlideshow {
    constructor() {
        this.slides = document.querySelectorAll('.about-slideshow .slide');
        this.indicators = document.querySelectorAll('.about-slideshow .indicator');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // Add click listeners to indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Start auto-play
        this.startAutoPlay();
        
        // Pause on hover
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (slideshowContainer) {
            slideshowContainer.addEventListener('mouseenter', () => {
                this.stopAutoPlay();
            });
            
            slideshowContainer.addEventListener('mouseleave', () => {
                this.startAutoPlay();
            });
        }
    }
    
    goToSlide(index) {
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = index;
        
        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    startAutoPlay() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 4000); // Change slide every 4 seconds
    }
    
    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// Testimonials Slider Functionality
class TestimonialsSlider {
    constructor() {
        this.testimonials = document.querySelectorAll('.testimonial-item');
        this.indicators = document.querySelectorAll('.testimonial-indicators .indicator');
        this.prevBtn = document.getElementById('prevTestimonial');
        this.nextBtn = document.getElementById('nextTestimonial');
        this.currentTestimonial = 0;
        this.autoPlayInterval = null;
        this.init();
    }
    
    init() {
        if (this.testimonials.length === 0) return;
        
        // Add click listeners to navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevTestimonial();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextTestimonial();
            });
        }
        
        // Add click listeners to indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToTestimonial(index);
            });
        });
        
        // Start auto-play
        this.startAutoPlay();
        
        // Pause on hover
        const sliderContainer = document.querySelector('.testimonials-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                this.stopAutoPlay();
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                this.startAutoPlay();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevTestimonial();
            } else if (e.key === 'ArrowRight') {
                this.nextTestimonial();
            }
        });
    }
    
    goToTestimonial(index) {
        // Remove active class from current testimonial and indicator
        this.testimonials[this.currentTestimonial].classList.remove('active');
        this.indicators[this.currentTestimonial].classList.remove('active');
        
        // Update current testimonial
        this.currentTestimonial = index;
        
        // Add active class to new testimonial and indicator
        this.testimonials[this.currentTestimonial].classList.add('active');
        this.indicators[this.currentTestimonial].classList.add('active');
    }
    
    nextTestimonial() {
        const nextIndex = (this.currentTestimonial + 1) % this.testimonials.length;
        this.goToTestimonial(nextIndex);
    }
    
    prevTestimonial() {
        const prevIndex = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
        this.goToTestimonial(prevIndex);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextTestimonial();
        }, 6000); // Change testimonial every 6 seconds
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize both sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VideoPortfolio();
    new AboutSlideshow();
    new TestimonialsSlider();
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease both';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat-item, .portfolio-item, .testimonial-item, .brand-item').forEach(el => {
    observer.observe(el);
});

// Counter Animation for Stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
        const suffix = target.replace(/[0-9]/g, '');
        
        let current = 0;
        const increment = numericValue / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, 20);
    });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(statsSection);

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && scrolled < hero.offsetHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Brand Logo Click Events (placeholder - replace with actual links)
document.querySelectorAll('.brand-item').forEach((brand, index) => {
    brand.addEventListener('click', () => {
        // Replace with actual brand links
        console.log(`Clicked brand ${index + 1}`);
        // Example: window.open('https://instagram.com/brandname', '_blank');
    });
});

// Video Play/Pause on Hover
document.querySelectorAll('.portfolio-video').forEach(video => {
    video.addEventListener('mouseenter', () => {
        video.play();
    });
    
    video.addEventListener('mouseleave', () => {
        video.pause();
    });
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Add loading state to body
document.body.style.opacity = '0';

// Scroll to Top Button - Changed to Instagram Link
const instagramBtn = document.createElement('a');
instagramBtn.innerHTML = '<i class="fab fa-instagram"></i>';
instagramBtn.className = 'instagram-float';
instagramBtn.href = 'https://www.instagram.com/vvaishnavi04';
instagramBtn.target = '_blank';
instagramBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(225, 48, 108, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 1.5rem;
`;

document.body.appendChild(instagramBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        instagramBtn.style.opacity = '1';
        instagramBtn.style.visibility = 'visible';
    } else {
        instagramBtn.style.opacity = '0';
        instagramBtn.style.visibility = 'hidden';
    }
});

instagramBtn.addEventListener('mouseenter', () => {
    instagramBtn.style.transform = 'scale(1.1)';
    instagramBtn.style.boxShadow = '0 6px 20px rgba(225, 48, 108, 0.5)';
});

instagramBtn.addEventListener('mouseleave', () => {
    instagramBtn.style.transform = 'scale(1)';
    instagramBtn.style.boxShadow = '0 4px 12px rgba(225, 48, 108, 0.3)';
});
