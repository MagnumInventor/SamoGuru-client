//app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ClientLayout } from "./components/client-layout";
import { ThemeProvider } from "./components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "СамоГуру - Робоче середовище ресторану",
  description: "Повноцінне робоче середовище на одному сайті",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" suppressHydrationWarning className="h-full">
      <body className={`${inter.className} h-full m-0 p-0 overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen w-full overflow-x-hidden">
            <ClientLayout>{children}</ClientLayout>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}