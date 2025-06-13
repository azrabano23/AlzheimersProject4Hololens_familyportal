# 🧠 Reverie – Immersive AR/VR Experience for Alzheimer's Support  
🚀 Built for Microsoft HoloLens using **Unity**, **C++**, **React**, **TypeScript**, and **Vite**

---

## ❗ Problem Statement

Over **55 million people worldwide** live with dementia, and Alzheimer’s disease is the most common form.  
> 🌍 *According to the WHO (2023), Alzheimer’s cases are expected to triple by 2050.*  

Current cognitive therapies lack engagement, personalization, and emotional resonance. Traditional memory care methods fail to fully stimulate patient memory recall or support families in preserving shared experiences.

---

## 💡 Our Solution: Reverie

**Reverie** uses immersive **AR/VR storytelling** to help Alzheimer’s patients relive meaningful life events and strengthen cognitive function.  
Users and caregivers can upload **media files (images/videos)** and tag them with context, which are then rendered as **interactive memory bubbles** within a **3D HoloLens environment**.

---

## 🛠️ Tech Stack

| Category          | Tools Used                                              |
|------------------|----------------------------------------------------------|
| AR Development   | **Unity**, Microsoft MRTK (Mixed Reality Toolkit)       |
| Scripting         | **C++**, Unity C# Scripts                               |
| Web Interface     | React (with TypeScript + Vite)                          |
| State Management  | Zustand (`useUserStore`)                                |
| Backend           | Supabase (media storage, authentication)               |
| Styling           | TailwindCSS                                             |
| Deployment        | Web: Vite + HMR, HoloLens Build via Unity UWP Export   |

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

- **👤 Personalized Memory Viewer**: Upload photos/videos tied to specific people, places, or events.
- **🧠 Memory Bubbles**: 3D bubbles rendered in Unity and navigated via HoloLens.
- **🧭 Context-Aware Playback**: Organizes memory by location, time, and tags.
- **📦 Supabase Integration**: Secure cloud storage for media + metadata.
- **📹 Intelligent Media Display**: Detects file type and renders accordingly.

---

## 🧪 HoloLens & Unity Integration

- Unity 3D environments developed for Microsoft HoloLens
- C++ used to manage low-level interactions and media streaming
- Mixed Reality Toolkit (MRTK) used for gesture recognition and spatial mapping
- Linked with Supabase via Unity Web Requests for pulling personalized content

---

## ▶️ Getting Started (Web App)

1. **Clone the Repo**
   ```bash
   git clone https://github.com/yourusername/reverie.git
   cd reverie
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Environment Variables**
   Create a `.env` file:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_key
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🧠 Code Preview (Media Renderer)

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

- 📡 Bi-directional sync between Unity app and Supabase
- 🎙️ Voice interaction via Microsoft Speech API
- 🕹️ Expanded support for gesture-based memory bubble manipulation
- 🧑‍⚕️ Caregiver dashboard for multi-patient media management

---

## 👨‍💻 Contributors

- Azra Bano – Full-stack development, Unity + Supabase integration  
- [Add other team members here…]

---

## 📄 License

MIT License – Free to use, remix, and deploy with attribution.
