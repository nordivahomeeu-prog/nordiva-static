const fs = require('fs');
const path = require('path');

// Her ürün için tüm resim URL'leri (CSV'den alınan)
const productGallery = {
  1: [ // Madrid Corner Sofa
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/madridkosekoltuk_3.jpg?v=1776093146',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/madridkosekoltuk_1.jpg?v=1776093146',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/madridkosekoltuk_2.jpg?v=1776093146',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/madridkosekoltuk_4.jpg?v=1776093130',
  ],
  2: [ // Marea Corner Sofa
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/586669473_17851196070600970_2979464147891625364_n_1ff529ed-1eaa-434c-9f87-68402760634e.jpg?v=1776090485',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/587302596_17851196079600970_4980043478742266066_n_139c51c3-0767-47c6-9f29-efda42a3cfe7.jpg?v=1776090485',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/marea_kotuk10.jpg?v=1776091712',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/marea_kotuk11.jpg?v=1776091713',
  ],
  3: [ // Assos Corner Sofa
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/ASSOSkosekoltuktakimi_8_e9662c1a-b591-492a-9169-5b8c264e8970.jpg?v=1776093376',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/ASSOSkosekoltuktakimi_9_07a36c7f-b965-432c-b0f6-368be2ebe5d2.jpg?v=1776093376',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/ASSOSkosekoltuktakimi_1_73357b06-4df6-478c-b3f6-04bc5a6a4a28.jpg?v=1776093376',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/ASSOSkosekoltuktakimi_12_7bb34c2b-932f-4f26-a1a6-b82b58e3be2a.jpg?v=1776093376',
  ],
  4: [ // Nora Bed
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/NORA1.jpg?v=1776104578',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/NORA2.jpg?v=1776104578',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/NORA6.jpg?v=1776104578',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/NORA5.jpg?v=1776104578',
  ],
  5: [ // Riva Furniture Set
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/RIVA7.jpg?v=1776103063',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/RIVA1.jpg?v=1776103321',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/RIVA3.jpg?v=1776103321',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/RIVA2.jpg?v=1776103321',
  ],
  6: [ // Rio Furniture Set
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/RIO1.jpg?v=1776098518',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/RIO4.jpg?v=1776098519',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/RIO5.jpg?v=1776098518',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/RIO3.jpg?v=1776098518',
  ],
  7: [ // Verta Seramik Set
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/VERTA2_90219d3d-2d5e-47b9-a5ba-2a477eda0232.jpg?v=1776097180',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/VERTA1_16d76313-b58a-44c2-b074-32d2b89bcd67.jpg?v=1776097180',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/VERTA3_3b6d9719-ca66-45b5-8cd1-0692772ca97b.jpg?v=1776097114',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/VERTA5_f3375ff9-8b96-410a-b0b2-a63de16e0af5.jpg?v=1776097114',
  ],
  8: [ // Roseir Furniture Set
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image.png?v=1776093943',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/DSC3181.jpg?v=1776093943',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/DSC3179.jpg?v=1776093943',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/DSC3178.jpg?v=1776093943',
  ],
  9: [ // Milano Furniture Set
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/MILANO2.jpg?v=1776093687',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/MILANO.jpg?v=1776093687',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/MILANO3.jpg?v=1775940455',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/MILANO_YEMEK_MASASI.png?v=1775940802',
  ],
  10: [ // Noir Line Set
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/NOIR1.jpg?v=1776101493',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/NOIR3.jpg?v=1776101492',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/NOIR2.jpg?v=1776101492',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/NOIR4.jpg?v=1776101492',
  ],
  11: [ // Arno Furniture Set
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/ARNOMASA1.jpg?v=1776093630',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/IMG_8112.jpg?v=1776093630',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/IMG_8109.jpg?v=1776093630',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/IMG_8110.jpg?v=1776093630',
  ],
  12: [ // Axis Oval Table
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_d537b216-38cd-4722-b6d7-a98058b557f9.png?v=1777480796',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_21695da2-55f9-41d6-85f1-019e246674f6.png?v=1777480796',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/DSC3054-1.jpg?v=1777480717',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/DSC3056-1.jpg?v=1777480717',
  ],
  13: [ // Pure Marble Table
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_58b21bd4-e6b1-4422-89e4-836fffa3bbf1.png?v=1777479758',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_2f09a4fc-6b98-421e-95f4-f5a2131620e0.png?v=1777479758',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/DSC3075-1.jpg?v=1777479682',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/DSC3076-1.jpg?v=1777479683',
  ],
  14: [ // Urban Pearl Table
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_ac0b7ec6-aaa8-4b22-94b0-9b8801b0a0d9.png?v=1777404209',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_64b1a751-0275-4d27-b01a-2e15e9150a1f.png?v=1777404209',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/DSC3157-1.jpg?v=1777404119',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/DSC3160-1.jpg?v=1777404119',
  ],
  15: [ // Flute Beech Table
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_14772ef0-f18d-4602-83c2-383449b502bc.png?v=1777403052',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_49f04b30-f98a-4841-ba34-a7c7fcc4f566.png?v=1777403052',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/DSC3214-1.jpg?v=1777402904',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/DSC3215-1.jpg?v=1777402904',
  ],
  16: [ // Moxie Chair
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_5b7d7732-cbd7-49a1-a000-8a184ae8c9c0.png?v=1777581253',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_3aa48fa0-0368-4963-951a-f80bb4c87d72.png?v=1777581253',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/ZEN_SANDALYE-MOXIE_CHAIR_1.jpg?v=1777581130',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/ZEN_SANDALYE-MOXIE_CHAIR_2.jpg?v=1777581130',
  ],
  17: [ // Apex Natural Chair
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_fd46c02b-4e08-4ee4-9b35-bbe9ce5eb041.png?v=1777581115',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_a153ceb8-fc6f-485f-81fa-15cf9f678500.png?v=1777581115',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/VIOLET_WICKER-APEX_NATURAL_CHAIR_1.jpg?v=1777581005',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/VIOLET_WICKER-APEX_NATURAL_CHAIR_2.jpg?v=1777581006',
  ],
  18: [ // Delta Chair
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_4823de69-1703-4f89-9e5a-7c2d80b40590.png?v=1777580984',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_a92044b4-dbb8-4220-9823-00fcc068be6f.png?v=1777580984',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/VIOLET_SANDALYE-DELTA_CHAIR_1.jpg?v=1777580900',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/VIOLET_SANDALYE-DELTA_CHAIR_2.jpg?v=1777580900',
  ],
  19: [ // Venice Chair
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_8432df98-4317-40c9-aa47-c2a6f9211f8d.png?v=1777580827',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_020f14a7-e01f-435b-81cb-4f1f1c68143e.png?v=1777580827',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/VENEDIK_SANDALYE-AMBER_CHAIR_1.jpg?v=1777580639',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/VENEDIK_SANDALYE-AMBER_CHAIR_2.jpg?v=1777580639',
  ],
  20: [ // Orbit Chair
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_7bf22c01-88c5-4efe-b269-ad638b84def5.png?v=1777580608',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_df503edd-5d71-4d86-aa69-69411c9279cc.png?v=1777580608',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/TOKYO_SANDALYE-ORBIT_CHAIR_1.jpg?v=1777580511',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/TOKYO_SANDALYE-ORBIT_CHAIR_2.jpg?v=1777580511',
  ],
  21: [ // Mono Triple Coffee Table
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_ce5a3075-dcf2-454e-9591-e283e5a62e9a.png?v=1777581951',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/TEXAS-ZIGON_1.jpg?v=1777581894',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/TEXAS-ZIGON_2.jpg?v=1777581892',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/TEXAS-ZIGON_3.jpg?v=1777581894',
  ],
  22: [ // Metro Triple Coffee Table
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_4535cf55-69a1-4b90-a473-32ade1d7220a.png?v=1777581829',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/TEXAS_1_72c51b3e-c8b1-4ee4-9e4a-85001c9ca896.jpg?v=1777581455',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/TEXAS_2_7ca725c5-38f2-4d7a-b5b4-87df4a45b5f2.jpg?v=1777581455',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/TEXAS_3_8e374258-e81c-4ec8-8b84-03402f569b74.jpg?v=1777581456',
  ],
  23: [ // Classic Sofa
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/madridkosekoltuk_3.jpg?v=1776093146',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/madridkosekoltuk_1.jpg?v=1776093146',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/madridkosekoltuk_2.jpg?v=1776093146',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/madridkosekoltuk_4.jpg?v=1776093130',
  ],
  24: [ // Modern Sofa
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/586669473_17851196070600970_2979464147891625364_n_1ff529ed-1eaa-434c-9f87-68402760634e.jpg?v=1776090485',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/587302596_17851196079600970_4980043478742266066_n_139c51c3-0767-47c6-9f29-efda42a3cfe7.jpg?v=1776090485',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/marea_kotuk10.jpg?v=1776091712',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/marea_kotuk11.jpg?v=1776091713',
  ],
  25: [ // Lounge Sofa
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/ASSOSkosekoltuktakimi_8_e9662c1a-b591-492a-9169-5b8c264e8970.jpg?v=1776093376',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/ASSOSkosekoltuktakimi_9_07a36c7f-b965-432c-b0f6-368be2ebe5d2.jpg?v=1776093376',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/ASSOSkosekoltuktakimi_1_73357b06-4df6-478c-b3f6-04bc5a6a4a28.jpg?v=1776093376',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/ASSOSkosekoltuktakimi_12_7bb34c2b-932f-4f26-a1a6-b82b58e3be2a.jpg?v=1776093376',
  ],
  26: [ // Heritage Table
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/heritage-walnut-ev-ortam-1.png?v=1777400902',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/heritage-walnut-ev-ortam-2-yeni.png?v=1777400996',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/DSC3136-1.jpg?v=1777400841',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/DSC3138-1.jpg?v=1777400841',
  ],
  27: [ // Nordic Table
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_b0691546-61d2-4f73-81f9-3a2fa4e5dfe0.png?v=1777324280',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_8dad40d1-3bfa-44c7-bdbc-21fa46d98b8c.png?v=1777324280',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/DSC3178_4.jpg?v=1777324083',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/DSC3179_3.jpg?v=1777324083',
  ],
  28: [ // Cone Table
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_593aa66d-75c3-4341-9680-ffd5bfea2e32.png?v=1777323727',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_365139eb-5e6f-4cf3-8574-0a2999deb57e.png?v=1777323727',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/DSC3206-1.jpg?v=1777323530',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/DSC3207-1.jpg?v=1777323529',
  ],
  29: [ // Torino Table
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/torino3.png?v=1776720287',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/torino4.png?v=1776720287',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/TORINO_1_3_1.jpg?v=1776720287',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/TORINO_2_1_1.jpg?v=1776720287',
  ],
  30: [ // Masami Table
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/MASAMI1_1.jpg?v=1776542238',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/MASAMI2.jpg?v=1776542238',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/MASAMI3.jpg?v=1776542238',
    'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/MASAMI1_1.jpg?v=1776542238',
  ],
};

// Diğer ürünler için de aynı resimleri kullan (benzer ürünler)
for (let i = 31; i <= 59; i++) {
  if (!productGallery[i]) {
    // Benzer ürünlere göre resim ata
    if (i >= 31 && i <= 33) productGallery[i] = productGallery[23]; // Sofas
    else if (i >= 34 && i <= 36) productGallery[i] = productGallery[1]; // Corner Sofas
    else if (i >= 37 && i <= 40) productGallery[i] = productGallery[12]; // Dining Tables
    else if (i >= 41 && i <= 44) productGallery[i] = productGallery[16]; // Chairs
    else if (i >= 45 && i <= 48) productGallery[i] = productGallery[21]; // Coffee Tables
    else if (i >= 49 && i <= 53) productGallery[i] = productGallery[5]; // Furniture Sets
    else productGallery[i] = productGallery[4]; // Beds
  }
}

// Galeri HTML'i oluştur
function createGalleryHTML(images, productId) {
  const mainImage = images[0];
  const thumbnails = images.map((img, idx) => 
    `<img src="${img}" class="thumb${idx === 0 ? ' active' : ''}" onclick="changeImage(${productId}, '${img}', this)" alt="">`
  ).join('');
  
  return `
    <div class="gallery">
      <img src="${mainImage}" id="main-image-${productId}" class="main-image" alt="">
      <div class="thumbnails">
        ${thumbnails}
      </div>
    </div>
    <style>
      .gallery { width: 100%; }
      .main-image { width: 100%; border-radius: 0.5rem; background: #f1f5f9; margin-bottom: 1rem; }
      .thumbnails { display: flex; gap: 0.5rem; flex-wrap: wrap; }
      .thumbnails img { width: 80px; height: 80px; object-fit: cover; border-radius: 0.25rem; cursor: pointer; border: 2px solid transparent; transition: border-color 0.2s; }
      .thumbnails img:hover { border-color: #64748b; }
      .thumbnails img.active { border-color: #0f172a; }
    </style>
    <script>
      function changeImage(productId, src, thumb) {
        document.getElementById('main-image-' + productId).src = src;
        document.querySelectorAll('.thumbnails img').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      }
    </script>
  `;
}

// Her ürün sayfasını güncelle
const productsDir = path.join(__dirname, 'products');

Object.entries(productGallery).forEach(([productId, images]) => {
  const filePath = path.join(productsDir, `product-${productId}.html`);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Eski product-image-container'ı bul ve galeri ile değiştir
    const oldContainerPattern = /<div class="product-image-container">[\s\S]*?<\/div>/;
    const galleryHTML = createGalleryHTML(images, productId);
    
    content = content.replace(oldContainerPattern, galleryHTML);
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated product-${productId}.html with gallery (${images.length} images)`);
  }
});

console.log('\nAll product pages updated with image galleries!');
