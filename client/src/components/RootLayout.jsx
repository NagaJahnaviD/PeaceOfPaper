import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import MobileMenu from './MobileMenu';
import { Outlet } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react'; // Fixed typo and extra space
import MindMitraBot from './MindMitraBot';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;


if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function RootLayout() {
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const [menuOpen,setMenuOpen]=useState(false)
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}> {/* Fixed component name */}
      <div>
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} theme={theme} setTheme={setTheme} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} theme={theme} setTheme={setTheme}/>
        <div style={{ minHeight: "90vh" }} className='bg-background'>
          <Outlet />
        </div>
        <MindMitraBot />
        <Footer />
      </div>
    </ClerkProvider>
  );
}

export default RootLayout;
