import { CATEGORY_COLORS, type Game } from "@/data/games";
import { Heart, Play, Users } from "lucide-react";
import { motion } from "motion/react";
import { StarRating } from "./StarRating";

interface GameCardProps {
  game: Game;
  avgRating: number;
  ratingCount: number;
  isFavorite: boolean;
  onPlay: () => void;
  onToggleFavorite: () => void;
  index: number;
}

export function GameCard({
  game,
  avgRating,
  ratingCount,
  isFavorite,
  onPlay,
  onToggleFavorite,
  index,
}: GameCardProps) {
  const catColor = CATEGORY_COLORS[game.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-card glass-card-hover rounded-xl overflow-hidden group cursor-pointer"
      data-ocid={`games.item.${index + 1}`}
    >
      <div
        className="relative h-40 overflow-hidden"
        style={{ background: game.gradient }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 70% 30%, ${catColor}, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-2xl font-extrabold opacity-20 tracking-widest uppercase"
            style={{ color: catColor }}
          >
            {game.category}
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full glass-card transition-colors"
          data-ocid={`games.toggle.${index + 1}`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={14}
            fill={isFavorite ? "#EC4899" : "transparent"}
            stroke={isFavorite ? "#EC4899" : "rgba(255,255,255,0.5)"}
          />
        </button>
        <div className="absolute bottom-2 left-2">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: `${catColor}22`,
              color: catColor,
              border: `1px solid ${catColor}44`,
            }}
          >
            {game.category}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="font-bold text-base text-foreground leading-tight mb-1">
            {game.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <StarRating rating={avgRating} count={ratingCount} size={12} />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users size={10} />
            <span>{game.players}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onPlay}
          className="neon-glow-btn w-full rounded-full text-white font-semibold text-xs py-2 flex items-center justify-center gap-1.5"
          data-ocid={`games.primary_button.${index + 1}`}
        >
          <Play size={12} fill="white" /> Play Now
        </button>
      </div>
    </motion.div>
  );
}
