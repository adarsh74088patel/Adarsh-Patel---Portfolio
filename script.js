// --- Preloader Logic ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            document.body.classList.remove('loading');
        }, 800); // 800ms delay to show the animation
    }
});

const links = document.querySelectorAll('.nav-link');
const tabs = document.querySelectorAll('.tab-content');
const hamburger = document.getElementById('hamburger');
const navUl = document.querySelector('.navbar ul');
const navResume = document.querySelector('.nav-resume');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navUl.classList.toggle('show');
        if (navResume) navResume.classList.toggle('show');
        hamburger.classList.toggle('active');
        
        // Toggle icon between bars and times
        const icon = hamburger.querySelector('i');
        if (hamburger.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

links.forEach(link => {
    link.addEventListener('click', () => {
        links.forEach(item => item.classList.remove('active'));
        tabs.forEach(tab => tab.classList.remove('active-tab'));
        
        link.classList.add('active');
        const target = document.getElementById(link.dataset.tab);
        if (target) {
            target.classList.add('active-tab');
        }
        
        // Close mobile menu when a link is clicked
        if (navUl && navUl.classList.contains('show')) {
            navUl.classList.remove('show');
            if (navResume) navResume.classList.remove('show');
            if (hamburger) {
                hamburger.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// --- Skills Data and Generation ---
const skillsData = [
    {
        title: "Frontend",
        icon: "fas fa-desktop",
        colorClass: "color-blue",
        bgClass: "bg-blue",
        footerIcon: "fas fa-star",
        footerText: "Building responsive and user-friendly web interfaces.",
        skills: [
            { name: "HTML5", percentage: 95 },
            { name: "CSS3", percentage: 90 },
            { name: "JavaScript", percentage: 85 },
            { name: "Responsive Design", percentage: 90 }
        ]
    },
    {
        title: "Programming",
        icon: "fas fa-code",
        colorClass: "color-green",
        bgClass: "bg-green",
        footerIcon: "fas fa-trophy",
        footerText: "Strong foundation in programming and problem-solving.",
        skills: [
            { name: "Python", percentage: 90 },
            { name: "C Language", percentage: 80 }
        ]
    },
    {
        title: "AI / ML",
        icon: "fas fa-brain",
        colorClass: "color-purple",
        bgClass: "bg-purple",
        footerIcon: "fas fa-star",
        footerText: "Learning and building intelligent solutions with AI.",
        skills: [
            { name: "Python", percentage: 85 },
            { name: "NumPy", percentage: 80 },
            { name: "Pandas", percentage: 75 },
            { name: "Scikit-Learn", percentage: 70 },
            { name: "TensorFlow", percentage: 65 }
        ]
    },
    {
        title: "Tools",
        icon: "fas fa-cog",
        colorClass: "color-orange",
        bgClass: "bg-orange",
        footerIcon: "fas fa-rocket",
        footerText: "Using modern tools to build, test and deploy efficiently.",
        skills: [
            { name: "Git", percentage: 90 },
            { name: "GitHub", percentage: 95 },
            { name: "VS Code", percentage: 90 },
            { name: "Chrome DevTools", percentage: 80 }
        ]
    }
];

const otherStrengthsData = [
    { name: "Problem Solver", icon: "fas fa-puzzle-piece" },
    { name: "Quick Learner", icon: "far fa-lightbulb" },
    { name: "Adaptable", icon: "fas fa-user-cog" },
    { name: "Team Player", icon: "fas fa-users" },
    { name: "Goal Oriented", icon: "fas fa-bullseye" }
];

const skillsContainer = document.getElementById('skills-cards-wrapper');
if (skillsContainer) {
    skillsData.forEach(card => {
        let skillItemsHTML = '';
        card.skills.forEach(skill => {
            skillItemsHTML += `
                <div class="skill-item ${card.colorClass}">
                    <div class="skill-info"><span>${skill.name}</span></div>
                    <div class="progress-bar"><div class="progress" style="width: ${skill.percentage}%;"></div></div>
                </div>
            `;
        });

        skillsContainer.innerHTML += `
            <div class="skill-card">
                <div class="skill-card-header ${card.colorClass}">
                    <div class="skill-icon"><i class="${card.icon}"></i></div>
                    <h3>${card.title}</h3>
                </div>
                <div class="skill-list">
                    ${skillItemsHTML}
                </div>
                <div class="skill-footer ${card.bgClass}">
                    <div class="footer-icon"><i class="${card.footerIcon}"></i></div>
                    <p>${card.footerText}</p>
                </div>
            </div>
        `;
    });
}

const strengthsContainer = document.getElementById('strengths-list');
if (strengthsContainer) {
    otherStrengthsData.forEach(strength => {
        strengthsContainer.innerHTML += `
            <div class="strength-item">
                <i class="${strength.icon}"></i>
                <span>${strength.name}</span>
            </div>
        `;
    });
}

// --- Contact Form Animation ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        
        // Use EmailJS to send the form
        // TODO: Replace with your actual Service ID and Template ID
        emailjs.sendForm('TODO-YOUR-SERVICE-ID', 'TODO-YOUR-TEMPLATE-ID', this)
            .then(function() {
                btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
                btn.style.background = '#10b981'; // Success green
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, function(error) {
                console.error('EmailJS error:', error);
                btn.innerHTML = '<i class="fas fa-times"></i> Failed to Send';
                btn.style.background = '#ef4444'; // Error red
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            });
    });
    
    // Send another message logic
    const sendAnotherBtn = document.getElementById('sendAnotherBtn');
    if (sendAnotherBtn) {
        sendAnotherBtn.addEventListener('click', () => {
            document.getElementById('successMessage').classList.remove('active');
        });
    }
}

// --- Anchor Link Navigation Logic ---
// Handle all anchor links (like View Projects, Contact Me, Footer links) that point to tabs
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        if (!targetId) return; // Ignore bare '#' links
        
        const targetTabLink = document.querySelector(`.nav-link[data-tab="${targetId}"]`);
        
        // If a corresponding tab exists, switch to it
        if (targetTabLink) {
            e.preventDefault();
            targetTabLink.click(); // Trigger the tab switch
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll back to top
        }
    });
});

// --- Typewriter Effect ---
const words = ["B.Tech AI/ML Student", "Python Developer", "Frontend Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextElement = document.getElementById("typed-text");

function type() {
    if (!typedTextElement) return;
    
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        // Remove characters
        typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Add characters
        typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100; // Slower typing, faster erasing
    
    if (!isDeleting && charIndex === currentWord.length) {
        // Pause at full word
        typeSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        // Pause before typing next word
        typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
}

// Start typing animation once DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000); // Start typing after 1 second delay
});

// --- Resume Modal Logic ---
function openResumeModal() {
    const modal = document.getElementById('resume-modal');
    if (modal) {
        modal.classList.add('active-modal');
    }
}

function closeResumeModal() {
    const modal = document.getElementById('resume-modal');
    if (modal) {
        modal.classList.remove('active-modal');
    }
}
