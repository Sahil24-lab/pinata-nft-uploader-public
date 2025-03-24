# Pinata Upload Project

Use this project to upload files from a local folder to Pinata via Node.js and TypeScript.

## Quick Start

1. Clone the repo.
2. Copy `.env.example` to `.env`.
3. Insert your Pinata JWT and other details into `.env`.
4. Run `npm install`.
5. Run `npm run upload`.

## Folder Structure

- **src/** contains all TypeScript code.
- **.env** holds secrets (ignored in Git).
- **input_images/** is where you place images to be uploaded.

## Commands

- `npm run upload`: Uploads images from `input_images/` to Pinata.
- `npm run build`: Builds the project to `dist/`.
- `npm start`: Runs the compiled files with Node.
