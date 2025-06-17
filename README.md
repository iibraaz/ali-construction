# Ali Construction - Unified Fullstack App

A modern fullstack construction project management application with React frontend and TypeScript backend unified under a single codebase.

## 🏗️ **Project Structure**

```
ali-construction/
├── src/
│   ├── components/     ← React UI components
│   ├── pages/         ← Frontend route pages
│   ├── api/           ← Backend API handlers
│   ├── lib/           ← Backend business logic
│   ├── types/         ← TypeScript interfaces & Zod schemas
│   ├── store/         ← Frontend state management
│   ├── context/       ← React context providers
│   ├── utils/         ← Utility functions
│   ├── App.tsx        ← Main React app
│   ├── index.tsx      ← Frontend entry point
│   └── index.css      ← Global styles
├── index.html         ← HTML template
├── package.json       ← Unified dependencies
├── vite.config.ts     ← Vite configuration
├── tsconfig.json      ← TypeScript configuration
└── env.template       ← Environment variables template
```

## 🚀 **Quick Start**

### 1. **Setup Environment**
```bash
# Copy environment template
cp env.template .env.local

# Fill in your actual values in .env.local
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Run Development Server**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 🔧 **Features**

### **Frontend Features**
- ✅ Modern React 18 with TypeScript
- ✅ React Router for navigation
- ✅ Tailwind CSS for styling
- ✅ Clerk authentication
- ✅ Zustand state management
- ✅ Chart.js for data visualization
- ✅ Lucide React icons

### **Backend Features**
- ✅ OpenAI integration for AI-powered features
- ✅ Supabase database integration
- ✅ SendGrid email service
- ✅ Zod schema validation
- ✅ Session management
- ✅ RESTful API endpoints

### **Integrations**
- 🤖 OpenAI GPT for email generation
- 📧 SendGrid for email delivery
- 🗄️ Supabase for database and real-time features
- 🔐 Clerk for authentication
- 📱 Telegram bot integration (optional)
- 📊 Microsoft Graph integration (optional)
- 🤗 HuggingFace AI services (optional)

## 📁 **Key Directories**

### **Frontend (`src/components/`, `src/pages/`)**
- React components and pages
- No backend logic mixed in
- Clean separation of concerns

### **Backend (`src/api/`, `src/lib/`)**
- API route handlers in `src/api/`
- Business logic in `src/lib/`
- Database operations
- External service integrations

### **Shared (`src/types/`)**
- TypeScript interfaces
- Zod validation schemas
- Shared type definitions

## 🛠️ **Available Scripts**

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run type-check # Run TypeScript type checking
```

## 🌍 **Environment Variables**

See `env.template` for all required environment variables:

- **Supabase**: Database and authentication
- **OpenAI**: AI-powered features
- **SendGrid**: Email delivery
- **Clerk**: User authentication
- **Telegram**: Bot integration (optional)
- **Microsoft**: Graph API integration (optional)
- **HuggingFace**: AI services (optional)

## 🔄 **API Endpoints**

### **Available Routes**
- `GET /api/health` - Health check
- `POST /api/chat-command` - AI chat command processing

### **Adding New API Routes**
Create new files in `src/api/` directory:

```typescript
// src/api/new-endpoint.ts
export async function GET() {
  return Response.json({ message: 'Hello World' });
}

export async function POST(request: Request) {
  const data = await request.json();
  // Handle POST logic
  return Response.json({ success: true });
}
```

## 🏭 **Architecture**

### **Frontend Architecture**
- **React 18** with functional components
- **React Router** for client-side routing
- **Zustand** for state management
- **Tailwind CSS** for styling
- **TypeScript** for type safety

### **Backend Architecture**
- **API handlers** in `src/api/`
- **Business logic** in `src/lib/`
- **Database layer** with Supabase
- **Type validation** with Zod
- **Session management** for stateful operations

### **Unified Development**
- Single `package.json` with all dependencies
- Vite for fast development and building
- TypeScript throughout the entire stack
- Shared types and utilities

## 🚀 **Deployment**

### **Build for Production**
```bash
npm run build
```

### **Deploy to Vercel**
```bash
npm install -g vercel
vercel
```

### **Deploy to Netlify**
- Connect your GitHub repository
- Set build command: `npm run build`
- Set publish directory: `dist`

## 🧪 **Development Notes**

### **Adding New Features**
1. **Frontend**: Add components in `src/components/`
2. **Backend**: Add API handlers in `src/api/` and logic in `src/lib/`
3. **Types**: Define interfaces in `src/types/`

### **File Organization**
- Keep frontend and backend code separate
- Use TypeScript throughout
- Follow the established directory structure
- No backend logic in React components

## 📋 **Migration Status**

✅ **Completed**
- Backend logic migration from Next.js backend
- Frontend components from React/Vite app
- Unified configuration files
- Environment setup
- Type definitions

🔄 **In Progress**
- Complete component migration
- Advanced AI features integration
- Testing setup

---

*Built with ❤️ using React, TypeScript, Vite, and modern web technologies* 