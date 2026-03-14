const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
const OUTPUT_PDF = path.join(__dirname, 'Cyna-IT_Maquettes.pdf');

const PAGE_WIDTH = 842; // A4 landscape
const PAGE_HEIGHT = 595;
const MARGIN = 30;
const HEADER_HEIGHT = 28;
const INFO_BAR_HEIGHT = 36;
const FOOTER_HEIGHT = 22;

const COLORS = {
  primary: '#0891B2',
  dark: '#0F172A',
  text: '#334155',
  lightText: '#64748B',
  accent: '#06B6D4',
  white: '#FFFFFF',
  lightBg: '#F1F5F9',
  border: '#CBD5E1',
};

// --- Read PNG dimensions from file header ---
function getPngDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  // PNG header: bytes 16-19 = width, bytes 20-23 = height (big-endian uint32)
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) {
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    return { width, height };
  }
  return { width: 1920, height: 1080 }; // fallback
}

// --- Page definitions ---
const sections = [
  {
    title: 'Site public',
    pages: [
      { file: '01-home.png', title: 'Page d\'accueil', url: '/', description: 'Vitrine principale du site Cyna-IT. Présente le carrousel des solutions phares, les avantages clés, les catégories de produits et les offres populaires.' },
      { file: '02-auth-login.png', title: 'Connexion', url: '/auth/login', description: 'Page de connexion avec email et mot de passe. Inclut l\'option "Se souvenir de moi" et la récupération de mot de passe.' },
      { file: '03-auth-register.png', title: 'Inscription', url: '/auth/register', description: 'Formulaire de création de compte avec validation en temps réel des critères de sécurité du mot de passe.' },
      { file: '04-auth-forgot-password.png', title: 'Mot de passe oublié', url: '/auth/forgot-password', description: 'Page de récupération de mot de passe par envoi d\'un lien de réinitialisation sécurisé par email.' },
      { file: '05-search-grid.png', title: 'Recherche — Vue grille', url: '/search', description: 'Recherche avec filtres avancés (catégories, prix, disponibilité) et affichage en grille des résultats.' },
      { file: '06-search-list.png', title: 'Recherche — Vue liste', url: '/search', description: 'Affichage alternatif en liste offrant plus de détails sur chaque produit. Basculement via les icônes dédiées.' },
      { file: '07-category-soc.png', title: 'Catégorie SOC', url: '/categories/soc', description: 'Catégorie "SOC as a Service" : solutions de surveillance et réponse aux incidents avec tarification détaillée.' },
      { file: '08-category-edr.png', title: 'Catégorie EDR', url: '/categories/edr', description: 'Catégorie "EDR Solutions" : offres de protection des endpoints avec détection et réponse automatisées.' },
      { file: '09-category-xdr.png', title: 'Catégorie XDR', url: '/categories/xdr', description: 'Catégorie "XDR Platform" : détection et réponse étendues pour une visibilité unifiée sur l\'infrastructure.' },
      { file: '10-category-threat-intel.png', title: 'Catégorie Threat Intelligence', url: '/categories/threat-intelligence', description: 'Catégorie "Threat Intelligence" : flux de renseignements pour anticiper et prévenir les attaques.' },
      { file: '11-product-yearly.png', title: 'Fiche produit — Tarif annuel', url: '/products/1', description: 'Fiche SOC Premium 24/7 avec tarif annuel (-17%). Fonctionnalités, spécifications, certifications et FAQ.' },
      { file: '12-product-monthly.png', title: 'Fiche produit — Tarif mensuel', url: '/products/1', description: 'Même fiche avec tarif mensuel. Toggle de basculement mensuel/annuel avec indication de l\'économie.' },
      { file: '13-cart-with-items.png', title: 'Panier avec articles', url: '/cart', description: 'Panier avec gestion des quantités, choix de facturation mensuel/annuel, récapitulatif et accès au paiement.' },
      { file: '14-cart-empty.png', title: 'Panier vide', url: '/cart', description: 'État du panier vide avec invitation à découvrir les solutions et lien vers le catalogue.' },
      { file: '15-contact.png', title: 'Contact', url: '/contact', description: 'Formulaire de contact structuré par sujet avec coordonnées directes de l\'équipe Cyna-IT.' },
      { file: '16-faq.png', title: 'FAQ', url: '/faq', description: 'Foire aux questions organisée par thématiques : solutions, facturation, support et mise en place.' },
    ]
  },
  {
    title: 'Parcours d\'achat',
    pages: [
      { file: '17-checkout-step1.png', title: 'Checkout — Étape 1 : Compte', url: '/checkout', description: 'Première étape : connexion ou création de compte pour poursuivre la commande.' },
      { file: '18-checkout-step2.png', title: 'Checkout — Étape 2 : Facturation', url: '/checkout', description: 'Saisie de l\'adresse de facturation. Récapitulatif de commande visible en permanence.' },
      { file: '19-checkout-step3.png', title: 'Checkout — Étape 3 : Paiement', url: '/checkout', description: 'Paiement sécurisé par carte bancaire (Visa, Mastercard) avec garanties SSL et Stripe.' },
      { file: '20-checkout-confirmation.png', title: 'Confirmation de commande', url: '/checkout/confirmation', description: 'Confirmation après achat avec numéro de commande, articles et prochaines étapes.' },
      { file: '21-legal.png', title: 'Mentions légales', url: '/legal', description: 'Mentions légales, CGU et politique de confidentialité conformes à la réglementation.' },
    ]
  },
  {
    title: 'Espace client',
    pages: [
      { file: '22-account-dashboard.png', title: 'Tableau de bord', url: '/account', description: 'Vue d\'ensemble du compte : abonnements actifs, commandes récentes et raccourcis.' },
      { file: '23-account-profile.png', title: 'Profil utilisateur', url: '/account/profile', description: 'Gestion du profil : informations personnelles, adresse, mot de passe et préférences.' },
      { file: '24-account-orders.png', title: 'Historique des commandes', url: '/account/orders', description: 'Liste des commandes passées avec statut, date, montant et accès au détail.' },
      { file: '25-account-order-detail.png', title: 'Détail d\'une commande', url: '/account/orders/ORD-2024-001', description: 'Vue détaillée d\'une commande : suivi, articles, facturation et téléchargement de facture.' },
      { file: '26-account-subscriptions.png', title: 'Abonnements', url: '/account/subscriptions', description: 'Gestion des abonnements : dates de renouvellement, tarifs, changement de formule.' },
    ]
  },
  {
    title: 'Administration',
    pages: [
      { file: '27-admin-login.png', title: 'Connexion administrateur', url: '/admin/login', description: 'Connexion sécurisée réservée aux administrateurs avec interface distincte sur fond sombre.' },
      { file: '28-admin-login-2fa.png', title: 'Vérification 2FA', url: '/admin/login', description: 'Authentification à deux facteurs avec code à 6 chiffres (Google Authenticator, Authy).' },
      { file: '29-admin-dashboard.png', title: 'Dashboard administrateur', url: '/admin', description: 'Tableau de bord avec indicateurs clés (revenus, commandes, utilisateurs) et alertes.' },
      { file: '30-admin-products.png', title: 'Gestion des produits', url: '/admin/products', description: 'Liste des produits du catalogue avec recherche, filtres et actions rapides.' },
      { file: '31-admin-product-edit.png', title: 'Édition d\'un produit', url: '/admin/products/1', description: 'Formulaire d\'édition complet : informations, tarification, images et spécifications.' },
      { file: '32-admin-orders.png', title: 'Gestion des commandes', url: '/admin/orders', description: 'Vue des commandes avec filtres par statut, recherche et indicateurs de performance.' },
      { file: '33-admin-order-detail.png', title: 'Détail d\'une commande', url: '/admin/orders/ORD-2024-001', description: 'Vue complète côté admin : timeline, informations client, articles et modification du statut.' },
      { file: '34-admin-users.png', title: 'Gestion des utilisateurs', url: '/admin/users', description: 'Liste des utilisateurs avec recherche, filtres par rôle/statut et actions de modération.' },
      { file: '35-admin-user-detail.png', title: 'Détail d\'un utilisateur', url: '/admin/users/1', description: 'Fiche utilisateur : informations, historique de commandes, abonnements et gestion du compte.' },
      { file: '36-admin-content.png', title: 'Gestion du contenu', url: '/admin/content', description: 'Gestion du contenu éditorial : carrousel, pages statiques, FAQ et bannières.' },
      { file: '37-admin-messages.png', title: 'Messages', url: '/admin/messages', description: 'Boîte de réception des messages de contact. Consultation, réponse et suivi des demandes.' },
    ]
  }
];

// --- Helpers ---
let pageNumber = 0;

function addHeader(doc, sectionTitle) {
  doc.rect(0, 0, PAGE_WIDTH, HEADER_HEIGHT).fill(COLORS.dark);
  doc.fontSize(8).fillColor(COLORS.accent)
    .text('CYNA-IT', MARGIN, 9, { continued: true, lineBreak: false });
  doc.fillColor(COLORS.white)
    .text('  —  Maquettes', { continued: true, lineBreak: false });
  if (sectionTitle) {
    doc.fillColor(COLORS.lightText).text('  |  ' + sectionTitle, { lineBreak: false });
  }
  // Reset text position
  doc.text('', 0, HEADER_HEIGHT);
}

function addFooter(doc) {
  pageNumber++;
  doc.rect(0, PAGE_HEIGHT - FOOTER_HEIGHT, PAGE_WIDTH, FOOTER_HEIGHT).fill(COLORS.dark);
  doc.fontSize(7).fillColor(COLORS.lightText)
    .text('Cyna-IT — Confidentiel', MARGIN, PAGE_HEIGHT - 16, { lineBreak: false });
  doc.fillColor(COLORS.white)
    .text(String(pageNumber), PAGE_WIDTH - MARGIN - 20, PAGE_HEIGHT - 16, { width: 20, align: 'right', lineBreak: false });
}

function addInfoBar(doc, title, url, description) {
  const y = HEADER_HEIGHT;
  doc.rect(0, y, PAGE_WIDTH, INFO_BAR_HEIGHT).fill(COLORS.lightBg);
  doc.rect(0, y + INFO_BAR_HEIGHT - 1, PAGE_WIDTH, 1).fill(COLORS.border);

  doc.fontSize(11).fillColor(COLORS.dark)
    .text(title, MARGIN, y + 5, { continued: true, lineBreak: false });
  doc.fontSize(8).fillColor(COLORS.primary)
    .text('   ' + url, { lineBreak: false });

  doc.fontSize(7).fillColor(COLORS.text)
    .text(description, MARGIN, y + 21, { width: PAGE_WIDTH - MARGIN * 2, lineBreak: false, ellipsis: true });
}

// --- Build PDF ---
const doc = new PDFDocument({
  size: [PAGE_WIDTH, PAGE_HEIGHT],
  margins: { top: 0, bottom: 0, left: 0, right: 0 },
  autoFirstPage: true,
  bufferPages: true,
  info: {
    Title: 'Cyna-IT — Maquettes de l\'application web',
    Author: 'Cyna-IT',
    Subject: 'Présentation des maquettes fonctionnelles',
  }
});

const stream = fs.createWriteStream(OUTPUT_PDF);
doc.pipe(stream);

// ========================================
// PAGE DE GARDE
// ========================================
doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT).fill(COLORS.dark);
doc.rect(0, 0, PAGE_WIDTH, 4).fill(COLORS.accent);

doc.fontSize(42).fillColor(COLORS.accent).text('Cyna-IT', 0, 160, { align: 'center', lineBreak: true });
doc.fontSize(10).fillColor(COLORS.lightText).text('SOLUTIONS DE CYBERSECURITE SAAS', 0, 215, { align: 'center', characterSpacing: 4 });

doc.rect(PAGE_WIDTH / 2 - 40, 245, 80, 2).fill(COLORS.accent);

doc.fontSize(22).fillColor(COLORS.white).text('Maquettes de l\'application web', 0, 275, { align: 'center' });
doc.fontSize(12).fillColor(COLORS.lightText).text('Présentation client — Interfaces utilisateur', 0, 310, { align: 'center' });

const today = new Date();
const dateStr = today.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
doc.fontSize(11).fillColor(COLORS.lightText).text(dateStr, 0, 370, { align: 'center' });

// Stats
const barY = 460;
doc.rect(MARGIN * 4, barY, PAGE_WIDTH - MARGIN * 8, 55).lineWidth(1).strokeColor(COLORS.accent).fillAndStroke(COLORS.dark, COLORS.accent);
const statsW = (PAGE_WIDTH - MARGIN * 8) / 4;
[
  { value: '37', label: 'Écrans' },
  { value: '4', label: 'Sections' },
  { value: '1920px', label: 'Résolution' },
  { value: 'Full HD', label: 'Qualité' },
].forEach((s, i) => {
  const x = MARGIN * 4 + statsW * i;
  doc.fontSize(16).fillColor(COLORS.accent).text(s.value, x, barY + 10, { width: statsW, align: 'center' });
  doc.fontSize(7).fillColor(COLORS.lightText).text(s.label, x, barY + 32, { width: statsW, align: 'center' });
});

doc.rect(0, PAGE_HEIGHT - 4, PAGE_WIDTH, 4).fill(COLORS.accent);

// ========================================
// SOMMAIRE (2 pages)
// ========================================
let tocY, globalIdx = 0;
const tocContentTop = HEADER_HEIGHT + 20;
const tocMaxY = PAGE_HEIGHT - FOOTER_HEIGHT - 15;

// --- Sommaire page 1 ---
doc.addPage();
addHeader(doc, null);
addFooter(doc);

doc.fontSize(22).fillColor(COLORS.dark).text('Sommaire', MARGIN, tocContentTop);
doc.rect(MARGIN, tocContentTop + 28, 45, 3).fill(COLORS.accent);
tocY = tocContentTop + 50;

// Page 1: sections 0 and 1 (Site public + Parcours d'achat)
for (let sIdx = 0; sIdx < 2; sIdx++) {
  const section = sections[sIdx];
  doc.fontSize(12).fillColor(COLORS.primary).text(section.title, MARGIN, tocY);
  tocY += 20;

  section.pages.forEach((p) => {
    globalIdx++;
    const num = String(globalIdx).padStart(2, '0');
    doc.fontSize(9).fillColor(COLORS.text)
      .text(`${num}.  ${p.title}`, MARGIN + 14, tocY, { lineBreak: false });
    doc.fillColor(COLORS.lightText)
      .text(p.url, PAGE_WIDTH / 2 + 100, tocY, { lineBreak: false });
    tocY += 15;
  });

  tocY += 14;
}

// --- Sommaire page 2 ---
doc.addPage();
addHeader(doc, null);
addFooter(doc);

doc.fontSize(22).fillColor(COLORS.dark).text('Sommaire', MARGIN, tocContentTop);
doc.rect(MARGIN, tocContentTop + 28, 45, 3).fill(COLORS.accent);
tocY = tocContentTop + 50;

// Page 2: sections 2 and 3 (Espace client + Administration)
for (let sIdx = 2; sIdx < sections.length; sIdx++) {
  const section = sections[sIdx];
  doc.fontSize(12).fillColor(COLORS.primary).text(section.title, MARGIN, tocY);
  tocY += 20;

  section.pages.forEach((p) => {
    globalIdx++;
    const num = String(globalIdx).padStart(2, '0');
    doc.fontSize(9).fillColor(COLORS.text)
      .text(`${num}.  ${p.title}`, MARGIN + 14, tocY, { lineBreak: false });
    doc.fillColor(COLORS.lightText)
      .text(p.url, PAGE_WIDTH / 2 + 100, tocY, { lineBreak: false });
    tocY += 15;
  });

  tocY += 14;
}

// ========================================
// SCREENSHOT PAGES
// ========================================
sections.forEach((section) => {
  // Section separator
  doc.addPage();
  pageNumber++;

  doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT).fill(COLORS.dark);
  doc.rect(0, 0, PAGE_WIDTH, 4).fill(COLORS.accent);

  doc.fontSize(9).fillColor(COLORS.lightText).text('SECTION', 0, 230, { align: 'center', characterSpacing: 6 });
  doc.rect(PAGE_WIDTH / 2 - 25, 255, 50, 2).fill(COLORS.accent);
  doc.fontSize(26).fillColor(COLORS.white).text(section.title, 0, 270, { align: 'center' });
  doc.fontSize(10).fillColor(COLORS.lightText).text(`${section.pages.length} écrans`, 0, 310, { align: 'center' });

  doc.rect(0, PAGE_HEIGHT - FOOTER_HEIGHT, PAGE_WIDTH, FOOTER_HEIGHT).fill(COLORS.dark);
  doc.fontSize(7).fillColor(COLORS.lightText)
    .text('Cyna-IT — Confidentiel', MARGIN, PAGE_HEIGHT - 16, { lineBreak: false });
  doc.fillColor(COLORS.white)
    .text(String(pageNumber), PAGE_WIDTH - MARGIN - 20, PAGE_HEIGHT - 16, { width: 20, align: 'right', lineBreak: false });

  // Each screenshot
  section.pages.forEach((p) => {
    const imgPath = path.join(SCREENSHOTS_DIR, p.file);

    if (!fs.existsSync(imgPath)) {
      doc.addPage();
      addHeader(doc, section.title);
      addFooter(doc);
      doc.fontSize(14).fillColor('#EF4444').text(`Image manquante : ${p.file}`, MARGIN, 100);
      return;
    }

    // Get real image dimensions
    const dims = getPngDimensions(imgPath);
    const imgAspect = dims.width / dims.height;

    // Available space for the image
    const imgStartY = HEADER_HEIGHT + INFO_BAR_HEIGHT + 4;
    const availableWidth = PAGE_WIDTH - MARGIN * 2;
    const availableHeight = PAGE_HEIGHT - imgStartY - FOOTER_HEIGHT - 4;

    // Calculate rendered size maintaining aspect ratio
    let renderWidth, renderHeight;
    if (availableWidth / availableHeight > imgAspect) {
      // Height-constrained
      renderHeight = availableHeight;
      renderWidth = renderHeight * imgAspect;
    } else {
      // Width-constrained
      renderWidth = availableWidth;
      renderHeight = renderWidth / imgAspect;
    }

    // Center horizontally
    const imgX = MARGIN + (availableWidth - renderWidth) / 2;
    const imgY = imgStartY + (availableHeight - renderHeight) / 2;

    // Create the page
    doc.addPage();

    // 1) Draw image
    doc.image(imgPath, imgX, imgY, { width: renderWidth, height: renderHeight });

    // 2) Draw border around image
    doc.rect(imgX - 1, imgY - 1, renderWidth + 2, renderHeight + 2)
      .lineWidth(0.5).strokeColor(COLORS.border).stroke();

    // 3) Draw header, info bar, footer ON TOP
    addHeader(doc, section.title);
    addInfoBar(doc, p.title, p.url, p.description);
    addFooter(doc);

    console.log(`  [OK] ${p.file} (${dims.width}x${dims.height}) → ${Math.round(renderWidth)}x${Math.round(renderHeight)}pt`);
  });
});

// ========================================
// LAST PAGE
// ========================================
doc.addPage();
doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT).fill(COLORS.dark);
doc.rect(0, 0, PAGE_WIDTH, 4).fill(COLORS.accent);
doc.rect(0, PAGE_HEIGHT - 4, PAGE_WIDTH, 4).fill(COLORS.accent);

doc.fontSize(30).fillColor(COLORS.accent).text('Merci', 0, 210, { align: 'center' });
doc.rect(PAGE_WIDTH / 2 - 25, 250, 50, 2).fill(COLORS.accent);
doc.fontSize(13).fillColor(COLORS.white).text('Cyna-IT — Solutions de Cybersécurité SaaS', 0, 275, { align: 'center' });
doc.fontSize(9).fillColor(COLORS.lightText).text('Pour toute question : contact@cyna-it.fr', 0, 305, { align: 'center' });
doc.fontSize(8).fillColor(COLORS.lightText).text(`Document généré le ${dateStr}`, 0, 340, { align: 'center' });

// Finalize
doc.end();

stream.on('finish', () => {
  const fileStats = fs.statSync(OUTPUT_PDF);
  const sizeMB = (fileStats.size / (1024 * 1024)).toFixed(1);
  console.log(`\nPDF généré avec succès !`);
  console.log(`  Fichier : ${OUTPUT_PDF}`);
  console.log(`  Taille  : ${sizeMB} MB`);
  console.log(`  Pages   : ${pageNumber + 2}`);
});
