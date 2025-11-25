# E-Commerce Research Platform - Frontend

Next.js 14 frontend for the agentic e-commerce research platform.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **ShadCN UI**
- **React Query**
- **Lucide Icons**

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── app/
│   ├── api/
│   │   └── client.ts          # API client with streaming
│   ├── research/
│   │   ├── components/        # Research dashboard components
│   │   └── page.tsx           # Main research page
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── providers.tsx          # React Query provider
├── components/
│   └── ui/                    # ShadCN UI components
├── lib/
│   ├── utils/
│   │   └── stream.ts          # NDJSON parser
│   └── utils.ts               # Utility functions
├── types/
│   └── research.ts            # TypeScript types
└── tailwind.config.ts         # Tailwind configuration
```

## Features

- **Landing Page**: Clean hero with CTA
- **Research Dashboard**: 
  - Sidebar navigation
  - Real-time NDJSON streaming
  - Workflow timeline
  - Live stream viewer
  - Final report with sentiment analysis
  - Product comparison
- **Premium UI**: Minimal, calm, enterprise aesthetic

## Design System

- **Colors**: Beige/green palette (#F6F5F2, #4A7159)
- **Typography**: Inter font family
- **Spacing**: Generous, premium feel
- **Shadows**: Subtle, minimal

## API Integration

The frontend connects to the FastAPI backend at `NEXT_PUBLIC_API_URL` and streams NDJSON responses from the `/api/research` endpoint.

## Build

```bash
npm run build
```

## License

MIT
