import "./globals.css";
import ReduxProvider from "../providers/ReduxProvider";
import Sidebar from "../components/Sidebar";
export const metadata = {
  title: "CineMetric - ML-Powered Movie Recommender",
  description: "Discover movies with our hybrid recommendation system powered by machine learning.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-white min-h-screen" suppressHydrationWarning>
        <ReduxProvider>
          <div className="flex flex-col lg:flex-row min-h-screen">
            <Sidebar />
            
            <main className="flex-1 w-full pt-16 lg:pt-0 lg:ml-64 overflow-x-hidden">
              {children}
            </main>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}