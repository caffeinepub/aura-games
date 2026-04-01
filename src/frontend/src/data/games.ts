export type Category =
  | "Horror"
  | "Racing"
  | "Simulation"
  | "Escape"
  | "Parkour";

export interface Game {
  id: string;
  title: string;
  description: string;
  category: Category;
  gradient: string;
  players: string;
  releaseYear: number;
}

export const GAMES: Game[] = [
  // ── Horror ──
  {
    id: "shadow-asylum",
    title: "Shadow Asylum",
    description:
      "Escape a crumbling mental institution haunted by terrifying entities that hunt you through twisted corridors.",
    category: "Horror",
    gradient:
      "linear-gradient(135deg, #1a0505 0%, #5a0a0a 40%, #8b0000 80%, #b22222 100%)",
    players: "142K",
    releaseYear: 2024,
  },
  {
    id: "dead-pixel",
    title: "Dead Pixel",
    description:
      "Survive a corrupted digital nightmare where reality glitches and pixel monsters devour everything in sight.",
    category: "Horror",
    gradient:
      "linear-gradient(135deg, #050510 0%, #0a0a2a 40%, #1a0040 80%, #2d0060 100%)",
    players: "98K",
    releaseYear: 2024,
  },
  {
    id: "nightmare-run",
    title: "Nightmare Run",
    description:
      "Sprint through an ever-shifting nightmare landscape as unspeakable horrors close in from all directions.",
    category: "Horror",
    gradient:
      "linear-gradient(135deg, #0a0520 0%, #1a0535 40%, #2d0050 80%, #4a0080 100%)",
    players: "215K",
    releaseYear: 2023,
  },

  // ── Racing ──
  {
    id: "neon-rush",
    title: "Neon Rush",
    description:
      "Blaze through neon-lit mega-city highways at breakneck speeds in the most electrifying racer ever built.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #020b2a 0%, #041a55 40%, #0a2d8a 80%, #1540b0 100%)",
    players: "387K",
    releaseYear: 2024,
  },
  {
    id: "turbo-grid",
    title: "Turbo Grid",
    description:
      "Compete in zero-gravity track circuits suspended in outer space where physics bend to your will.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #020a1e 0%, #043060 40%, #054a7a 80%, #0a6094 100%)",
    players: "201K",
    releaseYear: 2023,
  },
  {
    id: "hyper-drift",
    title: "Hyper Drift",
    description:
      "Master the art of quantum drifting across multidimensional race tracks with time-bending powerups.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #050a25 0%, #0a1d50 40%, #0f3070 80%, #1a4590 100%)",
    players: "164K",
    releaseYear: 2024,
  },
  {
    id: "volt-sprint",
    title: "Volt Sprint",
    description:
      "Charge your electric supercar and outrun rival racers across storm-soaked futuristic highways.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #020c1e 0%, #043560 40%, #075a9a 80%, #0a70c0 100%)",
    players: "312K",
    releaseYear: 2024,
  },
  {
    id: "chrome-velocity",
    title: "Chrome Velocity",
    description:
      "Drive chrome-plated hypercars at impossible speeds through a world made entirely of mirrors and light.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #0a0a14 0%, #1a1a30 40%, #2a2a50 80%, #3a3a70 100%)",
    players: "278K",
    releaseYear: 2023,
  },
  {
    id: "blazepath",
    title: "Blazepath",
    description:
      "Leave trails of fire behind as you tear through scorched desert tracks at volcanic speeds.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #1a0500 0%, #4a1000 40%, #7a1a00 80%, #aa2200 100%)",
    players: "195K",
    releaseYear: 2024,
  },
  {
    id: "quantum-lap",
    title: "Quantum Lap",
    description:
      "Race through tracks that shift and warp between quantum states — no two laps are ever the same.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #050520 0%, #100540 40%, #200560 80%, #350080 100%)",
    players: "143K",
    releaseYear: 2024,
  },
  {
    id: "apex-phantom",
    title: "Apex Phantom",
    description:
      "Become a ghost racer haunting the track while battling corporeal rivals for the phantom trophy.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #08060e 0%, #18103a 40%, #2a1a58 80%, #3c2470 100%)",
    players: "221K",
    releaseYear: 2023,
  },
  {
    id: "solar-circuit",
    title: "Solar Circuit",
    description:
      "Race solar-powered vehicles around rings of massive stars, harnessing gravity slingshots for top speed.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #1a0a00 0%, #402000 40%, #703500 80%, #a05000 100%)",
    players: "176K",
    releaseYear: 2024,
  },
  {
    id: "ice-breaker-gp",
    title: "Ice Breaker GP",
    description:
      "Slide and skid across treacherous glacier tracks in the most brutal winter grand prix ever conceived.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #020d18 0%, #053050 40%, #0a5080 80%, #1070a0 100%)",
    players: "234K",
    releaseYear: 2023,
  },
  {
    id: "dust-devil-rally",
    title: "Dust Devil Rally",
    description:
      "Navigate treacherous off-road terrain through sandstorms and flash floods in the world's toughest rally.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #1a1000 0%, #402800 40%, #6a4000 80%, #907800 100%)",
    players: "189K",
    releaseYear: 2024,
  },
  {
    id: "midnight-throttle",
    title: "Midnight Throttle",
    description:
      "Street race through a city that never sleeps — rain-slicked roads, neon reflections, zero mercy.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #020208 0%, #080818 40%, #0e0e2a 80%, #141440 100%)",
    players: "356K",
    releaseYear: 2024,
  },
  {
    id: "orbit-racer",
    title: "Orbit Racer",
    description:
      "Race spacecraft in planetary orbit, dodging asteroid fields while maintaining blistering orbital velocities.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #010205 0%, #030515 40%, #050828 80%, #080d40 100%)",
    players: "147K",
    releaseYear: 2023,
  },
  {
    id: "thunder-piston",
    title: "Thunder Piston",
    description:
      "Pilot a diesel-fueled behemoth through post-apocalyptic wastelands where the road itself fights back.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #0d0800 0%, #282000 40%, #403500 80%, #584800 100%)",
    players: "263K",
    releaseYear: 2024,
  },
  {
    id: "prism-circuit",
    title: "Prism Circuit",
    description:
      "Race through prismatic light tunnels where speed splits white light into weapon-grade laser beams.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #0a0218 0%, #1e0545 40%, #350870 80%, #4a0a9a 100%)",
    players: "198K",
    releaseYear: 2024,
  },
  {
    id: "ferro-speed",
    title: "Ferro Speed",
    description:
      "Magnetic-levitation cars battle for position on ferromagnetic race circuits floating above the clouds.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #040d14 0%, #0c2840 40%, #144560 80%, #1c6080 100%)",
    players: "215K",
    releaseYear: 2023,
  },
  {
    id: "lava-king",
    title: "Lava King",
    description:
      "Race heat-shielded dragsters along the rims of active volcanoes where one mistake means certain doom.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #200000 0%, #500500 40%, #900a00 80%, #c01500 100%)",
    players: "301K",
    releaseYear: 2024,
  },
  {
    id: "cyber-overtake",
    title: "Cyber Overtake",
    description:
      "Hack rival vehicles while racing through a cyberpunk metropolis — speed and strategy collide.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #020814 0%, #052040 40%, #083560 80%, #0b4a80 100%)",
    players: "284K",
    releaseYear: 2024,
  },
  {
    id: "bio-velocity",
    title: "Bio Velocity",
    description:
      "Race organic bio-engineered vehicles through living track ecosystems that mutate around you mid-race.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #001408 0%, #003518 40%, #005528 80%, #007038 100%)",
    players: "132K",
    releaseYear: 2023,
  },
  {
    id: "rebel-asphalt",
    title: "Rebel Asphalt",
    description:
      "Underground street racing with a rebel crew — outrun the cops, beat the bosses, own the city.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #0a0005 0%, #220010 40%, #400020 80%, #600030 100%)",
    players: "418K",
    releaseYear: 2024,
  },
  {
    id: "warp-circuit",
    title: "Warp Circuit",
    description:
      "Engage warp drives between checkpoints, teleporting to new track segments at light-bending velocities.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #040218 0%, #0c0545 40%, #180870 80%, #240a95 100%)",
    players: "176K",
    releaseYear: 2024,
  },
  {
    id: "nitro-horizon",
    title: "Nitro Horizon",
    description:
      "Stack nitro boosts to launch your car beyond the horizon in a relentless pursuit of the perfect lap.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #020820 0%, #041e55 40%, #073588 80%, #0a48b0 100%)",
    players: "329K",
    releaseYear: 2023,
  },
  {
    id: "tundra-blitz",
    title: "Tundra Blitz",
    description:
      "Barrel through arctic wilderness in modified snow-racers as blizzards threaten to bury the track alive.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #040a10 0%, #0d2030 40%, #163550 80%, #1e4a70 100%)",
    players: "158K",
    releaseYear: 2024,
  },
  {
    id: "signal-break",
    title: "Signal Break",
    description:
      "Race through radio-frequency canyons where jamming signals can knock rivals off the track.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #030a10 0%, #082535 40%, #0e4055 80%, #145878 100%)",
    players: "211K",
    releaseYear: 2024,
  },
  {
    id: "hurricane-pass",
    title: "Hurricane Pass",
    description:
      "Race through the eye of a hurricane on a course that circles the storm — if the walls close in, you lose.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #030810 0%, #081e30 40%, #0e3450 80%, #144870 100%)",
    players: "245K",
    releaseYear: 2023,
  },
  {
    id: "nano-dash",
    title: "Nano Dash",
    description:
      "Pilot a microscopic nanobot racer through the circuits of a supercomputer at processor-melting speeds.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #020520 0%, #061050 40%, #0a2080 80%, #0e30a0 100%)",
    players: "167K",
    releaseYear: 2024,
  },
  {
    id: "titan-rally",
    title: "Titan Rally",
    description:
      "Drive massive titan-class vehicles across the methane lakes and mountain ranges of Saturn's moon Titan.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #100800 0%, #302000 40%, #504000 80%, #706800 100%)",
    players: "193K",
    releaseYear: 2023,
  },
  {
    id: "flux-dragster",
    title: "Flux Dragster",
    description:
      "Pure drag racing amplified by flux capacitors — quarter-mile records shattered across parallel timelines.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #050020 0%, #100050 40%, #200090 80%, #3000c0 100%)",
    players: "287K",
    releaseYear: 2024,
  },
  {
    id: "redline-empire",
    title: "Redline Empire",
    description:
      "Build a street-racing empire from the ground up — recruit crew, tune cars, dominate every district.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #180000 0%, #3a0000 40%, #600000 80%, #880000 100%)",
    players: "372K",
    releaseYear: 2024,
  },
  {
    id: "turbine-clash",
    title: "Turbine Clash",
    description:
      "Jet-turbine racers battle for supremacy on floating sky-platforms with no railings and pure adrenaline.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #030a18 0%, #082235 40%, #0e3855 80%, #155075 100%)",
    players: "224K",
    releaseYear: 2023,
  },
  {
    id: "delta-overdrive",
    title: "Delta Overdrive",
    description:
      "Delta-wing hypercars tear through cornering sequences that exceed human tolerance at maximum overdrive.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #020518 0%, #061440 40%, #0c2868 80%, #123888 100%)",
    players: "156K",
    releaseYear: 2024,
  },
  {
    id: "phosphor-grand-prix",
    title: "Phosphor Grand Prix",
    description:
      "Bioluminescent tracks glow brighter the faster you go in this deep-ocean racing spectacle.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #000814 0%, #001a30 40%, #002d50 80%, #004070 100%)",
    players: "141K",
    releaseYear: 2024,
  },
  {
    id: "scorched-league",
    title: "Scorched League",
    description:
      "Compete in the galaxy's most brutal elimination race where last place gets incinerated each lap.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #200500 0%, #501000 40%, #802000 80%, #b03000 100%)",
    players: "298K",
    releaseYear: 2024,
  },
  {
    id: "zenith-speedway",
    title: "Zenith Speedway",
    description:
      "Reach the zenith of racing on a vertical track that spirals straight up through the stratosphere.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #050010 0%, #100030 40%, #1e0058 80%, #2d0080 100%)",
    players: "182K",
    releaseYear: 2023,
  },
  {
    id: "torque-phantom",
    title: "Torque Phantom",
    description:
      "Invisible cars, visible tracks — detect your rivals only by the torque ripples they leave behind.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #040410 0%, #0c0c2a 40%, #181845 80%, #242460 100%)",
    players: "209K",
    releaseYear: 2024,
  },
  {
    id: "galactic-pursuit",
    title: "Galactic Pursuit",
    description:
      "Chase criminals across star systems in the universe's first intergalactic police pursuit sim.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #010108 0%, #050520 40%, #0c0c40 80%, #141460 100%)",
    players: "334K",
    releaseYear: 2024,
  },
  {
    id: "chrome-serpent",
    title: "Chrome Serpent",
    description:
      "Race on track segments that snake and coil like a living serpent through skyscraper forests.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #060810 0%, #141e30 40%, #223450 80%, #304870 100%)",
    players: "175K",
    releaseYear: 2023,
  },
  {
    id: "vortex-lap",
    title: "Vortex Lap",
    description:
      "Circular tornado tracks funnel competing racers into a single-lane death spiral at the vortex center.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #040218 0%, #0a0540 40%, #180868 80%, #260a88 100%)",
    players: "253K",
    releaseYear: 2024,
  },
  {
    id: "abyss-runner",
    title: "Abyss Runner",
    description:
      "Deep-sea racing in submersible dragsters navigating abyssal trenches and crushing pressure zones.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #000508 0%, #001018 40%, #002030 80%, #003048 100%)",
    players: "148K",
    releaseYear: 2024,
  },
  {
    id: "ember-track",
    title: "Ember Track",
    description:
      "Race through a forest fire on heat-resistant vehicles while the track collapses in real time behind you.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #1a0800 0%, #3a1500 40%, #600a00 80%, #882500 100%)",
    players: "267K",
    releaseYear: 2023,
  },
  {
    id: "grid-annihilator",
    title: "Grid Annihilator",
    description:
      "Start last on the grid and tear through 23 rivals using tactical boosts, weapons, and pure speed.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #080010 0%, #180030 40%, #2c0058 80%, #400080 100%)",
    players: "391K",
    releaseYear: 2024,
  },
  {
    id: "nebula-sprint",
    title: "Nebula Sprint",
    description:
      "Sprint through glowing nebulae where the gas clouds slow rivals but fuel your quantum afterburner.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #030010 0%, #080025 40%, #100040 80%, #180060 100%)",
    players: "163K",
    releaseYear: 2024,
  },
  {
    id: "apex-reaper",
    title: "Apex Reaper",
    description:
      "Death itself races against you on every lap — push to the absolute apex or get reaped at the finish line.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #0a0005 0%, #1e0010 40%, #380020 80%, #500030 100%)",
    players: "445K",
    releaseYear: 2024,
  },
  {
    id: "crystal-kart",
    title: "Crystal Kart",
    description:
      "Kart race through crystalline cave systems where every wall reflects your headlights into blinding traps.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #050510 0%, #101030 40%, #1e1e50 80%, #2a2a6a 100%)",
    players: "312K",
    releaseYear: 2023,
  },
  {
    id: "fracture-gp",
    title: "Fracture GP",
    description:
      "The track cracks and fractures beneath your wheels — race fast enough and you'll outrun the collapse.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #040208 0%, #0c0520 40%, #180840 80%, #240c60 100%)",
    players: "237K",
    releaseYear: 2024,
  },
  {
    id: "storm-hawk-500",
    title: "Storm Hawk 500",
    description:
      "Five hundred laps in a perpetual superstorm — only the driver with nerves of titanium survives.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #030808 0%, #081c20 40%, #0e3038 80%, #144050 100%)",
    players: "289K",
    releaseYear: 2024,
  },
  {
    id: "radion-express",
    title: "Radion Express",
    description:
      "Radioactive bullet-train racers streak across irradiated plains — the fastest driver takes the antidote.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #0a1000 0%, #203000 40%, #385000 80%, #507000 100%)",
    players: "204K",
    releaseYear: 2023,
  },
  {
    id: "plasma-circuit",
    title: "Plasma Circuit",
    description:
      "Plasma-powered hovercraft race on magnetic rails suspended over the surface of a dying star.",
    category: "Racing",
    gradient:
      "linear-gradient(135deg, #180500 0%, #400e00 40%, #701a00 80%, #a02800 100%)",
    players: "178K",
    releaseYear: 2024,
  },

  // ── Simulation ──
  {
    id: "space-colony",
    title: "Space Colony",
    description:
      "Build and manage a thriving colony on a distant planet, balancing resources and alien diplomacy.",
    category: "Simulation",
    gradient:
      "linear-gradient(135deg, #020d10 0%, #043535 40%, #065050 80%, #0a7070 100%)",
    players: "445K",
    releaseYear: 2024,
  },
  {
    id: "mech-builder",
    title: "Mech Builder",
    description:
      "Design and pilot your custom battle mech through dynamic combat scenarios on war-torn industrial worlds.",
    category: "Simulation",
    gradient:
      "linear-gradient(135deg, #050d05 0%, #103010 40%, #1a4a1a 80%, #206020 100%)",
    players: "278K",
    releaseYear: 2023,
  },
  {
    id: "city-core",
    title: "City Core",
    description:
      "Architect futuristic megacities from the ground up, solving complex infrastructure puzzles for millions.",
    category: "Simulation",
    gradient:
      "linear-gradient(135deg, #030d08 0%, #082a18 40%, #0d4025 80%, #125535 100%)",
    players: "512K",
    releaseYear: 2022,
  },

  // ── Escape ──
  {
    id: "vault-zero",
    title: "Vault Zero",
    description:
      "Crack the ultimate high-security vault using nothing but your wits and the cryptic clues left behind.",
    category: "Escape",
    gradient:
      "linear-gradient(135deg, #0d0d02 0%, #2a2a05 40%, #404008 80%, #555510 100%)",
    players: "189K",
    releaseYear: 2024,
  },
  {
    id: "the-last-door",
    title: "The Last Door",
    description:
      "Solve mind-bending puzzles across parallel timelines to unlock the final door before reality collapses.",
    category: "Escape",
    gradient:
      "linear-gradient(135deg, #0d0808 0%, #2a1205 40%, #401e08 80%, #552a10 100%)",
    players: "323K",
    releaseYear: 2023,
  },
  {
    id: "cipher-room",
    title: "Cipher Room",
    description:
      "Decipher ancient codes and modern encryptions in a room that reshuffles itself every 60 seconds.",
    category: "Escape",
    gradient:
      "linear-gradient(135deg, #060d0d 0%, #0d2a25 40%, #104040 80%, #155555 100%)",
    players: "156K",
    releaseYear: 2024,
  },

  // ── Parkour ──
  {
    id: "gravity-flip",
    title: "Gravity Flip",
    description:
      "Defy gravity as you flip between ceiling and floor, threading through impossible obstacle courses at warp speed.",
    category: "Parkour",
    gradient:
      "linear-gradient(135deg, #0d0218 0%, #200535 40%, #350550 80%, #4a0a6a 100%)",
    players: "298K",
    releaseYear: 2024,
  },
  {
    id: "rooftop-runner",
    title: "Rooftop Runner",
    description:
      "Leap across neon-drenched skyscrapers in a rain-soaked cyberpunk city where every jump could be your last.",
    category: "Parkour",
    gradient:
      "linear-gradient(135deg, #08021a 0%, #15043a 40%, #22065a 80%, #2e0878 100%)",
    players: "411K",
    releaseYear: 2023,
  },
  {
    id: "pulse-dash",
    title: "Pulse Dash",
    description:
      "Harness rhythmic pulse energy to chain explosive dashes through laser grids and anti-gravity zones.",
    category: "Parkour",
    gradient:
      "linear-gradient(135deg, #0a0518 0%, #1a0835 40%, #280c50 80%, #380e6a 100%)",
    players: "243K",
    releaseYear: 2024,
  },
];

export const CATEGORIES: Array<Category | "All"> = [
  "All",
  "Horror",
  "Racing",
  "Simulation",
  "Escape",
  "Parkour",
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Horror: "#ef4444",
  Racing: "#3b82f6",
  Simulation: "#10b981",
  Escape: "#f59e0b",
  Parkour: "#8b5cf6",
};
