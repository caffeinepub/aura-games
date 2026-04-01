import { useCallback, useEffect, useRef } from "react";

const LANES = 4;
const LANE_WIDTH = 80;
const ROAD_WIDTH = LANES * LANE_WIDTH;
const CAR_W = 36;
const CAR_H = 60;
const ENEMY_COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#8b5cf6",
  "#ec4899",
];

function getLaneX(canvasWidth: number, lane: number): number {
  const roadLeft = (canvasWidth - ROAD_WIDTH) / 2;
  return roadLeft + lane * LANE_WIDTH + (LANE_WIDTH - CAR_W) / 2;
}

function drawCar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  isPlayer: boolean,
  alpha = 1,
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y, CAR_W, CAR_H, 6);
  ctx.fill();
  ctx.fillStyle = "rgba(180,230,255,0.7)";
  if (isPlayer) {
    ctx.fillRect(x + 5, y + 8, CAR_W - 10, 14);
  } else {
    ctx.fillRect(x + 5, y + CAR_H - 22, CAR_W - 10, 14);
  }
  ctx.fillStyle = "#111";
  ctx.fillRect(x - 5, y + 8, 8, 14);
  ctx.fillRect(x + CAR_W - 3, y + 8, 8, 14);
  ctx.fillRect(x - 5, y + CAR_H - 22, 8, 14);
  ctx.fillRect(x + CAR_W - 3, y + CAR_H - 22, 8, 14);
  if (isPlayer) {
    ctx.fillStyle = "#ffffaa";
    ctx.fillRect(x + 4, y + 2, 8, 5);
    ctx.fillRect(x + CAR_W - 12, y + 2, 8, 5);
  } else {
    ctx.fillStyle = "#ff4444";
    ctx.fillRect(x + 4, y + CAR_H - 7, 8, 5);
    ctx.fillRect(x + CAR_W - 12, y + CAR_H - 7, 8, 5);
  }
  ctx.restore();
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface EnemyCar {
  x: number;
  y: number;
  color: string;
  speed: number;
}

interface GameState {
  animId: number;
  score: number;
  speed: number;
  lane: number;
  playerX: number;
  playerY: number;
  roadOffset: number;
  enemies: EnemyCar[];
  particles: Particle[];
  spawnTimer: number;
  gameOver: boolean;
  started: boolean;
  lives: number;
  invincible: number;
  highScore: number;
}

interface RacingGameProps {
  accentColor?: string;
  onScore?: (score: number) => void;
}

export function RacingGame({
  accentColor = "#3b82f6",
  onScore,
}: RacingGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>({
    animId: 0,
    score: 0,
    speed: 4,
    lane: 2,
    playerX: 0,
    playerY: 0,
    roadOffset: 0,
    enemies: [],
    particles: [],
    spawnTimer: 0,
    gameOver: false,
    started: false,
    lives: 3,
    invincible: 0,
    highScore: 0,
  });

  const startGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = stateRef.current;
    s.score = 0;
    s.speed = 4;
    s.lane = 2;
    s.playerX = getLaneX(canvas.width, s.lane);
    s.playerY = canvas.height - CAR_H - 20;
    s.enemies = [];
    s.particles = [];
    s.spawnTimer = 0;
    s.gameOver = false;
    s.started = true;
    s.lives = 3;
    s.invincible = 0;
    s.roadOffset = 0;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const s = stateRef.current;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
      if (s.started && !s.gameOver) {
        s.playerX = getLaneX(canvas.width, s.lane);
        s.playerY = canvas.height - CAR_H - 20;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnParticles = (
      x: number,
      y: number,
      color: string,
      count = 12,
    ) => {
      for (let i = 0; i < count; i++) {
        s.particles.push({
          x: x + CAR_W / 2,
          y: y + CAR_H / 2,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 1,
          color,
        });
      }
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const roadLeft = (W - ROAD_WIDTH) / 2;

      ctx.fillStyle = "#0d1117";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#0a1f0a";
      ctx.fillRect(0, 0, roadLeft, H);
      ctx.fillRect(roadLeft + ROAD_WIDTH, 0, W - roadLeft - ROAD_WIDTH, H);
      ctx.fillStyle = "#1c2333";
      ctx.fillRect(roadLeft, 0, ROAD_WIDTH, H);
      ctx.fillStyle = "#ffffff22";
      ctx.fillRect(roadLeft, 0, 3, H);
      ctx.fillRect(roadLeft + ROAD_WIDTH - 3, 0, 3, H);

      s.roadOffset = (s.roadOffset + (s.started ? s.speed : 0)) % 60;
      for (let lane = 1; lane < LANES; lane++) {
        const lx = roadLeft + lane * LANE_WIDTH;
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.lineWidth = 2;
        ctx.setLineDash([30, 30]);
        ctx.lineDashOffset = -s.roadOffset;
        ctx.beginPath();
        ctx.moveTo(lx, 0);
        ctx.lineTo(lx, H);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      if (!s.started) {
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = accentColor;
        ctx.font = "bold 28px 'Inter', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("NEON RACER", W / 2, H / 2 - 60);
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.font = "16px 'Inter', sans-serif";
        ctx.fillText("Press SPACE or TAP to Start", W / 2, H / 2 - 20);
        ctx.font = "13px 'Inter', sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fillText("← → Arrow Keys or Swipe to Steer", W / 2, H / 2 + 10);
        ctx.fillText("Avoid traffic. Survive. Score high.", W / 2, H / 2 + 32);
        if (s.highScore > 0) {
          ctx.fillStyle = "#f5c84c";
          ctx.font = "14px 'Inter', sans-serif";
          ctx.fillText(`Best: ${s.highScore}`, W / 2, H / 2 + 60);
        }
        return;
      }

      if (s.gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 32px 'Inter', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", W / 2, H / 2 - 60);
        ctx.fillStyle = "#ffffff";
        ctx.font = "18px 'Inter', sans-serif";
        ctx.fillText(`Score: ${s.score}`, W / 2, H / 2 - 20);
        ctx.fillStyle = "#f5c84c";
        ctx.fillText(`Best: ${s.highScore}`, W / 2, H / 2 + 10);
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.font = "14px 'Inter', sans-serif";
        ctx.fillText("Press SPACE or TAP to Play Again", W / 2, H / 2 + 45);
        for (const p of s.particles) {
          ctx.save();
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        return;
      }

      for (const e of s.enemies) {
        drawCar(ctx, e.x, e.y, e.color, false);
      }

      const playerAlpha =
        s.invincible > 0
          ? Math.floor(s.invincible / 5) % 2 === 0
            ? 0.3
            : 1
          : 1;
      drawCar(ctx, s.playerX, s.playerY, accentColor, true, playerAlpha);

      for (const p of s.particles) {
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(0, 0, W, 40);
      ctx.fillStyle = accentColor;
      ctx.font = "bold 14px 'Inter', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`SCORE: ${s.score}`, 12, 26);
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.fillText(`SPEED: ${(s.speed * 10).toFixed(0)} km/h`, W / 2, 26);
      ctx.textAlign = "right";
      ctx.fillStyle = "#ef4444";
      ctx.fillText(`${"♥".repeat(s.lives)}`, W - 12, 26);
    };

    const update = () => {
      if (!s.started || s.gameOver) return;
      const H = canvas.height;

      s.score += 1;
      if (s.score % 200 === 0) {
        s.speed = Math.min(s.speed + 0.5, 18);
      }

      const targetX = getLaneX(canvas.width, s.lane);
      const dx = targetX - s.playerX;
      s.playerX += dx * 0.18;

      s.spawnTimer++;
      const spawnInterval = Math.max(40, 100 - s.score / 50);
      if (s.spawnTimer >= spawnInterval) {
        s.spawnTimer = 0;
        const lane = Math.floor(Math.random() * LANES);
        const enemyX = getLaneX(canvas.width, lane);
        const color =
          ENEMY_COLORS[Math.floor(Math.random() * ENEMY_COLORS.length)];
        s.enemies.push({
          x: enemyX,
          y: -CAR_H - 10,
          color,
          speed: s.speed * (0.6 + Math.random() * 0.4),
        });
      }

      for (const e of s.enemies) {
        e.y += s.speed;
      }
      s.enemies = s.enemies.filter((e) => e.y < H + 100);

      if (s.invincible > 0) {
        s.invincible--;
      } else {
        for (const e of s.enemies) {
          const px = s.playerX;
          const py = s.playerY;
          const overlap =
            px < e.x + CAR_W - 6 &&
            px + CAR_W > e.x + 6 &&
            py < e.y + CAR_H - 6 &&
            py + CAR_H > e.y + 6;
          if (overlap) {
            spawnParticles(e.x, e.y, e.color);
            s.lives--;
            s.invincible = 90;
            s.enemies = s.enemies.filter((en) => en !== e);
            if (s.lives <= 0) {
              s.gameOver = true;
              s.highScore = Math.max(s.highScore, s.score);
              onScore?.(s.score);
            }
            break;
          }
        }
      }

      for (const p of s.particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
      }
      s.particles = s.particles.filter((p) => p.life > 0);
    };

    const loop = () => {
      update();
      draw();
      s.animId = requestAnimationFrame(loop);
    };
    s.animId = requestAnimationFrame(loop);

    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        if (!s.started || s.gameOver) startGame();
        return;
      }
      if (!s.started || s.gameOver) return;
      if (e.code === "ArrowLeft" && s.lane > 0)
        s.lane = Math.max(0, s.lane - 1);
      if (e.code === "ArrowRight" && s.lane < LANES - 1)
        s.lane = Math.min(LANES - 1, s.lane + 1);
    };
    window.addEventListener("keydown", onKey);

    let touchStartX = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!s.started || s.gameOver) {
        startGame();
        return;
      }
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) < 20) return;
      if (dx < 0 && s.lane > 0) s.lane--;
      if (dx > 0 && s.lane < LANES - 1) s.lane++;
    };
    const onClick = () => {
      if (!s.started || s.gameOver) startGame();
    };

    canvas.addEventListener("touchstart", onTouchStart);
    canvas.addEventListener("touchend", onTouchEnd);
    canvas.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(s.animId);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("click", onClick);
    };
  }, [accentColor, startGame, onScore]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block cursor-pointer outline-none"
      tabIndex={0}
      aria-label="Racing game canvas. Use arrow keys to steer."
    />
  );
}
