const galleryEl = document.getElementById("gallery");
galleryEl.innerHTML = paintings.map(p => `
  <div class="gallery-card">
    <div class="image-wrapper">
      <img src="${p.image}" alt="${p.title}">
      <span class="price-tag">$${p.price}</span>
    </div>

    <div class="card-content">
      <h3>${p.title}</h3>
      <p>${p.short}</p>

      <a href="painting.html?id=${p.id}" class="view-btn">
        View Details →
      </a>
    </div>
  </div>
`).join("");

