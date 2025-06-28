import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu } from "lucide-react";
import { useUser, useClerk, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";

export default function Header({ menuOpen, setMenuOpen, theme, setTheme }) {
  const { user } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <nav className="fixed top-0 w-full z-40 border-b border-border bg-nav backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 transition-all duration-500 ease-in-out hover:scale-105">
            <img
              src="/Logo.png"
              alt="Logo"
              className={`h-12 w-12 rounded-full object-cover shadow-lg ring-2 ring-secondary transition-transform duration-500 ${
                theme === "light" ? "rotate-0 scale-100" : "rotate-[360deg] scale-110"
              }`}
            />
            <span
              className={`text-xl handwriting font-bold text-foreground hidden sm:inline-block transition-all duration-500 ${
                theme === "light" ? "opacity-100" : "opacity-80 translate-x-0"}`}
            >
              PeaceOfPaper
            </span>
          </Link>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-6 text-lg">
            <Link to="/" className="text-muted hover:text-foreground transition duration-200 hover:scale-105">Home</Link>
            <Link to="/meditate" className="text-muted hover:text-foreground transition duration-200 hover:scale-105">Meditate</Link>
            <Link to="/faq" className="text-muted hover:text-foreground transition duration-200 hover:scale-105">FAQ</Link>
            <Link to="/profile" className="text-muted hover:text-foreground transition duration-200 hover:scale-105">Insights</Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-secondary hover:bg-accent transition-all duration-300 text-foreground shadow-lg"
              title="Toggle Theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Show user button when signed in */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* Show login/signup if not signed in */}
            <SignedOut>
              <Link to="/signin" className="text-muted hover:text-foreground text-sm">Sign In</Link>
              <Link to="/signup" className="text-muted hover:text-foreground text-sm">Sign Up</Link>
            </SignedOut>

            {/* Mobile menu */}
            <button
              className="md:hidden p-2 text-foreground hover:text-accent transition"
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
