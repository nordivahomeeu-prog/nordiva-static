const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, 'products');
const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(productsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Eski butonu yeni 3 butonla değiştir
  const oldButton = `<a href="https://www.instagram.com/nordivahomeeurope/" class="order-btn" target="_blank" data-lang="orderInstagram">Instagram'dan Sipariş Ver</a>`;
  
  const newButtons = `
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <a href="https://www.instagram.com/nordivahomeeurope/" class="order-btn" target="_blank" style="background: #E4405F;" data-lang="orderInstagram">📸 Instagram'dan Sipariş Ver</a>
                    <a href="https://wa.me/905327443766" class="order-btn" target="_blank" style="background: #25D366;" data-lang="orderWhatsApp">💬 WhatsApp'tan Sipariş Ver</a>
                    <a href="mailto:nordivahomeeu@gmail.com" class="order-btn" target="_blank" style="background: #EA4335;" data-lang="orderEmail">📧 E-posta ile Sipariş Ver</a>
                </div>`;
  
  content = content.replace(oldButton, newButtons);
  
  // Çevirileri güncelle
  const oldTranslations = `const translations = ${JSON.stringify({
    TR: { home: 'Ana Sayfa', products: 'Ürünler', about: 'Hakkımızda', contact: 'İletişim', delivery: 'Teslimat', orderInstagram: "Instagram'dan Sipariş Ver", backToProducts: 'Ürünlere Dön', price: 'Fiyat İçin İletişime Geçin', description: 'Premium kalite mobilya, detaylara özen gösterilerek üretilmiştir.', contactText: "Detaylı fiyatlandırma için Instagram'dan bize ulaşın.", features: 'Ürün Özellikleri', feature1: 'Premium kalite malzemeler', feature2: 'Modern Avrupa tasarımı', feature3: '2 yıl garanti dahil', feature4: 'Avrupa çapında teslimat', feature5: 'Kapıda ödeme seçeneği' },
    EN: { home: 'Home', products: 'Products', about: 'About', contact: 'Contact', delivery: 'Delivery', orderInstagram: 'Order via Instagram', backToProducts: 'Back to Products', price: 'Contact for Price', description: 'Premium quality furniture crafted with attention to detail.', contactText: 'Contact us on Instagram for detailed pricing.', features: 'Product Features', feature1: 'Premium quality materials', feature2: 'Modern European design', feature3: '2-year warranty included', feature4: 'Europe-wide delivery', feature5: 'Cash on delivery option' },
    DE: { home: 'Startseite', products: 'Produkte', about: 'Über uns', contact: 'Kontakt', delivery: 'Lieferung', orderInstagram: 'Über Instagram bestellen', backToProducts: 'Zurück zu Produkten', price: 'Preis auf Anfrage', description: 'Hochwertige Möbel mit Liebe zum Detail.', contactText: 'Kontaktieren Sie uns auf Instagram.', features: 'Produkteigenschaften', feature1: 'Hochwertige Materialien', feature2: 'Modernes europäisches Design', feature3: '2 Jahre Garantie inklusive', feature4: 'Lieferung in ganz Europa', feature5: 'Zahlung bei Lieferung' },
    FR: { home: 'Accueil', products: 'Produits', about: 'À propos', contact: 'Contact', delivery: 'Livraison', orderInstagram: 'Commander via Instagram', backToProducts: 'Retour aux produits', price: 'Prix sur demande', description: 'Meubles de qualité premium fabriqués avec attention.', contactText: 'Contactez-nous sur Instagram.', features: 'Caractéristiques', feature1: 'Matériaux de qualité premium', feature2: 'Design européen moderne', feature3: 'Garantie 2 ans incluse', feature4: 'Livraison en Europe', feature5: 'Paiement à la livraison' },
    AR: { home: 'الرئيسية', products: 'المنتجات', about: 'من نحن', contact: 'اتصل بنا', delivery: 'التوصيل', orderInstagram: 'اطلب عبر انستغرام', backToProducts: 'العودة للمنتجات', price: 'السعر عند الطلب', description: 'أثاث عالي الجودة مصنوع بعناية.', contactText: 'تواصل معنا على انستغرام.', features: 'مميزات المنتج', feature1: 'مواد عالية الجودة', feature2: 'تصميم أوروبي عصري', feature3: 'ضمان سنتين شامل', feature4: 'توصيل في جميع أنحاء أوروبا', feature5: 'الدفع عند الاستلام' }
  })};`;
  
  const newTranslations = `const translations = {"TR":{"home":"Ana Sayfa","products":"Ürünler","about":"Hakkımızda","contact":"İletişim","delivery":"Teslimat","orderInstagram":"📸 Instagram'dan Sipariş Ver","orderWhatsApp":"💬 WhatsApp'tan Sipariş Ver","orderEmail":"📧 E-posta ile Sipariş Ver","backToProducts":"Ürünlere Dön","price":"Fiyat İçin İletişime Geçin","description":"Premium kalite mobilya, detaylara özen gösterilerek üretilmiştir.","contactText":"Detaylı fiyatlandırma için bize ulaşın.","features":"Ürün Özellikleri","feature1":"Premium kalite malzemeler","feature2":"Modern Avrupa tasarımı","feature3":"2 yıl garanti dahil","feature4":"Avrupa çapında teslimat","feature5":"Kapıda ödeme seçeneği"},"EN":{"home":"Home","products":"Products","about":"About","contact":"Contact","delivery":"Delivery","orderInstagram":"📸 Order via Instagram","orderWhatsApp":"💬 Order via WhatsApp","orderEmail":"📧 Order via Email","backToProducts":"Back to Products","price":"Contact for Price","description":"Premium quality furniture crafted with attention to detail.","contactText":"Contact us for detailed pricing.","features":"Product Features","feature1":"Premium quality materials","feature2":"Modern European design","feature3":"2-year warranty included","feature4":"Europe-wide delivery","feature5":"Cash on delivery option"},"DE":{"home":"Startseite","products":"Produkte","about":"Über uns","contact":"Kontakt","delivery":"Lieferung","orderInstagram":"📸 Über Instagram bestellen","orderWhatsApp":"💬 Über WhatsApp bestellen","orderEmail":"📧 Per E-Mail bestellen","backToProducts":"Zurück zu Produkten","price":"Preis auf Anfrage","description":"Hochwertige Möbel mit Liebe zum Detail.","contactText":"Kontaktieren Sie uns für detaillierte Preise.","features":"Produkteigenschaften","feature1":"Hochwertige Materialien","feature2":"Modernes europäisches Design","feature3":"2 Jahre Garantie inklusive","feature4":"Lieferung in ganz Europa","feature5":"Zahlung bei Lieferung"},"FR":{"home":"Accueil","products":"Produits","about":"À propos","contact":"Contact","delivery":"Livraison","orderInstagram":"📸 Commander via Instagram","orderWhatsApp":"💬 Commander via WhatsApp","orderEmail":"📧 Commander par Email","backToProducts":"Retour aux produits","price":"Prix sur demande","description":"Meubles de qualité premium fabriqués avec attention.","contactText":"Contactez-nous pour les prix détaillés.","features":"Caractéristiques","feature1":"Matériaux de qualité premium","feature2":"Design européen moderne","feature3":"Garantie 2 ans incluse","feature4":"Livraison en Europe","feature5":"Paiement à la livraison"},"AR":{"home":"الرئيسية","products":"المنتجات","about":"من نحن","contact":"اتصل بنا","delivery":"التوصيل","orderInstagram":"📸 اطلب عبر انستغرام","orderWhatsApp":"💬 اطلب عبر واتساب","orderEmail":"📧 اطلب عبر البريد","backToProducts":"العودة للمنتجات","price":"السعر عند الطلب","description":"أثاث عالي الجودة مصنوع بعناية.","contactText":"تواصل معنا للحصول على الأسعار التفصيلية.","features":"مميزات المنتج","feature1":"مواد عالية الجودة","feature2":"تصميم أوروبي عصري","feature3":"ضمان سنتين شامل","feature4":"توصيل في جميع أنحاء أوروبا","feature5":"الدفع عند الاستلام"}};`;
  
  content = content.replace(oldTranslations, newTranslations);
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated: ${file}`);
});

console.log('\nAll product pages updated with 3 contact buttons!');
