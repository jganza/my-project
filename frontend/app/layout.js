import "./globals.css";

export const metadata = {
  title: "ADONAI.AI",
  description: "Biblical wisdom companion"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="app-header">
            <div>
              <span className="brand">ADONAI.AI</span>
              <span className="subtitle">Biblical wisdom companion</span>
            </div>
            <nav>
              <a href="/">Chat</a>
              <a href="/prayer">Prayer/Journal</a>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
