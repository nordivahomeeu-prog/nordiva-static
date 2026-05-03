const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, 'products');

for (let i = 1; i <= 52; i++) {
  const filePath = path.join(productsDir, `product-${i}.html`);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 3 butonlu div'i bul ve sadece WhatsApp ile değiştir
    const pattern = /<div style="display: flex; flex-direction: column; gap: 0\.75rem;">[\s\S]*?<\/div>/;
    const replacement = '<a href="https://wa.me/905327443766" class="order-btn" target="_blank" style="background: #25D366;" data-lang="orderWhatsApp">💬 WhatsApp\'tan Sipariş Ver</a>';
    
    content = content.replace(pattern, replacement);
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: product-${i}.html`);
  }
}

console.log('\nAll product pages now have only WhatsApp button!');
