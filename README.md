# Go API Playground — Frontend

A web-based API testing playground built with React that allows users to explore and test REST APIs through a simple and interactive interface.

The frontend can be used to test the project's own Go APIs as well as custom API endpoints.

## Features

- 🔍 API Explorer
- 🚀 Support for GET, POST, PUT, PATCH, and DELETE requests
- 📝 JSON request body editor for POST, PUT, and PATCH
- 🔑 Custom request headers
- 🌐 Test custom API endpoints
- 📋 View formatted API responses
- 📊 Display HTTP status codes and status messages
- ⚡ Response time tracking
- 📜 Request history
- 💾 Persistent request history using `localStorage`
- 📋 Copy API endpoints
- 🟢 Dynamic API status monitoring
- 📚 API list managed through a separate API configuration file
- 📄 Load APIs progressively with a "Load More" option
- ❌ Network and invalid-request error handling
- 📱 Responsive interface

## Tech Stack

- **React**
- **JavaScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Vite**
- **Fetch API**
- **LocalStorage**

## Project Structure

```text
src/
├── components/
│   ├── MainContent.jsx
│   ├── Navbar.jsx
│   └── SideBar.jsx
│
├── data/
│   └── apis.js
│
├── App.jsx
├── App.css
└── main.jsx