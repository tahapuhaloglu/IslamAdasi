# İslam Adası - Mobil Oyun Projesi

React Native ve Expo ile geliştirilen, çocuklar için ada temalı İslami eğitim ve mini oyun uygulaması.

## Proje Özeti

İslam Adası; Elifba, Namaz, Hadis ve Kıble adaları üzerinden ilerleyen, görsel ağırlıklı ve oyunlaştırılmış bir öğrenme deneyimi sunmayı hedefler.

## Mevcut Durum

- Expo SDK 56 ile çalışır.
- Uygulama landscape modda açılır.
- Ana harita tam ekran `stretch` görüntülenir.
- Haritadaki 4 ada tıklanabilir durumdadır.
- Elifba Adası gerçek 4x5 hafıza oyunu olarak çalışır.
- Namaz, Hadis ve Kıble adaları ayrı component dosyalarıyla modüler başlangıç ekranlarına sahiptir.
- Ana ekranda toplam puan tutulur.

## Yol Haritası

### 1. Teknik Altyapı ve Hazırlık

- [x] `app.json` splash ve icon yolları kontrol edildi.
- [x] Android/iOS için landscape yönlendirme ayarı korundu.
- [x] Metro cache temizliği için `expo start --clear` kullanıldı.
- [ ] Android emülatörde Auto-rotate ayarı cihaz tarafında doğrulanacak.

### 2. Ana Harita Modülü

- [x] Harita `resizeMode="stretch"` ile tam ekrana yayılıyor.
- [x] Elifba, Namaz, Hadis ve Kıble bölgeleri `TouchableOpacity` ile tıklanabilir.
- [x] Ada geçişleri `App.js` içinde `useState` ile yönetiliyor.
- [x] Ana ekranda puan tablosu bulunuyor.

### 3. Elifba Adası

- [x] 4 satır x 5 sütun, toplam 20 kartlık matris kuruldu.
- [x] `letters.json` dosyasından rastgele 10 harf seçiliyor.
- [x] Her harf ikizlenerek 20 kartlık deste oluşturuluyor.
- [x] Kartlar açılıp kapanıyor.
- [x] Doğru eşleşen kartlar kalıcı olarak açık kalıyor.
- [x] Yanlış eşleşmeler 1 saniye sonra kapanıyor.
- [x] 10 çift tamamlanınca tebrik mesajı ve "Yeniden Oyna" butonu gösteriliyor.

### 4. Diğer Adalar

- [x] `PrayerGame.jsx`, `HadithGame.jsx`, `QiblaGame.jsx` dosyaları oluşturuldu.
- [ ] Namaz hareketleri için gerçek eşleştirme oyunu geliştirilecek.
- [ ] Hadis kartları için veri dosyası ve eşleştirme akışı eklenecek.
- [ ] Kıble için yön bulma veya pusula mantığı geliştirilecek.

### 5. Görsel ve İşitsel Dokunuşlar

- [x] Elifba kartlarında açılma ve eşleşme durumları görsel olarak ayrıldı.
- [ ] `expo-av` ile kart tıklama ve eşleşme sesleri bağlanacak.
- [ ] `react-native-reanimated` ile gerçek flip animasyonu eklenecek.
- [x] Eşleşmeler ve mini görevler puan sistemine bağlandı.

## Çalıştırma

```bash
cd frontend
npx expo start --clear
```

8081 doluysa:

```bash
npx expo start --clear --port 8082
```
