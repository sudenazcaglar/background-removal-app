# Arka Plan Kaldırma Aracı

React + TypeScript + Vite frontend ve Python FastAPI backend ile çalışan gerçek OpenCV GrabCut arka plan kaldırma uygulaması.

## Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows için: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Frontend

```bash
npm install
npm run dev
```

Frontend `http://localhost:5173` üzerinde çalışır ve görselleri `http://localhost:8000/remove-background` endpointine `multipart/form-data` ile gönderir.
