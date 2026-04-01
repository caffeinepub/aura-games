import { Button } from "@/components/ui/button";
import { ChevronRight, Trophy, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface HeroProps {
  onBrowseGames: () => void;
}

const heroSlides = [
  {
    tag: "🔥 Featured",
    title: "Play. Compete.",
    titleAccent: "Conquer.",
    desc: "Dive into 15+ premium browser games — no downloads, no limits. Earn high scores, unlock achievements, and rise to the top.",
    cta: "Browse Games",
    stats: [
      { icon: Users, label: "2.4M Players" },
      { icon: Zap, label: "15+ Games" },
      { icon: Trophy, label: "Live Leaderboards" },
    ],
  },
  {
    tag: "⚡ New Release",
    title: "Neon Rush",
    titleAccent: "Racing Edition",
    desc: "Blaze through neon-lit mega-city highways at breakneck speeds. The most electrifying racer on the web.",
    cta: "Play Now",
    stats: [
      { icon: Users, label: "387K Players" },
      { icon: Zap, label: "Racing" },
      { icon: Trophy, label: "#1 Chart" },
    ],
  },
  {
    tag: "👻 Horror Week",
    title: "Shadow",
    titleAccent: "Asylum",
    desc: "Escape a crumbling mental institution haunted by terrifying entities. Can you survive the night?",
    cta: "Play if you dare",
    stats: [
      { icon: Users, label: "142K Players" },
      { icon: Zap, label: "Horror" },
      { icon: Trophy, label: "Top Rated" },
    ],
  },
];

export function Hero({ onBrowseGames }: HeroProps) {
  const [active, setActive] = useState(0);
  const slide = heroSlides[active];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="hero-gradient-border rounded-2xl overflow-hidden"
      >
        <div className="glass-card rounded-2xl grid md:grid-cols-2 gap-0 min-h-[360px] relative overflow-hidden">
          <div className="p-8 md:p-12 flex flex-col justify-center gap-6 relative z-10">
            <div>
              <span
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
                style={{
                  background: "rgba(34,211,238,0.15)",
                  color: "#22D3EE",
                  border: "1px solid rgba(34,211,238,0.3)",
                }}
              >
                {slide.tag}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground">
                {slide.title}{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #22D3EE, #8B5CF6, #EC4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {slide.titleAccent}
                </span>
              </h1>
            </div>
            <p className="text-muted-foreground text-base leading-relaxed max-w-md">
              {slide.desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={onBrowseGames}
                className="neon-glow-btn rounded-full text-white border-0 font-bold px-8 py-2.5 text-sm"
                data-ocid="hero.primary_button"
              >
                {slide.cta} <ChevronRight size={16} className="ml-1" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-white/20 text-muted-foreground hover:text-foreground"
                data-ocid="hero.secondary_button"
              >
                Watch Trailer
              </Button>
            </div>
            <div className="flex flex-wrap gap-6">
              {slide.stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <stat.icon size={14} className="text-neon-cyan" />
                  <span className="text-xs text-muted-foreground font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              {heroSlides.map((_, i) => (
                <button
                  // biome-ignore lint/suspicious/noArrayIndexKey: carousel dots use index intentionally
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? "24px" : "8px",
                    background:
                      i === active
                        ? "linear-gradient(90deg, #22D3EE, #EC4899)"
                        : "rgba(255,255,255,0.2)",
                  }}
                  data-ocid="hero.toggle"
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="relative hidden md:flex items-center justify-center overflow-hidden">
            <img
              src="/assets/generated/hero-gaming.dim_800x500.jpg"
              alt="Neon gaming illustration"
              className="w-full h-full object-cover opacity-80"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 30%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(11,16,32,0.9) 0%, transparent 50%)",
              }}
            />
          </div>

          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
            style={{
              background: "radial-gradient(circle, #22D3EE, transparent)",
            }}
          />
          <div
            className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full opacity-5"
            style={{
              background: "radial-gradient(circle, #8B5CF6, transparent)",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
