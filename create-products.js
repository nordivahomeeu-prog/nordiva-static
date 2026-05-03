const fs = require('fs');
const path = require('path');

const products = [
    {id: 1, name: 'Madrid Corner Sofa', category: 'corner_sofa'},
    {id: 2, name: 'Marea Corner Sofa', category: 'corner_sofa'},
    {id: 3, name: 'Assos Corner Sofa', category: 'corner_sofa'},
    {id: 4, name: 'Nora Bed', category: 'bed'},
    {id: 5, name: 'Riva Furniture Set', category: 'furniture_set'},
    {id: 6, name: 'Rio Furniture Set', category: 'furniture_set'},
    {id: 7, name: 'Verta Seramik Set', category: 'furniture_set'},
    {id: 8, name: 'Roseir Furniture Set', category: 'furniture_set'},
    {id: 9, name: 'Milano Furniture Set', category: 'furniture_set'},
    {id: 10, name: 'Noir Line Set', category: 'furniture_set'},
    {id: 11, name: 'Arno Furniture Set', category: 'furniture_set'},
    {id: 12, name: 'Axis Oval Table', category: 'dining_table'},
    {id: 13, name: 'Pure Marble Table', category: 'dining_table'},
    {id: 14, name: 'Urban Pearl Table', category: 'dining_table'},
    {id: 15, name: 'Flute Beech Table', category: 'dining_table'},
    {id: 16, name: 'Moxie Chair', category: 'chair'},
    {id: 17, name: 'Apex Natural Chair', category: 'chair'},
    {id: 18, name: 'Delta Chair', category: 'chair'},
    {id: 19, name: 'Venice Chair', category: 'chair'},
    {id: 20, name: 'Orbit Chair', category: 'chair'},
    {id: 21, name: 'Mono Triple Coffee Table', category: 'coffee_table'},
    {id: 22, name: 'Metro Triple Coffee Table', category: 'coffee_table'},
    {id: 23, name: 'Classic Sofa', category: 'sofa'},
    {id: 24, name: 'Modern Sofa', category: 'sofa'},
    {id: 25, name: 'Lounge Sofa', category: 'sofa'},
    {id: 26, name: 'Heritage Table', category: 'dining_table'},
    {id: 27, name: 'Nordic Table', category: 'dining_table'},
    {id: 28, name: 'Cone Table', category: 'dining_table'},
    {id: 29, name: 'Torino Table', category: 'dining_table'},
    {id: 30, name: 'Masami Table', category: 'dining_table'},
    {id: 31, name: 'Luna Sofa', category: 'sofa'},
    {id: 32, name: 'Amber Sofa', category: 'sofa'},
    {id: 33, name: 'Celine Sofa', category: 'sofa'},
    {id: 34, name: 'Dante Corner Sofa', category: 'corner_sofa'},
    {id: 35, name: 'Elara Corner Sofa', category: 'corner_sofa'},
    {id: 36, name: 'Fiona Corner Sofa', category: 'corner_sofa'},
    {id: 37, name: 'Gala Dining Table', category: 'dining_table'},
    {id: 38, name: 'Halo Dining Table', category: 'dining_table'},
    {id: 39, name: 'Iris Dining Table', category: 'dining_table'},
    {id: 40, name: 'Jade Dining Table', category: 'dining_table'},
    {id: 41, name: 'Kira Chair', category: 'chair'},
    {id: 42, name: 'Lena Chair', category: 'chair'},
    {id: 43, name: 'Mila Chair', category: 'chair'},
    {id: 44, name: 'Nina Chair', category: 'chair'},
    {id: 45, name: 'Opal Coffee Table', category: 'coffee_table'},
    {id: 46, name: 'Pearl Coffee Table', category: 'coffee_table'},
    {id: 47, name: 'Quartz Coffee Table', category: 'coffee_table'},
    {id: 48, name: 'Ruby Coffee Table', category: 'coffee_table'},
    {id: 49, name: 'Sage Furniture Set', category: 'furniture_set'},
    {id: 50, name: 'Terra Furniture Set', category: 'furniture_set'},
    {id: 51, name: 'Uma Furniture Set', category: 'furniture_set'},
    {id: 52, name: 'Vera Furniture Set', category: 'furniture_set'},
    {id: 53, name: 'Wynn Furniture Set', category: 'furniture_set'},
    {id: 54, name: 'Xena Bed', category: 'bed'},
    {id: 55, name: 'Yara Bed', category: 'bed'},
    {id: 56, name: 'Zara Bed', category: 'bed'},
    {id: 57, name: 'Atlas Bed', category: 'bed'},
    {id: 58, name: 'Bliss Bed', category: 'bed'},
    {id: 59, name: 'Cloud Bed', category: 'bed'},
];

const categoryNames = {
    sofa: 'Sofa',
    corner_sofa: 'Corner Sofa',
    dining_table: 'Dining Table',
    chair: 'Chair',
    coffee_table: 'Coffee Table',
    furniture_set: 'Furniture Set',
    bed: 'Bed'
};

function createProductPage(product) {
    const categoryName = categoryNames[product.category] || product.category;
    const encodedName = encodeURIComponent(product.name);
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${product.name} - NORDIVA HOME EUROPE</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; line-height: 1.6; }
        
        header { background: white; border-bottom: 1px solid #e2e8f0; position: sticky; top: 0; z-index: 100; }
        .header-content { max-width: 1200px; margin: 0 auto; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: bold; color: #1e293b; text-decoration: none; }
        nav a { margin-left: 2rem; color: #64748b; text-decoration: none; font-size: 0.9rem; }
        nav a:hover { color: #1e293b; }
        
        .product-detail { max-width: 1000px; margin: 0 auto; padding: 3rem 2rem; }
        .back-link { display: inline-block; margin-bottom: 2rem; color: #64748b; text-decoration: none; }
        .back-link:hover { color: #1e293b; }
        
        .product-container { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; background: white; border-radius: 1rem; padding: 2rem; border: 1px solid #e2e8f0; }
        .product-image { width: 100%; border-radius: 0.5rem; background: #f1f5f9; }
        
        .product-info h1 { font-size: 2rem; margin-bottom: 0.5rem; color: #1e293b; }
        .product-category { color: #64748b; text-transform: uppercase; font-size: 0.9rem; margin-bottom: 1rem; }
        .product-price { font-size: 1.5rem; color: #0f172a; font-weight: 600; margin-bottom: 1.5rem; }
        .product-description { color: #475569; margin-bottom: 2rem; line-height: 1.8; }
        
        .order-btn { display: block; width: 100%; padding: 1rem; background: #0f172a; color: white; text-align: center; border-radius: 0.5rem; text-decoration: none; font-weight: 600; font-size: 1.1rem; margin-bottom: 1rem; }
        .order-btn:hover { background: #1e293b; }
        
        .features { margin-top: 2rem; }
        .features h3 { font-size: 1.1rem; margin-bottom: 1rem; color: #1e293b; }
        .features ul { margin-left: 1.5rem; color: #475569; }
        .features li { margin-bottom: 0.5rem; }
        
        footer { background: #0f172a; color: white; padding: 2rem; text-align: center; margin-top: 4rem; }
        
        @media (max-width: 768px) { .product-container { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <header>
        <div class="header-content">
            <a href="/" class="logo">NORDIVA</a>
            <nav>
                <a href="/">Home</a>
                <a href="/products.html">Products</a>
                <a href="/about.html">About</a>
                <a href="/contact.html">Contact</a>
                <a href="/delivery.html">Delivery</a>
            </nav>
        </div>
    </header>

    <section class="product-detail">
        <a href="/products.html" class="back-link">← Back to Products</a>
        
        <div class="product-container">
            <div class="product-image-container">
                <img src="https://placehold.co/600x400/0f172a/white?text=${encodedName}" alt="${product.name}" class="product-image">
            </div>
            
            <div class="product-info">
                <div class="product-category">${categoryName}</div>
                <h1>${product.name}</h1>
                <div class="product-price">Contact for Price</div>
                
                <div class="product-description">
                    <p>Premium quality ${categoryName.toLowerCase()} crafted with attention to detail. This elegant piece combines modern design with exceptional comfort, making it a perfect addition to your home.</p>
                    <p>Contact us on Instagram for detailed pricing, customization options, and delivery information.</p>
                </div>
                
                <a href="https://instagram.com/nordivahomeeurope" class="order-btn" target="_blank">Order via Instagram</a>
                
                <div class="features">
                    <h3>Product Features</h3>
                    <ul>
                        <li>Premium quality materials</li>
                        <li>Modern European design</li>
                        <li>2-year warranty included</li>
                        <li>Europe-wide delivery available</li>
                        <li>Cash on delivery option</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <p>&copy; 2024 NORDIVA HOME EUROPE. All rights reserved.</p>
    </footer>
</body>
</html>`;
}

const productsDir = path.join(__dirname, 'products');

products.forEach(product => {
    const html = createProductPage(product);
    const filePath = path.join(productsDir, `product-${product.id}.html`);
    fs.writeFileSync(filePath, html);
    console.log(`Created: ${filePath}`);
});

console.log(`\nCreated ${products.length} product pages!`);
