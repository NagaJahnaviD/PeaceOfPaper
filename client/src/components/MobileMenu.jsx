import { Link } from "react-router-dom";
import { useUser, useClerk, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Moon, Sun } from "lucide-react";

export default function MobileMenu({ menuOpen, setMenuOpen, theme, setTheme }) {
  const { user } = useUser();
  const { signOut } = useClerk();

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-nav z-40 flex flex-col items-center justify-center backdrop-blur-lg
        transition-all duration-300 ease-in-out
        ${menuOpen ? "h-screen opacity-100 pointer-events-auto" : "h-0 opacity-0 pointer-events-none"}`}
    >
      {/* Close button */}
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-6 right-6 text-foreground text-3xl focus:outline-none"
        aria-label="Close Menu"
      >
        &times;
      </button>

      {/* Navigation links */}
      {['/', '/meditate', '/faq', '/profile'].map((path) => (
        <Link
          key={path}
          to={path}
          onClick={() => setMenuOpen(false)}
          className={`text-2xl font-semibold text-foreground my-4 transform transition-transform duration-300
            ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          {path === '/' ? 'Home' : path.replace('/', '').replace(/\b\w/g, l => l.toUpperCase())}
        </Link>
      ))}

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="mt-6 p-3 rounded-full bg-secondary hover:bg-accent transition-all duration-300 text-foreground shadow-lg"
        title="Toggle Theme"
      >
        {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
      </button>

      {/* Auth controls */}
      <div className="mt-6 flex gap-4 items-center">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <Link
            to="/signin"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium text-muted hover:text-foreground transition"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium text-muted hover:text-foreground transition"
          >
            Sign Up
          </Link>
        </SignedOut>
      </div>
    </div>
  );
}
