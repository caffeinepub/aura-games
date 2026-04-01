import { Input } from "@/components/ui/input";
import { CATEGORIES, type Category, GAMES } from "@/data/games";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useFavorites, useRatings } from "@/hooks/useStorage";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { GameCard } from "./GameCard";

interface GameGridProps {
  onPlayGame: (gameId: string) => void;
}

export function GameGrid({ onPlayGame }: GameGridProps) {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [search, setSearch] = useState("");
  const { getAverageRating } = useRatings();
  const { identity } = useInternetIdentity();
  const userId =
    identity && !identity.getPrincipal().isAnonymous()
      ? identity.getPrincipal().toString()
      : null;
  const { isFavorite, toggleFavorite } = useFavorites(userId);

  const filtered = GAMES.filter((g) => {
    const matchCat = activeCategory === "All" || g.category === activeCategory;
    const matchSearch =
      search === "" ||
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleToggleFavorite = (gameId: string) => {
    if (!userId) {
      toast("Sign in to save favorites", {
        description: "Create a free account to track your favorite games.",
      });
      return;
    }
    toggleFavorite(gameId);
  };

  return (
    <section id="games" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-foreground"
        >
          Featured{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #22D3EE, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Games
          </span>
        </motion.h2>
        <div className="relative w-48 sm:w-64">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-8 text-xs glass-card border-white/10 focus:border-neon-cyan/50"
            data-ocid="games.search_input"
          />
        </div>
      </div>

      <div
        className="flex gap-2 flex-wrap mb-6"
        id="categories"
        data-ocid="games.tab"
      >
        {CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-200"
            style={{
              background:
                activeCategory === cat
                  ? "linear-gradient(135deg, #22D3EE, #8B5CF6)"
                  : "rgba(255,255,255,0.05)",
              color: activeCategory === cat ? "#fff" : "rgba(255,255,255,0.5)",
              border:
                activeCategory === cat
                  ? "none"
                  : "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                activeCategory === cat
                  ? "0 0 12px rgba(34,211,238,0.4)"
                  : "none",
            }}
            data-ocid="games.tab"
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div
          className="text-center py-20 text-muted-foreground"
          data-ocid="games.empty_state"
        >
          <p className="text-lg">No games found</p>
          <p className="text-sm mt-1">Try a different search or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((game, i) => {
            const { avg, count } = getAverageRating(game.id);
            return (
              <GameCard
                key={game.id}
                game={game}
                avgRating={avg}
                ratingCount={count}
                isFavorite={isFavorite(game.id)}
                onPlay={() => onPlayGame(game.id)}
                onToggleFavorite={() => handleToggleFavorite(game.id)}
                index={i}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
