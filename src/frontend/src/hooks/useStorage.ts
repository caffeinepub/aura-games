import { useCallback, useState } from "react";

export interface Review {
  id: string;
  userId: string;
  userName: string;
  text: string;
  isReport: boolean;
  timestamp: number;
}

type Ratings = Record<string, Record<string, number>>;
type Reviews = Record<string, Review[]>;
type Favorites = Record<string, string[]>;
type Scores = Record<string, Record<string, number>>;

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function useRatings() {
  const [ratings, setRatings] = useState<Ratings>(() =>
    loadStorage("aura_ratings", {}),
  );

  const setRating = useCallback(
    (gameId: string, userId: string, value: number) => {
      setRatings((prev) => {
        const next = {
          ...prev,
          [gameId]: { ...(prev[gameId] || {}), [userId]: value },
        };
        saveStorage("aura_ratings", next);
        return next;
      });
    },
    [],
  );

  const getAverageRating = useCallback(
    (gameId: string): { avg: number; count: number } => {
      const gameRatings = ratings[gameId] || {};
      const values = Object.values(gameRatings);
      if (values.length === 0) return { avg: 0, count: 0 };
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      return { avg: Math.round(avg * 10) / 10, count: values.length };
    },
    [ratings],
  );

  const getUserRating = useCallback(
    (gameId: string, userId: string): number => {
      return ratings[gameId]?.[userId] ?? 0;
    },
    [ratings],
  );

  return { ratings, setRating, getAverageRating, getUserRating };
}

export function useReviews() {
  const [reviews, setReviews] = useState<Reviews>(() =>
    loadStorage("aura_reviews", {
      "shadow-asylum": [
        {
          id: "r1",
          userId: "user1",
          userName: "DarkSoul99",
          text: "Absolutely terrifying! The atmosphere is incredible.",
          isReport: false,
          timestamp: Date.now() - 86400000,
        },
        {
          id: "r2",
          userId: "user2",
          userName: "HorrorFan",
          text: "Best horror game I've played all year. Can't sleep after this.",
          isReport: false,
          timestamp: Date.now() - 43200000,
        },
      ],
      "neon-rush": [
        {
          id: "r3",
          userId: "user3",
          userName: "SpeedDemon",
          text: "Pure adrenaline! The neon visuals are stunning.",
          isReport: false,
          timestamp: Date.now() - 3600000,
        },
      ],
      "space-colony": [
        {
          id: "r4",
          userId: "user4",
          userName: "StrategyKing",
          text: "Deep, complex, and incredibly rewarding. 10/10 would colonize again.",
          isReport: false,
          timestamp: Date.now() - 7200000,
        },
      ],
    }),
  );

  const addReview = useCallback((gameId: string, review: Review) => {
    setReviews((prev) => {
      const next = { ...prev, [gameId]: [...(prev[gameId] || []), review] };
      saveStorage("aura_reviews", next);
      return next;
    });
  }, []);

  const getReviews = useCallback(
    (gameId: string): Review[] => {
      return reviews[gameId] || [];
    },
    [reviews],
  );

  return { reviews, addReview, getReviews };
}

export function useFavorites(userId: string | null) {
  const [favorites, setFavorites] = useState<Favorites>(() =>
    loadStorage("aura_favorites", {}),
  );

  const toggleFavorite = useCallback(
    (gameId: string): boolean => {
      if (!userId) return false;
      setFavorites((prev) => {
        const userFavs = prev[userId] || [];
        const isFav = userFavs.includes(gameId);
        const next = {
          ...prev,
          [userId]: isFav
            ? userFavs.filter((id) => id !== gameId)
            : [...userFavs, gameId],
        };
        saveStorage("aura_favorites", next);
        return next;
      });
      return true;
    },
    [userId],
  );

  const isFavorite = useCallback(
    (gameId: string): boolean => {
      if (!userId) return false;
      return (favorites[userId] || []).includes(gameId);
    },
    [favorites, userId],
  );

  return { toggleFavorite, isFavorite };
}

export function useScores() {
  const [scores, setScores] = useState<Scores>(() =>
    loadStorage("aura_scores", {}),
  );

  const submitScore = useCallback(
    (gameId: string, userId: string, score: number) => {
      setScores((prev) => {
        const existing = prev[gameId]?.[userId] ?? 0;
        if (score <= existing) return prev;
        const next = {
          ...prev,
          [gameId]: { ...(prev[gameId] || {}), [userId]: score },
        };
        saveStorage("aura_scores", next);
        return next;
      });
    },
    [],
  );

  const getLeaderboard = useCallback(
    (gameId: string): Array<{ userId: string; score: number }> => {
      const gameScores = scores[gameId] || {};
      return Object.entries(gameScores)
        .map(([userId, score]) => ({ userId, score }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
    },
    [scores],
  );

  const getUserScore = useCallback(
    (gameId: string, userId: string): number => {
      return scores[gameId]?.[userId] ?? 0;
    },
    [scores],
  );

  return { submitScore, getLeaderboard, getUserScore };
}
