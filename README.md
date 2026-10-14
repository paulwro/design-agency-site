# paulwro.co

React + Vite. No Tailwind, no react-router — the routing is a ~20-line hash
router in `App.jsx`, and the styling is plain CSS driven by tokens.

## Run it

```bash
npm install          # first time only
npm run dev          # http://localhost:5173
```

Open the URL it prints **fresh** rather than reloading an old tab — a stale tab
can hold the previous module graph and show you work that is no longer there.

```bash
npm run build        # production build to dist/
npm run preview      # serve that build
npm run lint         # oxlint
python3 scripts/check-conformance.py
```

Routes: `#/`, `#/studio`, `#/engagements`, `#/contact`, `#/work`.
An unrecognised hash corrects itself to `#/` rather than silently rendering the
homepage under the wrong URL.

Requires Node ^20.19 or >=22.12 (Vite 8).

## The design system

Everything visual comes from `src/styles/tokens.css`. Read that file before
changing anything — it carries the reasoning, not just the values.

**Type.** A fluid scale, steps −2 to 5, interpolating 390 → 1440. The *ratio*
interpolates too: a single 9:8 at phone width, opening to √φ at desktop. So a
phone gets one uniform ratio through the whole scale and the display end fans
into its second ratio only once the screen earns the room. Leading is one
hyperbola — `0.75em + 0.956rem` — which lands at 1.25 on a phone and 1.005 at
1440 on its own.

**Motion.** Measured off wearecollins.com and together.agency, not guessed:
movement `0.8s cubic-bezier(.19, 1, .22, 1)`, colour `0.7s ease-out-cubic`,
opacity `0.5s ease-in-out-sine`. Durations are chosen by how far a thing
travels, not how important it is — four tiers, documented in the file. On any
one element, movement outlasts its own fade; that gap is what makes something
look like it is settling rather than sliding.

**Rhythm.** `--section-inset`, `--section-gap`, `--rhythm-64`, `--rhythm-96`
are fluid. Figma's 64/96/128 are desktop numbers; held flat they make a phone
layout drift apart, because the type compresses 37% and the air does not.
`--space-*` stays fixed for component-level padding Figma really does hold.

**Rules.** `--color-rule` for hairlines on a raised `--container` surface,
where Figma's dark Borders & Lines (#131313) is darker than the surface and
inverts into a groove. `--color-border` — Borders & Lines as authored — for
rules on the page ground, where it works in both modes. The contact form is
the only deliberate `--color-border` hairline.

## Figma

File `U1PDzTkFFiLR3CC4RhLo43`. Per-page specs extracted with `get_design_context`
live in `../01_branding/figma-spec-{home,studio,engagements,contact}.md` — every
text node names the step Figma binds to it. Nothing in there is inferred from a
frame's height; that mistake is what the spec files exist to prevent.

## Checking your work

`scripts/check-conformance.py` diffs the code against those specs and against
the motion system — type steps, the places Figma breaks its own rhythm, which
block is used where, no hardcoded durations or easings, every `var()` resolving.
Run it after touching anything in `src/`. It is a tripwire for regressions that
look fine in isolation.

## Blocks

`src/components/blocks/README.md` has the props table and which Figma group
each block maps to. `Reveal` is the one entrance gesture; everything scrolls in
through it.

## Still outstanding

- Square client marks for the Studio roster (monograms stand in)
- Real imagery throughout — headshot, panels, work thumbnails
- Prices on Engagements are drafted, not confirmed
- Client descriptors marked `[describe]` in `studio-data.js`
- Work page has no Figma design yet (direction: `PaulWro_Work_Page_Direction_Handoff.md`). News was removed from the site
