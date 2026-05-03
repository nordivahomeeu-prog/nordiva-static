const fs = require('fs');
const path = require('path');

// Shopify CSV'den alınan ürün verileri (Handle, Title, Image Src)
const productImages = {
  // Coffee Tables (Sehpa)
  'Mono Triple Set': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_ce5a3075-dcf2-454e-9591-e283e5a62e9a.png?v=1777581951',
  'Metro Triple Sehpa': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_4535cf55-69a1-4b90-a473-32ade1d7220a.png?v=1777581829',
  
  // Chairs (Sandalye)
  'Moxie Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_5b7d7732-cbd7-49a1-a000-8a184ae8c9c0.png?v=1777581253',
  'Apex Natural Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_fd46c02b-4e08-4ee4-9b35-bbe9ce5eb041.png?v=1777581115',
  'Delta Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_4823de69-1703-4f89-9e5a-7c2d80b40590.png?v=1777580984',
  'Venice Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_8432df98-4317-40c9-aa47-c2a6f9211f8d.png?v=1777580827',
  'Orbit Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_7bf22c01-88c5-4efe-b269-ad638b84def5.png?v=1777580608',
  'Block Wood Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_6b46b753-77e2-4783-bee0-a0e33cfc1fd0.png?v=1777580494',
  'Halo Cane Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_04dc6cc1-6f20-4f9c-a4c1-215102079754.png?v=1777580362',
  'Shell Loft Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_0def9e93-6885-41db-96ab-13814e6c3a47.png?v=1777562855',
  'Oslo Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_a6fe2b9e-48e8-4ae9-a075-39078db20ecd.png?v=1777562709',
  'Zeta Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_000d6bbe-bd80-4465-94aa-b74795413c70.png?v=1777562172',
  'Sunset Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_f92198e0-95f0-43b1-8e5d-1233009cd2d3.png?v=1777561905',
  'Alba Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_5b148a5e-8d50-4cf8-8f0a-bfdc69ccb68f.png?v=1777561779',
  'Vinta Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_48382f95-e232-44c2-ba77-eb1267acaad3.png?v=1777561604',
  'Arcade Wood Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_a3b3bc89-a9e3-489b-8f50-8d349579cfa6.png?v=1777560916',
  'Spindle Retro Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_48d32dcb-700b-492e-a7c1-907706a6eaf2.png?v=1777560778',
  'Amber Wood Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_e88834a5-f34b-4b64-9d93-33c765b88c15.png?v=1777559757',
  'Lumina Wood Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_4fdcc7b4-b943-465a-b83a-500d463c5f6f.png?v=1777559443',
  'Core Modern Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_7c54a4ea-ddb3-45cf-af63-f24f70c27f73.png?v=1777559279',
  'Metro Wood Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_65530081-e210-40b6-8251-e776da7093e3.png?v=1777559094',
  'Metropolitan Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_63c1d825-74e9-46b1-9860-e17c9990f609.png?v=1777558946',
  'Retro Cane Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_2b7eff72-5bd5-4e2f-80e7-5f8b6d1aaec1.png?v=1777558824',
  'Novo Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_f4b22d94-5d04-44f8-8314-bb3a78d12ad1.png?v=1777558691',
  'Essence Gold Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_cac7715c-8973-4ffe-95a9-b5b5480d64c7.png?v=1777481507',
  'Cozy Wood Chair': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_00990bd7-d8b5-4cac-9dcb-7787e98df379.png?v=1777481202',
  
  // Dining Tables (Yemek Masası)
  'Axis Oval White': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_d537b216-38cd-4722-b6d7-a98058b557f9.png?v=1777480796',
  'Axis Oval Black': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_8ddc8cf6-942b-4e6c-9e49-462084871f13.png?v=1777480305',
  'Pure Marble': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_58b21bd4-e6b1-4422-89e4-836fffa3bbf1.png?v=1777479758',
  'Marble Flute': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_bf8b33d9-bdbe-468a-a76b-6c4c77ccd7d4.png?v=1777478340',
  'Urban Pearl': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_ac0b7ec6-aaa8-4b22-94b0-9b8801b0a0d9.png?v=1777404209',
  'Urban White': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_929413f6-d75a-4b6b-9f63-be0d71c9599f.png?v=1777404033',
  'Flute Beech': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_14772ef0-f18d-4602-83c2-383449b502bc.png?v=1777403052',
  'Flute Walnut': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_dacd7204-9376-46c2-824d-10199bf0cbcd.png?v=1777402750',
  'Storm White': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_5a5fe19e-bf73-4815-9ad2-d7be240f9585.png?v=1777402286',
  'Heritage Walnut': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/heritage-walnut-ev-ortam-1.png?v=1777400902',
  'Heritage Beech': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/heritage-beech-ev-ortam-1.png?v=1777400692',
  'Heritage White/Black': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_d8379545-5f53-498c-8042-5ee78d97a5fe.png?v=1777400447',
  'Nordic Contrast': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_b0691546-61d2-4f73-81f9-3a2fa4e5dfe0.png?v=1777324280',
  'Nordic Marble': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_e6c9dabc-3a76-4a79-b08e-05f18f5579b4.png?v=1777323975',
  'Cone Oak': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_593aa66d-75c3-4341-9680-ffd5bfea2e32.png?v=1777323727',
  'Cone Walnut': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/cone-walnut-ev-ortam.png?v=1777323329',
  'Urban Noir': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/DSC3146_1.jpg?v=1777320952',
  'Urban Walnut': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/DSC3112-KUCUK.jpg?v=1777319239',
  'Torino Masa': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/torino3.png?v=1776720287',
  'Masami Masa': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/MASAMI1_1.jpg?v=1776542238',
  'Arno Masa': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/ARNOMASA1.jpg?v=1776093630',
  
  // Beds (Yatak)
  'Nora Yatak': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/NORA1.jpg?v=1776104578',
  
  // Furniture Sets (Takım)
  'Riva Yemek Odası': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/RIVA7.jpg?v=1776103063',
  'Noir Line': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/NOIR1.jpg?v=1776101493',
  'Rio Masa': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/RIO1.jpg?v=1776098518',
  'Verta Seramik': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/VERTA2_90219d3d-2d5e-47b9-a5ba-2a477eda0232.jpg?v=1776097180',
  'Roseir Masa': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image.png?v=1776093943',
  'Milano Masa': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/MILANO2.jpg?v=1776093687',
  
  // Corner Sofas (Köşe Koltuk)
  'Madrid Köşe': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/madridkosekoltuk_3.jpg?v=1776093146',
  'Marea Köşe': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/586669473_17851196070600970_2979464147891625364_n_1ff529ed-1eaa-434c-9f87-68402760634e.jpg?v=1776090485',
  'Assos Köşe': 'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/ASSOSkosekoltuktakimi_8_e9662c1a-b591-492a-9169-5b8c264e8970.jpg?v=1776093376',
};

// Ürün ID eşleştirmesi
const productMapping = {
  1: { name: 'Madrid Corner Sofa', key: 'Madrid Köşe', category: 'corner_sofa' },
  2: { name: 'Marea Corner Sofa', key: 'Marea Köşe', category: 'corner_sofa' },
  3: { name: 'Assos Corner Sofa', key: 'Assos Köşe', category: 'corner_sofa' },
  4: { name: 'Nora Bed', key: 'Nora Yatak', category: 'bed' },
  5: { name: 'Riva Furniture Set', key: 'Riva Yemek Odası', category: 'furniture_set' },
  6: { name: 'Rio Furniture Set', key: 'Rio Masa', category: 'furniture_set' },
  7: { name: 'Verta Seramik Set', key: 'Verta Seramik', category: 'furniture_set' },
  8: { name: 'Roseir Furniture Set', key: 'Roseir Masa', category: 'furniture_set' },
  9: { name: 'Milano Furniture Set', key: 'Milano Masa', category: 'furniture_set' },
  10: { name: 'Noir Line Set', key: 'Noir Line', category: 'furniture_set' },
  11: { name: 'Arno Furniture Set', key: 'Arno Masa', category: 'furniture_set' },
  12: { name: 'Axis Oval Table', key: 'Axis Oval White', category: 'dining_table' },
  13: { name: 'Pure Marble Table', key: 'Pure Marble', category: 'dining_table' },
  14: { name: 'Urban Pearl Table', key: 'Urban Pearl', category: 'dining_table' },
  15: { name: 'Flute Beech Table', key: 'Flute Beech', category: 'dining_table' },
  16: { name: 'Moxie Chair', key: 'Moxie Chair', category: 'chair' },
  17: { name: 'Apex Natural Chair', key: 'Apex Natural Chair', category: 'chair' },
  18: { name: 'Delta Chair', key: 'Delta Chair', category: 'chair' },
  19: { name: 'Venice Chair', key: 'Venice Chair', category: 'chair' },
  20: { name: 'Orbit Chair', key: 'Orbit Chair', category: 'chair' },
  21: { name: 'Mono Triple Coffee Table', key: 'Mono Triple Set', category: 'coffee_table' },
  22: { name: 'Metro Triple Coffee Table', key: 'Metro Triple Sehpa', category: 'coffee_table' },
  23: { name: 'Classic Sofa', key: 'Madrid Köşe', category: 'sofa' },
  24: { name: 'Modern Sofa', key: 'Marea Köşe', category: 'sofa' },
  25: { name: 'Lounge Sofa', key: 'Assos Köşe', category: 'sofa' },
  26: { name: 'Heritage Table', key: 'Heritage Walnut', category: 'dining_table' },
  27: { name: 'Nordic Table', key: 'Nordic Contrast', category: 'dining_table' },
  28: { name: 'Cone Table', key: 'Cone Oak', category: 'dining_table' },
  29: { name: 'Torino Table', key: 'Torino Masa', category: 'dining_table' },
  30: { name: 'Masami Table', key: 'Masami Masa', category: 'dining_table' },
  31: { name: 'Luna Sofa', key: 'Madrid Köşe', category: 'sofa' },
  32: { name: 'Amber Sofa', key: 'Marea Köşe', category: 'sofa' },
  33: { name: 'Celine Sofa', key: 'Assos Köşe', category: 'sofa' },
  34: { name: 'Dante Corner Sofa', key: 'Madrid Köşe', category: 'corner_sofa' },
  35: { name: 'Elara Corner Sofa', key: 'Marea Köşe', category: 'corner_sofa' },
  36: { name: 'Fiona Corner Sofa', key: 'Assos Köşe', category: 'corner_sofa' },
  37: { name: 'Gala Dining Table', key: 'Urban Walnut', category: 'dining_table' },
  38: { name: 'Halo Dining Table', key: 'Urban Noir', category: 'dining_table' },
  39: { name: 'Iris Dining Table', key: 'Nordic Marble', category: 'dining_table' },
  40: { name: 'Jade Dining Table', key: 'Marble Flute', category: 'dining_table' },
  41: { name: 'Kira Chair', key: 'Block Wood Chair', category: 'chair' },
  42: { name: 'Lena Chair', key: 'Halo Cane Chair', category: 'chair' },
  43: { name: 'Mila Chair', key: 'Shell Loft Chair', category: 'chair' },
  44: { name: 'Nina Chair', key: 'Oslo Chair', category: 'chair' },
  45: { name: 'Opal Coffee Table', key: 'Mono Triple Set', category: 'coffee_table' },
  46: { name: 'Pearl Coffee Table', key: 'Metro Triple Sehpa', category: 'coffee_table' },
  47: { name: 'Quartz Coffee Table', key: 'Mono Triple Set', category: 'coffee_table' },
  48: { name: 'Ruby Coffee Table', key: 'Metro Triple Sehpa', category: 'coffee_table' },
  49: { name: 'Sage Furniture Set', key: 'Riva Yemek Odası', category: 'furniture_set' },
  50: { name: 'Terra Furniture Set', key: 'Rio Masa', category: 'furniture_set' },
  51: { name: 'Uma Furniture Set', key: 'Verta Seramik', category: 'furniture_set' },
  52: { name: 'Vera Furniture Set', key: 'Roseir Masa', category: 'furniture_set' },
  53: { name: 'Wynn Furniture Set', key: 'Milano Masa', category: 'furniture_set' },
  54: { name: 'Xena Bed', key: 'Nora Yatak', category: 'bed' },
  55: { name: 'Yara Bed', key: 'Nora Yatak', category: 'bed' },
  56: { name: 'Zara Bed', key: 'Nora Yatak', category: 'bed' },
  57: { name: 'Atlas Bed', key: 'Nora Yatak', category: 'bed' },
  58: { name: 'Bliss Bed', key: 'Nora Yatak', category: 'bed' },
  59: { name: 'Cloud Bed', key: 'Nora Yatak', category: 'bed' },
};

// Her ürün detay sayfasını güncelle
const productsDir = path.join(__dirname, 'products');

Object.entries(productMapping).forEach(([id, product]) => {
  const imageUrl = productImages[product.key] || productImages['Nora Yatak']; // fallback
  const filePath = path.join(productsDir, `product-${id}.html`);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Placeholder URL'yi gerçek URL ile değiştir
    const placeholderPattern = /https:\/\/placehold\.co\/600x400\/0f172a\/white\?text=[^"]+/;
    content = content.replace(placeholderPattern, imageUrl);
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated product-${id}.html with image: ${product.key}`);
  }
});

console.log('\nAll product images updated with real Shopify images!');
