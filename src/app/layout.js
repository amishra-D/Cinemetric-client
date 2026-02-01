import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning fixes the extension-based errors in your screenshot */}
      <body className="bg-neutral-950 text-white min-h-screen" suppressHydrationWarning>
        <ReduxProvider>
          <div className="flex flex-col lg:flex-row min-h-screen">
            <Sidebar />
            
            {/* Main content: pt-16 on mobile for the fixed top-bar, lg:pt-0 on desktop */}
            <main className="flex-1 w-full pt-16 lg:pt-0 lg:ml-64 overflow-x-hidden">
              {children}
            </main>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}