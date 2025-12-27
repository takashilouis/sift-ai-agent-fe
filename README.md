# E-Commerce AI Agent - Frontend

A modern frontend (built with Next-js) for an intelligent e-commerce product research platform powered by multi-agent AI workflows.

## 🚀 Features

### Research Mode
- **Intelligent Product Research**: AI-powered product analysis and comparison
- **Real-time Streaming**: Live updates as agents process your research query
- **Interactive Timeline**: Visual workflow showing each agent's progress
- **Comprehensive Reports**: Detailed markdown reports with product insights
- **Deep Research Mode**: Enhanced analysis with more sophisticated strategies

### Chat Mode
- **Conversational AI**: Natural language interface for product queries
- **Session Management**: Persistent chat history across sessions
- **Tool Integration**: Real-time search and scraping capabilities
- **Streaming Responses**: Live AI responses with typing indicators

### UI/UX
- **Modern Design**: Clean, responsive interface built with Tailwind CSS
- **Dark Mode Support**: Seamless light/dark theme switching
- **ShadCN Components**: Beautiful, accessible UI components
- **Mobile Responsive**: Optimized for all device sizes

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown**: [React Markdown](https://github.com/remarkjs/react-markdown)

## 📋 Prerequisites

- Node.js 18+ and npm
- Backend API running (see backend README)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
frontend/
├── app/                      # Next.js App Router
│   ├── api/                  # API client utilities
│   │   └── client.ts         # Backend API integration
│   ├── chat/                 # Chat mode page
│   │   └── components/       # Chat-specific components
│   ├── research/             # Research mode page
│   │   └── components/       # Research-specific components
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/               # Shared components
│   └── ui/                   # ShadCN UI components
├── lib/                      # Utility functions
│   └── utils/                # Helper utilities
├── types/                    # TypeScript type definitions
│   ├── chat.ts               # Chat-related types
│   └── research.ts           # Research-related types
├── public/                   # Static assets
└── tailwind.config.ts        # Tailwind configuration
```

## 🔧 Key Components

### Research Page (`app/research/page.tsx`)
- Main research interface
- Handles streaming research results
- Manages workflow state and timeline
- Displays final reports

### Chat Page (`app/chat/page.tsx`)
- Conversational AI interface
- Session management
- Message streaming
- Tool call visualization

### API Client (`app/api/client.ts`)
- Backend API integration
- NDJSON stream parsing
- Type-safe request/response handling

## 🎨 Styling

The project uses Tailwind CSS with a custom configuration:

- **Colors**: Custom color palette with primary/secondary variants
- **Typography**: Inter font family
- **Dark Mode**: Class-based dark mode support
- **Animations**: Custom animations for smooth transitions

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🔗 API Integration

The frontend communicates with the FastAPI backend via:

### Research API
```typescript
POST /api/research
{
  "query": "compare iPhone 15 vs Samsung S24",
  "deep_research": false
}
```

### Chat API
```typescript
POST /api/chat
{
  "messages": [...],
  "session_id": "optional-session-id"
}
```

Both endpoints support **NDJSON streaming** for real-time updates.

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8000` |

## 🚧 Development

### Adding New Components

1. Create component in appropriate directory
2. Use TypeScript for type safety
3. Follow existing naming conventions
4. Use Tailwind CSS for styling

### Adding New Pages

1. Create page in `app/` directory
2. Define route-specific components in `components/`
3. Add types in `types/` directory
4. Update navigation if needed

## 📦 Dependencies

### Core
- `next`: ^14.2.5
- `react`: ^18
- `react-dom`: ^18
- `typescript`: ^5

### UI/Styling
- `tailwindcss`: ^3.4.1
- `@radix-ui/*`: Various UI primitives
- `lucide-react`: ^0.index.html447.0
- `class-variance-authority`: ^0.7.0

### Utilities
- `react-markdown`: ^9.0.1
- `remark-gfm`: ^4.0.0

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📄 License

This project is part of the E-Commerce AI Agent platform.

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Support

For issues and questions, please refer to the main project documentation.
