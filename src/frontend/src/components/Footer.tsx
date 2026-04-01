import { SiDiscord, SiX, SiYoutube } from "react-icons/si";
import { AuraLogo } from "./AuraLogo";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  const links = [
    {
      label: "Games",
      items: [
        "All Games",
        "Horror",
        "Racing",
        "Simulation",
        "Escape",
        "Parkour",
      ],
    },
    { label: "Company", items: ["About", "Contact", "Careers", "Blog"] },
    {
      label: "Legal",
      items: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
    {
      label: "Support",
      items: ["Help Center", "Report a Bug", "Community", "Status"],
    },
  ];

  return (
    <footer
      id="about"
      className="border-t border-white/5 mt-16"
      style={{
        background: "rgba(10, 14, 28, 0.8)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <AuraLogo size={28} />
              <span
                className="text-base font-bold"
                style={{
                  background: "linear-gradient(135deg, #22D3EE, #8B5CF6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                AURA GAMES
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              The ultimate browser gaming destination. Play, compete, and
              connect with millions of gamers worldwide.
            </p>
            <div className="flex items-center gap-3">
              {(
                [
                  { Icon: SiX, href: "https://x.com", label: "Twitter/X" },
                  {
                    Icon: SiDiscord,
                    href: "https://discord.com",
                    label: "Discord",
                  },
                  {
                    Icon: SiYoutube,
                    href: "https://youtube.com",
                    label: "YouTube",
                  },
                ] as const
              ).map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  data-ocid="footer.link"
                >
                  <Icon size={12} />
                </a>
              ))}
            </div>
          </div>

          {links.map((col) => (
            <div key={col.label}>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
                {col.label}
              </h4>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item}>
                    <span
                      className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                      data-ocid="footer.link"
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} Aura Games. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              className="underline hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
