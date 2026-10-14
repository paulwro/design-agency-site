# Shared section blocks

Repeatable pieces the pages assemble from. Import from
`components/blocks/<Name>` — they share `blocks.css`.

`Reveal` is the exception: it carries motion, not layout, and is listed last.

| Block | Figma group | What it is | Used by |
|-------|-------------|------------|---------|
| `SectionHeader` | `Step 0_Step 4_Step 0` | eyebrow → headline → lede → optional CTA | Studio, Engagements |
| `TitleBody` | `Step 1_Step 0`, `Step 0 (Strong)_Step 0` | short title above a paragraph; `emphasis="strong"` for the bold step-0 variant | Studio, Engagements |
| `DividedRow` | ruled rows | equal `1fr` columns with hairline rules; `rule="vertical"` or `"horizontal"` | Studio "How we work", Engagements "Why clients choose us" |
| `MediaPanel` | `full panel img`, `side by side imgs` | one or two rounded media slots; renders empty placeholders until imagery lands | Studio, Engagements |
| `RuledList` | `Unordered List wHorizontal Rules` | plain lines separated by hairlines; `leadingRule` adds one above the first | ServiceCard, ServiceListCard |
| `PillLink` | `Pill Container Link` | small pill with trailing diagonal arrow; styles live in `styles/controls.css` | ServiceCard |
| `FloatingCollage` | `Floating Imgs` | overlapping media slots positioned as % of a 1127x873 stage, so the arrangement scales intact; falls back to a grid under 860px | Engagements |
| `CarouselCard` | `Flickity Carousel Card` 1127:1010 | media tile with an arrow-badged note beneath; always the first column of a three-up | Studio ×2 |
| `ClientLineList` | `Client Logos-Descript Container` 1371:1399 | ruled line list — 56px symbol tile, client name, right-aligned description at 80% | Studio "Who we work with" |
| `Reveal` | — | the site's one entrance gesture: rise + fade on the measured Collins curves | every page |

## Props

```jsx
<SectionHeader eyebrow="Working together" headline="…" lede="…"
               cta={{ label: 'Engagements', href: '/engagements' }}
               as="h2" width="two-thirds|half|full" />

<TitleBody title="…" body="…" emphasis="default|strong" />

<DividedRow columns={4} rule="vertical|horizontal">{…}</DividedRow>

<MediaPanel items={[{ src, alt }]} ratio="16 / 11" />

<RuledList items={['…','…']} leadingRule />
<PillLink label="Client name" href="#" />
<FloatingCollage items={[{ x, y, w, h, src, alt }]} />

<CarouselCard image={src} alt="…" note="…" />
<ClientLineList entries={[{ name, description, symbol }]} />

// Reveal — one element, or a group that staggers its children.
<Reveal as="section" delay={0}>…</Reveal>
<RevealGroup as="ul">
  <RevealItem as="li">…</RevealItem>
</RevealGroup>
```

`SectionHeader`'s `level` is the headline step: **4** on Home and Engagements,
**3** on every Studio section. Figma binds it per section, so it is a prop —
never something to infer from where the block sits.

`MediaPanel`'s `inset="tight"` is Studio's full-panel image, the one section
Figma sets at py-64 instead of py-128.

## Cards (not blocks — they compose blocks)

| Component | Figma | Notes |
|-----------|-------|-------|
| `ServiceCard` | `Article (Service Card)` 1651:1464 | full-width, 3-col: copy spans 2, media + client pills in the third |
| `ServiceListCard` | `Card wUnordered List` 1209:1675 | 384px card for the Services rail |

## Not yet migrated

`ExpertiseSection`, `EngagementsSection` and `WorkTeaser` each hand-roll the
SectionHeader stack with their own class names. They work and were left alone
deliberately. Migrating them to `SectionHeader` would remove three copies of the
same CSS — worth doing, but it is a refactor of shipped code, not a bug fix.

## Related, deliberately separate

`ClientLogoGrid` (bordered 4×2 panel, Contact), `ClientLineList` (ruled roster,
Studio) and `WorkTeaser`'s inline logo row are three different Figma components,
not duplicates of one. The first two in particular are easy to confuse — Studio
wants the line list, Contact the grid. All three equalise logo footprint the
same way: a fixed box plus `mask-size: contain`, so aspect ratio never changes
the cell.

## Checking the build against Figma

`python3 scripts/check-conformance.py` from `04_website` diffs the code against
the specs in `01_branding/figma-spec-*.md` — type steps, the places Figma breaks
its own rhythm, which block is used where, and the motion values. Run it after
touching any of this.
