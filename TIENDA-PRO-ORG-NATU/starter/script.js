// ============================================
// TODO 1: Crear el objeto de datos de tu dominio
// ============================================

const entityData = {
  name: 'NaturalOrganic',
  title: 'Tienda de Productos Orgánicos y Naturales',
  description: 'Tienda especializada en productos 100% orgánicos y naturales, cultivados sin químicos ni pesticidas.',
  location: 'Bogotá, Colombia',
  contact: {
    email: 'ventas@naturalorganic.com',
    phone: '+57 300 123 4567'
  },
  items: [
    { name: 'Lechuga Orgánica', level: 95, emoji: '🥬' },
    { name: 'Tomate Natural', level: 88, emoji: '🍅' },
    { name: 'Zanahoria Cruda', level: 92, emoji: '🥕' },
    { name: 'Brócoli Fresco', level: 90, emoji: '🥦' },
    { name: 'Manzana Roja', level: 87, emoji: '🍎' },
    { name: 'Plátano Orgánico', level: 85, emoji: '🍌' }
  ],
  links: [
    { platform: 'Facebook', url: 'https://facebook.com', icon: '📘' },
    { platform: 'Instagram', url: 'https://instagram.com', icon: '📷' },
    { platform: 'WhatsApp', url: 'https://whatsapp.com', icon: '💬' }
  ],
  stats: {
    total: 6,
    active: 6,
    rating: 4.8,
    custom: 150
  }
};

// ============================================
// TODO 2: Referencias a elementos del DOM
// ============================================

const userName = document.getElementById('userName');
const userTitle = document.getElementById('userTitle');
const userLocation = document.getElementById('userLocation');
const userBio = document.getElementById('userBio');
const userEmail = document.getElementById('userEmail');
const userPhone = document.getElementById('userPhone');
const productsList = document.getElementById('productsList');
const socialLinks = document.getElementById('socialLinks');
const statsContainer = document.getElementById('stats');
const themeToggle = document.getElementById('themeToggle');
const copyBtn = document.getElementById('copyEmailBtn');
const toggleProductsBtn = document.getElementById('toggleProducts');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ============================================
// TODO 3: Renderizar información básica
// ============================================

const renderBasicInfo = () => {
  const { name, title, description, location, contact } = entityData;
  const email = contact?.email ?? 'No especificado';
  const phone = contact?.phone ?? 'N/A';

  userName.textContent = name;
  userTitle.textContent = title;
  userBio.textContent = description;
  userEmail.textContent = email;
  userPhone.textContent = phone;
  userLocation.textContent = `📍 ${location}`;
};

// ============================================
// TODO 4: Renderizar lista de elementos
// ============================================

const renderItems = (showAll = false) => {
  const { items } = entityData;

  const itemsToShow = showAll ? items : items.slice(0, 4);

  const itemsHtml = itemsToShow.map(item => {
    const { name, level, emoji } = item;
    return `
      <div class="item">
        <div class="item-header">
          <span class="item-emoji">${emoji}</span>
          <div class="item-name">${name}</div>
        </div>
        <div class="item-level">
          <span>${level}%</span>
          <div class="level-bar">
            <div class="level-fill" style="width: ${level}%"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  productsList.innerHTML = itemsHtml;
};

// ============================================
// TODO 5: Renderizar enlaces/referencias
// ============================================

const renderLinks = () => {
  const { links } = entityData;

  const linksHtml = links.map(link => {
    const { platform, url, icon } = link;
    return `
      <a href="${url}" target="_blank" class="social-link" title="${platform}">
        <span>${icon}</span>
        <span>${platform}</span>
      </a>
    `;
  }).join('');

  socialLinks.innerHTML = linksHtml;
};

// ============================================
// TODO 6: Calcular y renderizar estadísticas
// ============================================

const renderStats = () => {
  const { stats } = entityData;

  const statsArray = [
    { label: 'Productos', value: stats.total },
    { label: 'Disponibles', value: stats.active },
    { label: 'Calificación', value: stats.rating },
    { label: 'Clientes', value: stats.custom }
  ];

  const statsHtml = statsArray.map(stat => `
    <div class="stat-item">
      <span class="stat-value">${stat.value}</span>
      <span class="stat-label">${stat.label}</span>
    </div>
  `).join('');

  statsContainer.innerHTML = statsHtml;
};

// ============================================
// TODO 7: Funcionalidad de cambio de tema
// ============================================

const toggleTheme = () => {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = newTheme;
  themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', newTheme);
};

const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme') ?? 'light';
  document.documentElement.dataset.theme = savedTheme;
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
};

// ============================================
// TODO 8: Funcionalidad de copiar información
// ============================================

const copyInfo = () => {
  const { name, contact } = entityData;
  const email = contact?.email ?? 'sin correo';
  const infoText = `${name}\nContacto: ${email}`;

  navigator.clipboard.writeText(infoText);
  showToast('¡Información copiada al portapapeles!');
};

const showToast = message => {
  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

// ============================================
// TODO 9: Funcionalidad de mostrar/ocultar items
// ============================================

let showingAllItems = false;

const handleToggleItems = () => {
  showingAllItems = !showingAllItems;
  renderItems(showingAllItems);
  toggleProductsBtn.textContent = showingAllItems ? 'Mostrar menos' : 'Mostrar más';
};

// ============================================
// TODO 10: Event Listeners
// ============================================

themeToggle.addEventListener('click', toggleTheme);
copyBtn.addEventListener('click', copyInfo);
toggleProductsBtn.addEventListener('click', handleToggleItems);

// ============================================
// TODO 11: Inicializar la aplicación
// ============================================

const init = () => {
  loadTheme();
  renderBasicInfo();
  renderItems();
  renderLinks();
  renderStats();
  console.log('✅ Aplicación inicializada correctamente');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}