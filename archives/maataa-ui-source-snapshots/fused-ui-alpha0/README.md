# MAATAA UI

A production-grade React component library with a paper-and-ink design aesthetic. Built for creating beautiful, accessible, and consistent user interfaces.

## 🎨 Features

- **8 Core Components**: Button, Input, Card, Badge, Modal, Toast, and AI components
- **Accessible by Default**: WCAG AA compliant with keyboard navigation
- **Paper-Ink Aesthetic**: Warm, earthy color palette inspired by natural materials
- **TypeScript Support**: Full type definitions for all components
- **Storybook Integration**: Interactive component documentation
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Well-Documented**: Comprehensive guides and component reference

## 📦 Installation

```bash
npm install @maataa/ui
# or
yarn add @maataa/ui
```

## 🚀 Quick Start

### Basic Button

```tsx
import { Button } from "@maataa/ui/primitives";

export function App() {
  return (
    <Button variant="primary" onClick={() => console.log("Clicked!")}>
      Click Me
    </Button>
  );
}
```

### Form with Input and Button

```tsx
import { Input, Button } from "@maataa/ui/primitives";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="primary">Sign In</Button>
    </div>
  );
}
```

### Modal Dialog

```tsx
import { Modal, Button } from "@maataa/ui/surfaces";
import { useState } from "react";

export function ConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        footer={
          <div style={{ display: "flex", gap: "8px" }}>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary">Confirm</Button>
          </div>
        }
      >
        Are you sure you want to proceed?
      </Modal>
    </>
  );
}
```

### Responsive Application Shell

Compose the global bar, application navigation, page tools, content, and workspace footer. The shell keeps the existing `topNav`, `sidebar`, and `children` slots, and adds responsive navigation plus independently placeable toolbar and footer regions.

```tsx
import { AppShell, Sidebar, TopNav } from "@maataa/ui/navigation";

const navigation = [
  { id: "overview", label: "Workspace overview", href: "/" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "calendar", label: "Calendar", href: "/calendar" },
];

export function Workspace() {
  return (
    <AppShell
      navigationPosition="left"
      topNav={<TopNav brand={<strong>MAATAA</strong>} actions={<span>Maya Chen</span>} />}
      sidebar={
        <Sidebar items={navigation} activeId="overview" footer={<span>Workspace settings</span>} />
      }
      toolbar={<div>Today · Create task</div>}
      footer={<div>Workspace status</div>}
    >
      <section style={{ padding: 24 }}>
        <h1>Your workspace</h1>
        <p>Apps, today’s agenda, activity, and priority work.</p>
      </section>
    </AppShell>
  );
}
```

`navigationPosition` supports `left`, `right`, `top`, and `folded`. The shell adds a skip link, an accessible mobile navigation drawer with Escape/backdrop closing, and a desktop collapse control. When the navigation slot is a `Sidebar`, the shell sets its orientation and accessible label. `toolbarPosition` and `footerPosition` each accept `above` or `below` relative to the main content. The shell does not provide routing, authentication, or data services; connect those through the host application.

### Toast Notifications

```tsx
import { Button } from "@maataa/ui/primitives";
import { Toast, ToastContainer } from "@maataa/ui/surfaces";
import { useState } from "react";

export function NotificationExample() {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type) => {
    const id = String(Date.now());
    setToasts((t) => [
      ...t,
      {
        id,
        message,
        type,
        onClose: (id) => setToasts((t) => t.filter((x) => x.id !== id)),
      },
    ]);
  };

  return (
    <>
      <Button onClick={() => showToast("Success!", "success")}>Show Success</Button>
      <ToastContainer toasts={toasts} onClose={() => {}} />
    </>
  );
}
```

## 📚 Documentation

### Component Categories

#### Primitives

Basic building blocks for creating interfaces:

- **Button** - Versatile action button with multiple variants
- **Input** - Text input with validation and helper text
- **Card** - Flexible container with optional header/footer
- **Badge** - Status indicator and label component

#### Surfaces

Larger container and layout components:

- **Modal** - Focused dialog for important interactions
- **Toast** - Non-blocking notification component

#### AI Components

Specialized components for ML/AI features:

- **MLInsightsPanel** - Display model insights
- **PredictionChart** - Visualize predictions
- **AnomalyAlerts** - Show detected anomalies
- **RecommendationCards** - Display ML recommendations
- **EmbeddingVisualization** - Visualize embeddings in 2D

### Full Guides

- **[Design System](./DESIGN_SYSTEM.md)** - Color palette, typography, spacing, and theming
- **[Components Guide](./COMPONENTS.md)** - Detailed component documentation with examples

## 🎭 Storybook

View interactive component documentation:

```bash
npm run storybook
# Opens at http://localhost:6006
```

Build static Storybook:

```bash
npm run storybook:build
```

## 🎨 Design System

### Colors

| Name            | Value     | Usage              |
| --------------- | --------- | ------------------ |
| Primary Brown   | `#8B6F47` | Main actions       |
| Secondary Brown | `#D4AF9F` | Secondary actions  |
| Off White       | `#FFFAF0` | Primary background |
| Success         | `#C7E9C0` | Success states     |
| Error           | `#F5B5A6` | Error states       |
| Warning         | `#F5D547` | Warning states     |

### Typography

- **Display**: 32px, weight 600
- **Heading 1**: 24px, weight 600
- **Heading 2**: 20px, weight 600
- **Body**: 14px, weight 400
- **Caption**: 11px, weight 400

### Spacing

- **xs**: 4px
- **sm**: 8px
- **md**: 12px
- **lg**: 16px
- **xl**: 20px

See [Design System](./DESIGN_SYSTEM.md) for complete details.

## ♿ Accessibility

All components are built with accessibility in mind:

- ✅ WCAG AA compliant color contrast
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Semantic HTML
- ✅ Focus indicators on all interactive elements
- ✅ Proper ARIA attributes

## 📱 Responsive Design

Components adapt to different screen sizes:

```tsx
// Responsive grid
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "16px",
  }}
>
  <Card>Responsive card</Card>
  <Card>Responsive card</Card>
  <Card>Responsive card</Card>
</div>
```

## 🧪 Testing

Run unit tests:

```bash
npm run test
```

Run tests with coverage:

```bash
npm run test:coverage
```

Run tests in UI mode:

```bash
npm run test:ui
```

## 🔨 Development

### Build

```bash
npm run build
```

### Build in watch mode

```bash
npm run build:watch
```

### Type checking

```bash
npm run typecheck
```

Strict type checking:

```bash
npm run typecheck:strict
```

### Linting

```bash
npm run lint
```

### Code formatting

```bash
npm run format
```

### Clean build artifacts

```bash
npm run clean
```

## 📦 Export Paths

Import components from specific categories:

```tsx
// Primitives
import { Button, Input, Card, Badge } from "@maataa/ui/primitives";

// Surfaces
import { Modal, Toast, ToastContainer } from "@maataa/ui/surfaces";

// AI
import { MLInsightsPanel, PredictionChart } from "@maataa/ui/ai";

// Or from main export
import { Button } from "@maataa/ui";
```

## 🚀 Performance

- Minimal bundle size with tree-shaking
- Optimized CSS-in-JS with scoped styles
- No external dependencies (React only)
- Lazy-loadable components

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see LICENSE file for details

## 🔄 Version History

- **v1.0.0** (September 3, 2026)
  - Initial release with 8 core components
  - Complete design system
  - Storybook integration
  - Comprehensive documentation
  - Full accessibility support

## 💬 Support

For issues and questions:

- 📧 Email: support@maataa.dev
- 🐛 GitHub Issues: [MAATAA UI Issues](https://github.com/maataa/maataa-ui/issues)
- 💡 Discussions: [MAATAA UI Discussions](https://github.com/maataa/maataa-ui/discussions)

## 🙏 Acknowledgments

Built with React, TypeScript, and Storybook.

---

**Made with ❤️ by the MAATAA UI Team**

[View on GitHub](https://github.com/maataa/maataa-ui) • [Read Docs](./COMPONENTS.md) • [View Design System](./DESIGN_SYSTEM.md)
