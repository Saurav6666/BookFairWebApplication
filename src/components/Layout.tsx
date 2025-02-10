import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import MobileNav from "./MobileNav";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header (Fixed at the Top, Full Width) */}
      <Header />

      {/* Mobile Navigation (Only Visible on Small Screens) */}
      <div className="lg:hidden">
        <MobileNav />
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Only Visible on Larger Screens) */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content (Scrollable) */}
        <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-auto p-4">
          {children}
        </div>
      </div>

      {/* Footer (Fixed at Bottom) */}
      <Footer />
    </div>
  );
};

export default Layout;
