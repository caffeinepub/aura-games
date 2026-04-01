import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  count?: number;
  interactive?: boolean;
  onRate?: (value: number) => void;
  size?: number;
}

export function StarRating({
  rating,
  count,
  interactive = false,
  onRate,
  size = 14,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          className={
            interactive
              ? "cursor-pointer hover:scale-110 transition-transform"
              : "cursor-default"
          }
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <Star
            size={size}
            fill={star <= Math.round(rating) ? "#F5C84C" : "transparent"}
            stroke={
              star <= Math.round(rating) ? "#F5C84C" : "rgba(255,255,255,0.2)"
            }
          />
        </button>
      ))}
      {count !== undefined && (
        <span className="text-xs text-muted-foreground ml-1">({count})</span>
      )}
    </div>
  );
}
