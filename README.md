# Vercel Serverless Function: Replicate google/nano-banana

This repository exposes a Vercel serverless API route that calls Replicate's `google/nano-banana` image editing model using ESM, following the Replicate docs.

Reference: https://replicate.com/google/nano-banana/api/learn-more#esm

## Prerequisites

- Node.js 18+
- A Replicate API token with access to `google/nano-banana`
- Vercel CLI (optional for local dev)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set environment variable:

```bash
# Windows PowerShell
$Env:REPLICATE_API_TOKEN="YOUR_TOKEN_HERE"

# bash/cmd examples
export REPLICATE_API_TOKEN=YOUR_TOKEN_HERE
set REPLICATE_API_TOKEN=YOUR_TOKEN_HERE
```

3. Run locally (optional):

```bash
npx vercel dev
```

## API

- Route: `POST /api/nano-banana`
- Body (JSON):
  - `model` (optional): defaults to `google/nano-banana`
  - `input` (object): inputs for the model (pass-through to Replicate)

Example request:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "input": {
      "image": "https://example.com/input.png",
      "prompt": "add a small banana sticker on the top right"
    }
  }' \
  http://localhost:3000/api/nano-banana
```

Example response (truncated):

```json
{
  "model": "google/nano-banana",
  "input": { "image": "https://...", "prompt": "..." },
  "output": "... model output ..."
}
```

## Deploy to Vercel

1. Configure env var in Vercel:
   - Key: `REPLICATE_API_TOKEN`
   - Value: your token

2. Deploy:

```bash
npx vercel --prod
```

The function is implemented in `api/nano-banana.mjs` using ESM and `replicate` SDK per the docs.
