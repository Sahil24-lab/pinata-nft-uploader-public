# Pinata Upload Project

A TypeScript-based uploader for pushing local image folders to [Pinata](https://www.pinata.cloud/) using their API.

## Quick Start

1. Clone the repo.
2. Copy `.env.example` to `.env`.
3. Fill in your Pinata credentials and settings in `.env`.
4. Run `npm install`.
5. Run `npm run upload`.

## Environment Modes

- `NEXT_PUBLIC_NODE_ENV=local`: Runs the mock server and enables verbose logging.
- `NEXT_PUBLIC_NODE_ENV=development`: Enables verbose logging only.
- `NEXT_PUBLIC_NODE_ENV=production`: Disables mock server and logs.

## Folder Structure

- `src/config`: Environment setup.
- `src/scripts`: Entrypoint and execution scripts.
- `src/services`: Upload logic and Pinata service.
- `src/utils`: File and logging utilities.
- `input_files/`: Place your images here to upload.

## Commands

| Command          | Description                                   |
| ---------------- | --------------------------------------------- |
| `npm run upload` | Uploads images from `input_files/` to Pinata. |
| `npm run dev`    | Runs `index.ts` with `tsx` in local mode.     |
| `npm run build`  | Compiles the TypeScript project to `dist/`.   |
| `npm start`      | Executes the compiled project with Node.js.   |

## Mock Server

When `NEXT_PUBLIC_NODE_ENV=local`, a mock Pinata server will auto-start on port `4000` to simulate uploads.

---

Let me know if you want to add support for CLI args, dynamic folder names, or logging levels.
