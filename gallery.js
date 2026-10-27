/* =============================================
   PROJECT GALLERY LOGIC
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  // --- Data for all projects ---
  const projectsData = {
    'stockpro': {
      title: 'StockPro ? Gestion de Stock Full Stack',
      description: 'Projet de Licence 3 Informatique. Application web de gestion centralis?e des stocks, achats, ventes, alertes et valorisation financi?re. Architecture d?coupl?e Front-end React (Vite) et Back-end Node.js / Express avec API REST, mod?le relationnel Merise ? 8 entit?s, contr?le d\'acc?s par r?les (RBAC), s?curit? bcrypt & JWT, et transactions atomiques sans stock n?gatif.',
      github: 'https://github.com/aina210804/stockpro',
      images: [
        'assets/stockpro/1.jpg',
        'assets/stockpro/2.jpg',
        'assets/stockpro/3.jpg',
        'assets/stockpro/4.jpg',
        'assets/stockpro/5.jpg',
        'assets/stockpro/6.jpg'
      ]
    },

    'gestion-stock': {
      title: 'Gestion de stock — Application web',
      description: 'Application complète de gestion de stock de consommables. Backend Node.js/Express, base SQLite, frontend JavaScript vanilla. Authentification par rôles, tableau de bord avec KPIs, gestion des articles, mouvements, alertes, inventaire, fournisseurs, commandes, prévisions et rapports.',
      github: 'https://github.com/aina210804/gestion-stock',
      images: [
        'assets/gestion-stock/1.jpg',
        'assets/gestion-stock/2.jpg',
        'assets/gestion-stock/3.jpg',
        'assets/gestion-stock/4.jpg',
        'assets/gestion-stock/5.jpg',
        'assets/gestion-stock/6.jpg',
        'assets/gestion-stock/7.jpg',
        'assets/gestion-stock/8.jpg'
      ]
    },
        'flamora': {
      title: 'FLAMORA — Branding',
      description: 'Création de l\'identité visuelle pour la marque FLAMORA. Logos, typographie, et déclinaisons.',
      images: [
        'assets/flamora/1.jpg',
        'assets/flamora/2.jpg',
        'assets/flamora/3.jpg',
        'assets/flamora/4.jpg',
        'assets/flamora/5.jpg',
        'assets/flamora/6.jpg',
        'assets/flamora/7.jpg',
        'assets/flamora/8.jpg',
        'assets/flamora/9.jpg',
        'assets/flamora/10.jpg',
        'assets/flamora/11.jpg',
        'assets/flamora/12.jpg'

      ]
    },
    'orgia': {
      title: 'ORGIA — Branding',
      description: 'Conception de l\'identité visuelle pour la marque ORGIA. Choix des couleurs et supports.',
      images: [
        'assets/orgia/1.jpg',
        'assets/orgia/2.jpg',
        'assets/orgia/3.jpg',
        'assets/orgia/4.jpg',
        'assets/orgia/5.jpg',
        'assets/orgia/6.jpg',
        'assets/orgia/7.jpg',
        'assets/orgia/8.jpg',
        'assets/orgia/9.jpg',
        'assets/orgia/10.jpg',
        'assets/orgia/11.jpg',
        'assets/orgia/12.jpg',
        'assets/orgia/13.jpg'


      ]
    },
    'communication': {
      title: 'Supports de communication',
      description: 'Création de roll-up, mockups, catalogues et autres supports de présentation.',
      images: [
        'assets/communication/1.jpg',
        'assets/communication/2.jpg',
        'assets/communication/3.jpg',
        'assets/communication/4.jpg',
        'assets/communication/5.jpg'

      ]
    },
      };

  // --- Parse URL parameter ---
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');

  const titleEl = document.getElementById('projectTitle');
  const descEl = document.getElementById('projectDescription');
  const galleryEl = document.getElementById('galleryContainer');
  const loaderEl = document.getElementById('loader');

  // --- Load Project Data ---
  if (projectId && projectsData[projectId]) {
    const project = projectsData[projectId];

    // Set text
    titleEl.textContent = project.title;
    descEl.textContent = project.description;

    // Show GitHub link if project has one
    if (project.github) {
      const githubLink = document.createElement('a');
      githubLink.href = project.github;
      githubLink.target = '_blank';
      githubLink.rel = 'noopener noreferrer';
      githubLink.style.cssText = 'display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: linear-gradient(135deg, #333, #555); color: #fff; border-radius: 100px; font-size: 0.95rem; font-weight: 600; text-decoration: none; margin-top: 16px; transition: all 0.3s ease;';
      githubLink.innerHTML = '<i class="fa-brands fa-github"></i> Voir le code sur GitHub <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.8rem; margin-left: 4px;"></i>';
      githubLink.onmouseover = function() { this.style.background = 'linear-gradient(135deg, #FF6B35, #e55a2b)'; this.style.transform = 'translateY(-2px)'; };
      githubLink.onmouseout = function() { this.style.background = 'linear-gradient(135deg, #333, #555)'; this.style.transform = 'translateY(0)'; };
      descEl.parentElement.appendChild(githubLink);
    }

    // Clear loader
    loaderEl.style.display = 'none';

    // Render images
    project.images.forEach(imgSrc => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'gallery-item';

      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = project.title;
      // Handle loading error to display a placeholder if image doesn't exist yet
      img.onerror = function () {
        this.onerror = null; // prevent infinite loop
        // Provide a placeholder generated via placehold.co for demo purposes
        this.src = `https://placehold.co/1000x600/12121a/FF6B35?text=Image+en+cours+d'ajout\\n(${imgSrc})`;
      };

      itemDiv.appendChild(img);
      galleryEl.appendChild(itemDiv);
    });

    // --- Scroll Animation for Gallery Items ---
    const galleryItems = document.querySelectorAll('.gallery-item');

    const galleryObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          galleryObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all items
    galleryItems.forEach(item => {
      galleryObserver.observe(item);
    });

  } else {
    // Project not found
    titleEl.textContent = 'Projet introuvable';
    descEl.textContent = 'Le projet que vous cherchez n\'existe pas ou a été déplacé.';
    loaderEl.style.display = 'none';
  }
});
