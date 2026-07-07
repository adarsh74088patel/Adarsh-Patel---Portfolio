let currentProjectIndex = 0;

const projectsData = [
    {
        title: "Personal Portfolio Website",
        image: "Assets/Project Screenshots/project 1/Home page.png",
        iconClass: "fas fa-code",
        colorTheme: "blue",
        badgeText: "Web Development",
        shortDesc: "A modern, fully responsive personal portfolio website with a clean UI, custom animations, and a project showcase.",
        longDesc: "This is my personal portfolio website, designed from scratch to highlight my skills, projects, and educational background. It features a custom tab navigation system, dynamic typing animations, floating labels in the contact form, and a dedicated modal for viewing project screenshots and certificates.",
        detailsLink: "#",
        codeLink: "#TODO-GITHUB-LINK",
        liveLink: "#TODO-LIVE-LINK",
        isFeatured: true,
        techTags: [
            { name: "HTML5", class: "html" },
            { name: "CSS3", class: "css" },
            { name: "Vanilla JS", class: "js" },
            { name: "Responsive UI", class: "design" }
        ],
        features: [
            "Floating Label Contact Form",
            "Custom Animations & Hover Effects",
            "Project Details & Screenshot Viewer",
            "Fully Responsive Across Devices",
            "Modern UI with Glassmorphism elements"
        ],
        screenshots: [
            { img: "Assets/Project Screenshots/project 1/Home page.png", caption: "Home Page" },
            { img: "Assets/Project Screenshots/project 1/About Page.png", caption: "About Page" },
            { img: "Assets/Project Screenshots/project 1/Skills page.png", caption: "Skills Page" },
            { img: "Assets/Project Screenshots/project 1/Projects page.png", caption: "Projects Page" },
            { img: "Assets/Project Screenshots/project 1/Education page.png", caption: "Education Page" },
            { img: "Assets/Project Screenshots/project 1/Certificates page.png", caption: "Certificates Page" },
            { img: "Assets/Project Screenshots/project 1/Contacct page.png", caption: "Contact Page" }
        ],
        info: [
            { label: "Project Type", icon: "far fa-window-maximize", value: "Web Portfolio" },
            { label: "Technologies Used", icon: "fas fa-layer-group", value: "HTML, CSS, JavaScript" },
            { label: "Duration", icon: "far fa-clock", value: "Ongoing" },
            { label: "Status", icon: "fas fa-link", value: "Completed", isBadge: true },
            { label: "Year", icon: "far fa-calendar-alt", value: "2026" }
        ],
        learned: [
            "Advanced CSS positioning and animations",
            "Creating floating input labels with CSS",
            "DOM manipulation using Vanilla JavaScript",
            "Building responsive and accessible UI components"
        ]
    }
];

const statsData = [
    {
        value: "3+",
        label: "Projects Completed",
        iconClass: "far fa-folder-open",
        colorTheme: "blue"
    },
    {
        value: "100%",
        label: "Dedicated Work",
        iconClass: "far fa-check-circle",
        colorTheme: "green"
    },
    {
        value: "500+",
        label: "Hours Invested",
        iconClass: "far fa-clock",
        colorTheme: "purple"
    },
    {
        value: "5+",
        label: "Technologies Used",
        iconClass: "fas fa-code",
        colorTheme: "orange"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    renderProjectsGrid();
    renderStatsBanner();
});

function renderProjectsGrid() {
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
        projectsGrid.innerHTML = '';
        projectsData.forEach((project, index) => {
            projectsGrid.innerHTML += `
                <div class="project-card">
                    <div class="project-img">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="project-content">
                        <div class="project-title-area">
                            <div class="project-icon bg-light-${project.colorTheme} color-${project.colorTheme}"><i class="${project.iconClass}"></i></div>
                            <h4>${index + 1}. ${project.title}</h4>
                        </div>
                        <div class="project-badge bg-light-${project.colorTheme} color-${project.colorTheme}">${project.badgeText}</div>
                        <p class="project-desc">${project.shortDesc}</p>
                        <div class="project-links">
                            <button onclick="openProjectDetails(${index})" class="btn-outline-blue" style="cursor:pointer; background:none;"><i class="far fa-eye"></i> View Details</button>
                            <a href="${project.codeLink}" class="btn-text-black"><i class="fab fa-github"></i> View Code</a>
                        </div>
                    </div>
                </div>
            `;
        });
    }
}

function renderStatsBanner() {
    const statsBanner = document.getElementById('projects-stats-banner');
    if (statsBanner) {
        statsBanner.innerHTML = '';
        statsData.forEach((stat, index) => {
            statsBanner.innerHTML += `
                <div class="stat-item">
                    <div class="stat-icon bg-light-${stat.colorTheme} color-${stat.colorTheme}"><i class="${stat.iconClass}"></i></div>
                    <div class="stat-text">
                        <h3 class="color-${stat.colorTheme}">${stat.value}</h3>
                        <p>${stat.label}</p>
                    </div>
                </div>
            `;
            if (index < statsData.length - 1) {
                statsBanner.innerHTML += `<div class="stat-divider"></div>`;
            }
        });
    }
}

function openProjectDetails(index) {
    currentProjectIndex = index;
    const project = projectsData[index];

    // Populate data
    const badge = document.getElementById('pd-badge');
    if (project.isFeatured) {
        badge.style.display = 'inline-flex';
    } else {
        badge.style.display = 'none';
    }

    document.getElementById('pd-title').innerText = project.title;
    document.getElementById('pd-short-desc').innerText = project.shortDesc;
    document.getElementById('pd-main-img').src = project.image;
    document.getElementById('pd-long-desc').innerText = project.longDesc;
    document.getElementById('pd-live-link').href = project.liveLink;
    document.getElementById('pd-github-link').href = project.codeLink;

    // Tech Tags
    const tagsContainer = document.getElementById('pd-tech-tags');
    tagsContainer.innerHTML = '';
    project.techTags.forEach(tag => {
        tagsContainer.innerHTML += `<span class="pd-tag ${tag.class}">${tag.name}</span>`;
    });

    // Features
    const featuresList = document.getElementById('pd-features-list');
    featuresList.innerHTML = '';
    project.features.forEach(feature => {
        featuresList.innerHTML += `<li><i class="fas fa-check-circle"></i> ${feature}</li>`;
    });

    // Screenshots
    const screenshotsContainer = document.getElementById('pd-screenshots');
    screenshotsContainer.innerHTML = '';
    project.screenshots.forEach(screenshot => {
        screenshotsContainer.innerHTML += `
            <div class="pd-screenshot-item" onclick="openScreenshotModal('${screenshot.img}', '${screenshot.caption}')" style="cursor: pointer;">
                <img src="${screenshot.img}" alt="${screenshot.caption}">
                <span>${screenshot.caption}</span>
            </div>
        `;
    });

    // Info
    const infoList = document.getElementById('pd-info-list');
    infoList.innerHTML = '';
    project.info.forEach(info => {
        let valueHtml = info.isBadge ? `<span class="pd-status-badge">${info.value}</span>` : `<span>${info.value}</span>`;
        infoList.innerHTML += `
            <li>
                <span><i class="${info.icon}"></i> ${info.label}</span>
                ${valueHtml}
            </li>
        `;
    });

    // Learned
    const learnedList = document.getElementById('pd-learned-list');
    learnedList.innerHTML = '';
    project.learned.forEach(item => {
        learnedList.innerHTML += `<li><i class="fas fa-check"></i> ${item}</li>`;
    });

    // Switch Tabs
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active-tab'));
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

    // Highlight projects nav link
    const projectsLink = Array.from(document.querySelectorAll('.nav-link')).find(link => link.getAttribute('href') === '#projects');
    if (projectsLink) projectsLink.classList.add('active');

    document.getElementById('project-details').classList.add('active-tab');
    window.scrollTo(0, 0);
}

function goBackToProjects() {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active-tab'));
    document.getElementById('projects').classList.add('active-tab');
    window.scrollTo(0, 0);
}

function navigateProject(direction) {
    let newIndex = currentProjectIndex + direction;
    if (newIndex < 0) {
        newIndex = projectsData.length - 1; // Loop to end
    } else if (newIndex >= projectsData.length) {
        newIndex = 0; // Loop to start
    }
    openProjectDetails(newIndex);
}

function openScreenshotModal(imgSrc, caption) {
    document.getElementById('modal-screenshot-img').src = imgSrc;
    document.getElementById('modal-screenshot-title').innerText = caption;
    document.getElementById('screenshot-modal').classList.add('active-modal');
}

function closeScreenshotModal() {
    document.getElementById('screenshot-modal').classList.remove('active-modal');
}
