import type { BlogPostFull } from './types';

const storeCta = {
  type: 'cta' as const,
  title: 'Review AION 2 plans',
  text: 'Compare monthly and lifetime AION 2 Cheats access on the store page, then continue to checkout for current pricing.',
  href: '/store/',
};

export const blogPosts: BlogPostFull[] = [
  {
    tag: 'Guides',
    title: 'AION 2 cheats: what to review first',
    slug: 'cheats',
    image: '/images/gameplay/aion2-lab-combat.jpg',
    desc: 'A practical overview of AION 2 cheats on the global PC client, including ESP, flight markers, and plan choices.',
    date: 'Oct 12, 2026',
    readTime: '8 min read',
    featured: true,
    body: [
      {
        type: 'p',
        text: 'AION 2 is NC’s Unreal Engine 5 MMORPG built around aerial combat in Atreia. Before you buy [AION 2 cheats](/store/), review the listed modules on the [features page](/features/), the Windows PC notes on [setup](/setup/), and the current [status page](/status/). This guide is a starting map—not a live compatibility guarantee.',
      },
      { type: 'h2', text: 'Start with information overlays' },
      {
        type: 'p',
        text: 'Most buyers come in looking for AION 2 ESP: [player ESP](/esp/), [flight markers](/flight/), and [world information](/world/). Those overlays answer who is nearby, which faction they belong to, and whether a target is flying. [Radar](/radar/) sits beside them when you want local cues without filling the screen. [Gathering node ESP](/nodes/) is separate if you only need resource markers.',
      },
      {
        type: 'ul',
        items: [
          'Player ESP for nearby Daevas and faction filters',
          'Flight markers for aerial targets',
          'World boss, quest, and portal cues',
          'Radar for nearby rotations',
        ],
      },
      { type: 'h2', text: 'Treat soft aim as optional' },
      {
        type: 'p',
        text: '[Soft aim](/aim/) is listed. Full farming bots and quest automation are not, so this site does not advertise them. If you only want awareness, leave combat toggles off until you have a readable ESP profile. Confirm that split on the [FAQ](/faq/) before checkout.',
      },
      { type: 'h2', text: 'Global PC only' },
      {
        type: 'p',
        text: 'The current vendor listing is the global Windows PC client on [Steam or PURPLE](/pc/). Do not assume the same access works on an unsupported platform. Confirm the client before you complete checkout, and use the [Windows PC setup guide](/pc/) for the first-run order.',
      },
      { type: 'h2', text: 'Plans' },
      {
        type: 'p',
        text: 'AION 2 Cheats lists two USD plans on the [store](/store/): Monthly at $35 and Lifetime at $150. Feature lists are the same; duration is the difference. See [monthly vs lifetime](/plans/) if you are still deciding, or the [reviews checklist](/reviews/) if you want evaluation points without invented quotes.',
      },
      storeCta,
    ],
  },
  {
    tag: 'Features',
    title: 'AION 2 player ESP: faction, class, and distance',
    slug: 'esp',
    image: '/images/gameplay/aion2-safehaven-combat.jpg',
    desc: 'How player ESP presents nearby Daevas with faction, class, level, and distance information.',
    date: 'Oct 11, 2026',
    readTime: '6 min read',
    body: [
      {
        type: 'p',
        text: 'Player ESP is the overlay people mean when they search for AION 2 cheats or AION 2 hacks. It marks other players so you spend less time guessing faction, class, or range. Compare the live toggles on the [features page](/features/) and [store](/store/) before you assume every option is on.',
      },
      { type: 'h2', text: 'What the listing includes' },
      {
        type: 'p',
        text: 'The current product list includes box styles, skeleton, head circle, health bar, nameplate, class, level, faction (Elyos / Asmodian / Balaur), distance, view direction, flying or grounded state, and out-of-screen arrows. Enable only the labels you can read while fighting or flying. The [preview gallery](/preview/) shows how those layers look in screenshots.',
      },
      {
        type: 'table',
        headers: ['Option', 'What it helps with'],
        rows: [
          ['Box / skeleton', 'A silhouette through terrain'],
          ['Faction / class / level', 'Which Daeva you are looking at'],
          ['Distance ESP', 'Whether they are in fight range'],
          ['Flying state', 'Whether the target is in the air'],
        ],
      },
      { type: 'h2', text: 'Keep the overlay quiet' },
      {
        type: 'p',
        text: 'A max-distance filter is listed. Use it. Drawing every player on a busy Abyss or contested zone is harder to read than a short range that matches how AION 2 actually plays. Pair player ESP with [radar](/radar/) if you want a second local cue, and keep [world markers](/world/) for PvE so the two lists stay separate.',
      },
      {
        type: 'p',
        text: 'If you are still learning the names, start with the [AION 2 cheats overview](/cheats/) and the [gameplay guide](/guide/). Then return to [setup](/setup/) before you join a populated server.',
      },
      storeCta,
    ],
  },
  {
    tag: 'Features',
    title: 'AION 2 soft aim options',
    slug: 'aim',
    image: '/images/gameplay/aion2-radar-map.jpg',
    desc: 'What soft aim is listed for, and why it should stay optional after you check status.',
    date: 'Oct 10, 2026',
    readTime: '5 min read',
    body: [
      {
        type: 'p',
        text: 'Soft aim is the combat option on the current AION 2 Cheats listing. It is not described as a full combat bot or skill-rotation assistant. Confirm the toggle on the [features page](/features/) and the [status page](/status/) before you enable it.',
      },
      { type: 'h2', text: 'Listed aim controls' },
      {
        type: 'p',
        text: 'The vendor list includes enable soft aim, aim key, FOV, smoothness, bone selection (head / chest / closest), visible check, ignore friendly faction, ignore same party or alliance, draw FOV, draw target line, and max aim distance.',
      },
      {
        type: 'ul',
        items: [
          'Keep FOV and smoothness conservative on the first session',
          'Use ignore-friendly-faction if you play group content',
          'Leave soft aim off if you only want [player ESP](/esp/) and [radar](/radar/)',
        ],
      },
      { type: 'h2', text: 'What is not listed' },
      {
        type: 'p',
        text: 'This site does not claim silent aim, triggerbot, or automated skill rotations. If a third-party screenshot shows those extras, compare it with the [store](/store/) list instead of assuming they ship. The [FAQ](/faq/) repeats that split.',
      },
      storeCta,
    ],
  },
  {
    tag: 'Features',
    title: 'AION 2 flight markers for aerial combat',
    slug: 'flight',
    image: '/images/gameplay/aion2-snaplines.jpg',
    desc: 'Aerial target ESP, altitude readouts, and sky contested zone highlights for AION 2 flight PvP.',
    date: 'Oct 9, 2026',
    readTime: '6 min read',
    body: [
      {
        type: 'p',
        text: 'AION 2 is built around a world where the sky is a battlefield. Flight markers are the overlay group for that vertical fight. They sit beside [player ESP](/esp/) so you can tell a grounded target from one already in the air.',
      },
      { type: 'h2', text: 'Listed flight options' },
      {
        type: 'ul',
        items: [
          'Aerial target ESP',
          'Flight path markers',
          'Altitude readout',
          'Glide / wing state',
          'Sky contested zone highlights',
        ],
      },
      {
        type: 'p',
        text: 'Use a short max distance first. A busy sky contested zone can hide useful labels if every flying player is drawn at once. Pair flight markers with [radar](/radar/) when you need a top-down cue, and keep [soft aim](/aim/) optional until you confirm [status](/status/).',
      },
      {
        type: 'p',
        text: 'The [gameplay guide](/guide/) explains why aerial positioning matters in AION 2. The [preview](/preview/) page is the screenshot gallery for these layers.',
      },
      storeCta,
    ],
  },
  {
    tag: 'Features',
    title: 'AION 2 radar features',
    slug: 'radar',
    image: '/images/gameplay/aion2-lab-combat.jpg',
    desc: 'How 2D radar complements ESP when you need nearby player, boss, and node cues.',
    date: 'Oct 8, 2026',
    readTime: '5 min read',
    body: [
      {
        type: 'p',
        text: '2D radar is listed as a local awareness overlay. It is not described as a separate 3D product. Use it when [player ESP](/esp/) already answers identity and you still want a compact map of nearby players, bosses, and [nodes](/nodes/).',
      },
      { type: 'h2', text: 'What radar can show' },
      {
        type: 'ul',
        items: ['Player markers', 'Faction color coding', 'Boss markers', 'Node markers', 'Radar range and zoom'],
      },
      {
        type: 'p',
        text: 'Keep range short on crowded maps. Radar works best next to a conservative ESP profile, not with every world marker enabled. See [world markers](/world/) if you need dungeon or quest context instead of a radar pip.',
      },
      storeCta,
    ],
  },
  {
    tag: 'Features',
    title: 'AION 2 gathering node ESP',
    slug: 'nodes',
    image: '/images/gameplay/aion2-dungeon-quest.jpg',
    desc: 'Ore, herb, material, and chest markers from the current AION 2 Cheats listing.',
    date: 'Oct 7, 2026',
    readTime: '5 min read',
    body: [
      {
        type: 'p',
        text: 'Gathering node ESP is the world overlay for ore, herbs, materials, chests, and loot objects. It is information assistance, not a listed farming bot. Confirm filters on the [features](/features/) list before you assume every node type is on.',
      },
      { type: 'h2', text: 'Listed node options' },
      {
        type: 'ul',
        items: [
          'Gathering node ESP',
          'Ore / herb / material filters',
          'Chest / loot object ESP',
          'Max world distance',
        ],
      },
      {
        type: 'p',
        text: 'NC has published anti-bot measures that specifically mention automated gathering. Treat node ESP as a label, not a license to run unattended macros. Read the [compatibility notes](/compat/) and [status](/status/) before you launch.',
      },
      storeCta,
    ],
  },
  {
    tag: 'Features',
    title: 'AION 2 world and boss markers',
    slug: 'world',
    image: '/images/gameplay/aion2-radar-map.jpg',
    desc: 'NPC, elite, world boss, dungeon, quest, and portal overlays for Atreia.',
    date: 'Oct 6, 2026',
    readTime: '6 min read',
    body: [
      {
        type: 'p',
        text: 'World overlays cover PvE information: NPCs, elite mobs, world bosses, dungeon bosses, quest objectives, and instance entrances. They pair with [player ESP](/esp/) so open-world Atreia and dungeon routes stay readable.',
      },
      {
        type: 'table',
        headers: ['Marker', 'Typical use'],
        rows: [
          ['NPC / mob ESP', 'Separate trash from named targets'],
          ['Elite and world boss ESP', 'Find open-world events'],
          ['Dungeon boss markers', 'Track instance encounters'],
          ['Quest and portal cues', 'Find objectives and entrances'],
        ],
      },
      {
        type: 'p',
        text: 'Combat mode on the listing can hide world ESP when you only want player information. Use that if [radar](/radar/) plus player ESP is enough. The [AION 2 cheats overview](/cheats/) maps how these groups fit together.',
      },
      storeCta,
    ],
  },
  {
    tag: 'Setup',
    title: 'AION 2 cheats PC setup on Windows',
    slug: 'pc',
    image: '/images/gameplay/aion2-flight-view.jpg',
    desc: 'Windows PC requirements, Steam and PURPLE notes, and a conservative first-run configuration.',
    date: 'Oct 5, 2026',
    readTime: '7 min read',
    body: [
      {
        type: 'p',
        text: 'AION 2 Cheats is listed for Windows 10 and 11 on the global PC client. Official AION 2 support is for Windows PC; Linux, Steam Deck, and consoles are outside that commitment. Follow vendor notes after checkout and the [setup page](/setup/) before you launch.',
      },
      { type: 'h2', text: 'First-run order' },
      {
        type: 'ul',
        items: [
          'Confirm [status](/status/) after the latest AION 2 patch',
          'Finish checkout and keep the order email',
          'Launch the current Steam or PURPLE build',
          'Enable a conservative [player ESP](/esp/) and [radar](/radar/) profile',
          'Save a config and set a panic key',
        ],
      },
      { type: 'h2', text: 'Vendor hardware notes' },
      {
        type: 'p',
        text: 'The current listing notes HVCI, core isolation, TPM, and Secure Boot left on. It also lists Cloud DMA and an AWS option for isolated delivery. Confirm those notes at checkout rather than assuming every machine can load every module.',
      },
      {
        type: 'p',
        text: 'If setup fails, use [support](/go/) with your order email, Windows version, Steam or PURPLE, and the exact error text. The [FAQ](/faq/) covers common plan and platform questions first.',
      },
      storeCta,
    ],
  },
  {
    tag: 'Updates',
    title: 'AION 2 anti-cheat and compatibility notes',
    slug: 'compat',
    image: '/images/gameplay/aion2-lab-combat.jpg',
    desc: 'What published AION 2 anti-bot measures mean and how to treat status after a patch.',
    date: 'Oct 4, 2026',
    readTime: '6 min read',
    body: [
      {
        type: 'p',
        text: 'This article does not publish a live undetected claim. NC has publicly described strengthened anti-bot measures for AION 2, including VPN connection blocks, an enhanced in-game reporting system, and hardware-based restrictions. A named Western anti-cheat brand has not been the primary public description for the global client.',
      },
      { type: 'h2', text: 'What that means for buyers' },
      {
        type: 'p',
        text: 'Treat compatibility as unknown after every AION 2 patch until you re-check the [status page](/status/). Stop if a build is marked unavailable. Third-party software can still lead to account action even when a listing looks current.',
      },
      {
        type: 'p',
        text: 'NC’s January 2026 anti-bot update also raised the minimum level for gathering activities on that service. That is one reason this site describes [node ESP](/nodes/) as labels—not unattended automation. Read [setup](/setup/) and the [FAQ](/faq/) before you launch.',
      },
      storeCta,
    ],
  },
  {
    tag: 'Guides',
    title: 'AION 2 Cheats monthly vs lifetime plans',
    slug: 'plans',
    image: '/images/gameplay/aion2-snaplines.jpg',
    desc: 'Compare the $35 monthly plan and the $150 lifetime plan before checkout.',
    date: 'Oct 3, 2026',
    readTime: '4 min read',
    body: [
      {
        type: 'p',
        text: 'AION 2 Cheats lists two USD plans on the [store](/store/). Monthly access is $35 for 30 days (P30D). Lifetime access is $150 (P99Y). Both plans use the same listed feature set.',
      },
      {
        type: 'table',
        headers: ['Plan', 'Price', 'Duration'],
        rows: [
          ['Monthly', '$35', 'P30D'],
          ['Lifetime', '$150', 'P99Y'],
        ],
      },
      {
        type: 'p',
        text: 'Choose monthly if you want a short evaluation window after you read [features](/features/) and [status](/status/). Choose lifetime if you already know you want longer access. The [reviews checklist](/reviews/) lists evaluation points without invented star ratings.',
      },
      storeCta,
    ],
  },
  {
    tag: 'Guides',
    title: 'AION 2 classes on the global PC build',
    slug: 'classes',
    image: '/images/gameplay/aion2-dungeon-quest.jpg',
    desc: 'The eight launch classes on the global AION 2 client and how to confirm current gender rules.',
    date: 'Oct 2, 2026',
    readTime: '6 min read',
    body: [
      {
        type: 'p',
        text: 'NC’s global game overview lists eight classes on the current AION 2 PC build: Gladiator, Templar, Assassin, Ranger, Chanter, Cleric, Sorcerer, and Spiritmaster. That list concerns the global service and should not be expanded from another regional client.',
      },
      { type: 'h2', text: 'Gender-locked classes' },
      {
        type: 'p',
        text: 'Players searching “AION 2 gender locked classes” are usually comparing the sequel with the original game. Confirm current class gender rules in official NC character-creation notes for the global client. This site does not invent locks that are not documented on the live build.',
      },
      {
        type: 'p',
        text: 'If you use [player ESP](/esp/), class and level fields help you read those eight jobs in the field. Pair that with the [gameplay guide](/guide/) if you are still choosing a role, then return to the [store](/store/) only after you know which overlays you actually need.',
      },
      storeCta,
    ],
  },
  {
    tag: 'Guides',
    title: 'AION 2 gameplay guide: combat, flight, and factions',
    slug: 'guide',
    image: '/images/gameplay/aion2-radar-map.jpg',
    desc: 'A short AION 2 gameplay guide covering aerial combat, factions, and what to review before buying tools.',
    date: 'Oct 1, 2026',
    readTime: '7 min read',
    body: [
      {
        type: 'p',
        text: 'AION 2 is a free-to-play action MMORPG. It is an MMO: shared-world PvE, faction war, and large-scale content are part of the design. It is not documented here as a gacha-first product—check the official cash shop if you need the current monetization model.',
      },
      { type: 'h2', text: 'How the game plays' },
      {
        type: 'p',
        text: 'Combat is built around precision, timing, and positioning, including vertical fights. Factions include Elyos, Asmodian, and the empowered Balaur. The world is described as far larger than the original AION, with dungeon formats from solo to larger groups.',
      },
      {
        type: 'p',
        text: 'If you are evaluating [AION 2 cheats](/cheats/), start with information modules that match those systems: [player ESP](/esp/) for faction fights, [flight markers](/flight/) for aerial targets, and [world markers](/world/) for PvE. Then read [setup](/setup/) and [status](/status/).',
      },
      storeCta,
    ],
  },
  {
    tag: 'Guides',
    title: 'AION 2 release date and global access',
    slug: 'release',
    image: '/images/gameplay/aion2-lab-combat.jpg',
    desc: 'When AION 2 opened globally on Steam and PURPLE, plus what that means for product compatibility.',
    date: 'Sep 30, 2026',
    readTime: '5 min read',
    body: [
      {
        type: 'p',
        text: 'AION 2’s global free-to-play PC service opened on October 5, 2026, following Founder access on September 30, 2026. Steam lists the app as released. NC also distributes the same global content through PURPLE. Korea and Taiwan progress do not transfer to the global service.',
      },
      {
        type: 'p',
        text: 'Product compatibility should be checked against the current global Windows build, not an older regional client. Use the [status page](/status/) after launch-week patches, then the [store](/store/) if you still want to compare plans. The [North America](/na/) note covers server location separately from download availability.',
      },
      storeCta,
    ],
  },
  {
    tag: 'Guides',
    title: 'AION 2 North America servers and regions',
    slug: 'na',
    image: '/images/gameplay/aion2-player-esp.jpg',
    desc: 'North America server location notes for AION 2 and how regional access differs from Korea or Taiwan progress.',
    date: 'Sep 29, 2026',
    readTime: '5 min read',
    body: [
      {
        type: 'p',
        text: 'NC’s launch materials list local servers in North America, South America, Europe, and Asia (Japan). Server location does not establish play from every country, and it does not replace the [status page](/status/) for product compatibility.',
      },
      {
        type: 'p',
        text: 'The global client is localized in English, German, French, Spanish, Portuguese, Japanese, Korean, and Russian. Steam and PURPLE users share the same global content and servers when accounts are linked. Korea or Taiwan characters stay on those services.',
      },
      {
        type: 'p',
        text: 'If you are buying [AION 2 cheats](/store/) from North America, still confirm Windows PC, the current global build, and [setup](/setup/) notes. Regional server presence is not a compatibility guarantee. See the [release date](/release/) article for the global opening timeline.',
      },
      storeCta,
    ],
  },
];
