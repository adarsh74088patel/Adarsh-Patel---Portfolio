const certificatesData = [
    {
        title: "Class 10th Marksheet",
        issuer: "Uttar Pradesh Board",
        date: "2021 - 2022",
        description: "Secondary School Examination (Class 10th).",
        iconHtml: `<img alt="Issuer Icon" src="https://www.google.com/s2/favicons?domain=upmsp.edu.in&sz=128" style="width: 35px; height: 35px; object-fit: contain; border-radius: 8px;">`,
        rgb: "255, 152, 0",
        file: "Assets/10th Marksheet.jpeg"
    },
    {
        title: "Class 12th Marksheet",
        issuer: "Uttar Pradesh Board",
        date: "2025 - 2026",
        description: "Higher Secondary Examination (Science PCM).",
        iconHtml: `<img alt="Issuer Icon" src="https://www.google.com/s2/favicons?domain=upmsp.edu.in&sz=128" style="width: 35px; height: 35px; object-fit: contain; border-radius: 8px;">`,
        rgb: "156, 39, 176",
        file: "Assets/12th Marksheet.jpeg"
    },
    {
        title: "ADCA Certificate",
        issuer: "MKCL / Aptech",
        date: "2024",
        description: "Advanced Diploma in Computer Application.",
        iconHtml: `<img alt="Issuer Icon" src="https://www.google.com/s2/favicons?domain=mkcl.org&sz=128" style="width: 35px; height: 35px; object-fit: contain; border-radius: 8px;">`,
        rgb: "33, 150, 243",
        file: "Assets/ADCA Certificate.jpeg"
    },
    {
        title: "CCC Certificate",
        issuer: "NIELIT",
        date: "2024",
        description: "Course on Computer Concepts.",
        iconHtml: `<img alt="Issuer Icon" src="https://www.google.com/s2/favicons?domain=nielit.gov.in&sz=128" style="width: 35px; height: 35px; object-fit: contain; border-radius: 8px;">`,
        rgb: "255, 193, 7",
        file: "Assets/CCC Certificate.jpeg"
    },
    {
        title: "AI for Business Professionals",
        issuer: "HP",
        date: "2024",
        description: "Understanding AI applications in business contexts.",
        iconHtml: `<img alt="Issuer Icon" src="https://www.google.com/s2/favicons?domain=hp.com&sz=128" style="width: 35px; height: 35px; object-fit: contain; border-radius: 8px;">`,
        rgb: "0, 119, 181",
        file: "Assets/AI for Business Professionals.pdf"
    },
    {
        title: "Critical Thinking in the AI Era",
        issuer: "HP",
        date: "2024",
        description: "Developing critical thinking skills alongside artificial intelligence.",
        iconHtml: `<img alt="Issuer Icon" src="https://www.google.com/s2/favicons?domain=hp.com&sz=128" style="width: 35px; height: 35px; object-fit: contain; border-radius: 8px;">`,
        rgb: "255, 235, 59",
        file: "Assets/Critical Thinking in the AI Era.pdf"
    },
    {
        title: "Effective Presentations",
        issuer: "HP",
        date: "2024",
        description: "Skills and techniques for delivering effective presentations.",
        iconHtml: `<img alt="Issuer Icon" src="https://www.google.com/s2/favicons?domain=hp.com&sz=128" style="width: 35px; height: 35px; object-fit: contain; border-radius: 8px;">`,
        rgb: "76, 175, 80",
        file: "Assets/Effective Presentations.pdf"
    },
    {
        title: "Inventory Management",
        issuer: "HP",
        date: "2024",
        description: "Core concepts and best practices of inventory management.",
        iconHtml: `<img alt="Issuer Icon" src="https://www.google.com/s2/favicons?domain=hp.com&sz=128" style="width: 35px; height: 35px; object-fit: contain; border-radius: 8px;">`,
        rgb: "121, 85, 72",
        file: "Assets/Inventory Management.pdf"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    renderCertificates();
});

function renderCertificates() {
    const certGrid = document.getElementById('cert-grid');
    if (!certGrid) return;

    certGrid.innerHTML = '';

    certificatesData.forEach((cert, index) => {
        certGrid.innerHTML += `
            <div class="cert-card">
                <div class="cert-card-top">
                    <div class="cert-icon-box" style="background: rgba(${cert.rgb}, 0.15);">
                        ${cert.iconHtml}
                    </div>
                    <div class="cert-info">
                        <h3>${cert.title}</h3>
                        <span class="cert-issuer" style="color: rgb(${cert.rgb})">${cert.issuer}</span>
                    </div>
                    <div class="cert-medal" style="color: rgb(${cert.rgb})">
                        <i class="fas fa-certificate"></i>
                    </div>
                </div>
                <p class="cert-desc">${cert.description}</p>
                <div class="cert-card-bottom">
                    <div class="cert-date">
                        <i class="far fa-calendar-alt"></i> ${cert.date}
                    </div>
                    <button class="view-cert-btn" style="color: rgb(${cert.rgb})" onclick="openCertModal(${index})">
                        View Certificate <i class="fas fa-external-link-alt"></i>
                    </button>
                </div>
            </div>
        `;
    });

    // Special "Continuous Learning" card spanning remaining space
    certGrid.innerHTML += `
        <div class="cert-special-card">
            <div class="cert-special-content">
                <div class="cert-special-text">
                    <h3>Continuous Learning,<br>Continuous Growth</h3>
                    <p>I believe in learning every day and upgrading my skills to build a better tomorrow. The journey of knowledge never stops.</p>
                </div>
                <div class="cert-special-img">
                    <i class="fas fa-trophy"></i>
                </div>
            </div>
        </div>
    `;
}

function openCertModal(index) {
    const cert = certificatesData[index];
    document.getElementById('modal-cert-title').innerText = cert.title;

    const imgEl = document.getElementById('modal-cert-img');
    
    // Reset zoom state
    currentZoom = 1;
    imgEl.style.transform = `scale(${currentZoom})`;
    const zoomText = document.getElementById('cert-zoom-text');
    if (zoomText) zoomText.innerText = '100%';

    let iframeEl = document.getElementById('modal-cert-iframe');

    // Create iframe if it doesn't exist
    if (!iframeEl) {
        iframeEl = document.createElement('iframe');
        iframeEl.id = 'modal-cert-iframe';
        iframeEl.style.width = '100%';
        iframeEl.style.height = '70vh';
        iframeEl.style.border = 'none';
        iframeEl.style.borderRadius = '8px';
        imgEl.parentNode.appendChild(iframeEl);
    }

    document.getElementById('modal-cert-download').href = cert.file;

    // Handle PDF vs Image
    if (cert.file.toLowerCase().endsWith('.pdf')) {
        imgEl.style.display = 'none';
        iframeEl.style.display = 'block';
        iframeEl.src = cert.file;
    } else {
        iframeEl.style.display = 'none';
        imgEl.style.display = 'block';
        imgEl.src = cert.file;
    }

    document.getElementById('cert-modal').classList.add('active-modal');
}

function closeCertModal() {
    document.getElementById('cert-modal').classList.remove('active-modal');

    // Clear iframe src to stop loading if closed
    const iframeEl = document.getElementById('modal-cert-iframe');
    if (iframeEl) iframeEl.src = '';
    
    // Exit fullscreen if active
    const modalContent = document.querySelector('#cert-modal .cert-modal-content');
    if (modalContent && modalContent.classList.contains('fullscreen')) {
        toggleFullscreenCert();
    }
}

// --- Certificate Modal Zoom & Fullscreen ---
let currentZoom = 1;
const zoomStep = 0.25;
const maxZoom = 2.0;
const minZoom = 0.5;

function zoomCert(direction) {
    const imgEl = document.getElementById('modal-cert-img');
    const zoomText = document.getElementById('cert-zoom-text');
    
    // Only apply zoom if we are viewing an image (not PDF iframe)
    if (imgEl && imgEl.style.display !== 'none') {
        currentZoom += (direction * zoomStep);
        if (currentZoom > maxZoom) currentZoom = maxZoom;
        if (currentZoom < minZoom) currentZoom = minZoom;
        
        imgEl.style.transform = `scale(${currentZoom})`;
        imgEl.style.transition = 'transform 0.3s ease';
        if (zoomText) zoomText.innerText = `${Math.round(currentZoom * 100)}%`;
    }
}

function toggleFullscreenCert() {
    const modalContent = document.querySelector('#cert-modal .cert-modal-content');
    if (!modalContent) return;
    
    if (modalContent.classList.contains('fullscreen')) {
        modalContent.classList.remove('fullscreen');
        modalContent.style.width = '800px';
        modalContent.style.height = 'auto';
        modalContent.style.maxWidth = '90%';
        modalContent.style.margin = 'auto'; // Reset custom margin if any
        modalContent.style.borderRadius = '16px';
    } else {
        modalContent.classList.add('fullscreen');
        modalContent.style.width = '100vw';
        modalContent.style.height = '100vh';
        modalContent.style.maxWidth = '100vw';
        modalContent.style.margin = '0';
        modalContent.style.borderRadius = '0';
    }
}
