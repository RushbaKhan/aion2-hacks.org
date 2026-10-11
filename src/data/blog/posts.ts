import type { BlogPostFull } from './types';

const storeCta = {
  type: 'cta' as const,
  title: 'Review The Isle plans',
  text: 'Compare monthly and lifetime Isle Hacks access, then continue to checkout for current pricing.',
  href: '/go/',
};

export const blogPosts: BlogPostFull[] = [
  {
    tag: 'Guides',
    title: 'The Isle hacks for Evrima: what to review first',
    slug: 'the-isle-hacks-evrima',
    image: '/images/gameplay/isle-reeds-aim.jpg',
    desc: 'A practical overview of The Isle hacks on the Evrima branch, including ESP, radar, and plan choices.',
    date: 'Oct 8, 2026',
    readTime: '8 min read',
    featured: true,
    body: [
      {
        type: 'p',
        text: 'The Isle Evrima is a dinosaur survival branch where information matters as much as raw combat. Before you buy [The Isle hacks](/store/), review the listed modules on the [features page](/features/), the Windows PC notes on [setup](/setup/), and the current [status page](/status/). This guide is a starting map—not a live compatibility guarantee.',
      },
      { type: 'h2', text: 'Start with information overlays' },
      {
        type: 'p',
        text: 'Most buyers come in looking for The Isle ESP: [player ESP](/the-isle-player-esp/), [dinosaur ESP](/the-isle-dinosaur-esp/), and [health ESP](/the-isle-health-esp/). Those overlays answer who is nearby, what species they are, and whether a fight is worth taking. [Radar](/the-isle-radar-features/) sits beside them when you want local cues without filling the screen. The [ESP terminology](/the-isle-esp-terminology/) glossary keeps the names straight.',
      },
      {
        type: 'ul',
        items: [
          'Player ESP for other survivors',
          'Dinosaur ESP for species and growth',
          'Health, stamina, and distance readouts',
          'Radar for nearby rotations',
        ],
      },
      { type: 'h2', text: 'Treat aim assistance as optional' },
      {
        type: 'p',
        text: '[Aim assistance](/the-isle-aimbot/) is listed. Silent aim and triggerbot are not, so this site does not advertise them. If you only want awareness, leave combat toggles off until you have a readable ESP profile. Confirm that split on the [FAQ](/faq/) before checkout.',
      },
      { type: 'h2', text: 'Evrima only' },
      {
        type: 'p',
        text: 'The current vendor listing is Evrima-only. Do not assume the same access works on a Legacy install. Confirm the Steam branch before you complete checkout, and use the [Windows PC setup guide](/the-isle-hacks-pc-setup/) for the first-run order.',
      },
      { type: 'h2', text: 'Plans' },
      {
        type: 'p',
        text: 'Isle Hacks lists two USD plans on the [store](/store/): Monthly at $35 and Lifetime at $150. Feature lists are the same; duration is the difference. See [monthly vs lifetime](/the-isle-monthly-vs-lifetime/) if you are still deciding, or the [reviews checklist](/reviews/) if you want evaluation points without invented quotes.',
      },
      storeCta,
    ],
  },
  {
    tag: 'Features',
    title: 'The Isle player ESP: boxes, names, and distance',
    slug: 'the-isle-player-esp',
    image: '/images/gameplay/isle-player-esp.jpg',
    desc: 'How player ESP presents nearby survivors with box, name, and distance information.',
    date: 'Oct 7, 2026',
    readTime: '6 min read',
    body: [
      {
        type: 'p',
        text: 'Player ESP is the overlay people mean when they search for The Isle player ESP. It marks other survivors so you spend less time guessing whether a sound is a human or a dinosaur. Compare the live toggles on the [features page](/features/) and [store](/store/) before you assume every option is on.',
      },
      { type: 'h2', text: 'What the listing includes' },
      {
        type: 'p',
        text: 'The current product list includes box ESP, name ESP, distance ESP, player direction, a head dot, snaplines, and a visible-check option. Enable only the labels you can read while sprinting or scenting. The [preview gallery](/preview/) shows how those layers look in screenshots.',
      },
      {
        type: 'table',
        headers: ['Option', 'What it helps with'],
        rows: [
          ['Box ESP', 'A silhouette through terrain'],
          ['Name ESP', 'Which survivor you are looking at'],
          ['Distance ESP', 'Whether they are in fight range'],
          ['Direction / snapline', 'Where to turn when you lose line of sight'],
        ],
      },
      { type: 'h2', text: 'Keep the overlay quiet' },
      {
        type: 'p',
        text: 'A max-distance filter is listed. Use it. Drawing every player on a busy server is harder to read than a short range that matches how The Isle actually plays. Pair player ESP with [radar](/the-isle-radar-features/) if you want a second local cue, and keep [dinosaur ESP](/the-isle-dinosaur-esp/) for wildlife so the two lists stay separate.',
      },
      {
        type: 'p',
        text: 'If you are still learning the names, start with [ESP terminology](/the-isle-esp-terminology/) and the [Evrima overview](/the-isle-hacks-evrima/). Then return to [setup](/setup/) before you join a populated server.',
      },
      storeCta,
    ],
  },
  {
    tag: 'Features',
    title: 'The Isle dinosaur ESP and species information',
    slug: 'the-isle-dinosaur-esp',
    image: '/images/gameplay/isle-water-swim.jpg',
    desc: 'Dinosaur ESP, species labels, growth, and why creature information matters on Evrima.',
    date: 'Oct 6, 2026',
    readTime: '6 min read',
    body: [
      {
        type: 'p',
        text: 'Dinosaur ESP—also listed as animal ESP—is the overlay for nearby creatures. On Evrima, species and growth change whether something is food, a threat, or something you should walk around. It is one of the core The Isle ESP modules on the [features](/features/) list.',
      },
      { type: 'h2', text: 'Creature information' },
      {
        type: 'p',
        text: 'The listing includes species labels plus growth and stamina when those fields are available. NPC ESP and corpse markers sit in the same group so you can tell a live dinosaur from a carcass. [Health ESP](/the-isle-health-esp/) adds the fight-critical numbers on top.',
      },
      {
        type: 'ul',
        items: [
          'Species identification',
          'Growth stage',
          'Stamina when listed',
          'NPC and corpse markers',
        ],
      },
      { type: 'h2', text: 'How it pairs with player ESP' },
      {
        type: 'p',
        text: 'Use dinosaur ESP to filter wildlife and [player ESP](/the-isle-player-esp/) to filter survivors. You do not need every world marker on at once. The [ESP terminology guide](/the-isle-esp-terminology/) explains the difference in plain language, and [radar](/the-isle-radar-features/) can stay short-range while you learn the labels.',
      },
      {
        type: 'p',
        text: 'Screenshots live on the [preview](/preview/) page. Plans and the full module list stay on the [store](/store/).',
      },
      storeCta,
    ],
  },
  {
    tag: 'Features',
    title: 'The Isle health ESP: health, stamina, and growth',
    slug: 'the-isle-health-esp',
    image: '/images/gameplay/isle-forest-radar.jpg',
    desc: 'What health ESP adds when you need fight-critical stats before committing to a hunt.',
    date: 'Oct 5, 2026',
    readTime: '5 min read',
    body: [
      {
        type: 'p',
        text: 'Health ESP adds fight-critical numbers to the same overlay as [player ESP](/the-isle-player-esp/) and [dinosaur ESP](/the-isle-dinosaur-esp/). The listing includes health, stamina, and growth—not a separate combat bot. Confirm those fields on the [features page](/features/) for the current build.',
      },
      { type: 'h2', text: 'When it is useful' },
      {
        type: 'p',
        text: 'A low-health juvenile is a different decision from a full-stamina adult. Health ESP is there so you can make that call before you commit. If the overlay feels noisy, keep boxes and distance on and leave extra stats off until you need them. [Radar](/the-isle-radar-features/) can stay on a short range while you learn the numbers.',
      },
      { type: 'h2', text: 'What it is not' },
      {
        type: 'p',
        text: 'Health ESP does not aim for you and does not replace The Isle’s own scent or audio cues. Confirm the current [status](/status/) after a patch—stat fields can change when a build is updated. [Aim assistance](/the-isle-aimbot/) is a separate toggle if you later want combat help.',
      },
      {
        type: 'p',
        text: 'For first-run order, use the [Windows PC setup guide](/the-isle-hacks-pc-setup/) and the [setup page](/setup/). Pricing stays on the [store](/store/).',
      },
      storeCta,
    ],
  },
  {
    tag: 'Features',
    title: 'The Isle aimbot and aim assistance options',
    slug: 'the-isle-aimbot',
    image: '/images/gameplay/isle-beach-pack.jpg',
    desc: 'What aim assistance is listed for, and why it should stay optional after you check status.',
    date: 'Oct 4, 2026',
    readTime: '5 min read',
    body: [
      {
        type: 'p',
        text: 'Searches for The Isle aimbot usually mean the aim assistance module on the current listing. It is optional. You can run [ESP](/features/) and [radar](/the-isle-radar-features/) without turning it on. The [store](/store/) lists it beside information overlays, not as a required combat pack.',
      },
      { type: 'h2', text: 'What is listed—and what is not' },
      {
        type: 'p',
        text: 'Aim assistance is listed. Silent aim and triggerbot are not. Isle Hacks does not invent those extra combat claims. If a later build adds them, they should appear on the [features](/features/) and [store](/store/) pages first. The [FAQ](/faq/) repeats that limit in shorter form.',
      },
      { type: 'h2', text: 'Use it after status, not before' },
      {
        type: 'p',
        text: 'Combat modules add risk on top of an information overlay. Check the [status page](/status/) after every Evrima or Easy Anti-Cheat update, then enable aim assistance only if you still want it. [Easy Anti-Cheat notes](/the-isle-compatibility-eac/) explain why patch days reset that decision.',
      },
      {
        type: 'p',
        text: 'Build a readable [player ESP](/the-isle-player-esp/) profile first. Then decide. [Setup](/setup/) covers panic keys and saved configs before a live hunt.',
      },
      storeCta,
    ],
  },
  {
    tag: 'Setup',
    title: 'The Isle hacks PC setup on Windows',
    slug: 'the-isle-hacks-pc-setup',
    image: '/images/gameplay/isle-beach-snaplines.jpg',
    desc: 'Windows PC requirements, Evrima-only notes, and a conservative first-run configuration.',
    date: 'Oct 3, 2026',
    readTime: '7 min read',
    body: [
      {
        type: 'p',
        text: 'The Isle hacks PC listing is for Windows 10 and 11. The current product is Evrima-only. This walkthrough covers what to confirm before checkout and how to configure a first profile. Full steps after purchase come from the vendor instructions and the [setup page](/setup/).',
      },
      { type: 'h2', text: 'Before you buy' },
      {
        type: 'ul',
        items: [
          'Windows 10 or 11, 64-bit',
          'The Isle Evrima branch on Steam',
          'A machine that already runs The Isle',
          'Current notes on the [status](/status/) and [setup](/setup/) pages',
        ],
      },
      { type: 'h2', text: 'Cloud DMA note' },
      {
        type: 'p',
        text: 'The vendor lists Cloud DMA as required for full functionality and mentions HVCI, core isolation, TPM, and Secure Boot left on. Confirm that at checkout if you need the complete overlay set. This site does not sell a separate DMA kit. The [store](/store/) and [FAQ](/faq/) repeat the same requirement.',
      },
      { type: 'h2', text: 'First-run profile' },
      {
        type: 'p',
        text: 'Enable [player ESP](/the-isle-player-esp/), [dinosaur ESP](/the-isle-dinosaur-esp/), and a short [radar](/the-isle-radar-features/) range. Set a panic key and custom menu key. Save the config. Add [health ESP](/the-isle-health-esp/) or [aim assistance](/the-isle-aimbot/) only after the overlay feels readable. The [preview](/preview/) page shows the layers those toggles map to.',
      },
      { type: 'h2', text: 'If something fails' },
      {
        type: 'p',
        text: 'Send [checkout](/go/) your order email, Windows version, The Isle branch, and the exact loader or Easy Anti-Cheat message. Screenshots help more than a one-line “it doesn’t work.” If the game itself will not launch, read the [EAC article](/the-isle-compatibility-eac/) first—that can be a client install issue, not a product issue.',
      },
      storeCta,
    ],
  },
  {
    tag: 'Features',
    title: 'The Isle radar features for local rotations',
    slug: 'the-isle-radar-features',
    image: '/images/gameplay/isle-combat-health.jpg',
    desc: 'How radar complements ESP when you need nearby player and dinosaur cues.',
    date: 'Oct 2, 2026',
    readTime: '5 min read',
    body: [
      {
        type: 'p',
        text: 'Radar is listed as a local awareness overlay for nearby players and dinosaurs. It is not described as a separate 2D or 3D product, so this article treats it as one radar option beside ESP. See the [features](/features/) list and [preview](/preview/) screenshots for how it sits next to boxes.',
      },
      { type: 'h2', text: 'When radar helps' },
      {
        type: 'p',
        text: 'ESP boxes are precise. Radar is useful when you are rotating and only need to know that something is close. On busier Evrima servers, a short radar range plus a max-distance ESP filter is easier to read than every toggle at once. That pairing is also the first-run advice in the [Windows PC setup guide](/the-isle-hacks-pc-setup/).',
      },
      { type: 'h2', text: 'Pair it with ESP' },
      {
        type: 'p',
        text: 'Use radar to notice a contact, then use [player ESP](/the-isle-player-esp/) or [dinosaur ESP](/the-isle-dinosaur-esp/) to identify it. Keep both ranges similar so the two overlays agree. [Health ESP](/the-isle-health-esp/) can wait until you already know what you are looking at.',
      },
      {
        type: 'p',
        text: 'Plans that include radar are the same monthly and lifetime options on the [store](/store/). There is no radar-only SKU. [Monthly vs lifetime](/the-isle-monthly-vs-lifetime/) covers duration only.',
      },
      storeCta,
    ],
  },
  {
    tag: 'Guides',
    title: 'The Isle ESP terminology: player, dinosaur, and world overlays',
    slug: 'the-isle-esp-terminology',
    image: '/images/gameplay/isle-jungle-close.jpg',
    desc: 'Plain-language definitions for player ESP, dinosaur ESP, health ESP, and resource markers.',
    date: 'Oct 1, 2026',
    readTime: '7 min read',
    body: [
      {
        type: 'p',
        text: 'ESP just means an information overlay. On The Isle, that usually splits into players, dinosaurs, and world objects. This glossary matches the current Isle Hacks listing on the [features](/features/) and [store](/store/) pages. For a hunt-first walkthrough, start with the [Evrima overview](/the-isle-hacks-evrima/).',
      },
      { type: 'h2', text: 'Player ESP' },
      {
        type: 'p',
        text: 'Marks other survivors. Common options: box, name, distance, direction, snapline, head dot, and visible check. See the [player ESP guide](/the-isle-player-esp/).',
      },
      { type: 'h2', text: 'Dinosaur ESP' },
      {
        type: 'p',
        text: 'Marks creatures and, when listed, NPCs and corpses. Species, growth, and stamina are the extra fields that matter on Evrima. See [dinosaur ESP](/the-isle-dinosaur-esp/).',
      },
      { type: 'h2', text: 'Health ESP' },
      {
        type: 'p',
        text: 'Adds health, stamina, and growth numbers to those same targets. Details are in the [health ESP article](/the-isle-health-esp/).',
      },
      { type: 'h2', text: 'Resource or world ESP' },
      {
        type: 'p',
        text: 'Fruit, water, gore, and corpse markers. These are pickup and world cues, not player tracking. They appear on the [features](/features/) list as resource markers.',
      },
      { type: 'h2', text: 'Radar' },
      {
        type: 'p',
        text: 'A compact nearby-entity overlay. It complements ESP instead of replacing it. Read [radar features](/the-isle-radar-features/) and glance at the [preview](/preview/) if you want a visual before checkout.',
      },
      {
        type: 'p',
        text: 'Still deciding on a plan? [Monthly vs lifetime](/the-isle-monthly-vs-lifetime/) and the [FAQ](/faq/) keep duration separate from the overlay list.',
      },
      storeCta,
    ],
  },
  {
    tag: 'Updates',
    title: 'The Isle Easy Anti-Cheat compatibility notes',
    slug: 'the-isle-compatibility-eac',
    image: '/images/gameplay/isle-water-swim.jpg',
    desc: 'What Easy Anti-Cheat means for The Isle Evrima and how to treat status after a patch.',
    date: 'Sep 30, 2026',
    readTime: '6 min read',
    body: [
      {
        type: 'p',
        text: 'The Isle Evrima launches through Easy Anti-Cheat. Official community troubleshooting for “Easy Anti-Cheat not installed” and the game’s own support notes describe EAC as the launch path. That is the current anti-cheat implementation to verify—not a claim that any third-party tool stays compatible. Treat the [status page](/status/) as the session check, not this article.',
      },
      { type: 'h2', text: 'What to do after a patch' },
      {
        type: 'ul',
        items: [
          'Read the [status page](/status/) before you launch.',
          'Confirm you are still on the Evrima branch in the [Evrima overview](/the-isle-hacks-evrima/).',
          'Do not assume yesterday’s config still applies—reload from [setup](/setup/).',
          'Stop if checkout or vendor notes say the build is unavailable.',
        ],
      },
      { type: 'h2', text: 'No permanent undetected promise' },
      {
        type: 'p',
        text: 'Isle Hacks does not advertise a permanent undetected status. Third-party software can conflict with Easy Anti-Cheat after an update. You accept that risk if you use the product. The [FAQ](/faq/) and [terms](/terms/) say the same thing in shorter legal language.',
      },
      { type: 'h2', text: 'Game launch issues vs product issues' },
      {
        type: 'p',
        text: 'If The Isle itself fails with an EAC install error, repair the game files first. That is a game-client problem. Product setup questions still belong on [checkout](/go/) with your order email and exact error text. The [Windows PC setup guide](/the-isle-hacks-pc-setup/) lists what to include in that ticket.',
      },
      {
        type: 'p',
        text: 'Combat toggles add extra risk on patch day. Leave [aim assistance](/the-isle-aimbot/) off until status is clear, and keep [player ESP](/the-isle-player-esp/) conservative.',
      },
      storeCta,
    ],
  },
  {
    tag: 'Guides',
    title: 'Isle Hacks monthly vs lifetime plans',
    slug: 'the-isle-monthly-vs-lifetime',
    image: '/images/gameplay/isle-player-esp.jpg',
    desc: 'Compare the $35 monthly plan and the $150 lifetime plan before checkout.',
    date: 'Sep 29, 2026',
    readTime: '4 min read',
    body: [
      {
        type: 'p',
        text: 'Isle Hacks sells two USD plans for The Isle on Windows PC. Both use the same listed feature set. The difference is duration and price. Open the [store](/store/) for checkout, or the [reviews checklist](/reviews/) if you want evaluation points before you pick.',
      },
      {
        type: 'table',
        headers: ['Plan', 'Price', 'Duration', 'Best when'],
        rows: [
          ['Monthly', '$35', 'P30D / 30 days', 'You want to evaluate ESP and radar first'],
          ['Lifetime', '$150', 'P99Y / one-time', 'You already know you want longer access'],
        ],
      },
      { type: 'h2', text: 'Same features' },
      {
        type: 'p',
        text: '[Player ESP](/the-isle-player-esp/), [dinosaur ESP](/the-isle-dinosaur-esp/), [health information](/the-isle-health-esp/), [radar](/the-isle-radar-features/), resource markers, and [aim assistance](/the-isle-aimbot/) are listed on both plans. There is no Lite/Pro/Elite split on this site. The [features page](/features/) is the public module list.',
      },
      { type: 'h2', text: 'Check status either way' },
      {
        type: 'p',
        text: 'A lifetime key does not freeze Easy Anti-Cheat. Re-check the [status page](/status/) after Evrima updates no matter which plan you pick. Read the [EAC notes](/the-isle-compatibility-eac/) if a patch just shipped. Open the [store](/store/) when you are ready to choose, or the [FAQ](/faq/) if duration is the only open question.',
      },
      storeCta,
    ],
  },
];
