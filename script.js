const siteRoot = window.location.hostname.endsWith("github.io") ? "/casa-huerta-web/" : "/";

if (!document.querySelector('link[rel~="icon"]')) {
  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/png";
  favicon.href = `${siteRoot}assets/images/logo.png?v=2`;
  document.head.appendChild(favicon);
}

class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header inner-header scrolled" data-header>
        <a class="brand" href="${siteRoot}" aria-label="Casa Huerta — početna">
          <img class="brand-logo" src="${siteRoot}assets/images/logo.png?v=2" alt="Casa Huerta">
        </a>
        <button class="menu-button" type="button" aria-expanded="false" aria-controls="main-nav" data-menu-button>
          <span></span><span></span><span></span><span class="sr-only">Otvori izbornik</span>
        </button>
        <nav class="main-nav" id="main-nav" data-nav>
          <a href="${siteRoot}smjestaj/">Smještaj</a><a href="${siteRoot}jacuzzi/">Jacuzzi</a>
          <a href="${siteRoot}dozivljaji/">Doživljaji</a><a href="${siteRoot}lokacija/">Lokacija</a>
          <a href="${siteRoot}galerija/">Galerija</a><a href="${siteRoot}kontakt/">Kontakt</a>
          <div class="languages" aria-label="Odabir jezika"><button class="active" type="button">HR</button><button type="button">EN</button><button type="button">DE</button></div>
          <a class="button button-small" href="${siteRoot}rezervacija/">Provjeri dostupnost</a>
        </nav>
      </header>`;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <div class="footer-brand"><img class="footer-logo" src="${siteRoot}assets/images/logo.png?v=2" alt="Casa Huerta"><small>Priroda, mir i točka.</small></div>
        <div class="footer-links"><a href="tel:+385993846879">+385 99 3846 879</a><a href="https://www.instagram.com/casahuertakarlovac" target="_blank" rel="noreferrer">Instagram</a><a href="https://wa.me/385993846879" target="_blank" rel="noreferrer">WhatsApp</a></div>
        <p>© ${new Date().getFullYear()} Casa Huerta. Sva prava pridržana.</p>
      </footer>`;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const bookingForm = document.querySelector("[data-booking-form]");

const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 35);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(bookingForm);
  const message = [
    "Pozdrav! Zanima me boravak u Casa Huerti.",
    `Dolazak: ${form.get("arrival")}`,
    `Odlazak: ${form.get("departure")}`,
    `Broj gostiju: ${form.get("guests")}`,
    "Molim vas informaciju o dostupnosti i cijeni."
  ].join("\n");

  window.open(`https://wa.me/385993846879?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
