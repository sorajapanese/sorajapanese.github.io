SORA QR MENU — DÜZENLENEBİLİR SÜRÜM

ANA KURAL:
Ürün/fiyat/açıklama değişiklikleri için sadece menu-data.js dosyasını düzenleyin.

ÖRNEK FİYAT DEĞİŞİKLİĞİ:
{ name: "Edamame", price: 290 }
→
{ name: "Edamame", price: 320 }

ÜRÜN SİLME:
İlgili { name: ..., price: ... } satırını silin.

YENİ ÜRÜN EKLEME:
Aynı kategori içindeki items: [ ... ] listesine yeni bir obje ekleyin.
Örn: { name: "Yeni Ürün", price: 450 },

AÇIKLAMALI ÜRÜN:
{ name: "Lemon Sea", price: 620, description: "Levrek, peynir..." }

TASARIM DOSYALARI:
style.css = görünüm ve responsive kurallar
menu-render.js = menu-data.js verisini sayfalara basar
assets/sora-menu-page3-bg.png = 3–11. sayfaların ortak master arka planı

Kapak ve hikâye sayfaları görsel olarak korunmuştur.
