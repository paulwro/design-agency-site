import { useState } from 'react';
import { motion } from 'framer-motion';
import { RevealGroup, RevealItem } from '../blocks/Reveal';
import { FormField, FormSelect, RadioGroup } from '../FormField/FormField';
import './ContactForm.css';

/**
 * ContactForm — Figma 1074:851
 *
 * Figma 1074:1075 is the authority on the field list: four full-width text
 * fields, three dropdowns and the budget radios — not the paired rows the
 * previous site used. The box itself (--container at radius 20, px-32 pt-24
 * pb-32, gap-32) is part of this component, not the page.
 *
 * Formspree endpoint confirmed current by Paul 2026-10-06. The site runs a
 * SINGLE contact form now — the previous build split inquiries across several
 * forms by engagement type, and that split is deliberately gone.
 */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maqvjbra';

const BUDGETS = ['$20k & under', '$20k – $50k', '$50k – $100k', '$100k+'];

const INTERESTS = ['Goals as a service', 'Sprints', 'Integrated partnership'];

const TIMELINES = [
  { value: 'ASAP', label: 'As soon as possible' },
  { value: '1 month', label: 'Within 1 month' },
  { value: '1-3 months', label: '1–3 months' },
  { value: '3-6 months', label: '3–6 months' },
  { value: 'Exploring', label: 'Just exploring' },
];

const REFERRALS = ['Referral', 'LinkedIn', 'Search', 'Instagram', 'Past client', 'Other'];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Everything is required except the project description. There are no
 * asterisks: the submit button simply stays inactive until every required
 * field is valid. A field shows its message (Figma 1735:1822, in --error) once
 * it has been visited and left wrong — never before.
 */
const RULES = {
  name: (v) => (v.trim() ? '' : 'Please enter your name.'),
  email: (v) =>
    !v.trim()
      ? 'Please enter your email address.'
      : EMAIL.test(v.trim())
        ? ''
        : 'That doesn’t look like an email address.',
  company: (v) => (v.trim() ? '' : 'Please enter your company name.'),
  interest: (v) => (v ? '' : 'Please choose one.'),
  budget: (v) => (v ? '' : 'Please choose a budget range.'),
  timeline: (v) => (v ? '' : 'Please choose one.'),
  referral: (v) => (v ? '' : 'Please choose one.'),
};

const EMPTY = {
  name: '',
  email: '',
  company: '',
  interest: '',
  budget: '',
  timeline: '',
  referral: '',
};

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const errors = Object.fromEntries(Object.entries(RULES).map(([k, rule]) => [k, rule(values[k])]));
  const complete = Object.values(errors).every((m) => !m);

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));
  const touch = (key) => () => setTouched((t) => ({ ...t, [key]: true }));
  const shown = (key) => (touched[key] ? errors[key] : '');
  const bind = (key) => ({
    value: values[key],
    onChange: set(key),
    onBlur: touch(key),
    error: shown(key),
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!complete) return;
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <motion.p
        className="contact-form__success"
        role="status"
        initial={{ opacity: 0, y: 14 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            opacity: { duration: 0.5, ease: [0.445, 0.05, 0.55, 0.95] },
            y: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
          },
        }}
      >
        Thanks — we got it. You&rsquo;ll hear from us directly within 2 business days.
      </motion.p>
    );
  }

  return (
    <RevealGroup as="form" pace="quick" amount={0.1} className="contact-form" onSubmit={handleSubmit} noValidate>
      <RevealItem><FormField id="name" label="Name" autoComplete="name" {...bind('name')} /></RevealItem>
      <RevealItem><FormField id="email" label="Email" type="email" autoComplete="email" {...bind('email')} /></RevealItem>
      <RevealItem><FormField id="company" label="Company" autoComplete="organization" {...bind('company')} /></RevealItem>
      <RevealItem><FormSelect id="interest" label="I’m interested in..." options={INTERESTS} {...bind('interest')} /></RevealItem>
      <RevealItem><FormField id="projectDescription" label="Project description" textarea /></RevealItem>

      <RevealItem>
      <RadioGroup
        name="budget"
        legend="What's your budget?"
        options={BUDGETS}
        value={values.budget}
        onChange={(val) => setValues((v) => ({ ...v, budget: val }))}
      />
      </RevealItem>

      <RevealItem><FormSelect id="timeline" label="How soon would you like to start?" options={TIMELINES} {...bind('timeline')} /></RevealItem>
      <RevealItem><FormSelect id="referral" label="How did you hear about us?" options={REFERRALS} {...bind('referral')} /></RevealItem>

      {/* Figma 1074:1090 — a full-width block at radius 12, not the pill
          .btn-primary used everywhere else. Inactive until the form is complete. */}
      <RevealItem className="contact-form__submit">
        <button
          type="submit"
          className="contact-form__btn"
          disabled={!complete || status === 'sending'}
        >
          {status === 'sending' ? 'Sending…' : 'Submit'}
        </button>
      </RevealItem>

      {status === 'error' && (
        <motion.p
          className="contact-form__error"
          role="alert"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }}
        >
          That didn&rsquo;t send. Try again, or email hello@paulwro.com directly.
        </motion.p>
      )}
    </RevealGroup>
  );
}
