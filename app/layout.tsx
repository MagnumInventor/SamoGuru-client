import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ClientLayout } from "@/app/components/client-layout";
import { ThemeProvider } from "@/app/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "СамоГуру - Робоче середовище ресторану",
  description: "Повноцінне робоче середовище на одному сайті",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}