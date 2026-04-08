let publicationCardTemplate = null;

async function loadPublicationCardTemplate() {
    if (publicationCardTemplate) return publicationCardTemplate;

    const response = await fetch('components/publication-card.html');
    if (!response.ok) {
        throw new Error(`HTTP error loading publication card template! status: ${response.status}`);
    }

    const html = await response.text();
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html.trim();
    publicationCardTemplate = wrapper.firstElementChild;
    return publicationCardTemplate;
}

function createPublicationCard(pub, template) {
    const card = template.cloneNode(true);

    const titleEl = card.querySelector('.publication-title');
    const authorsEl = card.querySelector('.publication-authors');
    const metaEl = card.querySelector('.publication-meta');
    const linkEl = card.querySelector('.publication-link');

    if (titleEl) {
        titleEl.textContent = pub.title || '';
    }

    if (authorsEl) {
        authorsEl.textContent = pub.authors || '';
    }

    if (metaEl) {
        const year = pub.year ? String(pub.year) : '';
        const venue = pub.venue || '';
        metaEl.textContent = [venue, year].filter(Boolean).join(' • ');
    }

    if (linkEl) {
        if (pub.link) {
            linkEl.href = pub.link;
            linkEl.target = '_blank';
            linkEl.rel = 'noopener noreferrer';
        } else {
            linkEl.style.display = 'none';
        }
    }

    return card;
}

document.addEventListener('DOMContentLoaded', async () => {
    const listContainer = document.getElementById('publications-list');
    const emptyState = document.getElementById('publications-empty');

    if (!listContainer) {
        return;
    }

    function renderPublications(publications, cardTemplate) {
        listContainer.innerHTML = '';

        if (!Array.isArray(publications) || publications.length === 0) {
            if (emptyState) {
                emptyState.classList.remove('d-none');
            }
            return;
        }

        if (emptyState) {
            emptyState.classList.add('d-none');
        }

        publications.forEach((pub) => {
            const card = createPublicationCard(pub, cardTemplate);
            listContainer.appendChild(card);
        });

        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    try {
        const response = await fetch('data/publications.json');
        if (!response.ok) {
            throw new Error('Failed to load publications');
        }

        const data = await response.json();
        const publications = Array.isArray(data) ? data : [];
        publications.sort((a, b) => {
            const yearA = Number(a.year) || 0;
            const yearB = Number(b.year) || 0;
            if (yearA !== yearB) {
                return yearB - yearA;
            }
            const titleA = (a.title || '').toLowerCase();
            const titleB = (b.title || '').toLowerCase();
            return titleA.localeCompare(titleB);
        });

        const cardTemplate = await loadPublicationCardTemplate();
        renderPublications(publications, cardTemplate);
    } catch (error) {
        console.error('Error loading publications:', error);
        const cardTemplate = await loadPublicationCardTemplate().catch(() => null);
        renderPublications([], cardTemplate);
    }
});

