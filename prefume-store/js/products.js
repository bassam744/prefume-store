/* ============================================================
   MAISON AURORE — Products Page JS
   Handles: product data, render, filter, search, sort
   ============================================================ */

// ─── Product Catalog ─────────────────────────────────────────
const PRODUCTS = [
  {
    id: 'rose-absolue',
    name: 'Rose Absolue',
    family: 'Floral · Oriental',
    category: 'floral',
    price: 320,
    size: '100ml Eau de Parfum',
    badge: 'bestseller',
    badgeLabel: 'Best Seller',
    notes: ['Rose', 'Oud', 'Musk'],
    img: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=80',
  },
  {
    id: 'oud-nuit',
    name: 'Oud Nuit Intense',
    family: 'Woody · Oud',
    category: 'oud',
    price: 480,
    size: '75ml Eau de Parfum',
    badge: 'limited',
    badgeLabel: 'Limited',
    notes: ['Oud', 'Amber', 'Leather'],
    img: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80',
  },
  {
    id: 'ambre-dore',
    name: 'Ambre Doré',
    family: 'Amber · Vanilla',
    category: 'oriental',
    price: 290,
    size: '100ml Eau de Parfum',
    badge: null,
    notes: ['Amber', 'Vanilla', 'Benzoin'],
    img: 'https://images.unsplash.com/photo-1610461888750-10bfc601b4a6?w=600&q=80',
  },
  {
    id: 'iris-imperial',
    name: 'Iris Impérial',
    family: 'Floral · Powdery',
    category: 'floral',
    price: 410,
    size: '50ml Eau de Parfum',
    badge: 'new',
    badgeLabel: 'New',
    notes: ['Iris', 'Violet', 'Sandalwood'],
    img: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80',
  },
  {
    id: 'vetiver-noir',
    name: 'Vétiver Noir',
    family: 'Woody · Smoky',
    category: 'woody',
    price: 355,
    size: '100ml Eau de Parfum',
    badge: null,
    notes: ['Vetiver', 'Cedar', 'Smoke'],
    img: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80',
  },
  {
    id: 'jasmin-etoile',
    name: 'Jasmin Étoile',
    family: 'Floral · Fresh',
    category: 'floral',
    price: 275,
    size: '75ml Eau de Parfum',
    badge: 'bestseller',
    badgeLabel: 'Best Seller',
    notes: ['Jasmine', 'Neroli', 'Musk'],
    img: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&q=80',
  },
  {
    id: 'aqua-celeste',
    name: 'Aqua Céleste',
    family: 'Fresh · Marine',
    category: 'fresh',
    price: 220,
    size: '100ml Eau de Toilette',
    badge: 'new',
    badgeLabel: 'New',
    notes: ['Sea Spray', 'Citrus', 'Driftwood'],
    img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80',
  },
  {
    id: 'bois-sacre',
    name: 'Bois Sacré',
    family: 'Woody · Resinous',
    category: 'woody',
    price: 395,
    size: '50ml Eau de Parfum',
    badge: 'limited',
    badgeLabel: 'Limited',
    notes: ['Sandalwood', 'Incense', 'Amber'],
    img: 'https://images.unsplash.com/photo-1571781418606-70fcdecb8c15?w=600&q=80',
  },
  {
    id: 'oud-royal',
    name: 'Oud Royal',
    family: 'Oud · Spicy',
    category: 'oud',
    price: 560,
    size: '50ml Extrait de Parfum',
    badge: 'limited',
    badgeLabel: 'Limited',
    notes: ['Oud', 'Saffron', 'Rose'],
    img: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600&q=80',
  },
  {
    id: 'soleil-blanc',
    name: 'Soleil Blanc',
    family: 'Fresh · Floral',
    category: 'fresh',
    price: 260,
    size: '100ml Eau de Parfum',
    badge: null,
    notes: ['White Tea', 'Magnolia', 'Cedar'],
    img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80',
  },
];

// ─── State ────────────────────────────────────────────────────
let activeFilter = 'all';
let wishlist = new Set(JSON.parse(localStorage.getItem('ma_wishlist') || '[]'));

// ─── Render Products ─────────────────────────────────────────
function renderProducts(list) {
  const grid = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');
  const count = document.getElementById('resultsCount');

  count.textContent = `Showing ${list.length} fragrance${list.length !== 1 ? 's' : ''}`;

  if (list.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';

  grid.innerHTML = list.map((p, i) => `
    <article class="product-card" style="animation-delay:${i * 60}ms">
      <div class="product-img-wrap">
        <!-- Product image -->
        <img
          src="${p.img}"
          alt="${p.name}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80'"
        >

        <!-- Badge (new / limited / bestseller) -->
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badgeLabel}</span>` : ''}

        <!-- Wishlist button -->
        <button
          class="btn-wishlist ${wishlist.has(p.id) ? 'active' : ''}"
          onclick="toggleWishlist('${p.id}', this)"
          aria-label="Wishlist"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="${wishlist.has(p.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        <!-- Quick-add hover bar -->
        <div class="product-quick">
          <button class="btn-add" onclick="addToCart('${p.id}','${p.name}',${p.price},'${p.img}')">
            <span>Add to Cart — $${p.price}</span>
          </button>
        </div>
      </div>

      <div class="product-info">
        <span class="product-family">${p.family}</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-size">${p.size}</p>

        <div class="product-footer">
          <span class="product-price">$${p.price}</span>
          <div class="product-notes">
            ${p.notes.map(n => `<span class="note-tag">${n}</span>`).join('')}
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

// ─── Filter + Search + Sort ───────────────────────────────────
function filterProducts() {
  const query  = document.getElementById('searchInput').value.toLowerCase().trim();
  const sort   = document.getElementById('sortSelect').value;

  let list = PRODUCTS.filter(p => {
    const matchCategory = activeFilter === 'all' || p.category === activeFilter;
    const matchSearch   = !query ||
      p.name.toLowerCase().includes(query) ||
      p.family.toLowerCase().includes(query) ||
      p.notes.some(n => n.toLowerCase().includes(query));
    return matchCategory && matchSearch;
  });

  // Sort
  if (sort === 'price-asc')  list.sort((a,b) => a.price - b.price);
  if (sort === 'price-desc') list.sort((a,b) => b.price - a.price);
  if (sort === 'name')       list.sort((a,b) => a.name.localeCompare(b.name));

  renderProducts(list);
}

function setFilter(cat, btn) {
  activeFilter = cat;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  filterProducts();
}

function resetFilters() {
  activeFilter = 'all';
  document.getElementById('searchInput').value = '';
  document.getElementById('sortSelect').value = 'default';
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  document.querySelector('.pill[data-filter="all"]').classList.add('active');
  filterProducts();
}

// ─── Wishlist Toggle ──────────────────────────────────────────
function toggleWishlist(id, btn) {
  if (wishlist.has(id)) {
    wishlist.delete(id);
    btn.classList.remove('active');
    btn.querySelector('path').setAttribute('fill', 'none');
    showToast('Removed from wishlist');
  } else {
    wishlist.add(id);
    btn.classList.add('active');
    btn.querySelector('path').setAttribute('fill', 'currentColor');
    showToast('Added to <span class="toast-gold">wishlist</span>');
  }
  localStorage.setItem('ma_wishlist', JSON.stringify([...wishlist]));
}

// ─── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  filterProducts();
});