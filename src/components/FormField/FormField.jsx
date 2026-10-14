import { useState } from 'react';
import './FormField.css';

/**
 * Form controls — Figma Contact page 1074:849
 *   Form Field  1074:1076   Dropdown  1074:1087   radio btn option  1401:1529
 *
 * Float-label behaviour is carried over from the previous site
 * (Website/src/index.css), translated from Tailwind @apply to plain CSS:
 * the label rests inside the field, then rises and shrinks on focus or once
 * the field holds a value. The rule is CSS-only for inputs and textareas via
 * :placeholder-shown — which is why every control ships placeholder=" ".
 * <select> can't use that pseudo-class, so it carries data-has-value instead.
 */

/** Figma "Form Field wError Message" 1735:1822: the message sits 12 below the field, step -2, in --error. */
function FieldError({ id, error }) {
  if (!error) return null;
  return (
    <p className="form-field__error" id={`${id}-error`} role="alert">
      {error}
    </p>
  );
}

export function FormField({
  id,
  label,
  type = 'text',
  textarea = false,
  rows = 4,
  required = false,
  autoComplete,
  error,
  ...rest
}) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div className="form-field">
      <Tag
        id={id}
        name={id}
        className={`form-input${textarea ? ' form-input--textarea' : ''}`}
        type={textarea ? undefined : type}
        rows={textarea ? rows : undefined}
        placeholder=" "
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <FieldError id={id} error={error} />
    </div>
  );
}

export function FormSelect({
  id,
  label,
  options = [],
  required = false,
  error,
  onChange,
  ...rest
}) {
  const [hasValue, setHasValue] = useState(false);
  return (
    <div className="form-field form-field--select">
      <select
        id={id}
        name={id}
        className="form-input form-input--select"
        defaultValue=""
        required={required}
        data-has-value={hasValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => {
          setHasValue(e.target.value !== '');
          onChange?.(e);
        }}
        {...rest}
      >
        <option value="" disabled />
        {options.map((o) => {
          const value = typeof o === 'string' ? o : o.value;
          const text = typeof o === 'string' ? o : o.label;
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <span className="form-field__chevron" aria-hidden="true" />
      <FieldError id={id} error={error} />
    </div>
  );
}

export function RadioGroup({ name, legend, options = [], value, onChange }) {
  return (
    <fieldset className="radio-group">
      <legend className="radio-group__legend">{legend}</legend>
      <div className="radio-group__options">
        {options.map((o) => {
          const val = typeof o === 'string' ? o : o.value;
          const text = typeof o === 'string' ? o : o.label;
          return (
            <label className="radio-option" key={val}>
              <input
                type="radio"
                name={name}
                value={val}
                checked={value !== undefined ? value === val : undefined}
                onChange={onChange ? () => onChange(val) : undefined}
              />
              <span className="radio-option__dot" aria-hidden="true" />
              <span className="radio-option__text">{text}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default FormField;
