const projectsData = [
    {
        id: 1,
        title: "Portfolio Website",
        category: "Web Development",
        badgeText: "Web Development",
        badgeColor: "blue",
        isFeatured: true,
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
        image: "Assets/Adarsh.png",
        fullDescription: "A modern and responsive personal portfolio website to showcase my skills, projects and achievements.",
        description: "Modern responsive portfolio website with clean UI and tab navigation.",
        tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
        liveDemoLink: "#",
        viewCodeLink: "https://github.com/adarsh74088patel",
        aboutProject: "This portfolio website is designed and developed to present my skills, projects, certificates and education in a clean and professional way. It is fully responsive and works smoothly on all devices.",
        keyFeatures: [
            "Fully Responsive Design",
            "Modern and Clean UI",
            "Tab Navigation System",
            "Resume Download Option",
            "Certificate Viewer with Modal",
            "Project Details Page",
            "Dark/Light Mode Toggle",
            "Contact Form with Validation"
        ],
        screenshots: [
            { src: "Assets/Portfolio.png", title: "Home Page" }
        ],
        projectInfo: {
            type: "Web Application",
            technologies: "HTML5, CSS3, JavaScript",
            duration: "Ongoing",
            status: "In Progress",
            year: "2024"
        },
        whatILearned: [
            "Improved my HTML, CSS and JavaScript skills",
            "Learned responsive web design techniques",
            "Implemented tab based navigation",
            "Enhanced UI/UX design understanding",
            "Improved problem solving and debugging skills"
        ]
    }
];

function renderProjects(filter = 'All') {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const filteredProjects = filter === 'All'
        ? projectsData
        : projectsData.filter(p => p.category === filter);

    filteredProjects.forEach(project => {
        let iconBgClass = 'icon-bg-blue';
        let badgeClass = 'badge-blue';
        if (project.badgeColor === 'green') { iconBgClass = 'icon-bg-green'; badgeClass = 'badge-green'; }
        if (project.badgeColor === 'purple') { iconBgClass = 'icon-bg-purple'; badgeClass = 'badge-purple'; }
        if (project.badgeColor === 'orange') { iconBgClass = 'icon-bg-orange'; badgeClass = 'badge-orange'; }

        const cardHTML = `
            <div class="project-card">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div class="image-placeholder" style="display: none;">
                        <span>Project Preview</span>
                    </div>
                </div>
                
                <div class="project-content">
                    <div class="project-header">
                        <div class="project-icon ${iconBgClass}">
                            ${project.icon}
                        </div>
                        <div class="project-title-area">
                            <h4>${project.title}</h4>
                            <span class="project-badge ${badgeClass}">${project.badgeText}</span>
                        </div>
                    </div>
                    
                    <p class="project-desc">${project.description}</p>
                    
                    <div class="project-footer">
                        <button class="btn-project btn-view-details" data-id="${project.id}">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            View Details
                        </button>
                        <a href="${project.viewCodeLink}" class="btn-project btn-view-code" target="_blank">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                            View Code
                        </a>
                    </div>
                </div>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects('All');

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const filter = e.target.getAttribute('data-filter');
            renderProjects(filter);
        });
    });

    // Modal Logic
    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-view-details')) {
            const btn = e.target.closest('.btn-view-details');
            const projectId = parseInt(btn.getAttribute('data-id'));
            openProjectModal(projectId);
        }
        
        if (e.target.closest('.modal-close-btn') || e.target.classList.contains('modal-overlay')) {
            closeProjectModal();
        }
    });
});

function openProjectModal(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project) return;

    const modalBody = document.getElementById('project-modal-body');
    if (!modalBody) return;

    let iconBgClass = 'icon-bg-blue';
    let badgeClass = 'badge-blue';
    if (project.badgeColor === 'green') { iconBgClass = 'icon-bg-green'; badgeClass = 'badge-green'; }
    if (project.badgeColor === 'purple') { iconBgClass = 'icon-bg-purple'; badgeClass = 'badge-purple'; }
    if (project.badgeColor === 'orange') { iconBgClass = 'icon-bg-orange'; badgeClass = 'badge-orange'; }

    const tagsHtml = project.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('');
    
    const keyFeaturesHtml = project.keyFeatures && project.keyFeatures.length 
        ? `<div class="modal-section">
               <h4>Key Features</h4>
               <ul>${project.keyFeatures.map(f => `<li>${f}</li>`).join('')}</ul>
           </div>` 
        : '';
        
    const whatILearnedHtml = project.whatILearned && project.whatILearned.length 
        ? `<div class="modal-section">
               <h4>What I Learned</h4>
               <ul>${project.whatILearned.map(l => `<li>${l}</li>`).join('')}</ul>
           </div>` 
        : '';

    modalBody.innerHTML = `
        <div class="modal-cover">
            <img src="${project.image}" alt="${project.title}">
            <div class="modal-cover-overlay"></div>
            <div class="modal-header-floating">
                <div class="modal-icon ${iconBgClass}">
                    ${project.icon}
                </div>
                <div class="modal-title-area">
                    <h3>${project.title}</h3>
                    <span class="project-badge ${badgeClass}">${project.badgeText}</span>
                </div>
            </div>
        </div>

        <div class="modal-body-content">
            <div class="modal-tags">
                ${tagsHtml}
            </div>

            <div class="modal-grid">
                <div class="modal-main">
                    <div class="modal-section">
                        <h4>About Project</h4>
                        <p>${project.aboutProject || project.fullDescription}</p>
                    </div>
                    ${keyFeaturesHtml}
                </div>
                <div class="modal-sidebar">
                    <div class="modal-info-card">
                        <h4>Project Info</h4>
                        <div class="info-item"><span>Type:</span> ${project.projectInfo.type}</div>
                        <div class="info-item"><span>Status:</span> ${project.projectInfo.status}</div>
                        <div class="info-item"><span>Duration:</span> ${project.projectInfo.duration}</div>
                        <div class="info-item"><span>Year:</span> ${project.projectInfo.year}</div>
                    </div>
                    ${whatILearnedHtml}
                    
                    <div class="modal-links">
                        <a href="${project.liveDemoLink}" class="btn btn-primary" target="_blank">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px; margin-right: 5px;">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                            Live Demo
                        </a>
                        <a href="${project.viewCodeLink}" class="btn btn-secondary" target="_blank">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px; margin-right: 5px;">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                            View Code
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    const modalOverlay = document.getElementById('project-modal');
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
}

function closeProjectModal() {
    const modalOverlay = document.getElementById('project-modal');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}
