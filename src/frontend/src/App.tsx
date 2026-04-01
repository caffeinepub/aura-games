import { Footer } from "@/components/Footer";
import { GameGrid } from "@/components/GameGrid";
import { GameModal } from "@/components/GameModal";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SignInModal } from "@/components/SignInModal";
import { TopCharts } from "@/components/TopCharts";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";

export default function App() {
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [signInOpen, setSignInOpen] = useState(false);

  const handlePlayGame = (gameId: string) => setActiveGameId(gameId);
  const handleCloseGame = () => setActiveGameId(null);
  const handleSignInPrompt = () => {
    setActiveGameId(null);
    setSignInOpen(true);
  };
  const handleBrowseGames = () => {
    const el = document.getElementById("games");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSignInClick={() => setSignInOpen(true)} />

      <main className="flex-1">
        <Hero onBrowseGames={handleBrowseGames} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main game grid */}
            <div className="flex-1 min-w-0 -mx-4 sm:-mx-6 lg:mx-0">
              <GameGrid onPlayGame={handlePlayGame} />
            </div>

            {/* Top charts sidebar */}
            <div className="lg:w-72 flex-shrink-0">
              <div className="sticky top-20">
                <TopCharts onPlayGame={handlePlayGame} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <GameModal
        gameId={activeGameId}
        onClose={handleCloseGame}
        onSignInPrompt={handleSignInPrompt}
      />

      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />

      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "rgba(20, 27, 46, 0.95)",
            border: "1px solid rgba(34, 211, 238, 0.3)",
            color: "#F2F5FF",
          },
        }}
      />
    </div>
  );
}
