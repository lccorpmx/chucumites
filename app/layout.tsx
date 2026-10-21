import type { Metadata, Viewport } from "next";
import { Bangers, Lilita_One, Nunito } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { restaurant } from "@/lib/restaurant";

import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const bangers = Bangers({
  variable: "--font-bangers",
  weight: "400",
  subsets: ["latin"],
});

const lilita = Lilita_One({
  variable: "--font-lilita",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${restaurant.name} · Menú digital`,
  description: `Menú digital de ${restaurant.name}, ${restaurant.slogan.toLowerCase()}. Filetes, mariscos, tacos y bebidas.`,
  applicationName: restaurant.name,
};

export const viewport: Viewport = {
  themeColor: "#0a1d48",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-MX"
      className={`${nunito.variable} ${bangers.variable} ${lilita.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            classNames: {
              toast: "rounded-2xl! shadow-[0_18px_40px_rgb(5_18_49/0.55)]!",
              title: "font-extrabold!",
              description: "text-white/75!",
              success: "[&_[data-icon]]:text-zest",
              error: "[&_[data-icon]]:text-chile",
            },
          }}
        />
      </body>
    </html>
  );
}
