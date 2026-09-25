import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import { FitLogProvider } from "@/context/FitLogContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <FitLogProvider>
                    <Navbar />

                    {children}

                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        theme="dark"
                    />
                </FitLogProvider>
            </body>
        </html>
    );
}