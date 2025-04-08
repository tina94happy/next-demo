# 📅 Connect Weekly Availability Scheduler

This project is a responsive, interactive weekly scheduling component built with **Next.js**. It is designed to display a student's availability throughout the week and highlight their class or busy times using data-driven input from a JSON file.

---

## 📁 Project Structure

```
/src
  /components
    Schedule.tsx       # Main scheduler component
  /styles
    Schedule.module.css # Style for schedule UI
/public
  /data
    unavailableTimes.json # Source of unavailable blocks
```

---

## 📄 Sample JSON Format

```json
[
  {
    "date": "2025-04-07",
    "start_time": "18:00",
    "end_time": "21:00",
    "description": "I have class"
  },
  {
    "date": "2025-04-08",
    "start_time": "14:30",
    "end_time": "17:30",
    "description": "Lab"
  }
]
```

- `date` format: `YYYY-MM-DD`
- `start_time` and `end_time` use 24hr format (`HH:mm`)
- `description`: shown centered in the unavailable block

---

## 🧪 Local Development

```bash
npm install
npm run dev
```
Visit `http://localhost:3000` to view the schedule.

---

## 🌎 Deployment

This app is optimized for deployment to [Vercel](https://vercel.com).

```bash
vercel
```

---

## 📌 Notes

- Dates are computed locally based on system time (supports Central Time)
- Schedule automatically adjusts for week and date ranges
- Description shown **only once**, centered in the block

---

## ✨ Future Ideas

- Click-to-add availability / edit mode
- Google Calendar integration
- Mobile responsive view
- Dark mode theme

---

Made with 💻 by Tina

