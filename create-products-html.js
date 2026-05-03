const fs = require('fs');

const products = JSON.parse(fs.readFileSync('final-products.json', 'utf8'));

const translations = {
  TR: { title: 'Ürünler - NORDIVA HOME EUROPE', all: 'Tümü', coffee_table: 'Sehpa', chair: 'Sandalye', dining_table: 'Yemek Masası', corner_sofa: 'Köşe Koltuk', price: 'Fiyat İçin İletişime Geçin', viewDetails: 'Detayları Gör' },
  EN: { title: 'Products - NORDIVA HOME EUROPE', all: 'All', coffee_table: 'Coffee Table', chair: 'Chair', dining_table: 'Dining Table', corner_sofa: 'Corner Sofa', price: 'Contact for Price', viewDetails: 'View Details' },
  DE: { title: 'Produkte - NORDIVA HOME EUROPE', all: 'Alle', coffee_table: 'Couchtisch', chair: 'Stuhl', dining_table: 'Esstisch', corner_sofa: 'Ecksofa', price: 'Preis auf Anfrage', viewDetails: 'Details anzeigen' },
  FR: { title: 'Produits - NORDIVA HOME EUROPE', all: 'Tous', coffee_table: 'Table Basse', chair: 'Chaise', dining_table: 'Table à Manger', corner_sofa: 'Canapé d\'angle', price: 'Prix sur demande', viewDetails: 'Voir détails' },
  AR: { title: 'المنتجات - NORDIVA HOME EUROPE', all: 'الكل', coffee_table: 'طاولة قهوة', chair: 'كرسي', dining_table: 'طاولة طعام', corner_sofa: 'كنبة زاوية', price: 'السعر عند الطلب', viewDetails: 'عرض التفاصيل' }
};

const html = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ürünler - NORDIVA HOME EUROPE</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; line-height: 1.6; }
        header { background: white; border-bottom: 1px solid #e2e8f0; position: sticky; top: 0; z-index: 100; }
        .header-content { max-width: 1200px; margin: 0 auto; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
        .logo { font-size: 1.5rem; font-weight: bold; color: #1e293b; text-decoration: none; }
        nav { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
        nav a { color: #64748b; text-decoration: none; font-size: 0.9rem; }
        nav a:hover { color: #1e293b; }
        .lang-selector select { padding: 0.25rem 0.5rem; border: 1px solid #e2e8f0; border-radius: 0.25rem; background: white; cursor: pointer; }
        .content { max-width: 1200px; margin: 0 auto; padding: 3rem 2rem; }
        h1 { font-size: 2.5rem; margin-bottom: 2rem; color: #1e293b; }
        .filters { display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
        .filter-btn { padding: 0.5rem 1rem; border: 1px solid #e2e8f0; background: white; border-radius: 2rem; cursor: pointer; transition: all 0.2s; }
        .filter-btn:hover, .filter-btn.active { background: #0f172a; color: white; border-color: #0f172a; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
        .product-card { background: white; border-radius: 0.75rem; overflow: hidden; border: 1px solid #e2e8f0; transition: transform 0.2s, box-shadow 0.2s; text-decoration: none; color: inherit; }
        .product-card:hover { transform: translateY(-4px); box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
        .product-card img { width: 100%; height: 200px; object-fit: cover; }
        .product-info { padding: 1.5rem; }
        .product-category { color: #64748b; text-transform: uppercase; font-size: 0.75rem; margin-bottom: 0.5rem; }
        .product-name { font-size: 1.1rem; font-weight: 600; color: #1e293b; margin-bottom: 0.5rem; }
        .product-price { color: #0f172a; font-weight: 600; margin-bottom: 1rem; }
        .view-btn { display: block; text-align: center; padding: 0.75rem; background: #0f172a; color: white; border-radius: 0.5rem; font-size: 0.9rem; }
        footer { background: #0f172a; color: white; padding: 2rem; text-align: center; margin-top: 4rem; }
        [dir="rtl"] { direction: rtl; }
    </style>
</head>
<body>
    <header>
        <div class="header-content">
            <a href="/" class="logo">NORDIVA</a>
            <nav>
                <a href="/" data-lang="home">Ana Sayfa</a>
                <a href="/products.html" data-lang="products">Ürünler</a>
                <a href="/about.html" data-lang="about">Hakkımızda</a>
                <a href="/contact.html" data-lang="contact">İletişim</a>
                <a href="/delivery.html" data-lang="delivery">Teslimat</a>
                <div class="lang-selector">
                    <select id="lang-select" onchange="changeLanguage(this.value)">
                        <option value="TR">🇹🇷 TR</option>
                        <option value="EN">🇬🇧 EN</option>
                        <option value="DE">🇩🇪 DE</option>
                        <option value="FR">🇫🇷 FR</option>
                        <option value="AR">🇸🇦 AR</option>
                    </select>
                </div>
            </nav>
        </div>
    </header>

    <div class="content">
        <h1 data-lang="title">Ürünlerimiz</h1>
        
        <div class="filters">
            <button class="filter-btn active" onclick="filterProducts('all')" data-lang="all">Tümü</button>
            <button class="filter-btn" onclick="filterProducts('coffee_table')" data-lang="coffee_table">Sehpa</button>
            <button class="filter-btn" onclick="filterProducts('chair')" data-lang="chair">Sandalye</button>
            <button class="filter-btn" onclick="filterProducts('dining_table')" data-lang="dining_table">Yemek Masası</button>
            <button class="filter-btn" onclick="filterProducts('corner_sofa')" data-lang="corner_sofa">Köşe Koltuk</button>
        </div>

        <div class="product-grid" id="product-grid"></div>
    </div>

    <footer>
        <p>&copy; 2024 NORDIVA HOME EUROPE. All rights reserved.</p>
    </footer>

    <script>
        const products = ${JSON.stringify(products)};
        const translations = ${JSON.stringify(translations)};
        
        const categoryNames = {
            coffee_table: { TR: 'Sehpa', EN: 'Coffee Table', DE: 'Couchtisch', FR: 'Table Basse', AR: 'طاولة قهوة' },
            chair: { TR: 'Sandalye', EN: 'Chair', DE: 'Stuhl', FR: 'Chaise', AR: 'كرسي' },
            dining_table: { TR: 'Yemek Masası', EN: 'Dining Table', DE: 'Esstisch', FR: 'Table à Manger', AR: 'طاولة طعام' },
            corner_sofa: { TR: 'Köşe Koltuk', EN: 'Corner Sofa', DE: 'Ecksofa', FR: 'Canapé d\'angle', AR: 'كنبة زاوية' }
        };
        
        function renderProducts(filter = 'all') {
            const grid = document.getElementById('product-grid');
            const lang = localStorage.getItem('language') || 'TR';
            grid.innerHTML = '';
            
            products.forEach(p => {
                if (filter !== 'all' && p.category !== filter) return;
                
                const categoryName = categoryNames[p.category] ? categoryNames[p.category][lang] : p.category;
                const priceText = translations[lang] ? translations[lang].price : 'Fiyat İçin İletişime Geçin';
                const viewText = translations[lang] ? translations[lang].viewDetails : 'Detayları Gör';
                
                grid.innerHTML += \`
                    <a href="products/product-\${p.id}.html" class="product-card">
                        <img src="\${p.images[0]}" alt="\${p.name}" loading="lazy">
                        <div class="product-info">
                            <div class="product-category">\${categoryName}</div>
                            <div class="product-name">\${p.name}</div>
                            <div class="product-price">\${priceText}</div>
                            <div class="view-btn">\${viewText}</div>
                        </div>
                    </a>
                \`;
            });
        }
        
        function filterProducts(category) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            renderProducts(category);
        }
        
        function changeLanguage(lang) {
            localStorage.setItem('language', lang);
            document.documentElement.dir = lang === 'AR' ? 'rtl' : 'ltr';
            renderProducts('all');
            
            const t = translations[lang];
            if (t) {
                document.querySelectorAll('[data-lang]').forEach(el => {
                    const key = el.getAttribute('data-lang');
                    if (t[key]) el.textContent = t[key];
                });
            }
        }
        
        const savedLang = localStorage.getItem('language') || 'TR';
        document.getElementById('lang-select').value = savedLang;
        changeLanguage(savedLang);
        renderProducts();
    </script>
</body>
</html>`;

fs.writeFileSync('products.html', html);
console.log('Created: products.html with 52 products and multilingual support');
