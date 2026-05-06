# MirrorAPI 🚀

MirrorAPI is a modern, developer-centric toolkit for API prototyping and testing. It allows frontend engineers to create mock endpoints, inspect live webhooks, and clone existing APIs for local development—eliminating the "waiting for backend" bottleneck.

## ✨ Features

### 🌐 Dynamic Mock APIs
- **Instant Endpoints**: Create HTTP endpoints with custom paths, methods (GET, POST, etc.), and JSON responses.
- **Namespacing**: Organize mocks by User ID or Project for multi-tenant support.
- **Integrated Debugger**: Test your new endpoints immediately with a built-in API tester.

### ⚡ Live Webhook Catcher
- **Real-Time Inspection**: Connect to a unique Webhook ID and see payloads stream directly to your browser via WebSockets.
- **Header & Payload View**: Inspect full HTTP headers and raw JSON payloads for third-party integrations (Stripe, GitHub, etc.).
- **Sticky Simulator**: A pinned simulator panel lets you push test payloads while watching the live logs.

### 👯 API Cloning (Copy & Mirror)
- **Automatic Mocking**: Provide an external URL, and MirrorAPI will fetch the response and create a local mock for you.
- **Auth Support**: Provide Authorization tokens and custom headers to clone protected external APIs.
- **Body Capture**: Clone POST/PUT requests by providing the necessary request data.

## 🛠️ Tech Stack

### Backend
- **Python & Django**: Robust web framework.
- **Django REST Framework (DRF)**: Flexible API building.
- **Django Channels**: Real-time WebSocket communication.
- **Requests**: For external API mirroring.

### Frontend
- **React.js**: Modern component-based UI.
- **Vite**: Ultra-fast build tool and dev server.
- **React Router**: Multi-page navigation.
- **Axios**: Promised-based HTTP client.
- **Vanilla CSS 3**: Custom, premium Light Theme with responsive grid layouts.

## 🚀 Getting Started

### 1. Prerequisites
- Python 3.11+
- Node.js 18+

### 2. Backend Setup
```bash
cd MirrorApiBackend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Frontend Setup
```bash
cd MirrorApiFrontend
npm install
npm run dev
```

## 📜 Project Structure
- `MirrorApiBackend/`: Core Django application handling database, logic, and WebSockets.
- `MirrorApiFrontend/`: React application providing a sleek, intuitive dashboard.

---
Built with ❤️ for Frontend Engineers.
