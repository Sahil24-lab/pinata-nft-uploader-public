# 📦 Pinata Upload Project
A TypeScript-based uploader for pushing local image folders to Pinata using their API.

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?logo=typescript)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]()
[![Build](https://img.shields.io/badge/build-passing-brightgreen)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue)]()

---

## 🚀 Quick Start

1. Clone the repo  
   `git clone https://github.com/your-username/pinata-upload-project.git`

2. Set up environment  
   `cp .env.example .env`

3. Fill in your Pinata API credentials

4. Install dependencies  
   `npm install`

5. Upload files  
   `npm run upload`

---

## 🌐 Environment Modes

| Environment | Behavior |
|------------|----------|
| `local` (`NEXT_PUBLIC_NODE_ENV=local`) | Starts mock server + verbose logs |
| `development` (`NEXT_PUBLIC_NODE_ENV=development`) | Verbose logs only |
| `production` (`NEXT_PUBLIC_NODE_ENV=production`) | Production mode, no mock server/logs |

---

## 📁 Folder Structure

src/
  ├── config/       # Environment setup
  ├── scripts/      # Entrypoint and main execution
  ├── services/     # Upload logic and Pinata API
  └── utils/        # File handling and logger helpers
input_files/        # Place your local files here

---

## 📦 Available Commands

| Command | Description |
|---------|-------------|
| `npm run upload` | Uploads files from `input_files/` to Pinata |
| `npm run dev` | Runs with `tsx` in `local` mode |
| `npm run build` | Compiles TypeScript to `dist/` |
| `npm start` | Executes built app using Node.js |

---

## 🧪 Mock Server

When in `local` mode, a mock Pinata server starts automatically on http://localhost:4000, simulating real upload responses.

---

## ✅ To-Do / Contributions

- [ ] Add CLI support (e.g. `--folder`, `--log-level`)
- [ ] Progress tracking UI / CLI
- [ ] Upload verification with public gateways
- [ ] Retry logic for failed uploads

Pull requests welcome. Please follow the CONTRIBUTING.md guide if submitting changes.

---

## 📝 License

Licensed under the MIT License.
