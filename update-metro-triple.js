const fs = require('fs');
const path = require('path');

// Mevcut ürünleri oku
let products = JSON.parse(fs.readFileSync('final-products.json', 'utf8'));

// ID 2'yi Metro Triple Brown olarak değiştir
const metroIndex = products.findIndex(p => p.id === 2);
if (metroIndex !== -1) {
    products[metroIndex].name = 'Metro Triple Brown Sehpa';
}

// Yeni ürünler ekle (53 ve 54)
const newProducts = [
    {
        id: 53,
        name: 'Metro Triple White Sehpa',
        category: 'coffee_table',
        categoryNameTR: 'Sehpa',
        categoryNameEN: 'Coffee Table',
        images: [
            'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_7ad2a9de-45b0-4467-95fb-9eb94e8e67dd.png?v=1777581551',
            'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/TEXAS-BEYAZ_1_0010da7e-c424-4053-93e9-525711feb49f.jpg?v=1777828009',
            'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/TEXAS-BEYAZ_2_8725fdb9-5cf4-4767-b63b-b93cbb906599.jpg?v=1777827718',
            'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/TEXAS-BEYAZ_3_2c56bd38-d18d-4e21-9a3f-023d59b5ca55.jpg?v=1777827500'
        ]
    },
    {
        id: 54,
        name: 'Metro Triple Black Sehpa',
        category: 'coffee_table',
        categoryNameTR: 'Sehpa',
        categoryNameEN: 'Coffee Table',
        images: [
            'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/image_4e5b9a29-5ecf-4a35-8be5-930ffe549ee2.png?v=1777581780',
            'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/TEXAS-SIYAH_1_53253c71-ad14-473f-9ca8-7a1c3031c0ea.jpg?v=1777827389',
            'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/TEXAS-SIYAH_2_b837247b-3666-4f2d-9d45-880202122206.jpg?v=1777827439',
            'https://cdn.shopify.com/s/files/1/0766/8246/1355/files/TEXAS-SIYAH_3_a279fc18-6121-43fb-8205-507548ce8d03.jpg?v=1777827500'
        ]
    }
];

products = products.concat(newProducts);

// Kaydet
fs.writeFileSync('final-products.json', JSON.stringify(products, null, 2));

console.log('✅ Updated products:');
console.log('- ID 2: Metro Triple Brown Sehpa (renamed)');
console.log('- ID 53: Metro Triple White Sehpa (added with 4 images)');
console.log('- ID 54: Metro Triple Black Sehpa (added with 4 images)');
console.log('\nTotal products:', products.length);
