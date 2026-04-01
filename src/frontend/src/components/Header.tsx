import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Gamepad2, LogOut, Menu, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { AuraLogo } from "./AuraLogo";

interface HeaderProps {
  onSignInClick: () => void;
}

export function Header({ onSignInClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { identity, clear, isInitializing } = useInternetIdentity();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();
  const principal = identity?.getPrincipal().toString() ?? "";
  const shortPrincipal = principal
    ? `${principal.slice(0, 5)}...${principal.slice(-3)}`
    : "";

  const navLinks = [
    { label: "Games", href: "#games" },
    { label: "Categories", href: "#categories" },
    { label: "Leaderboard", href: "#leaderboard" },
    { label: "About", href: "#about" },
  ];

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="/"
            className="flex items-center gap-2.5 group"
            data-ocid="nav.link"
          >
            <AuraLogo size={36} />
            <span
              className="text-xl font-bold"
              style={{
                background:
                  "linear-gradient(135deg, #22D3EE, #8B5CF6, #EC4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AURA GAMES
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isInitializing ? (
              <div className="h-8 w-24 bg-muted/50 rounded-full animate-pulse" />
            ) : isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card">
                  <User size={14} className="text-neon-cyan" />
                  <span className="text-xs text-muted-foreground font-mono">
                    {shortPrincipal}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clear}
                  className="text-muted-foreground hover:text-foreground"
                  data-ocid="nav.button"
                >
                  <LogOut size={14} className="mr-1" /> Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSignInClick}
                  className="text-muted-foreground hover:text-foreground border border-white/10"
                  data-ocid="nav.button"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={onSignInClick}
                  className="neon-glow-btn rounded-full text-white border-0 font-semibold pulse-glow"
                  data-ocid="nav.primary_button"
                >
                  Join Now
                </Button>
              </div>
            )}
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="nav.toggle"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden glass-card border-t border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
              {!isLoggedIn && (
                <Button
                  size="sm"
                  onClick={() => {
                    onSignInClick();
                    setMobileOpen(false);
                  }}
                  className="neon-glow-btn rounded-full text-white border-0 font-semibold w-full"
                  data-ocid="nav.primary_button"
                >
                  <Gamepad2 size={14} className="mr-1" /> Sign In / Join
                </Button>
              )}
              {isLoggedIn && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clear}
                  className="w-full text-muted-foreground"
                  data-ocid="nav.button"
                >
                  <LogOut size={14} className="mr-1" /> Sign Out
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
