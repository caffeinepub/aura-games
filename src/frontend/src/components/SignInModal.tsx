import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Gamepad2, Lock, Mail, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SiDiscord, SiGoogle } from "react-icons/si";

interface SignInModalProps {
  open: boolean;
  onClose: () => void;
}

export function SignInModal({ open, onClose }: SignInModalProps) {
  const { login, isLoggingIn } = useInternetIdentity();

  const handleLogin = () => {
    login();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(5, 8, 20, 0.9)",
            backdropFilter: "blur(8px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          data-ocid="auth.modal"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="glass-card rounded-2xl w-full max-w-md overflow-hidden hero-gradient-border"
          >
            <div className="p-6 pb-0 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(34,211,238,0.2), rgba(139,92,246,0.2))",
                  }}
                >
                  <Gamepad2 size={20} style={{ color: "#22D3EE" }} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    Welcome Back
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Sign in to save your progress
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full glass-card hover:bg-white/10 transition-colors"
                data-ocid="auth.close_button"
                aria-label="Close sign in"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <Button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="w-full neon-glow-btn rounded-xl text-white border-0 font-bold py-3 h-auto"
                data-ocid="auth.primary_button"
              >
                {isLoggingIn ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connecting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Gamepad2 size={16} /> Sign In with Internet Identity
                  </span>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center">
                  <span
                    className="px-3 text-xs text-muted-foreground"
                    style={{ background: "oklch(var(--card))" }}
                  >
                    or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground glass-card hover:bg-white/10 transition-colors border border-white/10"
                  onClick={handleLogin}
                  data-ocid="auth.secondary_button"
                >
                  <SiGoogle size={14} style={{ color: "#EA4335" }} /> Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground glass-card hover:bg-white/10 transition-colors border border-white/10"
                  onClick={handleLogin}
                  data-ocid="auth.secondary_button"
                >
                  <SiDiscord size={14} style={{ color: "#5865F2" }} /> Discord
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="email" className="sr-only">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email address"
                      className="pl-9 glass-card border-white/10 text-sm"
                      data-ocid="auth.input"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="password" className="sr-only">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="pl-9 glass-card border-white/10 text-sm"
                      data-ocid="auth.input"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-xs"
                    style={{ color: "#22D3EE" }}
                  >
                    Forgot password?
                  </button>
                </div>
                <Button
                  onClick={handleLogin}
                  className="w-full rounded-xl font-semibold py-2.5 h-auto"
                  style={{
                    background: "rgba(34,211,238,0.15)",
                    border: "1px solid rgba(34,211,238,0.3)",
                    color: "#22D3EE",
                  }}
                  data-ocid="auth.submit_button"
                >
                  Sign In
                </Button>
              </div>

              <p className="text-center text-xs text-muted-foreground">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="underline"
                  style={{ color: "#22D3EE" }}
                  onClick={handleLogin}
                >
                  Create one free
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
