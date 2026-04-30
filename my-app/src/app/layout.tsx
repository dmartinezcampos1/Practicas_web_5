import type { Metadata } from "next";
import "./globals.css";
import NavegadorPags from "./components/NavegadorPags";

export const metadata: Metadata = {
  title: "Twitter 2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <div className="MainContainer">
          <NavegadorPags />
          {children}
        </div>
      </body>
    </html>
  );
}