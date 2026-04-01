export function AuraLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="logo-glow"
      role="img"
      aria-label="Aura Games Logo"
    >
      <title>Aura Games Logo</title>
      <defs>
        <linearGradient id="aura-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <rect
        x="14"
        y="30"
        width="20"
        height="8"
        rx="3"
        fill="url(#aura-grad)"
        opacity="0.9"
      />
      <rect x="21" y="14" width="6" height="18" rx="3" fill="url(#aura-grad)" />
      <path
        d="M24 6 L16 26 L20 26 L22 20 L26 20 L28 26 L32 26 Z"
        fill="url(#aura-grad)"
      />
      <rect x="21" y="18" width="6" height="2" rx="1" fill="#0B1020" />
      <circle cx="36" cy="22" r="2.5" fill="#22D3EE" opacity="0.9" />
      <circle cx="42" cy="18" r="2" fill="#8B5CF6" opacity="0.9" />
      <circle cx="40" cy="26" r="2" fill="#EC4899" opacity="0.9" />
    </svg>
  );
}
