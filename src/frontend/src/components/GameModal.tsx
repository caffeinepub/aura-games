import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORY_COLORS, GAMES } from "@/data/games";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  type Review,
  useFavorites,
  useRatings,
  useReviews,
  useScores,
} from "@/hooks/useStorage";
import { Flag, Heart, Play, Send, Star, Trophy, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { RacingGame } from "./RacingGame";
import { StarRating } from "./StarRating";

interface GameModalProps {
  gameId: string | null;
  onClose: () => void;
  onSignInPrompt: () => void;
}

export function GameModal({ gameId, onClose, onSignInPrompt }: GameModalProps) {
  const game = gameId ? GAMES.find((g) => g.id === gameId) : null;
  const { identity } = useInternetIdentity();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();
  const userId = isLoggedIn ? identity!.getPrincipal().toString() : null;
  const shortUserId = userId ? userId.slice(0, 8) : "Anonymous";

  const { setRating, getAverageRating, getUserRating } = useRatings();
  const { addReview, getReviews } = useReviews();
  const { isFavorite, toggleFavorite } = useFavorites(userId);
  const { submitScore, getLeaderboard, getUserScore } = useScores();

  const [reviewText, setReviewText] = useState("");
  const [isReport, setIsReport] = useState(false);
  const [racingScore, setRacingScore] = useState(0);

  const handleRate = useCallback(
    (value: number) => {
      if (!userId || !gameId) {
        toast("Sign in to rate games", {
          description: "Your rating will be saved to your profile.",
        });
        onSignInPrompt();
        return;
      }
      setRating(gameId, userId, value);
      toast.success(`Rated ${value}/5 stars!`);
    },
    [userId, gameId, setRating, onSignInPrompt],
  );

  const handleSubmitReview = useCallback(() => {
    if (!userId || !gameId) {
      toast("Sign in to write reviews");
      onSignInPrompt();
      return;
    }
    if (!reviewText.trim()) {
      toast.error("Review cannot be empty");
      return;
    }
    const review: Review = {
      id: `r-${Date.now()}`,
      userId,
      userName: shortUserId,
      text: reviewText.trim(),
      isReport,
      timestamp: Date.now(),
    };
    addReview(gameId, review);
    setReviewText("");
    setIsReport(false);
    toast.success(
      isReport ? "Issue reported. Thank you!" : "Review submitted!",
    );
  }, [
    userId,
    gameId,
    reviewText,
    isReport,
    addReview,
    shortUserId,
    onSignInPrompt,
  ]);

  const handleSubmitRacingScore = useCallback(
    (score: number) => {
      if (!userId || !gameId) return;
      submitScore(gameId, userId, score);
      toast.success(`Score ${score.toLocaleString()} submitted!`);
    },
    [userId, gameId, submitScore],
  );

  const handleToggleFavorite = useCallback(() => {
    if (!userId || !gameId) {
      toast("Sign in to save favorites");
      onSignInPrompt();
      return;
    }
    toggleFavorite(gameId);
  }, [userId, gameId, toggleFavorite, onSignInPrompt]);

  if (!game) return null;

  const { avg: avgRating, count: ratingCount } = getAverageRating(game.id);
  const userRating = gameId && userId ? getUserRating(gameId, userId) : 0;
  const reviews = gameId ? getReviews(gameId) : [];
  const leaderboard = gameId ? getLeaderboard(gameId) : [];
  const userScore = gameId && userId ? getUserScore(gameId, userId) : 0;
  const catColor = CATEGORY_COLORS[game.category];
  const favActive = gameId ? isFavorite(gameId) : false;
  const isRacing = game.category === "Racing";

  return (
    <AnimatePresence>
      {gameId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto"
          style={{
            background: "rgba(5, 8, 20, 0.95)",
            backdropFilter: "blur(8px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          data-ocid="games.modal"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="glass-card rounded-2xl w-full max-w-3xl overflow-hidden mb-8"
            style={{ border: `1px solid ${catColor}33` }}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{ background: game.gradient }}
                />
                <div>
                  <h2 className="font-bold text-base text-foreground">
                    {game.title}
                  </h2>
                  <span className="text-xs" style={{ color: catColor }}>
                    {game.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleFavorite}
                  className="p-1.5 rounded-full glass-card"
                  data-ocid="games.toggle"
                  aria-label={
                    favActive ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <Heart
                    size={14}
                    fill={favActive ? "#EC4899" : "transparent"}
                    stroke={favActive ? "#EC4899" : "rgba(255,255,255,0.5)"}
                  />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-full glass-card hover:bg-white/10 transition-colors"
                  data-ocid="games.close_button"
                  aria-label="Close game"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <ScrollArea className="max-h-[80vh] scrollbar-thin">
              <div className="p-5 space-y-6">
                {/* Game area */}
                {isRacing ? (
                  <div
                    className="rounded-xl overflow-hidden relative"
                    style={{
                      height: 340,
                      border: `1px solid ${catColor}44`,
                      boxShadow: `0 0 24px ${catColor}22`,
                    }}
                  >
                    <RacingGame
                      accentColor={catColor}
                      onScore={(score) => {
                        setRacingScore(score);
                        handleSubmitRacingScore(score);
                      }}
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 text-center pb-1 pointer-events-none"
                      style={{ color: "rgba(255,255,255,0.2)", fontSize: 10 }}
                    >
                      ← → Arrow Keys &nbsp;|&nbsp; Swipe on mobile
                    </div>
                  </div>
                ) : (
                  <div
                    className="rounded-xl overflow-hidden relative"
                    style={{
                      aspectRatio: "16/9",
                      background: game.gradient,
                      border: `1px solid ${catColor}44`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{
                          background: `${catColor}22`,
                          border: `2px solid ${catColor}66`,
                        }}
                      >
                        <Play
                          size={24}
                          fill={catColor}
                          style={{ color: catColor }}
                        />
                      </div>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: catColor }}
                      >
                        {game.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Coming Soon
                      </span>
                    </div>
                    <div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{
                        boxShadow: `inset 0 0 40px ${catColor}22, 0 0 20px ${catColor}22`,
                      }}
                    />
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {game.description}
                  </p>
                </div>

                {/* Score panel */}
                <div className="glass-card rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy size={20} style={{ color: "#F5C84C" }} />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Your Best Score
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        {userScore > 0 ? userScore.toLocaleString() : "—"}
                      </p>
                    </div>
                  </div>
                  {isRacing ? (
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">
                        Last game:{" "}
                        {racingScore > 0 ? racingScore.toLocaleString() : "—"}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Score auto-saves on game over
                      </p>
                    </div>
                  ) : (
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">
                        Session: —
                      </p>
                    </div>
                  )}
                </div>

                {leaderboard.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                      <Trophy size={14} style={{ color: "#F5C84C" }} /> Top
                      Scores
                    </h3>
                    <div className="flex flex-col gap-1.5">
                      {leaderboard.map((entry, i) => (
                        <div
                          key={entry.userId}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg"
                          style={{ background: "rgba(255,255,255,0.03)" }}
                        >
                          <span
                            className="text-xs font-bold w-4"
                            style={{
                              color:
                                i < 3
                                  ? (
                                      ["#F5C84C", "#9AA7C0", "#CD7F32"] as const
                                    )[i as 0 | 1 | 2]
                                  : "rgba(255,255,255,0.3)",
                            }}
                          >
                            {i + 1}
                          </span>
                          <span className="text-xs text-muted-foreground flex-1 font-mono">
                            {entry.userId.slice(0, 10)}...
                          </span>
                          <span className="text-xs font-bold text-foreground">
                            {entry.score.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rating */}
                <div className="glass-card rounded-xl p-4">
                  <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    <Star size={14} style={{ color: "#F5C84C" }} /> Rating
                  </h3>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {isLoggedIn
                          ? userRating > 0
                            ? `Your rating: ${userRating}/5`
                            : "Rate this game:"
                          : "Sign in to rate"}
                      </p>
                      <StarRating
                        rating={
                          isLoggedIn && userRating > 0 ? userRating : avgRating
                        }
                        interactive={isLoggedIn}
                        onRate={handleRate}
                        size={20}
                      />
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-2xl font-bold text-foreground">
                        {avgRating > 0 ? avgRating.toFixed(1) : "N/A"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {ratingCount} ratings
                      </p>
                    </div>
                  </div>
                  {!isLoggedIn && (
                    <button
                      type="button"
                      onClick={onSignInPrompt}
                      className="text-xs mt-3 underline"
                      style={{ color: "#22D3EE" }}
                      data-ocid="games.link"
                    >
                      Sign in to rate this game →
                    </button>
                  )}
                </div>

                {/* Reviews */}
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-3">
                    Reviews ({reviews.length})
                  </h3>

                  {reviews.length === 0 ? (
                    <div
                      className="text-center py-6 text-muted-foreground text-xs"
                      data-ocid="games.empty_state"
                    >
                      No reviews yet. Be the first!
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 mb-4">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="glass-card rounded-xl p-3 border-white/5"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-semibold text-foreground font-mono">
                              {review.userName}
                            </span>
                            <div className="flex items-center gap-2">
                              {review.isReport && (
                                <span
                                  className="text-[10px] px-1.5 py-0.5 rounded"
                                  style={{
                                    background: "rgba(239,68,68,0.15)",
                                    color: "#ef4444",
                                  }}
                                >
                                  <Flag size={8} className="inline mr-0.5" />
                                  Report
                                </span>
                              )}
                              <span className="text-[10px] text-muted-foreground">
                                {new Date(
                                  review.timestamp,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {review.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="glass-card rounded-xl p-4">
                    <h4 className="text-xs font-bold text-foreground mb-3">
                      Write a Review
                    </h4>
                    {!isLoggedIn ? (
                      <div className="text-center py-4">
                        <p className="text-xs text-muted-foreground mb-3">
                          Sign in to leave a review
                        </p>
                        <Button
                          size="sm"
                          className="neon-glow-btn rounded-full text-white border-0 text-xs"
                          onClick={onSignInPrompt}
                          data-ocid="games.open_modal_button"
                        >
                          Sign In
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Share your experience with this game..."
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          className="text-xs glass-card border-white/10 min-h-[80px] resize-none"
                          data-ocid="games.textarea"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="report"
                              checked={isReport}
                              onCheckedChange={(v) => setIsReport(!!v)}
                              data-ocid="games.checkbox"
                            />
                            <Label
                              htmlFor="report"
                              className="text-xs text-muted-foreground cursor-pointer flex items-center gap-1"
                            >
                              <Flag size={10} /> Report an issue
                            </Label>
                          </div>
                          <Button
                            size="sm"
                            className="neon-glow-btn rounded-full text-white border-0 text-xs"
                            onClick={handleSubmitReview}
                            data-ocid="games.submit_button"
                          >
                            <Send size={10} className="mr-1" /> Submit
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
