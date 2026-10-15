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
      studio_jsx.index('<FaqSection') < studio_jsx.index('<TestimonialArcCarousel'))
check('Studio: every SectionHeader is level 3',
      studio_jsx.count('<SectionHeader') == studio_jsx.count('level={3}'),
      f"{studio_jsx.count('<SectionHeader')} headers vs {studio_jsx.count('level={3}')} level-3")
check('Studio: full-panel image is py-64 at ratio 1184/779',
      'ratio="1184 / 779"' in studio_jsx and 'inset="tight"' in studio_jsx)
check('Studio: bio heading is step 4 (Figma names the group "Step 3")',
      re.search(r'\.studio-bio__heading\s*\{[^}]*--step-4', studio_css, re.S))
check('Studio: bio role is step 0, not step -1',
      re.search(r'\.studio-bio__role\s*\{[^}]*--step-0', studio_css, re.S))
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
check('Engagements: the 96 and 24 gap modifiers exist and are used',
      '--96 { gap: var(--rhythm-96); }' in eng_css and '--grid { gap: var(--space-6); }' in eng_css
      and eng_jsx.count('engagements-page__section--96') == 2)

check('Engagements: price row is a stretched contact link with the slot-machine roll',
      "href = '/contact'" in read('components/ServiceCard/PriceCta.jsx')
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
check('FAQ rules do not light up; hover slides the copy in with no background fill',
      '--color-rule-strong' not in faq_css
      and re.search(r'\.faq-question:hover[^{]*\{[^}]*padding-inline:\s*28px', faq_css, re.S)
      and not re.search(r'\.faq-question:hover[^{]*\{[^}]*background', faq_css, re.S))
check('Client logo grid: 200x87 cells, 240 artboards at 120%, rules drawn per cell so none cross',
      'aspect-ratio: 200 / 87' in read('components/ClientLogoGrid/ClientLogoGrid.css')
      and '.logo-cell::before' in read('components/ClientLogoGrid/ClientLogoGrid.css')
      and '.logo-cell::after' in read('components/ClientLogoGrid/ClientLogoGrid.css'))
check('layout: 1280 max, 32px gutter, 12px media radius tokens',
      '--container-max: 1280px' in tokens and 'clamp(24px, 2.223vw, 32px)' in tokens
      and '--radius-media: 12px' in tokens)
check('contact submit is disabled until the form is complete',
      'disabled={!complete' in read('components/ContactForm/ContactForm.jsx'))
check('the submit button carries the gradient glow',
      '@keyframes glow-drift' in cf_css and '--glow-1' in tokens)
check('InfoCard email and phone use the shared .text-link underline (60%)',
      'text-link' in read('components/InfoCard/InfoCard.jsx')
      and 'opacity: 0.6' in read('styles/controls.css'))
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
check('CarouselCard badge is a light disc with a dark arrow, per Figma',
      re.search(r'\.carousel-card__badge \{[^}]*background: var\(--color-background\)', blocks_css, re.S)
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
check('Step 0 is a flat 16 and step 0 (strong) is 17',
      re.search(r'--step-0:\s*1rem;', tokens) and re.search(r'--step-0-strong:\s*1\.0625rem;', tokens))

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
      'box-shadow' not in read('components/TestimonialArcCarousel/TestimonialArcCarousel.css'))

check('section-scale rhythm is fluid, not pinned at Figma desktop values',
      '--rhythm-64: clamp(' in tokens and '--rhythm-96: clamp(' in tokens
      and 'var(--rhythm-96)' in read('components/Hero/Hero.css'))
check('the phone gutter is 24, matching the reference',
      '--container-gutter: clamp(24px' in tokens)

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
