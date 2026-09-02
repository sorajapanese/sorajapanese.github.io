/*
============================================================
SORA MENÜ - ÜRÜN / FİYAT / İKON DÜZENLEME ALANI
============================================================
ÜRÜN SAYFALARINDA SADECE BU DOSYAYI DÜZENLEMEN YETERLİ.

Bölüm başlığı:
  { type: "heading", title: "SALATALAR" }

Ürün satırı:
  { name: "Edamame", price: "290 TL", icons: ["vegetarian"] }

İkonlar:
  Acı / çiğ ürün işareti: "spicy"
  Vejetaryen:             "vegetarian"

Bir ürünü kaldırmak için ilgili satırı silmen yeterli.
============================================================
*/

const menuPages = {
  page3a: [
    { type: "heading", title: "BAŞLANGIÇLAR" },
    { name: "Çin Böreği",                price: "330 TL", icons: [], nutrition: { kcal: 320, protein: 8,  carbs: 42, fat: 13, allergens: ["Gluten", "Soya"] } },
    { name: "Karides Cipsi",             price: "250 TL", icons: ["seafood"], nutrition: { kcal: 260, protein: 6,  carbs: 30, fat: 12, allergens: ["Kabuklu deniz ürünü", "Gluten"] } },
    { name: "Buharda Çin Mantısı",       price: "420 TL", icons: [], nutrition: { kcal: 360, protein: 18, carbs: 48, fat: 10, allergens: ["Gluten", "Soya"] } },
    { name: "Kızarmış Çin Mantısı",      price: "420 TL", icons: [], nutrition: { kcal: 450, protein: 18, carbs: 49, fat: 19, allergens: ["Gluten", "Soya"] } },
    { name: "Dana Etli Gyoza",           price: "430 TL", icons: [], nutrition: { kcal: 430, protein: 20, carbs: 46, fat: 18, allergens: ["Gluten", "Soya"] } },
    { name: "Corn Tempura",              price: "470 TL", icons: ["vegetarian"], nutrition: { kcal: 390, protein: 6,  carbs: 56, fat: 16, allergens: ["Gluten", "Yumurta"] } },
    { name: "Veggy Tempura",             price: "380 TL", icons: ["vegetarian"], nutrition: { kcal: 420, protein: 8,  carbs: 58, fat: 18, allergens: ["Gluten", "Yumurta"] } },
    { name: "Tavuklu Bun (2 Adet)",      price: "620 TL", icons: [], nutrition: { kcal: 520, protein: 26, carbs: 68, fat: 16, allergens: ["Gluten", "Soya"] } },
    { name: "Dana Etli Bun (2 Adet)",    price: "650 TL", icons: [], nutrition: { kcal: 560, protein: 27, carbs: 69, fat: 20, allergens: ["Gluten", "Soya"] } },
    { name: "Sora Bomb",                 price: "680 TL", icons: [], nutrition: { kcal: 600, protein: 24, carbs: 52, fat: 31, allergens: ["Balık", "Gluten", "Soya", "Yumurta"] } },
    { name: "Fish and Chips",            price: "680 TL", icons: [], nutrition: { kcal: 720, protein: 32, carbs: 78, fat: 30, allergens: ["Balık", "Gluten", "Yumurta"] } },
    { name: "Edamame",                   price: "290 TL", icons: ["vegetarian"], nutrition: { kcal: 190, protein: 17, carbs: 14, fat: 8, allergens: ["Soya"] } },
    { name: "Edamame Chili Garlic",      price: "310 TL", icons: ["spicy", "vegetarian"], nutrition: { kcal: 240, protein: 17, carbs: 20, fat: 11, allergens: ["Soya"] } },
    { name: "Nori Tempura",              price: "150 TL", icons: ["vegetarian"], nutrition: { kcal: 260, protein: 5, carbs: 38, fat: 10, allergens: ["Gluten", "Yumurta"] } }
  ],

  page3b: [
    { type: "heading", title: "SALATALAR" },
    { name: "Acı Lahana Salatası",       price: "280 TL", icons: ["spicy"], nutrition: { kcal: 180, protein: 3, carbs: 18, fat: 11, allergens: ["Soya", "Susam"] } },
    { name: "Fresh Kimchi",              price: "310 TL", icons: ["spicy"], nutrition: { kcal: 90, protein: 3, carbs: 16, fat: 2, allergens: ["Balık"] } },
    { name: "Wakame Yosun Salatası",     price: "380 TL", icons: ["vegetarian"], nutrition: { kcal: 160, protein: 4, carbs: 20, fat: 7, allergens: ["Susam", "Soya"] } },

    { type: "heading", title: "ÇORBALAR" },
    { name: "Miso Çorba",                price: "310 TL", icons: ["spicy"], nutrition: { kcal: 220, protein: 10, carbs: 25, fat: 8, allergens: ["Soya", "Gluten", "Yumurta"] } },
    { name: "Spicy Korean Soup",         price: "420 TL", icons: ["spicy"], nutrition: { kcal: 320, protein: 18, carbs: 24, fat: 16, allergens: ["Soya", "Susam"] } }
  ],

  page4: [
    { type: "heading", title: "NIGIRI (1 ADET)" },
    { name: "Avokado Nigiri", price: "100 TL", icons: ["vegetarian"], nutrition: { kcal: 55, protein: 1, carbs: 10, fat: 2, allergens: ["—"] } },
    { name: "Sake Nigiri", price: "150 TL", icons: ["raw"], nutrition: { kcal: 65, protein: 4, carbs: 8, fat: 2, allergens: ["Balık"] } },
    { name: "Suzuki Nigiri", price: "185 TL", icons: ["raw"], nutrition: { kcal: 55, protein: 4, carbs: 8, fat: 1, allergens: ["Balık"] } },
    { name: "Unagi Nigiri", price: "210 TL", icons: ["raw"], nutrition: { kcal: 85, protein: 5, carbs: 10, fat: 3, allergens: ["Balık", "Soya", "Gluten"] } },
    { name: "Toro Nigiri", price: "250 TL", icons: ["raw"], nutrition: { kcal: 75, protein: 4, carbs: 8, fat: 3, allergens: ["Balık"] } },
    { name: "Maguro Nigiri", price: "250 TL", icons: ["raw"], nutrition: { kcal: 60, protein: 5, carbs: 8, fat: 1, allergens: ["Balık"] } },

    { type: "heading", title: "SASHIMI (2 ADET)" },
    { name: "Sake Sashimi", price: "280 TL", icons: ["raw"], nutrition: { kcal: 70, protein: 10, carbs: 0, fat: 3, allergens: ["Balık"] } },
    { name: "Unagi Sashimi", price: "350 TL", icons: [], nutrition: { kcal: 170, protein: 10, carbs: 20, fat: 6, allergens: ["Balık", "Soya", "Gluten"] } },
    { name: "Suzuki Sashimi", price: "300 TL", icons: ["raw"], nutrition: { kcal: 55, protein: 11, carbs: 0, fat: 1, allergens: ["Balık"] } },
    { name: "Toro Sashimi", price: "520 TL", icons: ["raw"], nutrition: { kcal: 90, protein: 10, carbs: 0, fat: 6, allergens: ["Balık"] } },
    { name: "Maguro Sashimi", price: "520 TL", icons: ["raw"], nutrition: { kcal: 65, protein: 13, carbs: 0, fat: 1, allergens: ["Balık"] } }
  ],
  page5: [
    { name: "Kappa Maki",      price: "380 TL", icons: ["vegetarian"], nutrition: { kcal: 170, protein: 4,  carbs: 35, fat: 1,  allergens: ["Belirgin alerjen yok"] } },
    { name: "Avokado Maki",    price: "380 TL", icons: ["vegetarian"], nutrition: { kcal: 220, protein: 4,  carbs: 36, fat: 7,  allergens: ["Belirgin alerjen yok"] } },
    { name: "Somon Maki",      price: "420 TL", icons: ["raw"], nutrition: { kcal: 250, protein: 11, carbs: 35, fat: 7,  allergens: ["Balık"] } },
    { name: "Surimi Maki",     price: "420 TL", icons: ["seafood"], nutrition: { kcal: 240, protein: 9,  carbs: 39, fat: 5,  allergens: ["Balık", "Gluten", "Yumurta"] } },
    { name: "Tora Maki",       price: "580 TL", icons: ["raw"], nutrition: { kcal: 285, protein: 14, carbs: 38, fat: 8,  allergens: ["Balık"] } },
    { name: "Maguro Maki",     price: "580 TL", icons: ["raw"], nutrition: { kcal: 235, protein: 13, carbs: 35, fat: 4,  allergens: ["Balık"] } },
    { name: "Mix Maki",        price: "750 TL", icons: ["raw", "seafood"] },

    { name: "Green Sora",      price: "600 TL", description: "Avokado, togarashi, garnitür, kapya biber, wakame, salatalık, ponzu", icons: ["vegetarian"], nutrition: { kcal: 360, protein: 7,  carbs: 62, fat: 10, allergens: ["Soya", "Gluten"] } },
    { name: "Kyoto Garden",    price: "600 TL", description: "Togarashi, wakame, avokado, salatalık, çilek, susam", icons: ["vegetarian"], nutrition: { kcal: 380, protein: 7,  carbs: 65, fat: 11, allergens: ["Susam"] } },
    { name: "Zen Garden",      price: "600 TL", description: "Pancar, kuşkonmaz, salatalık, avokado, kapya biber, kinoa, peynir", icons: ["vegetarian"], nutrition: { kcal: 420, protein: 10, carbs: 63, fat: 14, allergens: ["Süt ve süt ürünleri"] } }
  ],

  // 6. SAYFA — SPECIAL ROLLS / PİŞMİŞ ROLLER
  // Besin değerleri porsiyon bazında yaklaşık değerlerdir.
  page6: [
    { name: "Red Samurai", price: "680 TL", description: "Somon, acı surimi, avokado, salatalık, teriyaki", icons: ["spicy"], nutrition: { kcal: 470, protein: 20, carbs: 58, fat: 16, allergens: ["Balık", "Soya", "Gluten", "Yumurta"] } },
    { name: "Sora Flame Salmon", price: "670 TL", description: "Somon, avokado, teriyaki, panko, acı mayonez, çıtır patates", icons: ["spicy"], nutrition: { kcal: 570, protein: 20, carbs: 67, fat: 25, allergens: ["Balık", "Gluten", "Soya", "Yumurta"] } },
    { name: "Golden Ebi", price: "670 TL", description: "Tempura karides, hardal sos, avokado, salatalık, peynir, kızarmış havuç", icons: ["seafood"], nutrition: { kcal: 590, protein: 18, carbs: 69, fat: 26, allergens: ["Kabuklu deniz ürünü", "Gluten", "Yumurta", "Hardal", "Süt ve süt ürünleri"] } },
    { name: "Tokyo Breeze", price: "690 TL", description: "Levrek, avokado, salatalık, teriyaki", nutrition: { kcal: 390, protein: 18, carbs: 50, fat: 12, allergens: ["Balık", "Soya", "Gluten"] } },
    { name: "Ebi Crunch", price: "680 TL", description: "Tempura karides, çıtır panko, avokado, salatalık, peynir, patates", icons: ["seafood"], nutrition: { kcal: 620, protein: 18, carbs: 75, fat: 28, allergens: ["Kabuklu deniz ürünü", "Gluten", "Yumurta", "Süt ve süt ürünleri"] } },
    { name: "Unagi Sora", price: "710 TL", description: "Yılan balığı, avokado, salatalık, teriyaki, susam", nutrition: { kcal: 510, protein: 18, carbs: 69, fat: 18, allergens: ["Balık", "Soya", "Susam", "Gluten"] } },
    { name: "Dragon Wave", price: "750 TL", description: "Yılan balığı, levrek, avokado, salatalık, peynir, susam, teriyaki", nutrition: { kcal: 610, protein: 24, carbs: 70, fat: 24, allergens: ["Balık", "Soya", "Gluten", "Susam", "Süt ve süt ürünleri"] } },
    { name: "Tokyo Crispy", price: "810 TL", description: "Tempura deniz tarağı, siyah panko, trüf mayonezi, avokado, salatalık", icons: ["seafood"], nutrition: { kcal: 680, protein: 21, carbs: 72, fat: 34, allergens: ["Yumuşakça", "Gluten", "Yumurta"] } },
    { name: "Tuna Crunch", price: "830 TL", description: "Tuna balığı, tempura karides, avokado, salatalık", icons: ["seafood"], nutrition: { kcal: 600, protein: 26, carbs: 68, fat: 24, allergens: ["Balık", "Kabuklu deniz ürünü", "Gluten", "Yumurta"] } },
    { name: "Sora Crunch", price: "735 TL", description: "Somon, tempura karides, siyah pirinç, avokado, peynir, salatalık", icons: ["seafood"], nutrition: { kcal: 650, protein: 26, carbs: 76, fat: 27, allergens: ["Balık", "Kabuklu deniz ürünü", "Gluten", "Süt ve süt ürünleri", "Yumurta"] } },
    { name: "Black Dragon", price: "710 TL", description: "Levrek, tempura somon, avokado, salatalık, peynir, acı mayonez, chili biber", icons: ["spicy"], nutrition: { kcal: 640, protein: 25, carbs: 69, fat: 29, allergens: ["Balık", "Süt ve süt ürünleri", "Gluten", "Yumurta"] } },
  ],

  // 7. SAYFA — SPECIAL ROLLS / ÇİĞ ROLLER
  // Besin değerleri porsiyon bazında yaklaşık değerlerdir.
  page7: [
    { name: "Sora Salmon", price: "660 TL", description: "Somon, peynir, avokado, ponzu", icons: ["raw"], nutrition: { kcal: 480, protein: 20, carbs: 48, fat: 22, allergens: ["Balık", "Süt ve süt ürünleri", "Soya", "Gluten"] } },
    { name: "Philadelphia Sora", price: "680 TL", description: "Avokado, salatalık, peynir, somon, ponzu sos, japon mayonezi", icons: ["raw"], nutrition: { kcal: 560, protein: 20, carbs: 55, fat: 28, allergens: ["Balık", "Süt ve süt ürünleri", "Soya", "Gluten", "Yumurta"] } },
    { name: "Green Dragon", price: "690 TL", description: "Levrek, yeşil sos, kırmızı sos, avokado, salatalık, peynir", icons: ["raw"], nutrition: { kcal: 500, protein: 18, carbs: 55, fat: 22, allergens: ["Balık", "Süt ve süt ürünleri", "Soya"] } },
    { name: "Black Tokyo", price: "690 TL", description: "Avokado, somon, teriyaki sos, salatalık, siyah tobiko, acı peynir", icons: ["raw", "spicy"], nutrition: { kcal: 540, protein: 21, carbs: 56, fat: 25, allergens: ["Balık", "Süt ve süt ürünleri", "Soya", "Gluten"] } },
    { name: "Samurai Tartar", price: "690 TL", description: "Somon tartar, avokado, peynir, salatalık, hardal, acı sos, çıtır panko", icons: ["raw", "spicy"], nutrition: { kcal: 590, protein: 23, carbs: 60, fat: 27, allergens: ["Balık", "Süt ve süt ürünleri", "Hardal", "Gluten", "Yumurta"] } },
    { name: "California Sora", price: "680 TL", description: "Tobiko, avokado, salatalık, peynir, surimi, japon mayonezi", icons: ["raw"], nutrition: { kcal: 570, protein: 21, carbs: 58, fat: 27, allergens: ["Balık", "Süt ve süt ürünleri", "Yumurta"] } },
    { name: "Tuna Tartar", price: "710 TL", description: "Tuna balığı, toro ezmesi, togarashi, susam yağı, avokado, teriyaki, acı mayonez", icons: ["raw", "spicy"], nutrition: { kcal: 590, protein: 26, carbs: 54, fat: 28, allergens: ["Balık", "Susam", "Soya", "Gluten", "Yumurta"] } },
    { name: "Maguro Roll", price: "775 TL", description: "Maguro, toro, avokado, salatalık, peynir, acı sos", icons: ["raw", "spicy"], nutrition: { kcal: 540, protein: 27, carbs: 50, fat: 23, allergens: ["Balık", "Süt ve süt ürünleri"] } },
    { name: "Ocean Mix", price: "830 TL", description: "Salatalık, avokado, peynir, somon, levrek, maguro", icons: ["raw"], nutrition: { kcal: 530, protein: 30, carbs: 50, fat: 20, allergens: ["Balık", "Süt ve süt ürünleri"] } },
    { name: "Lemon Sea", price: "650 TL", description: "Levrek, peynir, limon, avokado, haşhaş tohumu", icons: ["raw"], nutrition: { kcal: 450, protein: 17, carbs: 57, fat: 17, allergens: ["Balık", "Süt ve süt ürünleri"] } }
  ]
,

  // 8. SAYFA — ANA YEMEKLER & IZGARALAR
  // Besin değerleri reçete gramajları kesinleşene kadar yaklaşık porsiyon değerleridir.
  page8: [
    { name: "Tatlı Ekşi Soslu Tavuk", price: "710 TL", icons: [], nutrition: { kcal: 650, protein: 32, carbs: 72, fat: 26, allergens: ["Gluten", "Soya", "Yumurta"] } },
    { name: "Amiral Tso Tavuk", price: "720 TL", icons: ["spicy"], nutrition: { kcal: 720, protein: 35, carbs: 78, fat: 30, allergens: ["Gluten", "Soya", "Yumurta"] } },
    { name: "Shao Pao Tavuk", price: "870 TL", icons: [], nutrition: { kcal: 620, protein: 35, carbs: 55, fat: 28, allergens: ["Soya", "Gluten"], note: "Sos reçetesi netleştiğinde alerjen bilgisi tekrar teyit edilmelidir." } },
    { name: "Bulgogi Dana", price: "870 TL", icons: [], nutrition: { kcal: 610, protein: 38, carbs: 42, fat: 30, allergens: ["Soya", "Susam"] } },
    { name: "Yeşil Soğanlı Dana", price: "890 TL", icons: [], nutrition: { kcal: 580, protein: 38, carbs: 30, fat: 32, allergens: ["Soya"] } },
    { name: "Çıtır Patlıcanlı Dana", price: "910 TL", icons: ["spicy"], nutrition: { kcal: 760, protein: 35, carbs: 68, fat: 40, allergens: ["Gluten", "Soya"] } },

    { name: "Antrikot", price: "400 g — 1.600 TL", icons: [], nutrition: { kcal: 1160, protein: 104, carbs: 0, fat: 84, allergens: ["Belirgin alerjen yok"], note: "400 g et için yaklaşık değerdir; sos/tereyağı kullanımı dahil değildir." } },
    { name: "Bonfile", price: "1 adet 475 TL / 4 adet 1.900 TL", icons: [], nutrition: { kcal: 190, protein: 26, carbs: 0, fat: 9, allergens: ["Belirgin alerjen yok"], note: "1 adet için yaklaşık değerdir. 4 adet porsiyon yaklaşık 760 kcal'dir." } },
    { name: "Pirzola", price: "1 adet 400 TL / 4 adet 1.600 TL", icons: [], nutrition: { kcal: 290, protein: 24, carbs: 0, fat: 22, allergens: ["Belirgin alerjen yok"], note: "1 adet için yaklaşık değerdir. 4 adet porsiyon yaklaşık 1.160 kcal'dir." } },
    { name: "Wagyu", price: "15.000 TL", icons: [], nutrition: { kcal: null, protein: null, carbs: null, fat: null, allergens: ["Belirgin alerjen yok"], note: "Gramaj belirtilmediği için besin değeri hesaplanmamıştır." } }
  ],

  // 9. SAYFA — NOODLE & RICE / UDON / RAMEN
  // Besin değerleri porsiyon bazında yaklaşık değerlerdir.
  page9: [
    { name: "Sebzeli Noodle", price: "480 TL", nutrition: { kcal: 420, protein: 10, carbs: 65, fat: 13, allergens: ["Gluten", "Soya", "Susam"] } },
    { name: "Tavuklu Noodle", price: "610 TL", nutrition: { kcal: 560, protein: 28, carbs: 66, fat: 18, allergens: ["Gluten", "Soya", "Susam"] } },
    { name: "Dana Etli Noodle", price: "710 TL", nutrition: { kcal: 610, protein: 30, carbs: 67, fat: 22, allergens: ["Gluten", "Soya", "Susam"] } },
    { name: "Karidesli Noodle", price: "730 TL", icons: ["seafood"], nutrition: { kcal: 590, protein: 25, carbs: 66, fat: 20, allergens: ["Kabuklu deniz ürünü", "Gluten", "Soya", "Susam"] } },
    { name: "Sade Noodle", price: "400 TL", nutrition: { kcal: 340, protein: 8, carbs: 58, fat: 8, allergens: ["Gluten", "Soya"] } },
    { name: "Fried Rice", price: "580 TL", nutrition: { kcal: 520, protein: 12, carbs: 79, fat: 16, allergens: ["Soya", "Gluten", "Yumurta"] } },
    { name: "Sade Pilav", price: "400 TL", nutrition: { kcal: 310, protein: 6, carbs: 67, fat: 1, allergens: ["Belirgin alerjen yok"] } },

    { name: "Bulgogi Udon Tavuk", price: "750 TL", nutrition: { kcal: 740, protein: 34, carbs: 82, fat: 28, allergens: ["Gluten", "Soya", "Susam"] } },
    { name: "Bulgogi Udon Dana", price: "780 TL", nutrition: { kcal: 780, protein: 36, carbs: 84, fat: 30, allergens: ["Gluten", "Soya", "Susam"] } },

    { name: "Tavuklu Ramen", price: "710 TL", nutrition: { kcal: 690, protein: 31, carbs: 72, fat: 25, allergens: ["Gluten", "Soya", "Yumurta", "Susam"] } },
    { name: "Karidesli Ramen", price: "830 TL", icons: ["seafood"], nutrition: { kcal: 720, protein: 28, carbs: 73, fat: 27, allergens: ["Kabuklu deniz ürünü", "Gluten", "Soya", "Yumurta", "Susam"] } },
    { name: "Dana Etli Ramen", price: "810 TL", nutrition: { kcal: 760, protein: 34, carbs: 74, fat: 29, allergens: ["Gluten", "Soya", "Yumurta", "Susam"] } }
  ],

  // 10. SAYFA — TATLILAR, SOĞUK İÇECEKLER & SICAK İÇECEKLER
  // Besin değerleri reçete/servis gramajları kesinleşene kadar yaklaşık değerlerdir.
  page10: [
    { name: "Kızarmış Dondurma", price: "400 TL", nutrition: { kcal: 420, protein: 7, carbs: 52, fat: 20, allergens: ["Süt ve süt ürünleri", "Gluten", "Yumurta"], note: "Porsiyon ve kaplama reçetesine göre değişebilir." } },
    { name: "Mochi (Çilek/Vanilya)", price: "350 TL", nutrition: { kcal: 220, protein: 3, carbs: 44, fat: 4, allergens: ["Süt ve süt ürünleri"], note: "Dolgu çeşidine göre değerler değişebilir." } },
    { name: "Japanese Cheesecake", price: "500 TL", nutrition: { kcal: 360, protein: 8, carbs: 34, fat: 22, allergens: ["Süt ve süt ürünleri", "Yumurta", "Gluten"] } },

    { name: "Küçük Su", price: "60 TL", nutrition: { kcal: 0, protein: 0, carbs: 0, fat: 0, allergens: ["Belirgin alerjen yok"] } },
    { name: "Uludağ Premium 250 ml Soda", price: "120 TL", nutrition: { kcal: 0, protein: 0, carbs: 0, fat: 0, allergens: ["Belirgin alerjen yok"] } },
    { name: "Cola / Fanta / Sprite", price: "120 TL", nutrition: { kcal: 140, protein: 0, carbs: 35, fat: 0, allergens: ["Belirgin alerjen yok"], note: "Yaklaşık 330 ml standart şekerli ürün için; seçilen içeceğe göre değişir." } },
    { name: "Fuse Tea (Limon / Şeftali)", price: "120 TL", nutrition: { kcal: 90, protein: 0, carbs: 22, fat: 0, allergens: ["Belirgin alerjen yok"], note: "Seçilen aromaya ve şişe hacmine göre değişebilir." } },
    { name: "Uludağ Gazoz 330 ml", price: "120 TL", nutrition: { kcal: 140, protein: 0, carbs: 35, fat: 0, allergens: ["Belirgin alerjen yok"] } },
    { name: "Büyük Su", price: "100 TL", nutrition: { kcal: 0, protein: 0, carbs: 0, fat: 0, allergens: ["Belirgin alerjen yok"] } },
    { name: "San Pellegrino 250 ml", price: "160 TL", nutrition: { kcal: 0, protein: 0, carbs: 0, fat: 0, allergens: ["Belirgin alerjen yok"] } },
    { name: "San Pellegrino 750 ml", price: "260 TL", nutrition: { kcal: 0, protein: 0, carbs: 0, fat: 0, allergens: ["Belirgin alerjen yok"] } },

    { name: "Türk Kahvesi", price: "160 TL", nutrition: { kcal: 7, protein: 0.3, carbs: 0.4, fat: 0.3, allergens: ["Belirgin alerjen yok"], note: "Şekersiz servis için yaklaşık değerdir." } },
    { name: "Bitki Çayı", price: "180 TL", nutrition: { kcal: 2, protein: 0, carbs: 0.4, fat: 0, allergens: ["Belirgin alerjen yok"], note: "Şekersiz servis için yaklaşık değerdir." } },
    { name: "Filtre Kahve", price: "180 TL", nutrition: { kcal: 3, protein: 0.3, carbs: 0, fat: 0, allergens: ["Belirgin alerjen yok"], note: "Sade servis için yaklaşık değerdir." } },
    { name: "Yeşil Çay", price: "160 TL", nutrition: { kcal: 2, protein: 0, carbs: 0.4, fat: 0, allergens: ["Belirgin alerjen yok"], note: "Şekersiz servis için yaklaşık değerdir." } }
  ]

};
