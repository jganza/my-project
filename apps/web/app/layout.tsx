import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "ADONAI.AI",
  description: "Biblical wisdom guide rooted in Protestant–Evangelical Christianity"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="border-b border-slate-800 bg-slate-900">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
              <div className="text-lg font-semibold">ADONAI.AI</div>
              <nav className="flex gap-4 text-sm">
                <a href="/chat">Chat</a>
                <a href="/journal">Journal</a>
                <a href="/saved">Saved</a>
                <a href="/settings">Settings</a>
                <a href="/login">Login</a>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
          <footer className="border-t border-slate-800 bg-slate-900">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 text-xs text-slate-400">
              <span>ADONAI.AI • Biblical wisdom with reverence</span>
              <div className="flex gap-4">
                <a href="/terms">Terms</a>
                <a href="/privacy">Privacy</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
