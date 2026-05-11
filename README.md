# 📚 BookVault — React SPA

A responsive Single Page Application for browsing and filtering books using the [Open Library API](https://openlibrary.org/developers/api).

---

## ⚠️ Node.js Requirement

This project requires **Node.js 14 or higher**.

Check your version:
```bash
node --version
```

If you're on Node 12 or below, download the latest LTS from https://nodejs.org

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| **React** | 17 | UI framework |
| **Vite** | 2.x | Dev server & build tool |
| **Tailwind CSS** | 3.x | Utility-first styling |
| **Open Library API** | — | Public book data (no key needed) |

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

### 3. Build for production

```bash
npm run build
```

---

## ✨ Features

- **Genre Filtering** — 8 genres: Fantasy, Sci-Fi, Mystery, Romance, Thriller, Horror, History, Biography
- **Full-Text Search** — Search by title or author
- **Sorting** — Relevance, A→Z, Z→A, Newest, Oldest
- **Star Rating Filter** — Filter by 2+, 3+, 4+ stars
- **Pagination** — 20 books per page
- **Responsive Grid** — 2 cols mobile → 5 cols desktop
- **Loading Skeletons** — Pulse animation while fetching
- **Error Handling** — Retry button on failure

---

## 📁 Project Structure

```
bookvault/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx              ← entry point
    ├── App.jsx               ← root component
    ├── index.css             ← Tailwind directives
    ├── constants.js          ← shared config
    ├── hooks/
    │   └── useBooks.js       ← data fetching hook
    └── components/
        ├── BookCard.jsx
        ├── StarRating.jsx
        ├── Skeleton.jsx
        └── Pagination.jsx
```
