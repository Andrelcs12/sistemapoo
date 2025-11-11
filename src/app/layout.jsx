import "./globals.css";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Dashboard Academia",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen bg-linear-to-bl from-zinc-950 via-zinc-950/90 to-zinc-950 text-white">
        <Sidebar />
        <div className="flex flex-col flex-1 min-h-screen ml-12">
          <main className="flex-1 p-4">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
