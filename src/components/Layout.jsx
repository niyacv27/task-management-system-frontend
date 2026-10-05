import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children, theme, toggleTheme }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="min-h-[calc(100vh-140px)]">{children}</main>

      <Footer />
    </div>
  );
}

export default Layout;
