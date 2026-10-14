/**
 * FAQ content.
 *
 * Figma repeats one question across all three rows and designed only the
 * collapsed state, so there is no answer copy in the file. The first question
 * is FIGMA; the rest, and every answer, are DRAFT — written in the voice of
 * the real strings elsewhere in the file and waiting on Paul's approval.
 *
 * Four here rather than three: the strategic handoff doc calls for four on the
 * homepage, and the Figma frame is a repeating instance, not a fixed count.
 */
export const faqs = [
  {
    id: 'faq-1',
    question: 'How is this different from working with an agency?',   // FIGMA
    answer:
      'You work directly with the person doing the work. There is no account layer ' +
      'translating your brief and no junior team picking it up after the pitch. ' +
      'Decisions happen faster, the work stays consistent, and the engagement stays ' +
      'small enough to actually be flexible.',
  },
  {
    id: 'faq-2',
    question: 'What does a typical engagement look like?',
    answer:
      'Most start as a defined project — an identity, a website, a campaign system — ' +
      'and some continue as ongoing creative direction once the foundation is in ' +
      'place. The structure follows the problem rather than a fixed retainer.',
  },
  {
    id: 'faq-3',
    question: 'How do you work with our internal team?',
    answer:
      'Directly, in your tools and on your cadence — usually a shared channel and a ' +
      'standing review. For teams without a creative lead, that looks like senior ' +
      'direction plugged into the work you are already doing, not a separate track ' +
      'running alongside it.',
  },
  {
    id: 'faq-4',
    question: 'What happens when the work needs more hands?',
    answer:
      'Trusted specialists come in for the parts that genuinely need them — motion, ' +
      'development, photography. They work to the same standards, and you still have ' +
      'one person accountable for the whole.',
  },
];
