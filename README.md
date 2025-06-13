# 🧠 Reverie – Family Portal for Immersive AR/VR Alzheimer’s Support  
🚀 Web platform built with **React**, **TypeScript**, and **Vite** to connect with the Microsoft HoloLens Unity App

---

## ❗ Problem Statement

Over **55 million people worldwide** live with dementia, and Alzheimer’s disease is the most common form.  
> 🌍 *According to the WHO (2023), Alzheimer’s cases are expected to triple by 2050.*  

Traditional memory care lacks personalization and emotional engagement. Family members often struggle to share and preserve memories in a format that can meaningfully assist their loved ones during cognitive decline.

---

## 💡 Our Solution: Reverie Family Portal

The **Reverie Family Portal** is the **web-based companion platform** to our HoloLens app, enabling caregivers and loved ones to upload meaningful media — like photos and videos — and tag them with relevant context. These memories are then rendered as **interactive memory bubbles** inside the HoloLens experience, creating immersive reminiscence therapy.

---

## 🛠️ Tech Stack

| Category          | Tools Used                                              |
|------------------|----------------------------------------------------------|
| Web Framework     | React (with TypeScript + Vite)                          |
| State Management  | Zustand (`useUserStore`)                                |
| Styling           | TailwindCSS                                             |
| Backend           | Supabase (media storage, authentication)               |
| AR/VR Companion   | Unity (HoloLens) + C++ bridge for media streaming       |
| Deployment        | Web: Vite + HMR                                         |

---

## 📦 Folder Structure (Web App)

```
src/
├── components/
│   ├── ui/              # Reusable UI elements
│   └── data/            # Zustand store, Supabase client, types
├── lib/                 # Utility functions
├── screens/             # Views like Home.tsx, SignIn.tsx
├── App.tsx              # Main app wrapper
├── main.tsx             # Renders root app
```

---

## 🔍 Key Features

- **👨‍👩‍👧 Family-Facing Media Uploader**: Enables loved ones to upload cherished photos/videos linked to specific people or moments.
- **🧠 Memory Bubbles**: These assets become immersive experiences in the Unity HoloLens app.
- **📦 Supabase Integration**: Provides secure, structured cloud storage for media and metadata.
- **📹 Smart Rendering**: Video and image detection logic ensures accurate previewing.

---

## 🧪 HoloLens Integration Overview

- Web-uploaded media is accessed by Unity via Supabase endpoints
- MRTK (Mixed Reality Toolkit) supports gesture-based interaction with media bubbles
- C++ modules help bridge playback performance and memory management for media

---

## ▶️ Getting Started (Family Portal)

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/reverie.git
   cd reverie
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment**
   Create a `.env` file with:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_key
   ```

4. **Run Locally**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

---

## 🧠 Code Preview (Media Rendering Component)

```tsx
{media.map((item, i) =>
  item.url.match(/\.(mp4|mov|webm)$/i) ? (
    <video src={item.url} controls className="w-full h-auto rounded shadow" />
  ) : (
    <img src={item.url} alt="media" className="w-full h-auto rounded shadow" />
  )
)}
```

---

## 🌱 Future Roadmap

- 🔁 Live sync with HoloLens during user sessions
- 🔊 Audio narration + voice notes from family
- 🧭 Memory map visualization (by place/time)
- 🧑‍⚕️ Role-based access for caregivers vs family members

---

## 👨‍💻 Contributors

- Azra Bano – Full-stack development, Unity + Supabase integration  
- Dominic Catena – Frontend and media rendering  
- Kashvi Shah – Supabase & data schema design  
- Aiden Annis – Unity development and HoloLens sync

---

## 📄 License

MIT License – Free to use, remix, and deploy with attribution.
