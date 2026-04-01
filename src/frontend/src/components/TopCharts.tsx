import { CATEGORY_COLORS, GAMES } from "@/data/games";
import { useRatings } from "@/hooks/useStorage";
import { Trophy } from "lucide-react";
import { motion } from "motion/react";
import { StarRating } from "./StarRating";

interface TopChartsProps {
  onPlayGame: (gameId: string) => void;
}

export function TopCharts({ onPlayGame }: TopChartsProps) {
  const { getAverageRating } = useRatings();

  const ranked = [...GAMES]
    .map((g) => ({ game: g, ...getAverageRating(g.id) }))
    .sort((a, b) => b.avg - a.avg || b.count - a.count)
    .slice(0, 10);

  const rankColors = ["#F5C84C", "#9AA7C0", "#CD7F32"];

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      id="leaderboard"
      className="glass-card rounded-xl p-5 h-fit"
    >
      <div className="flex items-center gap-2 mb-5">
        <Trophy size={16} style={{ color: "#F5C84C" }} />
        <h2 className="text-base font-bold text-foreground">Top Charts</h2>
      </div>

      <div className="flex flex-col gap-3">
        {ranked.map(({ game, avg, count }, i) => (
          <button
            type="button"
            key={game.id}
            onClick={() => onPlayGame(game.id)}
            className="flex items-center gap-3 group text-left w-full hover:bg-white/5 rounded-lg p-2 -mx-2 transition-colors"
            data-ocid={`charts.item.${i + 1}`}
          >
            <span
              className="text-sm font-bold w-5 text-center flex-shrink-0"
              style={{ color: rankColors[i] ?? "rgba(255,255,255,0.3)" }}
            >
              {i + 1}
            </span>
            <div
              className="w-8 h-8 rounded-md flex-shrink-0"
              style={{ background: game.gradient }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">
                {game.title}
              </p>
              <div className="flex items-center gap-1">
                <StarRating rating={avg} size={10} />
                <span className="text-[10px] text-muted-foreground">
                  ({count})
                </span>
              </div>
            </div>
            <span
              className="text-[10px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0"
              style={{
                background: `${CATEGORY_COLORS[game.category]}22`,
                color: CATEGORY_COLORS[game.category],
              }}
            >
              {game.category}
            </span>
          </button>
        ))}
      </div>
    </motion.aside>
  );
}
