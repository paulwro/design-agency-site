#!/usr/bin/env python3
"""
Mechanical diff of the build against the Figma specs in 01_branding/.

Run from 04_website:   python3 scripts/check-conformance.py

These are the facts that were got wrong at least once and are cheap to assert:
type steps, the few places Figma departs from the usual rhythm, which block is
used where, and the motion values measured off wearecollins.com. It is not a
substitute for looking at the page — it is a tripwire for regressions that look
fine in isolation.

Comments are stripped before matching, so a rule explained in prose cannot make
a check pass on its own.
"""
import pathlib, re, sys

SRC = pathlib.Path(__file__).resolve().parent.parent / 'src'

def read(p, strip_comments=True):
    t = (SRC / p).read_text(encoding='utf-8')
    if strip_comments:
        t = re.sub(r'/\*.*?\*/', '', t, flags=re.S)        # /* ... */
        t = re.sub(r'\{\s*/\*.*?\*/\s*\}', '', t, flags=re.S)  # JSX {/* ... */}
    return t

checks = []
def check(name, cond, detail=''):
    checks.append((name, bool(cond), detail))

studio_jsx, studio_css = read('pages/Studio.jsx'), read('pages/Studio.css')
blocks_css, blocks_sh  = read('components/blocks/blocks.css'), read('components/blocks/SectionHeader.jsx')
eng_jsx, eng_css       = read('pages/Engagements.jsx'), read('pages/Engagements.css')
con_css, con_jsx       = read('pages/Contact.css'), read('pages/Contact.jsx')
cf_jsx, cf_css         = read('components/ContactForm/ContactForm.jsx'), read('components/ContactForm/ContactForm.css')
tokens, controls       = read('styles/tokens.css'), read('styles/controls.css')

# ---- Studio · figma-spec-studio.md -----------------------------------------
check('Studio: FAQs render before the arced carousel',
      studio_jsx.index('<FaqSection') < studio_jsx.index('<TestimonialSlider'))
check('Studio: step 4 on problem + capabilities, step 3 on who + how',
      studio_jsx.count('<SectionHeader') == 4 and studio_jsx.count('level={3}') == 2,
      f"{studio_jsx.count('<SectionHeader')} headers, {studio_jsx.count('level={3}')} at level 3 (who + how; problem and capabilities are step 4)")
check('Studio: full-panel image is py-64 at ratio 1184/779',
      'ratio="1184 / 779"' in studio_jsx and 'inset="tight"' in studio_jsx)
check('Studio: bio heading is the section step (step 4 on desktop, step 3 on a phone)',
      re.search(r'\.studio-bio__heading\s*\{[^}]*--step-section', studio_css, re.S))
check('Studio: headshot card pinned to Figma (name 20.4, role 16, "Design Principal")',
      re.search(r'\.studio-bio__role\s*\{[^}]*--step-card\)', studio_css, re.S)
      and re.search(r'\.studio-bio__name\s*\{[^}]*--step-card-title', studio_css, re.S)
      and "role: 'Design Principal'" in read('pages/studio-data.js'))
check('Studio: problem-statement lede is step 1 and 60% (soft)',
      re.search(r'\.studio-lede\s*\{[^}]*--step-1[^}]*--color-text-soft', studio_css, re.S))
check('Studio: client roster uses ClientLineList, not ClientLogoGrid',
      'ClientLineList' in studio_jsx and 'ClientLogoGrid' not in studio_jsx)
check('Studio: CarouselCard appears in both three-up sections',
      studio_jsx.count('<CarouselCard') == 2)
check('Studio: how-we-work box is radius 20 on --container',
      re.search(r'\.studio-steps\s*\{[^}]*border-radius:\s*20px[^}]*--color-container', studio_css, re.S))

# ---- shared blocks ----------------------------------------------------------
check('SectionHeader: level prop drives a step class',
      'section-header--step-${level}' in blocks_sh and '.section-header--step-3' in blocks_css)
check('TitleBody: default gap 16, strong gap 4',
      '.title-body--default { gap: var(--space-4); }' in blocks_css and
      '.title-body--strong { gap: var(--space-1); }' in blocks_css)
check('ClientLineList: description is opacity .8, not --color-text-muted',
      re.search(r'\.client-line-list__description\s*\{[^}]*opacity:\s*0\.8', blocks_css, re.S))
check('MediaPanel: tight inset is half the section inset',
      '.media-panel--tight { padding-block: calc(var(--section-inset) / 2); }' in blocks_css)

# ---- Engagements · figma-spec-engagements.md --------------------------------
check('Engagements: why-clients headline is level 3', 'level={3}' in eng_jsx)
check('Engagements: "Services we offer" is a step-3 headline',
      re.search(r'\.engagements-page__heading\s*\{[^}]*--step-3', eng_css, re.S))
check('Engagements: rail label inset 24',
      re.search(r'\.engagements-page__heading\s*\{[^}]*padding-inline:\s*var\(--space-6\)', eng_css, re.S))
check('Engagements: the 96 and 64 gap modifiers exist and are used',
      '--96 { gap: var(--rhythm-96); }' in eng_css and '--grid { gap: var(--rhythm-64); }' in eng_css
      and eng_jsx.count('engagements-page__section--96') == 2)

check('Engagements: price row alone is the contact link (not the whole card), with the slot-machine roll',
      "href = '/contact'" in read('components/ServiceCard/PriceCta.jsx')
      and '.price-cta::after' not in read('components/ServiceCard/PriceCta.css')
      and 'cursor: pointer' not in read('components/ServiceCard/ServiceCard.css')
      and 'margin: auto 0 0' in read('components/ServiceListCard/ServiceListCard.css')
      and 'price-cta__line--in' in read('components/ServiceCard/PriceCta.css')
      and '--ease-overshoot' in read('components/ServiceCard/PriceCta.css'))
check('Engagements: collage has scroll parallax and honours reduced motion',
      'useScroll' in read('components/blocks/FloatingCollage.jsx')
      and 'useReducedMotion' in read('components/blocks/FloatingCollage.jsx'))

# ---- Contact · figma-spec-contact.md ----------------------------------------
check('Contact: headline is step 5 with display tracking',
      re.search(r'\.contact__headline\s*\{[^}]*--step-5[^}]*--tracking-display', con_css, re.S))
check('Contact: headline-to-form gap is 96', 'margin: 0 0 var(--space-24);' in con_css)
check('Contact: 800/384 column ratio', 'minmax(0, 25fr) minmax(0, 12fr)' in con_css)
check('ContactForm: four full-width fields, no paired rows',
      cf_jsx.count('<FormField') == 4 and 'contact-form__row' not in cf_jsx)
check('ContactForm: the form is a bare stack, no container fill or padding',
      not re.search(r'\.contact-form\s*\{[^}]*(background|padding|border-radius)', cf_css, re.S))
check('ContactForm: field rules take Borders & Lines, not the container rule token',
      'border-bottom: 1px solid var(--color-border)' in read('components/FormField/FormField.css'))
check('ContactForm: submit is the radius-12 block, not the pill',
      re.search(r'\.contact-form__btn\s*\{[^}]*border-radius:\s*12px', cf_css, re.S)
      and 'btn-primary' not in cf_jsx)

# ---- motion · measured off wearecollins.com ---------------------------------
check('tokens: the three measured curves are present',
      all(t in tokens for t in ('--ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1)',
                                '--ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1)',
                                '--ease-in-out-sine: cubic-bezier(0.445, 0.05, 0.55, 0.95)')))
check('tokens: transform duration is 0.8s', '--dur-slow: 0.8s;' in tokens)
check('controls: button transform is dur-slow on expo',
      'transition: transform var(--dur-slow) var(--ease-out-expo)' in controls)
check('controls: the Engagements button carries the deeper shadow',
      '.btn-primary--deep:hover' in controls
      and 'btn-primary--deep' in read('components/EngagementsSection/EngagementsSection.jsx'))
check('reduced motion zeroes every duration token',
      all(f'{t}: 0.01ms' in tokens for t in
          ('--dur-slow', '--dur-color', '--dur-base', '--dur-fast', '--dur-reveal')))
check('Reveal: the JS curves match the CSS tokens',
      '[0.19, 1, 0.22, 1]' in read('components/blocks/Reveal.jsx')
      and '[0.445, 0.05, 0.55, 0.95]' in read('components/blocks/Reveal.jsx'))

# ---- motion hygiene ---------------------------------------------------------
# Every easing and duration in a component comes from tokens.css. A literal
# `0.2s ease` is the browser default wearing a costume, and it is how a build
# drifts back to feeling ordinary one component at a time.
literals = []
for f in sorted(SRC.rglob('*.css')):
    if f.name == 'tokens.css':
        continue
    body = re.sub(r'/\*.*?\*/', '', f.read_text(encoding='utf-8'), flags=re.S)
    # The reduced-motion block is exempt: zeroing a duration there is the point.
    body = re.sub(r'@media\s*\(prefers-reduced-motion.*', '', body, flags=re.S)
    # Only the `transition:` shorthand — not transition-delay / -duration.
    for m in re.finditer(r'transition:[^;]*;', body, re.S):
        decl = m.group(0)
        if re.search(r'\b\d*\.?\d+m?s\b', decl) and 'var(--dur' not in decl and '0s linear' not in decl:
            literals.append(f'{f.name}: {" ".join(decl.split())[:60]}')
        if re.search(r'cubic-bezier|\bease(-in|-out|-in-out)?\b', decl) and 'var(--ease' not in decl \
           and 'linear' not in decl and 'transition: none' not in decl:
            literals.append(f'{f.name}: {" ".join(decl.split())[:60]}')
check('no hardcoded durations or easings outside tokens.css',
      not literals, '; '.join(sorted(set(literals))[:3]))

check('--ease-soft is retired (every use had a better-matched curve)',
      '--ease-soft' not in tokens and not any('--ease-soft' in f.read_text(encoding='utf-8')
                                              for f in SRC.rglob('*.css')))
check('tokens: the quick tier exists for short travel',
      '--dur-quick: 0.5s;' in tokens and '--reveal-rise-sm: 18px;' in tokens)
check('Reveal: the two pace tiers match the token values',
      "quick: { rise: 18, move: 0.55, fade: 0.35, stagger: 0.045" in read('components/blocks/Reveal.jsx'))
check('ExpertiseSection: cards use the quick pace Figma asked for',
      'pace="quick"' in read('components/ExpertiseSection/ExpertiseSection.jsx'))
check('ExpertiseSection: card padding is Figma py-20 px-24',
      'padding: var(--space-5) var(--space-6);' in read('components/ExpertiseSection/ExpertiseSection.css'))
check('MenuOverlay: the link transition is declared once, including colour',
      len(re.findall(r'^\.menu-overlay__link \{', read('components/MenuOverlay/MenuOverlay.css'), re.M)) == 1
      and 'color var(--dur-color)' in read('components/MenuOverlay/MenuOverlay.css'))
check('reduced motion zeroes the quick tier too',
      all(f'{t}: 0.01ms' in tokens for t in ('--dur-quick', '--dur-reveal-sm'))
      and '--reveal-rise-sm: 0px;' in tokens)

# ---- responsive tiers -------------------------------------------------------
ff = read('components/FormField/FormField.css')
check('breakpoints: 3- and 4-up grids step down one tier at 1200',
      '@media (max-width: 1200px)' in blocks_css
      and '@media (max-width: 1200px)' in read('components/ExpertiseSection/ExpertiseSection.css')
      and '@media (max-width: 1200px)' in studio_css)
check('DividedRow: in two columns only the right-hand cell takes a rule',
      '.divided-row--vertical > *:nth-child(2n)' in blocks_css)
# Three across or one — never a middle 2-up tier that orphans the third card.
exp_css = read('components/ExpertiseSection/ExpertiseSection.css')
check('3-up grids never step through 2-up and orphan a card',
      'repeat(2, 1fr)' not in exp_css
      and '.studio-grid { grid-template-columns: repeat(2, 1fr); }' not in studio_css)
# Rules on a raised --container surface take --color-rule, because Figma's dark
# Borders & Lines (was #131313, now #2B2B2B) once sat darker than that surface and inverted into a
# groove. Rules on the page ground take Borders & Lines as authored. The form
# field is the only deliberate --color-border hairline.
container_rules = []
for f in sorted(SRC.rglob('*.css')):
    body = re.sub(r'/\*.*?\*/', '', f.read_text(encoding='utf-8'), flags=re.S)
    for m in re.finditer(r'border[a-z-]*:\s*1px solid var\(--color-border\)', body):
        if f.name != 'FormField.css':
            container_rules.append(f.name)
check('only the form field uses Borders & Lines directly; container rules use --color-rule',
      not container_rules, ', '.join(sorted(set(container_rules))))
faq_css = read('components/FaqSection/FaqSection.css')
check('FAQ hover: one gliding panel, the two rules around it fade, the rest dims (2026-10-22)',
      '--color-rule-strong' not in faq_css
      and '.faq-item.is-after-active::before { opacity: 0; }' in faq_css
      and 'var(--color-text-dim)' in faq_css
      and 'faq-panel' in read('components/FaqSection/FaqSection.jsx')
      and 'layoutId' not in read('components/FaqSection/FaqSection.jsx'))
check('Client logo grid: 200x87 cells, 240 artboards at 120%, rules drawn per cell so none cross',
      'aspect-ratio: 200 / 87' in read('components/ClientLogoGrid/ClientLogoGrid.css')
      and '.logo-cell::before' in read('components/ClientLogoGrid/ClientLogoGrid.css')
      and '.logo-cell::after' in read('components/ClientLogoGrid/ClientLogoGrid.css'))
check('layout: 1280 max, 24 → 32 gutter, 12px media radius tokens',
      '--container-max: 1280px' in tokens and '--container-gutter: clamp(1.5rem,' in tokens
      and '2rem);' in tokens and '--radius-media: 12px' in tokens)
check('contact submit is disabled until the form is complete',
      'disabled={!complete' in read('components/ContactForm/ContactForm.jsx'))
check('the submit button carries the gradient glow',
      '@keyframes glow-drift' in cf_css and '--glow-1' in tokens)
check('InfoCard email and phone use the shared .text-link underline (40% at rest)',
      'text-link' in read('components/InfoCard/InfoCard.jsx')
      and re.search(r'\.text-link::after \{[^}]*opacity: 0\.4', read('styles/controls.css'), re.S))
check('InfoCard keeps its container — only the form lost one',
      re.search(r'\.info-card\s*\{[^}]*--color-container', read('components/InfoCard/InfoCard.css'), re.S))
check('client tiles use a monogram, not a crushed wordmark',
      'client-line-list__monogram' in read('components/blocks/ClientLineList.jsx')
      and 'logo.svg' not in read('pages/studio-data.js'))
check('FormField: a <select> is excluded from the :placeholder-shown float',
      '.form-input:not(.form-input--select):not(:placeholder-shown) + .form-label' in ff)
check('FormField: no reserved air inflating the resting row past Figma 53',
      not re.search(r'\.form-field \{[^}]*padding-top', ff, re.S))
check('Studio: the column divider is segmented, per Figma 1378:1467',
      '.studio-steps__rules > span' in studio_css and 'column-gap: var(--space-8)' in studio_css)

# ---- content and assets -----------------------------------------------------
data_files = [f for f in SRC.rglob('*-data.js')]
leftover = [f.name for f in data_files if 'copy needed' in f.read_text(encoding='utf-8')]
check('no [copy needed] placeholder remains in any data file',
      not leftover, ', '.join(leftover))
check('the Icon_Arrow stand-in is gone — the real export is wired',
      "--arrow-right-src: url('../assets/arrow-right.svg')" in tokens
      and 'data:image/svg+xml' not in tokens)
for asset in ['assets/arrow-right.svg', 'assets/chevron-right.svg',
              'assets/social/linkedin.svg', 'assets/slack-mark.svg']:
    check(f'asset present: {asset}', (SRC / asset).exists())
check('CarouselCard badge is a dark disc with a light arrow, image radius 4, text 16 (Figma)',
      re.search(r'\.carousel-card__badge \{[^}]*background: var\(--color-text\)', blocks_css, re.S)
      and 'border-radius: var(--radius-card-media)' in blocks_css and 'font-size: var(--step-card);' in blocks_css
      and '.carousel-card__badge::after' in blocks_css)
check('InfoCard: email, phone, then location; no icon tile (gone from Figma 1074:1211)',
      'info-card__icon' not in read('components/InfoCard/InfoCard.jsx')
      and read('components/InfoCard/InfoCard.jsx').index('mailto:') < read('components/InfoCard/InfoCard.jsx').index('info-card__location'))
check('Studio bio uses the exported LinkedIn glyph',
      'studio-bio__social-mark' in read('pages/Studio.jsx')
      and '--linkedin-src' in studio_css)
check('Work has a real route instead of falling through to Home',
      "'/work':" in read('App.jsx') and 'replaceState' in read('App.jsx'))
check('News is gone: no route, no nav link, no menu promo',
      "news" not in re.sub(r'//.*', '', read('App.jsx') + read('components/Footer/Footer.jsx')
                           + read('components/MenuOverlay/MenuOverlay.jsx')).lower(),
      'a News reference is still in App, Footer or MenuOverlay')
check('Footer is rendered once, by App, and by no page',
      read('App.jsx').count('<Footer />') == 1
      and not any('Footer' in read(f'pages/{n}.jsx') for n in ('Home','Studio','Engagements','Contact','Upcoming')))
check('Step 0 runs 16 (phone) → 18 (desktop), and with one weight step 0 (strong) is just step 0',
      '--step-0:  clamp(1.0000rem' in tokens and '1.1250rem);' in tokens
      and re.search(r'--step-0-strong:\s*var\(--step-0\);', tokens))

# ---- type scale -------------------------------------------------------------
# Every font-size comes from the fluid scale. A literal px size is a size that
# will not respond to the viewport, which is the whole point of the clamps.
bare_sizes = []
for f in sorted(SRC.rglob('*.css')):
    body = re.sub(r'/\*.*?\*/', '', f.read_text(encoding='utf-8'), flags=re.S)
    for m in re.finditer(r'font-size:\s*([^;]+);', body):
        v = m.group(1).strip()
        if 'var(--step' in v or 'var(--mark-size' in v:
            continue
        bare_sizes.append(f'{f.name}: {v}')
check('every font-size comes from the fluid scale',
      not bare_sizes, '; '.join(sorted(set(bare_sizes))[:3]))
check('the PW wordmark is fluid, not pinned at its desktop size',
      re.search(r'--mark-size:\s*clamp\(', tokens))
check('the FAQ stacks before its answer column gets too narrow',
      '@media (max-width: 1030px)' in read('components/FaqSection/FaqSection.css'))
check('the engagement row label keeps its ratio, not its pixel width',
      'width: clamp(200px, 29%, 360px)' in read('components/EngagementsSection/EngagementsSection.css'))

check('testimonial cards carry no drop shadow',
      'box-shadow' not in read('components/TestimonialSlider/TestimonialSlider.css'))
check('testimonials: Bold-style drag track, brand colour on hover, Drag cursor; arc archived',
      'drag="x"' in read('components/TestimonialSlider/TestimonialSlider.jsx')
      and '.tsl-card:hover .tsl-card__bg { opacity: 1; }' in read('components/TestimonialSlider/TestimonialSlider.css')
      and '.tsl-cursor' in read('components/TestimonialSlider/TestimonialSlider.css')
      and not (SRC / 'components/TestimonialArcCarousel').exists()
      and all('<TestimonialSlider />' in read(f'pages/{n}.jsx') for n in ('Home', 'Studio')))
check('Home drops the video-and-text section (Figma 1015:966 annotation, 2026-10-22)',
      'ProblemDefinition' not in read('pages/Home.jsx'))

check('section-scale rhythm is fluid, not pinned at Figma desktop values',
      '--rhythm-64: clamp(' in tokens and '--rhythm-96: clamp(' in tokens
      and 'var(--rhythm-96)' in read('components/Hero/Hero.css'))
check('the phone gutter is 24 (Paul, 2026-10-20, superseding 20), 32 from 1440',
      '--container-gutter: clamp(1.5rem' in tokens)

# ---- 2026-10-20 system ------------------------------------------------------
all_css = '\n'.join(read(str(f.relative_to(SRC))) for f in SRC.rglob('*.css'))
check('one family: every font token is Neue Haas Unica, no Typekit',
      "--font-unica: 'Neue Haas Unica'" in tokens
      and 'var(--font-unica)' in tokens
      and 'typekit' not in (SRC.parent / 'index.html').read_text(encoding='utf-8'))
check('the self-hosted Regular is declared and preloaded',
      "url('/fonts/NeueHaasUnicaPro-Regular.woff2')" in read('styles/global.css')
      and (SRC.parent / 'public/fonts/NeueHaasUnicaPro-Regular.woff2').exists()
      and 'rel="preload" href="/fonts/NeueHaasUnicaPro-Regular.woff2"' in (SRC.parent / 'index.html').read_text(encoding='utf-8'))
check('one weight: no 500/600/700/bold anywhere, and no faux bold',
      not re.search(r'font-weight:\s*(500|600|700|bold)', all_css)
      and 'font-synthesis: none' in read('styles/global.css'))
check('ratio √1.5 at 390 → 1.289 at 1440: H1 44.1 → 64, body 16 → 18 (Bold Scandinavia desktop)',
      '--step-5:  clamp(2.7557rem, 2.2935rem + 1.8961vw, 4.0000rem)' in tokens
      and '--step-3:  clamp(1.8371rem' in tokens)
check('section headlines run step 3 (phone) → step 4 (desktop)',
      '--step-section: clamp(1.8371rem' in tokens and 'var(--step-4)' not in read('components/FaqSection/FaqSection.css')
      and 'var(--step-section)' in read('components/Footer/Footer.css'))
check('display steps carry −0.5% tracking, reading steps none',
      '--tracking-display: -0.005em' in tokens and '--tracking-strong: 0' in tokens)
check('2026-10-22 colours: page #F9F9F9 / #0F0F0F, container #FFFFFF / #1C1C1C, body copy 60%',
      '--color-background: #F9F9F9' in tokens and '--color-background: #0F0F0F' in tokens
      and '--color-container: #FFFFFF' in tokens and '--color-container: #1C1C1C' in tokens
      and '--color-text-muted: rgba(0, 0, 0, 0.6)' in tokens and '--color-text-muted: rgba(255, 255, 255, 0.6)' in tokens)
check('menu overlay dims its other links with its own token, not body-copy grey',
      'var(--color-text-dim)' in read('components/MenuOverlay/MenuOverlay.css')
      and '--color-text-dim: rgba(0, 0, 0, 0.4)' in tokens
      and '--color-border: #2E2E2E' in tokens and '--color-pill: #292929' in tokens)
check('dark buttons are charcoal (--btn-bg), not a white pill',
      '--btn-bg: var(--color-pill)' in tokens and 'background: var(--btn-bg)' in read('styles/controls.css')
      and 'background: var(--btn-bg)' in read('components/ContactForm/ContactForm.css'))
check('only Submit carries the moving gradient ring; pill buttons keep scale + shadow',
      '@property --btn-ring-angle' in read('styles/controls.css')
      and 'btn-ring' in read('components/ContactForm/ContactForm.jsx')
      and '.btn-primary::before' not in read('styles/controls.css')
      and '.footer-pill::before' not in read('components/Footer/Footer.css')
      and 'transform: scale(1.04)' in read('styles/controls.css'))

# ---- routing ----------------------------------------------------------------
all_src = '\n'.join(read(str(f.relative_to(SRC))) for f in SRC.rglob('*.js*'))
check('every internal href is a real path, not a hash route',
      not re.search(r'''href[=:]\s*[{"'`]+#/''', all_src))
check('the PW mark points at the home route', 'href="/"' in read('components/Navbar/Navbar.jsx'))

# ---- every var() resolves ---------------------------------------------------
defined = set()
for f in SRC.rglob('*.css'):
    defined |= {m.group(1) for m in re.finditer(r'(--[\w-]+)\s*:', f.read_text(encoding='utf-8'))}
for f in SRC.rglob('*.jsx'):
    defined |= {m.group(1) for m in re.finditer(r"'(--[\w-]+)'", f.read_text(encoding='utf-8'))}
unresolved = set()
for f in SRC.rglob('*.css'):
    for m in re.finditer(r'var\(\s*(--[\w-]+)\s*[,)]', f.read_text(encoding='utf-8')):
        if m.group(1) not in defined:
            unresolved.add(m.group(1))
check('every var() resolves to a defined custom property',
      not unresolved, ', '.join(sorted(unresolved)))

bad = [c for c in checks if not c[1]]
for n, ok, d in checks:
    print(('  PASS  ' if ok else '  FAIL  ') + n + (f'   [{d}]' if d and not ok else ''))
print(f"\n{len(checks) - len(bad)}/{len(checks)} passing")
sys.exit(1 if bad else 0)
