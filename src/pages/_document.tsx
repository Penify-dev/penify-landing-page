import { Html, Head, Main, NextScript } from "next/document";

/**
 * The Document component serves as the main entry point for the HTML document structure in a Next.js application.
 * It is responsible for rendering the overall layout of the page, including the HTML, Head, body, Main, and NextScript components.
 *
 * @returns {JSX.Element} A JSX element representing the complete HTML document structure.
 *
 * @example
 * // Usage in a Next.js application
 * export default function MyApp() {
 *   return <Document />;
 * }
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="hubspot-pending">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
