import { PageSchema } from "./schema";

export const defaultSchema: PageSchema = {
  id: "page-1",
  meta: {
    title: "Flexible",
    description: "A live UI rendering framework",
  },
  cssVariables: {
    "--color-primary": "#6366f1",
    "--color-primary-hover": "#4f46e5",
    "--color-bg": "#ffffff",
    "--color-bg-secondary": "#f8fafc",
    "--color-bg-dark": "#0f172a",
    "--color-text": "#0f172a",
    "--color-text-secondary": "#64748b",
    "--color-text-inverse": "#ffffff",
    "--color-border": "#e2e8f0",
    "--font-heading": "'Inter', system-ui, sans-serif",
    "--font-body": "'Inter', system-ui, sans-serif",
    "--radius": "0.5rem",
    "--spacing-section": "5rem",
  },
  root: {
    id: "root",
    type: "container",
    props: {},
    styles: {
      minHeight: "100vh",
      backgroundColor: "var(--color-bg)",
      color: "var(--color-text)",
      fontFamily: "var(--font-body)",
    },
    children: [
      {
        id: "nav",
        type: "nav",
        props: {
          logo: "Flexible",
          links: [
            { label: "Features", href: "#features" },
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
          ],
        },
        styles: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 2rem",
          borderBottom: "1px solid var(--color-border)",
          backgroundColor: "var(--color-bg)",
          position: "sticky",
          top: "0",
          zIndex: "50",
        },
        children: [],
      },
      {
        id: "hero",
        type: "hero",
        props: {
          badge: "Welcome to the future",
        },
        styles: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "6rem 2rem",
          backgroundColor: "var(--color-bg)",
        },
        children: [
          {
            id: "hero-heading",
            type: "heading",
            props: { text: "Build Beautiful Pages with AI", level: 1 },
            styles: {
              fontSize: "3.5rem",
              fontWeight: "800",
              fontFamily: "var(--font-heading)",
              lineHeight: "1.1",
              marginBottom: "1.5rem",
              maxWidth: "48rem",
              background: "linear-gradient(135deg, var(--color-primary), #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            },
            children: [],
          },
          {
            id: "hero-subtitle",
            type: "text",
            props: {
              text: "Describe what you want and watch your page transform in real-time. No coding required — just chat with AI and see instant results.",
            },
            styles: {
              fontSize: "1.25rem",
              color: "var(--color-text-secondary)",
              maxWidth: "36rem",
              marginBottom: "2rem",
              lineHeight: "1.6",
            },
            children: [],
          },
          {
            id: "hero-cta",
            type: "button",
            props: { text: "Get Started", href: "#features" },
            styles: {
              backgroundColor: "var(--color-primary)",
              color: "var(--color-text-inverse)",
              padding: "0.875rem 2rem",
              borderRadius: "var(--radius)",
              fontSize: "1.125rem",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
            },
            children: [],
          },
        ],
      },
      {
        id: "features",
        type: "section",
        props: { anchor: "features" },
        styles: {
          padding: "var(--spacing-section) 2rem",
          backgroundColor: "var(--color-bg-secondary)",
        },
        children: [
          {
            id: "features-heading",
            type: "heading",
            props: { text: "Features", level: 2 },
            styles: {
              fontSize: "2.25rem",
              fontWeight: "700",
              fontFamily: "var(--font-heading)",
              textAlign: "center",
              marginBottom: "3rem",
            },
            children: [],
          },
          {
            id: "features-grid",
            type: "grid",
            props: { columns: 3 },
            styles: {
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
              maxWidth: "72rem",
              margin: "0 auto",
            },
            children: [
              {
                id: "feature-1",
                type: "card",
                props: {
                  title: "Real-Time Updates",
                  description:
                    "See changes instantly as the AI modifies your page. No reloads needed.",
                  icon: "⚡",
                },
                styles: {
                  backgroundColor: "var(--color-bg)",
                  padding: "2rem",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--color-border)",
                },
                children: [],
              },
              {
                id: "feature-2",
                type: "card",
                props: {
                  title: "Schema-Driven",
                  description:
                    "Your page is defined by a clean JSON schema that the AI understands and manipulates.",
                  icon: "🧩",
                },
                styles: {
                  backgroundColor: "var(--color-bg)",
                  padding: "2rem",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--color-border)",
                },
                children: [],
              },
              {
                id: "feature-3",
                type: "card",
                props: {
                  title: "Chat Interface",
                  description:
                    "Just describe what you want in plain English. The AI handles the rest.",
                  icon: "💬",
                },
                styles: {
                  backgroundColor: "var(--color-bg)",
                  padding: "2rem",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--color-border)",
                },
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "cta-section",
        type: "section",
        props: { anchor: "about" },
        styles: {
          padding: "var(--spacing-section) 2rem",
          textAlign: "center",
          backgroundColor: "var(--color-bg-dark)",
          color: "var(--color-text-inverse)",
        },
        children: [
          {
            id: "cta-heading",
            type: "heading",
            props: { text: "Ready to Get Started?", level: 2 },
            styles: {
              fontSize: "2.25rem",
              fontWeight: "700",
              fontFamily: "var(--font-heading)",
              marginBottom: "1rem",
            },
            children: [],
          },
          {
            id: "cta-text",
            type: "text",
            props: {
              text: "Start chatting with the AI to customize this page. Change colors, add sections, update content — anything you can imagine.",
            },
            styles: {
              fontSize: "1.125rem",
              color: "#94a3b8",
              maxWidth: "32rem",
              margin: "0 auto 2rem",
              lineHeight: "1.6",
            },
            children: [],
          },
          {
            id: "cta-button",
            type: "button",
            props: { text: "Start Building" },
            styles: {
              backgroundColor: "var(--color-primary)",
              color: "var(--color-text-inverse)",
              padding: "0.875rem 2rem",
              borderRadius: "var(--radius)",
              fontSize: "1.125rem",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
            },
            children: [],
          },
        ],
      },
      {
        id: "footer",
        type: "footer",
        props: {
          text: "Built with Flexible — AI-powered live page editing",
          links: [
            { label: "GitHub", href: "#" },
            { label: "Docs", href: "#" },
          ],
        },
        styles: {
          padding: "2rem",
          textAlign: "center",
          borderTop: "1px solid var(--color-border)",
          color: "var(--color-text-secondary)",
          fontSize: "0.875rem",
          backgroundColor: "var(--color-bg)",
        },
        children: [],
      },
    ],
  },
};
