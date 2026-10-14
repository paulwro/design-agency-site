import './blocks.css';

/**
 * TitleBody — Figma "Step 1_Step 0" / "Step 0 (Strong)_Step 0"
 *
 * The smallest repeating unit on the interior pages: a short title above a
 * paragraph. `emphasis="strong"` renders the step-0 bold variant used in the
 * ruled lists; the default renders the step-1 variant used in columns.
 *
 * The two also differ in gap — Figma sets 16 on the step-1 pair and 4 on the
 * bold pair — which is handled in blocks.css, not here.
 */
export default function TitleBody({ title, body, emphasis = 'default' }) {
  return (
    <div className={`title-body title-body--${emphasis}`}>
      <p className="title-body__title">{title}</p>
      {body && <p className="title-body__body">{body}</p>}
    </div>
  );
}
