import Navbar from "@/components/layout/Navbar";
import "./globals.css";

import { FitLogProvider } from "@/context/FitLogContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          <Navbar />

          {children}
        </FitLogProvider>
      </body>
    </html>
  );
}