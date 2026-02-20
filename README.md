# NoBrainer – ClientApp

Εφαρμογή React για την **«Εξερεύνηση του εγκεφάλου»**: εισαγωγή στη νευροεπιστήμη, διαδραστικός εγκέφαλος και κουίζ στα ελληνικά.

---

## Τι είναι το site

Το **NoBrainer** είναι εκπαιδευτική ιστοσελίδα που παρουσιάζει βασικές έννοιες του ανθρώπινου εγκεφάλου με απλό και διαδραστικό τρόπο. Απευθύνεται σε μαθητές Γυμνασίου.

**Περιεχόμενο:**
- **Εισαγωγή:** κείμενο για εγκέφαλο και νευροεπιστήμη, με επιλογή «Περισσότερα στοιχεία».
- **Διαδραστικός εγκέφαλος:** εικόνα με περιοχές· περνάς το ποντίκι πάνω από κάθε περιοχή και εμφανίζονται όνομα, λειτουργία και σύνδεση με την καθημερινή ζωή.
- **Fun facts:** σύντομα ενδιαφέροντα στοιχεία για τον εγκέφαλο.
- **Κουίζ:** ερωτήσεις πολλαπλής επιλογής για να ελέγξεις τι έμαθες.

Όλα τα κείμενα είναι **στα ελληνικά**. Τα δεδομένα (περιοχές εγκεφάλου, ερωτήσεις) είναι ενσωματωμένα στην εφαρμογή· δεν απαιτείται backend.

---

## Απαιτήσεις (requirements)

- **Node.js** έκδοση 18 ή νεότερη ([https://nodejs.org](https://nodejs.org))
- **npm** (έρχεται με το Node.js)

Εγκατεστημένα πακέτα (από το `package.json`):
- **react**, **react-dom** (περίπου 18.x)
- **vite** και **@vitejs/plugin-react** (για build και dev server)

---

## Εγκατάσταση και λειτουργία

**Εγκατάσταση dependencies:**

```bash
npm install
```

**Έναρξη dev server (τοπικά):**

```bash
npm run dev
```

Ανοίγει η εφαρμογή στο **http://localhost:5173**.

**Build για production (static site):**

```bash
npm run build:static
```

Το αποτέλεσμα δημιουργείται στο φάκελο **`dist`** και μπορεί να ανεβαστεί σε static hosting (π.χ. Render).

---

## Deploy ως static site στο Render

**Δεν χρειάζεται Docker.** Αφού κάνεις push το repo στο GitHub:

1. Πήγαινε στο [Render](https://render.com) → **New** → **Static Site**.
2. Σύνδεσε το GitHub repo και διάλεξε αυτό το project.
3. Ρυθμίσεις (αν δεν χρησιμοποιήσεις Blueprint):
   - **Build command:** `npm install && npm run build:static`
   - **Publish directory:** `dist`
4. **Create Static Site**. Το Render κάνει build και σερβίρει το site από το `dist`. Κάθε push στο branch που έχεις οριστεί ξανα‑κάνει deploy αυτόματα.

Εναλλακτικά: **New** → **Blueprint** και διάλεξε το repo· το `render.yaml` ορίζει ήδη τις σωστές ρυθμίσεις.

**Προεπισκόπηση του build τοπικά:**

```bash
npm run preview
```

Σερβίρει το περιεχόμενο του `dist` (συνήθως στο http://localhost:4173).

---

## Δομή και assets

- **`src/`** – React components (App, NeuroscienceIntro, InteractiveBrain, FunFacts, BrainQuiz) και styles.
- **`public/`** – Στατικά αρχεία που αντιγράφονται ως έχουν στο build. Η εικόνα του εγκεφάλου πρέπει να είναι **`public/brain-labeled.png`** ώστε να εμφανίζεται σωστά η διαδραστική εικόνα.

---

## Τεχνολογίες

- **React 18**
- **Vite 5** (build εργαλείο και dev server)

Η εφαρμογή είναι 100% static· δεν χρειάζεται API ή server για να τρέχει.
