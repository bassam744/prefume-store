/* ============================================================
   MAISON AURORE — Shared Components (Nav + Cart + Footer)
   Injected dynamically into each page
   ============================================================ */

const NAV_HTML = `
<!-- ═══ NAVIGATION ═══ -->
<nav class="nav">
  <div class="container nav-inner">

    <!-- Logo -->
    <a href="index.html" class="nav-logo">
      <span class="logo-main">Maison Aurore</span>
      <span class="logo-sub">Paris · Est. 1924</span>
    </a>

    <!-- Desktop Links -->
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="products.html">Collection</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="history.html">History</a></li>
    </ul>

    <!-- Actions -->
    <div class="nav-actions">
      <button class="nav-cart-btn" aria-label="Cart">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <span class="cart-badge"></span>
      </button>
      <a href="login.html" class="btn-gold" style="padding:0.6rem 1.4rem;font-size:0.65rem;">Enter</a>

      <!-- Mobile Hamburger -->
      <div class="nav-hamburger" aria-label="Menu" role="button">
        <span></span><span></span><span></span>
      </div>
    </div>
  </div>
</nav>

<!-- Mobile Full-Screen Menu -->
<div class="nav-mobile">
  <span class="nav-mobile-close">✕</span>
  <a href="index.html">Home</a>
  <a href="products.html">Collection</a>
  <a href="about.html">About</a>
  <a href="history.html">History</a>
  <a href="login.html" style="color:var(--gold);margin-top:1rem;font-size:1.2rem;">Enter</a>
</div>
`;

const CART_HTML = `
<!-- ═══ CART SIDEBAR ═══ -->
<div class="cart-overlay"></div>
<aside class="cart-sidebar">
  <div class="cart-header">
    <h3>Your Selection</h3>
    <button class="cart-close" aria-label="Close">✕</button>
  </div>
  <div class="cart-items">
    <!-- Items injected by JS -->
  </div>
  <div class="cart-footer">
    <div class="cart-total">
      <span>Total</span>
      <span class="cart-total-price">$0.00</span>
    </div>
    <button class="btn-checkout">Complete Order</button>
  </div>
</aside>
`;

const FOOTER_HTML = `
<!-- ═══ FOOTER ═══ -->
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <span class="logo-main">Maison Aurore</span>
        <span class="logo-sub">Paris · Est. 1924</span>
        <p>A century of olfactory artistry, crafted for those who understand that a great perfume is not merely worn — it is inhabited.</p>
      </div>
      <div class="footer-col">
        <h4>Explore</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="products.html">Collection</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="history.html">Our History</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Collections</h4>
        <ul>
          <li><a href="products.html">Eau de Parfum</a></li>
          <li><a href="products.html">Oud Collection</a></li>
          <li><a href="products.html">Florals</a></li>
          <li><a href="products.html">Limited Edition</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="#">12 Rue du Faubourg, Paris</a></li>
          <li><a href="#">+33 1 42 86 00 00</a></li>
          <li><a href="#">atelier@maisonaurore.fr</a></li>
          <li><a href="#">Appointments</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2024 Maison Aurore. All rights reserved.</p>
      <p>Privacy Policy · Terms of Service</p>
    </div>
  </div>
</footer>

<!-- Toast Notification -->
<div class="toast"></div>
`;

// Inject all shared components
document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML + CART_HTML);
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
});