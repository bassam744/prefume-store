/* ============================================================
   MAISON AURORE — Shared JavaScript
   Handles: Navigation, Cart, Scroll Effects, Toast
   ============================================================ */

// ─── Cart State (persisted via localStorage) ─────────────────
let cart = JSON.parse(localStorage.getItem('ma_cart') || '[]');

function saveCart() {
  localStorage.setItem('ma_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(id, name, price, imgSrc) {
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name, price, imgSrc, qty: 1 });
  }
  saveCart();
  showToast(`<span class="toast-gold">${name}</span> added to cart`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else saveCart();
}

function getCartTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

// ─── Update All Cart UI Elements ─────────────────────────────
function updateCartUI() {
  const count = getCartCount();

  // Badge
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = count;
    badge.classList.toggle('visible', count > 0);
  });

  // Sidebar items
  const container = document.querySelector('.cart-items');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <p>Your cart is empty</p>
      </div>`;
  } else {
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.imgSrc}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1541643600914-78b084683702?w=140&q=80'">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty('${item.id}', -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
      </div>`).join('');
  }

  // Total
  const totalEl = document.querySelector('.cart-total-price');
  if (totalEl) totalEl.textContent = `$${getCartTotal().toFixed(2)}`;
}

// ─── Cart Sidebar Toggle ─────────────────────────────────────
function openCart() {
  document.querySelector('.cart-sidebar').classList.add('open');
  document.querySelector('.cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.querySelector('.cart-sidebar').classList.remove('open');
  document.querySelector('.cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── Toast Notification ──────────────────────────────────────
let toastTimeout;
function showToast(html) {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  toast.innerHTML = html;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ─── Navigation: Scroll Effect ───────────────────────────────
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const handleScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Hamburger / Mobile menu
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');
  const mobileClose = document.querySelector('.nav-mobile-close');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu?.classList.toggle('open');
    document.body.style.overflow = mobileMenu?.classList.contains('open') ? 'hidden' : '';
  });

  mobileClose?.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
  });

  // Cart button
  document.querySelectorAll('.nav-cart-btn').forEach(btn => {
    btn.addEventListener('click', openCart);
  });

  // Cart overlay / close
  document.querySelector('.cart-overlay')?.addEventListener('click', closeCart);
  document.querySelector('.cart-close')?.addEventListener('click', closeCart);

  // Checkout button
  document.querySelector('.btn-checkout')?.addEventListener('click', () => {
    if (cart.length === 0) { showToast('Your cart is empty'); return; }
    showToast('🎉 Order placed! Thank you for shopping with us.');
    cart = [];
    saveCart();
    closeCart();
  });

  // Mark active link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ─── Scroll Reveal Animations ─────────────────────────────────
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger effect for sibling elements
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
}

// ─── Init on DOM Ready ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  updateCartUI();
});