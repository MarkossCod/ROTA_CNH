import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rota-da-aprovacao-14-dias.msamuelcabtec.chatgpt.site"),
  title: "Rota CNH — Seu plano de estudos para a CNH",
  description: "Escolha quantos dias e quanto tempo por dia você tem para criar um plano personalizado para a prova teórica da CNH.",
  openGraph: {
    title: "Rota CNH",
    description: "Seu plano, no seu tempo: uma rota personalizada para a prova teórica da CNH.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og-rota-cnh.png", alt: "Rota CNH — Seu plano, no seu tempo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rota CNH",
    description: "Seu plano, no seu tempo: uma rota personalizada para a prova teórica da CNH.",
    images: ["/og-rota-cnh.png"],
  },
  icons: {
    icon: "/rota-cnh-logo.png",
    shortcut: "/rota-cnh-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
