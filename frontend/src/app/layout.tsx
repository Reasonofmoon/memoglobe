import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MemoGlobe — Write Notes on a Globe",
  description:
    "Geo-Metacognitive Self-Evolution Learning Platform. Write notes, AI finds your blind spots, places make you remember.",
  keywords: [
    "learning",
    "education",
    "globe",
    "notes",
    "metacognition",
    "AI",
    "GeoAnchoring",
    "spatial memory",
  ],
  openGraph: {
    title: "MemoGlobe",
    description: "Write notes on a globe. AI finds your blind spots. Places make you remember.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
