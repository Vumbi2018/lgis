## 6. Frontend Architecture

### 6.1 Project Structure

```
client/src/
├── components/
│   ├── layout/
│   │   ├── main-layout.tsx      # Desktop layout
│   │   ├── header.tsx           # Top navigation
│   │   └── sidebar.tsx          # Side navigation
│   ├── licensing/
│   │   ├── LicenseCertificate.tsx
│   │   ├── ApplicationWizard.tsx
│   │   └── PaymentModal.tsx
│   └── ui/                      # Shadcn/UI components
├── pages/
│   ├── dashboard/
│   ├── licensing/
│   │   ├── index.tsx            # List view
│   │   ├── apply.tsx            # Application wizard
│   │   └── request-details.tsx  # Details view
│   └── auth/
│       ├── login.tsx
│       └── register.tsx
├── mobile/
│   ├── MobileLayout.tsx
│   ├── components/
│   │   ├── BottomNav.tsx
│   │   └── MobileHeader.tsx
│   └── pages/
│       ├── MobileDashboard.tsx
│       ├── InspectionsList.tsx
│       └── MobileApply.tsx
├── contexts/
│   └── organization-context.tsx  # Global state
├── hooks/
│   └── use-toast.ts
├── lib/
│   ├── queryClient.ts           # TanStack Query config
│   └── utils.ts                 # Helper functions
├── App.tsx                       # Router
└── main.tsx                      # Entry point
```

### 6.2 Routing System

Using **Wouter** for lightweight routing:

```typescript
// App.tsx
import { Switch, Route } from "wouter";

function App() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/licensing" component={LicensingPage} />
      <Route path="/licensing/apply/:id" component={ApplicationWizard} />
      <Route path="/mobile/inspector/inspections" component={InspectionsList} />
      <Route component={NotFound} />
    </Switch>
  );
}
```

**Programmatic Navigation:**
```typescript
import { useLocation } from "wouter";

const [, setLocation] = useLocation();
setLocation("/dashboard");
```

### 6.3 State Management

**TanStack Query for API State:**

```typescript
import { useQuery, useMutation } from "@tanstack/react-query";

// Fetch data
const { data: businesses, isLoading } = useQuery({
  queryKey: ["/api/v1/businesses"],
});

// Mutate data
const createBusiness = useMutation({
  mutationFn: async (data) => {
    const res = await apiRequest("POST", "/api/v1/businesses", data);
    return res.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["/api/v1/businesses"] });
  }
});
```

**React Context for Global State:**

```typescript
// contexts/organization-context.tsx
const OrganizationContext = createContext();

export function OrganizationProvider({ children }) {
  const [currentOrg, setCurrentOrg] = useState(null);
  
  return (
    <OrganizationContext.Provider value={{ currentOrg, setCurrentOrg }}>
      {children}
    </OrganizationContext.Provider>
  );
}
```

### 6.4 Form Handling

**React Hook Form + Zod:**

```typescript
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  businessName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\+675/, "Must start with +675")
});

function BusinessForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { businessName: "" }
  });
  
  const onSubmit = (data) => {
    // Submit to API
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField control={form.control} name="businessName" ... />
      </form>
    </Form>
  );
}
```

### 6.5 Component Patterns

**Smart vs Presentational:**

```typescript
// Smart Component (Container)
function BusinessListContainer() {
  const { data, isLoading } = useQuery({ queryKey: ["/api/businesses"] });
  
  if (isLoading) return <Spinner />;
  
  return <BusinessList businesses={data} />;
}

// Presentational Component
function BusinessList({ businesses }) {
  return (
    <div>
      {businesses.map(b => <BusinessCard key={b.id} business={b} />)}
    </div>
  );
}
```

---

## 7. Backend Architecture

### 7.1 Project Structure

```
server/
├── index.ts                 # Server entry point
├── routes.ts                # API routes
├── storage.ts               # Data access layer
├── db.ts                    # Database connection
├── auth.ts                  # Authentication logic
├── seed.ts                  # Database seeding
├── upload_middleware.ts     # File upload handling
├── payment_gateway.ts       # Payment integration
├── pdf_service.ts           # PDF generation
├── email.ts                 # Email service
└── digital_signature_service.ts  # Digital signatures
```

### 7.2 Server Initialization

```typescript
// server/index.ts
import express from "express";
import session from "express-session";
import passport from "passport";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === "production" }
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
import "./routes.ts";  // Registers all API routes

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
```

### 7.3 Storage Layer

**Abstraction Pattern:**

```typescript
// server/storage.ts
import { db } from "./db";
import { businesses, users, inspections } from "@/shared/schema";

export const storage = {
  // Businesses
  async getBusinesses(councilId?: string) {
    if (councilId) {
      return db.select().from(businesses).where(eq(businesses.councilId, councilId));
    }
    return db.select().from(businesses);
  },
  
  async getBusinessById(businessId: string) {
    const [business] = await db.select()
      .from(businesses)
      .where(eq(businesses.businessId, businessId));
    return business;
  },
  
  async createBusiness(data: InsertBusiness) {
    const [business] = await db.insert(businesses).values(data).returning();
    return business;
  },
  
  // ... more methods
};
```

### 7.4 Authentication

**Passport Local Strategy:**

```typescript
// server/auth.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

passport.use(new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    const user = await storage.getUserByEmail(email);
    if (!user) return done(null, false);
    
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return done(null, false);
    
    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (id, done) => {
  const user = await storage.getUserById(id);
  done(null, user);
});
```

**Authentication Middleware:**

```typescript
function requireAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
}

// Apply to protected routes
app.get("/api/v1/businesses", requireAuth, async (req, res) => {
  // ...
});
```

### 7.5 Workflow Engine

**Workflow Execution:**

```typescript
async function executeWorkflow(instanceId: string) {
  const instance = await storage.getWorkflowInstance(instanceId);
  const definition = await storage.getWorkflowDefinition(instance.workflowDefId);
  const steps = await storage.getWorkflowSteps(definition.defId);
  
  const currentStep = steps.find(s => s.stepId === instance.currentStepId);
  
  // Execute step logic
  await performStepActions(currentStep, instance);
  
  // Move to next step
  const nextStep = getNextStep(steps, currentStep);
  if (nextStep) {
    await storage.updateWorkflowInstance(instanceId, {
      currentStepId: nextStep.stepId
    });
  } else {
    // Workflow complete
    await storage.updateWorkflowInstance(instanceId, {
      status: "completed",
      completedAt: new Date()
    });
  }
}
```

---

## 8. Mobile App Implementation

### 8.1 Capacitor Setup

**Configuration:**

```typescript
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'pg.gov.ncdc.lgis',
  appName: 'LGIS',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1e40af",
      showSpinner: false
    },
    Camera: {
      permissions: ["camera", "photos"]
    }
  }
};

export default config;
```

### 8.2 Platform Detection

```typescript
// mobile/utils/platform.ts
import { Capacitor } from '@capacitor/core';

export const isNative = Capacitor.isNativePlatform();
export const isAndroid = Capacitor.getPlatform() === 'android';
export const isIOS = Capacitor.getPlatform() === 'ios';
export const isWeb = !isNative;
```

### 8.3 Camera Integration

```typescript
import { Camera, CameraResultType } from '@capacitor/camera';

async function takePhoto() {
  try {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      quality: 90,
      allowEditing: false
    });
    
    return photo.webPath;
  } catch (error) {
    console.error("Camera error:", error);
  }
}
```

### 8.4 GPS Integration

```typescript
import { Geolocation } from '@capacitor/geolocation';

async function getCurrentPosition() {
  try {
    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000
    });
    
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy
    };
  } catch (error) {
    console.error("GPS error:", error);
  }
}
```

### 8.5 Offline Storage

```typescript
import { Preferences } from '@capacitor/preferences';

// Save data
await Preferences.set({
  key: 'inspection_draft',
  value: JSON.stringify(inspectionData)
});

// Retrieve data
const { value } = await Preferences.get({ key: 'inspection_draft' });
const data = JSON.parse(value);

// Remove data
await Preferences.remove({ key: 'inspection_draft' });
```

---

## 9. Security

### 9.1 Authentication

**Password Hashing:**

```typescript
import bcrypt from "bcrypt";

// Hash password
const hash = await bcrypt.hash(password, 10);

// Verify password
const valid = await bcrypt.compare(password, hash);
```

**Session Management:**

```typescript
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // HTTPS only
    httpOnly: true, // No client access
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'strict'
  }
}));
```

### 9.2 Authorization

**Role-Based Access Control:**

```typescript
function requireRole(role: string) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    if (req.user.role !== role) {
      return res.status(403).json({ error: "Forbidden" });
    }
    
    next();
  };
}

// Usage
app.get("/api/admin/users", requireRole("admin"), async (req, res) => {
  // Only admins can access
});
```

### 9.3 Input Validation

**Zod Schema Validation:**

```typescript
import { z } from "zod";

const createBusinessSchema = z.object({
  legalName: z.string().min(1).max(256),
  email: z.string().email(),
  phone: z.string().regex(/^\+675/),
  tin: z.string().length(10)
});

app.post("/api/v1/businesses", async (req, res) => {
  try {
    const data = createBusinessSchema.parse(req.body);
    const business = await storage.createBusiness(data);
    res.status(201).json(business);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    }
  }
});
```

### 9.4 SQL Injection Prevention

**Parameterized Queries (Drizzle ORM):**

```typescript
// Safe - uses parameterized queries
const business = await db.select()
  .from(businesses)
  .where(eq(businesses.businessId, userId)); // userId is parameter

// DO NOT do this:
// const query = `SELECT * FROM businesses WHERE id = '${userId}'`;
```

### 9.5 XSS Protection

**React's Built-in Protection:**

```typescript
// Safe - React escapes by default
<div>{userInput}</div>

// Dangerous - bypasses escaping
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

**Content Security Policy:**

```typescript
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'");
  next();
});
```

---

## 10. Development Workflow

### 10.1 Environment Setup

**Install Dependencies:**

```bash
# Clone repository
git clone https://github.com/council/lgis.git
cd lgis

# Install packages
npm install

# Set up database
createdb lgis_dev

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Push schema
npm run db:push

# Seed data
npx tsx server/seed.ts

# Run development server
npm run dev
````

**Environment Variables:**

```bash
# .env
DATABASE_URL=postgresql://user:password@localhost:5432/lgis_dev
SESSION_SECRET=your-secret-key-change-this
NODE_ENV=development
PORT=5000
```

### 10.2 Development Commands

```bash
# Development server (hot reload)
npm run dev

# Database operations
npm run db:push      # Push schema changes
npm run db:studio    # Open Drizzle Studio

# Type checking
npm run typecheck

# Build for production
npm run build

# Mobile development
npx cap sync android
npx cap open android
```

### 10.3 Code Organization

**Naming Conventions:**

- **Files**: kebab-case (`business-list.tsx`)
- **Components**: PascalCase (`BusinessList`)
- **Functions**: camelCase (`getUserById`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_FILE_SIZE`)

**Import Order:**

```typescript
// 1. External libraries
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// 2. Internal modules
import { Button } from "@/components/ui/button";
import { storage } from "@/server/storage";

// 3. Types
import type { Business } from "@/shared/schema";

// 4. Styles
import "./styles.css";
```

### 10.4 Git Workflow

**Branching Strategy:**

```
main (production)
  ├── develop (staging)
      ├── feature/license-application
      ├── feature/mobile-inspections
      └── bugfix/payment-validation
```

**Commit Messages:**

```
feat: Add license application wizard
fix: Correct payment validation logic
docs: Update API documentation
refactor: Simplify business registration form
```

---

## 11. Key Modules

### 11.1 Licensing Module

**Components:**
- `LicensingPage`: Main list view
- `ApplicationWizard`: Multi-step form
- `RequirementsStep`: Checklist display
- `LicenseForm`: License-specific forms
- `LicenseCertificate`: PDF certificate view

**Key Features:**
- Duplicate application prevention
- Document upload
- Workflow integration
- Digital signatures
- QR code generation

### 11.2 Inspection Module

**Components:**
- `InspectionsList`: Desktop & mobile list
- `InspectionPerform`: Mobile inspection form
- `InspectionMap`: GIS view
- `PhotoCapture`: Camera integration

**Key Features:**
- GPS location capture
- Offline functionality
- Photo evidence
- Digital signature
- Automatic sync

### 11.3 Workflow Module

**Components:**
- `WorkflowBuilder`: Visual workflow designer
- `WorkflowStatus`: Progress indicator
- `StepAssignment`: Task allocation

**Logic:**
- Step progression
- SLA monitoring
- Auto-escalation
- Email notifications

---

## 12. Testing Strategy

### 12.1 Manual Testing

**Test Checklist:**
- [ ] Login/logout flow
- [ ] Business registration
- [ ] License application
- [ ] Payment processing
- [ ] Mobile inspection
- [ ] Admin configuration

### 12.2 Browser Testing

Test on:
- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)
- Mobile browsers

### 12.3 Mobile Testing

Test on:
- Android emulator
- Physical Android device
- Different screen sizes
- Offline mode
- Camera/GPS features

---

**End of Technical Guide**

*Version 1.0 - January 2026*
*LGIS Technical Documentation*
