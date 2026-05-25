import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Notas & Tareas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#f0f2f5",
        }}
      >
        {/* HEADER tipo app */}
        <header
          style={{
            background: "#0070f3",
            color: "white",
            padding: "15px",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          📱 Mi App
        </header>

        {/* CONTENIDO */}
        <main
          style={{
            maxWidth: "400px",
            margin: "auto",
            padding: "15px",
            minHeight: "80vh",
          }}
        >
          {children}
        </main>

        {/* NAVBAR inferior tipo móvil */}
        <nav
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            maxWidth: "400px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "space-around",
            background: "white",
            padding: "10px 0",
            borderTop: "1px solid #ddd",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "#0070f3" }}>
            📝
            <div style={{ fontSize: "12px" }}>Notas</div>
          </Link>

          <Link href="/tareas" style={{ textDecoration: "none", color: "#0070f3" }}>
            ✅
            <div style={{ fontSize: "12px" }}>Tareas</div>
          </Link>
        </nav>
      </body>
    </html>
  );
}