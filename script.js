async function loadPublications() {
  const container = document.getElementById('publications-list');
  if (!container) return;

  try {
    const response = await fetch('publications.json');
    if (!response.ok) throw new Error('Could not load publications.json');
    const data = await response.json();
    const publications = Array.isArray(data.publications) ? data.publications.slice(0, 3) : [];

    if (!publications.length) throw new Error('No publications found');

    container.innerHTML = publications.map(pub => `
      <a class="publication-item" href="${pub.link}" target="_blank" rel="noreferrer">
        <div class="publication-title">${pub.title}</div>
        <div class="publication-meta">${pub.venue || ''}</div>
      </a>
    `).join('');
  } catch (error) {
    container.innerHTML = `
      <div class="publication-item">
        <div class="publication-title">Selected publications will appear here.</div>
        <div class="publication-meta">This file can be updated manually now, and later automated from DBLP.</div>
      </div>
    `;
  }
}

loadPublications();
