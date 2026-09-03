# 🌐 Universal Language Translator

An AI-powered, real-time full-stack Language Translation application built with **FastAPI** (Python) and **Next.js** (TypeScript & Tailwind CSS). It supports seamless text translation across 100+ languages with automatic language detection, text-to-speech pronunciation, and one-click clipboard copying.

---

## 📸 Features

- ⚡ **Real-Time Translation**: Fast, accurate translation powered by Google Translate engine via a robust FastAPI service layer.
- 🌍 **100+ Supported Languages**: Dynamic language detection and selector dropdowns populated via backend API.
- 🔄 **Language Swapping**: Instant swapping of source and target languages and text content.
- 🔊 **Text-to-Speech (TTS)**: Native browser audio playback for both original and translated text in the selected language.
- 📋 **Copy to Clipboard & Character Counter**: Visual feedback upon copying text, with support for up to 5,000 characters per request.
- 🎨 **Modern & Responsive UI**: Clean light-mode aesthetic built with Tailwind CSS v4 and Lucide React icons.
- 🛡️ **Clean Architecture & Data Validation**: Strict request/response validation using Pydantic models and centralized error handling.

---

## 🏗️ Architecture & Tech Stack

```
LangTranslate/
├── backend/                  # FastAPI Application (Python)
│   ├── app/
│   │   ├── api/              # API Route Handlers (/translate, /languages, /health)
│   │   ├── schemas/          # Pydantic Request/Response Models
│   │   ├── services/         # Translation Business Logic & Adapter Layer
│   │   └── main.py           # Application Entrypoint & CORS Middleware
│   ├── requirements.txt      # Python Dependencies
│   └── test_translate.py     # Backend Unit / Smoke Test
└── frontend/                 # Next.js Application (React & TypeScript)
    ├── src/
    │   ├── app/              # Next.js App Router (Layout & Page)
    │   └── services/         # API Client Services
    ├── package.json          # Node Dependencies & Scripts
    └── .env.local            # Frontend Environment Configuration
```

### Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | [Next.js 15+](https://nextjs.org/), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) |
| **Backend** | [FastAPI](https://fastapi.tiangolo.com/), [Python 3.10+](https://www.python.org/), [Pydantic v2](https://docs.pydantic.dev/), [Uvicorn](https://www.uvicorn.org/), [deep-translator](https://github.com/nidhaloff/deep-translator) |

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
- **Python 3.10+** installed
- **Node.js 18+** & **npm** installed
- **Git**

---

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/LangTranslate.git
cd LangTranslate
```

---

### 2. Backend Setup (FastAPI)

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   - **Windows (PowerShell)**:
     ```powershell
     python -m venv venv
     .\venv\Scripts\Activate.ps1
     ```
   - **macOS / Linux**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI backend server:
   ```bash
   python -m uvicorn app.main:app --reload --port 8000
   ```
   > 📖 Backend will run at: `http://127.0.0.1:8000`  
   > 📑 Interactive Swagger API docs: `http://127.0.0.1:8000/docs`

---

### 3. Frontend Setup (Next.js)

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Verify or create `.env.local` inside `frontend/`:
   ```env
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
   ```

4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   > 🌐 Frontend will run at: `http://localhost:3000`

---

## 📡 API Reference

### 1. Translate Text
- **Endpoint**: `POST /api/translate`
- **Request Body**:
  ```json
  {
    "text": "Hello, how are you?",
    "source_lang": "auto",
    "target_lang": "es"
  }
  ```
- **Response**:
  ```json
  {
    "original_text": "Hello, how are you?",
    "translated_text": "Hola, ¿cómo estás?",
    "source_lang": "auto",
    "target_lang": "es"
  }
  ```

### 2. Get Supported Languages
- **Endpoint**: `GET /api/languages`
- **Response**:
  ```json
  {
    "languages": {
      "english": "en",
      "spanish": "es",
      "french": "fr",
      "german": "de",
      "...": "..."
    }
  }
  ```

### 3. Health Check
- **Endpoint**: `GET /api/health`
- **Response**:
  ```json
  {
    "status": "healthy",
    "service": "Language Translation API"
  }
  ```

---

## 🔒 Best Practices Implemented

- **Separation of Concerns**: Modular routing, Pydantic schemas, and decoupled translation service layers.
- **CORS Configuration**: Restrictive origin policies configured for Next.js development and deployment.
- **Client-Side Graceful Degradation**: Automatic error catching and recovery on network or backend unavailability.
- **Accessible UI**: Clear visual labels, keyboard navigation, and aria-friendly icon action buttons.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
