import prReview from "public/images/features/prReview.webp";
import diffDocs from "public/images/features/diffDocs.webp";
import archDocs from "public/images/features/archDocs.webp";
import apiDocs from "public/images/features/apiDocs.webp";
import hosting from "public/images/features/hosting.webp";
import multiLanguage from "public/images/features/multiLanguage.webp";
import penifycli from "public/images/features/penifycli.webp";
import { StaticImageData } from "next/image";

interface FeaturesTypes {
  title: string;
  text: string;
  img: StaticImageData;
  href: string | null;
  children: string[];
}

export const featureItems: FeaturesTypes[] = [
  {
    title: "Full Repository Documentation",
    text: "Generate complete repository documentation with a single clicks",
    img: diffDocs,
    href: "https://github.com/Snorkell-ai/xeno-rat/pull/7/files",
    children: [
      "Maps file relationships and dependencies across the repo",
      "Documents both public APIs and internal implementations",
      "Simplifies onboarding for new developers",
    ],
  },
  {
    title: "Git Diff Documentation Update",
    text: "Keep documentation in sync with code through automated updates",
    img: diffDocs,
    href: "https://github.com/Snorkell-ai/pokerogue/pull/1/files",
    children: [
      "Detects and documents affected by code changes",
      "Creates pull requests with necessary documentation updates",
      "Eliminates manual effort in maintaining documentation",
      "Ensures documentation accuracy after every merge",
    ],
  },
  {
    title: "Pull Request Documentation",
    text: "Generate clear summaries of code changes in pull requests automatically",
    img: prReview,
    href: "https://github.com/Snorkell-ai/pokerogue/pull/5",
    children: [
      "Instant analysis of code changes with contextual summaries",
      "Clear explanations that non-technical team members can understand",
      "Reduces review time by highlighting important changes",
      "Integrates directly with GitHub workflow",
    ],
  },
  {
    title: "Penify CLI",
    text: "Command-line tool for generating documentation and commit summary generation",
    img: penifycli,
    href: "https://pypi.org/project/penifycli/",
    children: [
      "CLI for generating Commit summaries and Documentation",
      "Integrates with JIRA and Custom LLMs",
      "Supports various programming languages",
    ],
  },
  {
    title: "API Documentation",
    text: "Generate comprehensive API documentation from your codebase",
    img: apiDocs,
    href: "https://snorkell.apidocumentation.com/reference#tag/github_app/post/api/app/github/webhook",
    children: [
      "Complete REST Endpoint documentation",
      "Request/response examples for each API",
      "Interactive API explorer for testing endpoints",
      "Authentication methods and error handling details",
      "Versioning support to track API changes",
    ],
  },
  {
    title: "Architecture Documentation",
    text: "Visualize code structure with interactive system architecture diagrams",
    img: archDocs,
    href: "https://xeno-rat-snorkell-ai-6.netlify.app/",
    children: [
      "Interactive diagrams showing module relationships",
      "Clickable components that reveal implementation details",
      "Automatic updates when architecture changes",
      "Exportable diagrams for documentation and presentations",
    ],
  },
  {
    title: "Automated Hosting",
    text: "Documentation deployed to public URLs with no extra configuration",
    img: hosting,
    href: null,
    children: [
      "Instant public hosting with secure HTTPS URLs",
      "Automatic updates when source code changes",
      "Custom domain support for branded documentation",
      "Access controls for public or private documentation",
    ],
  },
  {
    title: "Multiple Languages Support",
    text: "Process code in Python, JavaScript, TypeScript, Java, C#, C, and Kotlin",
    img: multiLanguage,
    href: null,
    children: [
      "Language-specific documentation conventions and formats",
      "Consistent documentation style across different languages",
      "Accurate type information and syntax highlighting",
      "Support for mixed-language repositories and frameworks",
    ],
  },
];
