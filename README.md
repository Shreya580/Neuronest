# 🧠 NeuroNest

**AI-powered early developmental screening for children aged 1–6 years.**

NeuroNest uses three science-backed games and a validated parent questionnaire to screen for early signs of autism and neurodevelopmental delays — from home, in under 5 minutes. Built for Indian families. Free for every parent.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3-38BDF8?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🚀 Quick Start

```bash
git clone https://github.com/your-username/neuronest.git
cd neuronest
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📸 What It Does

The full user flow:

```
Home → Sign Up → Game 1 (Social) → Game 2 (Sensory) → Game 3 (Motor) → Questions → Result → Parenting Guides
```

| Screen | What Happens |
|--------|-------------|
| **Game 1 — Social** | Child taps face or geometric shape. Measures social stimulus preference — a core autism indicator |
| **Game 2 — Sensory** | Child taps spinning wheel or bouncing ball. Measures repetitive stimuli fixation |
| **Game 3 — Motor** | Child catches a moving star in 20 seconds. Measures fine motor precision and reaction time |
| **Questions** | Parent answers 10 M-CHAT-R items. 3 critical items (name, pointing, eye contact) can auto-escalate risk |
| **Result** | Domain-wise risk report: Social, Sensory, Motor, Questionnaire — with personalised next steps |
| **Guides** | 12 research-backed parenting guides across 6 categories, each with steps, tips, and red flags |

---

## 🔬 Research Foundation

Inspired by the **START** study published in *Autism* journal:

> Dubey, I., Bishain, R., et al. (2024). *Using mobile health technology to assess childhood autism in low-resource community settings in India.* **Autism**, 28(3), 755–769. — **86% accuracy, Delhi-NCR field study**

The three games directly replicate the social, sensory, and motor domains assessed in START. The questionnaire uses the full **M-CHAT-R** (Modified Checklist for Autism in Toddlers, Revised).

---

## 🗂️ Project Structure

```
src/
├── engine/
│   └── scoring.js              # START-based risk scoring engine
├── components/
│   ├── Navbar.jsx
│   ├── Layout.jsx
│   ├── Hero.jsx
│   ├── Features.jsx
│   └── Analytics.jsx
├── pages/
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── ParentingGuide.jsx      # 12 research-backed guides with modal
│   ├── Result.jsx              # Domain-wise risk report
│   ├── Questions.jsx           # M-CHAT-R 10 questions
│   └── games/
│       ├── Game1Social.jsx     # Face vs shape preference
│       ├── Game2Sensory.jsx    # Spinning vs bouncing
│       └── Game3Motor.jsx      # Moving target catch
├── App.jsx
├── index.css
└── main.jsx
```

---

## 🧮 Scoring Engine

```
Combined Score = Social(25%) + Sensory(20%) + Motor(25%) + Questionnaire(30%)

Low Risk      →  Score ≥ 60%  AND  no critical M-CHAT-R failures
Moderate Risk →  Score 35–59%  OR  1 critical item failed
Elevated Risk →  Score < 35%   OR  ≥ 2 critical items failed
```

Age-adjusted motor norms for ages 1–6. Critical items (name response, pointing, eye contact) can override the combined score automatically.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite 8 |
| Styling | Tailwind CSS v3 |
| Routing | React Router DOM v7 |
| Animations | Framer Motion v12 |
| Icons | Lucide React |
| Fonts | Nunito (Google Fonts) |
| Data | localStorage (client-side) |

---

## ⚠️ Disclaimer

NeuroNest is a **screening tool only** — not a diagnostic instrument. Results must be followed up with a qualified developmental pediatrician. A low-risk result does not rule out developmental concerns.

**Helplines (India):**
- NIMHANS: `080-46110007`
- Vandrevala Foundation: `1860-2662-345` (24/7, free)
- Action for Autism: `+91 11 4054 0991`

---

## 📚 References

1. Dubey et al. (2024). START study. *Autism*, 28(3), 755–769
2. Rahman et al. (2016). PASS trial. *Lancet Psychiatry*, 3(2), 128–136
3. Oono et al. (2013). Parent-mediated early intervention. *Cochrane Review*
4. Robins & Dumont-Mathieu (2006). M-CHAT. *Dev. & Behavioral Pediatrics*
5. WHO (2018). Nurturing Care for Early Childhood Development

---

## 🤝 Contributing

Pull requests welcome. Priority areas:

- Hindi / regional language support
- Age-specific question sets (1yr vs 5yr differ clinically)
- Dashboard with screening history
- Shareable PDF report for pediatrician visits
- Backend + auth integration

```bash
git checkout -b feature/your-feature
git commit -m "Add: your change"
git push origin feature/your-feature
# → Open a Pull Request
```

---

*Built by students from Pune as part of the Wadhwani Foundation Ignite program.*  
*NeuroNest — because early action changes everything.* 🧠
