# Support Ticket Management — Frontend

React + Vite frontend for the Support Ticket Management System.

## Stack

- **React 18** (JSX only — no TypeScript)
- **Vite 6**
- **MUI (Material UI) 6**
- **React Router 6**
- ESLint flat config

## Project structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── .env.example
├── public/
│   └── vite.svg
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Routes
    ├── theme.js              # MUI theme
    ├── index.css
    ├── api/
    │   ├── client.js         # Fetch wrapper + session
    │   ├── auth.js
    │   ├── tickets.js
    │   ├── users.js
    │   ├── categories.js
    │   ├── notifications.js
    │   └── index.js
    ├── context/
    │   └── AuthContext.jsx
    ├── components/
    │   ├── Layout/
    │   │   ├── AppLayout.jsx
    │   │   ├── Navbar.jsx
    │   │   └── Sidebar.jsx
    │   ├── Tickets/
    │   │   ├── TicketTable.jsx
    │   │   ├── TicketDetailDialog.jsx
    │   │   └── CreateTicketForm.jsx
    │   └── common/
    │       ├── Loading.jsx
    │       └── StatusChip.jsx
    └── pages/
        ├── LoginPage.jsx
        ├── TicketsPage.jsx
        ├── CreateTicketPage.jsx
        ├── CategoriesPage.jsx
        ├── UsersPage.jsx
        └── NotificationsPage.jsx
```

## Setup

```bash
cd frontend
cp .env.example .env
# Edit VITE_API_URL if your backend is not on http://127.0.0.1:8000

npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start Vite dev server    |
| `npm run build`| Production build         |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint               |

## API

All API calls go through `src/api/`. Base URL is read from `VITE_API_URL`.

Auth tokens are stored in `localStorage` and refreshed automatically on 401.
