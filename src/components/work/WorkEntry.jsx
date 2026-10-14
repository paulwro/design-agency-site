import { Artifact, ArtifactDuo, Feature, Gallery, Story, Outcome } from './WorkModules';
import { CaseStudy } from './CaseStudy';

/**
 * One entry from work-data.js → one module. The `type` is the Figma component
 * name, so adding a layout means adding it here and to the data file's docs.
 */
const MODULES = {
  artifact: Artifact,
  'artifact-duo': ArtifactDuo,
  feature: Feature,
  gallery: Gallery,
  story: Story,
  outcome: Outcome,
  'case-study': CaseStudy,
};

export default function WorkEntry({ entry }) {
  const { type, id, ...props } = entry;
  const Module = MODULES[type];
  return Module ? <Module {...props} /> : null;
}
