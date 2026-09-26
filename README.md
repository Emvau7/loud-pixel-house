# Loud Pixel House — strona internetowa

Statyczna strona (czysty HTML/CSS/JS, bez frameworka i bez kroku budowania), gotowa do hostowania na GitHub Pages pod domeną `loudpixelhouse.com`.

## Stan projektu

Strona jest w pełni działająca i wygenerowana ze wzorca "premium studio", ale kilka rzeczy czeka na Twoje materiały i decyzje — patrz sekcja **TODO** na końcu.

---

## 1. Jak podejrzeć stronę lokalnie

Strona to zwykłe pliki HTML/CSS/JS — możesz otworzyć `index.html` bezpośrednio w przeglądarce, ale niektóre rzeczy (fetch do formularza, moduły) działają lepiej przez lokalny serwer. Najprościej:

**Jeśli masz Pythona** (zwykle jest domyślnie na Windows/Mac):
```bash
cd loud-pixel-house
python -m http.server 8000
```
Potem otwórz `http://localhost:8000` w przeglądarce.

**Jeśli masz Node.js:**
```bash
cd loud-pixel-house
npx serve .
```

## 2. Jak wypchnąć kod na GitHub

```bash
cd loud-pixel-house
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<twoj-login>/<nazwa-repo>.git
git push -u origin main
```

(Repozytorium najpierw utwórz na github.com — przycisk "New repository", bez README/gitignore, żeby nie kolidowało z plikami lokalnymi.)

## 3. Jak włączyć GitHub Pages

1. Wejdź w swoje repozytorium na GitHub → **Settings** → **Pages**.
2. W "Build and deployment" → **Source**: wybierz **Deploy from a branch**.
3. **Branch**: `main`, folder: `/ (root)`.
4. Zapisz. Po chwili strona będzie dostępna pod `https://<twoj-login>.github.io/<nazwa-repo>/`.

## 4. Jak podpiąć domenę `loudpixelhouse.com` (kupioną w OVH)

### W panelu OVH (Strefa DNS domeny):

⚠️ Zmieniaj DNS dopiero w momencie włączania GitHub Pages dla tej domeny. Domena wskazująca na GitHuba bez "zajęcia" jej przez repo może zostać podpięta przez kogoś obcego.

Usuń domyślne rekordy parkingowe OVH (stan z 2026-09-26):

| Typ | Nazwa (subdomena) | Wartość |
|---|---|---|
| A | (puste / @) | 213.186.33.5 |
| A | www | 213.186.33.5 |

Dodaj (to samo, co już działa dla `globalcut.pl`):

| Typ | Nazwa (subdomena) | Wartość |
|---|---|---|
| A | (puste / @) | 185.199.108.153 |
| A | (puste / @) | 185.199.109.153 |
| A | (puste / @) | 185.199.110.153 |
| A | (puste / @) | 185.199.111.153 |
| CNAME | www | `emvau7.github.io.` |

Opcjonalnie IPv6 (`globalcut.pl` działa bez nich): rekordy AAAA na `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

**Nie usuwaj rekordów MX** (`mx1/mx2/mx3.mail.ovh.net`) ani TXT — obsługują pocztę w domenie.

Źródło adresów: [dokumentacja GitHub Pages o własnych domenach](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). Jeśli GitHub kiedyś je zmieni, użyj wartości z dokumentacji.

### W GitHub:

1. Settings → Pages → **Custom domain**: wpisz `loudpixelhouse.com` → Save.
2. Zaznacz **Enforce HTTPS** (może być wyszarzone, aż certyfikat się wygeneruje — wróć za jakiś czas).
3. Plik `CNAME` w repo już zawiera `loudpixelhouse.com` — GitHub sam go respektuje, nic więcej nie musisz robić w kodzie.

⚠️ Propagacja DNS może potrwać **do 24–48 godzin**. Jeśli strona nie działa od razu, to normalne — wróć następnego dnia.

## 5. Jak podmienić wideo w tle, dodać filmy do portfolio i zmienić ceny

**Wszystko** poniżej edytujesz w jednym pliku: `js/config.js`. Nie trzeba dotykać HTML/CSS.

### Wideo w tle (hero)

Dopóki nie wgrasz prawdziwego filmu, strona pokazuje animowany placeholder z pikselami (żeby nie było czarnej dziury). Żeby wgrać swój film:

1. Wstaw plik jako `assets/video/hero.mp4` (opcjonalnie też `hero.webm`).
2. Wersja mobilna (lżejsza/pionowa, opcjonalna): `assets/video/hero-mobile.mp4`.
3. Kadr na `poster` (obrazek widoczny przed odtworzeniem / przy wolnym łączu): `assets/video/hero-poster.jpg`.

**Ważne — limit GitHuba to 100 MB na plik.** Skompresuj wideo, żeby hero było **poniżej ~8 MB**. Gotowe komendy `ffmpeg` (zainstaluj ffmpeg, potem w terminalu w folderze z Twoim oryginalnym filmem):

```bash
# Wersja desktopowa (1920px szerokości, bez dźwięku, H.264, szybki start)
ffmpeg -i twoj-film.mov -vf "scale=1920:-2" -an -c:v libx264 -preset slow -crf 28 -movflags +faststart assets/video/hero.mp4

# Wersja mobilna (pionowa, 720x1280)
ffmpeg -i twoj-film-pionowy.mov -vf "scale=720:1280" -an -c:v libx264 -preset slow -crf 30 -movflags +faststart assets/video/hero-mobile.mp4

# Wycięcie klatki na poster (np. z 2. sekundy filmu)
ffmpeg -i assets/video/hero.mp4 -ss 00:00:02 -frames:v 1 assets/video/hero-poster.jpg
```

Jeśli po dodaniu plików wciąż widzisz animowane piksele — sprawdź, czy nazwy plików i ścieżki są dokładnie takie jak wyżej.

### Portfolio (sekcja "Work")

W `js/config.js` znajdź listę `portfolio: [ ... ]`. Każdy wpis ma:
- `title` — nazwa wewnętrzna (nie jest pokazywana na stronie, ale ułatwia orientację),
- `tag` — krótka etykieta widoczna na kafelku (np. `"AI ad"`, `"Reel edit"`),
- `src` — ścieżka do pliku wideo, np. `"assets/portfolio/klient-x-reel.mp4"`.

Wgraj pliki wideo do `assets/portfolio/` pod tymi nazwami — siatka zaktualizuje się automatycznie. Filmy powinny być **pionowe (9:16)** i skompresowane podobnie jak wyżej (ffmpeg, `crf 28-30`, bez dźwięku niepotrzebnego dla podglądu, albo z dźwiękiem jeśli chcesz — wtedy usuń `muted` w `js/main.js` przy elemencie `<video>`, choć przeglądarki blokują autoplay z dźwiękiem, więc zalecane jest zostawić `muted`).

Możesz mieć więcej lub mniej niż 6 filmów — po prostu dodaj/usuń wpisy z listy.

### Cennik

W `js/config.js`, sekcja `pricing.tiers`. Dwa pakiety mają `price: "TODO"` — zamień na realną cenę (np. `"$450"`). Możesz też zmieniać nazwy, cechy (`features`) i który pakiet jest wyróżniony (`featured: true`).

## 6. Jak podpiąć formularz kontaktowy

Formularz wysyła dane przez darmową usługę **Formspree**:

1. Wejdź na [formspree.io](https://formspree.io) i załóż darmowe konto.
2. Stwórz nowy formularz (New Form), podaj docelowy e-mail (`loudpixelhouse@gmail.com`).
3. Formspree pokaże endpoint w formacie `https://formspree.io/f/XXXXXXXX` — skopiuj tylko część `XXXXXXXX`.
4. W `js/config.js` wklej ją jako `form.formspreeId`, np.:
   ```js
   form: {
     formspreeId: "abcd1234"
   }
   ```
5. Zapisz, wypchnij zmiany (`git add`, `git commit`, `git push`) — formularz zacznie działać.

Dopóki nie wklejasz ID, formularz przy próbie wysłania pokaże komunikat z prośbą o kontakt mailowy — link „write to me directly” (mailto) działa zawsze, niezależnie od Formspree.

Formspree w darmowym planie może wymagać jednorazowego potwierdzenia e-maila po pierwszym zgłoszeniu z formularza — to normalne, potwierdź i dalsze wiadomości przychodzą bez tego kroku.

---

## TODO — co zostało do uzupełnienia

- [ ] **Prawdziwe logo** — obecnie logo to zakodowany napis "LPH" z efektem glitch (CSS, nie plik graficzny), żeby nic nie było "zepsute" przed dodaniem grafiki. Jeśli chcesz wgrać właściwy plik `logo-lph.png`, podmień znacznik `<a class="logo-mark glitch...">` w `index.html` na `<img>` wskazujący na `assets/brand/logo-lph.png` — daj znać, jeśli chcesz, żebym to zrobił.
- [x] **Favicon** — pikselowe "LPH" z pomarańczowo-czerwonym przesunięciem: `favicon.ico` (16/32/48 px, w katalogu głównym), `assets/brand/favicon.svg`, `assets/brand/apple-touch-icon.png` (180 px), `assets/brand/icon-512.png`. Jeśli wolisz wersję z prawdziwego pliku logo, podmień te pliki.
- [x] **Grafika OG** (`assets/og/og-image.png`, 1200×630) — kadr z filmu w tle + hasło + domena; pokazuje się przy udostępnianiu linku na Facebooku, WhatsAppie, LinkedInie itd.
- [x] **Wideo hero** — dodane (`hero.mp4` 1,3 MB z płynną pętlą, `hero-mobile.mp4` 0,3 MB, `hero-poster.jpg`). Żeby podmienić, patrz punkt 5 wyżej.
- [ ] **Filmy portfolio** (`assets/portfolio/*.mp4`) — patrz punkt 5 wyżej. Na razie 6 placeholderów w configu.
- [ ] **Ceny dwóch pakietów** oznaczone `"TODO"` w `js/config.js` → `pricing.tiers`.
- [ ] **ID formularza Formspree** w `js/config.js` → `form.formspreeId`.
- [ ] **Linki social** — TikTok i YouTube w `js/config.js` → `social` to placeholdery (`@loudpixelhouse`) — zamień, gdy konta będą gotowe. Instagram (`instagram.com/loudpixelhouse`) też warto zweryfikować, że to dokładny link do Twojego profilu.
- [ ] **Sekcja testimonials** — celowo nie dodana (brief mówił, żeby nie wymyślać fałszywych opinii). Jeśli zbierzesz prawdziwe opinie klientów, daj znać — dodam sekcję.
