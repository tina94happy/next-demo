# 🗓️ next-demo

A modern scheduling demo built with **Next.js** and **Supabase**, featuring real-time updates, a weekly availability table, and serverless deployment on **Vercel**.

---

## 🚀 Features

- 🔥 Built with **Next.js App Router**
- 📅 Weekly availability UI with visual time slots
- 🌐 Real-time sync using **Supabase Realtime**
- 🧪 Unit tests with **Jest**
- ☁️ Deployed on **Vercel**
- 🔐 Auth-ready (via Supabase)
- 🗄️ Database & Storage powered by Supabase

---

## 🧪 Supabase Table Schema

| Column       | Type   | Description                     |
|--------------|--------|---------------------------------|
| `id`         | int8   | Primary key (auto increment)    |
| `date`       | text   | The date of the unavailable slot |
| `start_time` | text   | Start time of the slot          |
| `end_time`   | text   | End time of the slot            |
| `description`| text   | Description of the slot         |

---

## 📂 Project Structure

```txt
.
├── __tests__/              # Unit tests (Jest)
│   └── supabase.test.ts
├── public/                 # Static assets (e.g. icons, data)
├── src/
│   ├── app/                # App Router pages
│   ├── components/         # UI components (like Schedule)
│   └── lib/                # Supabase client setup
├── jest.config.js          # Jest setup
├── next.config.ts          # Next.js configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/next-demo.git
cd next-demo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Add the following env variable to your supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ✅ Run Tests

```bash
npm test
```

---

## ☁️ Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com/)
3. Import your GitHub repo
4. Add your Supabase environment variables in Vercel settings
5. Deploy!

---

## 📄 License

MIT

---

## 🙋‍♀️ Author

Tina Su