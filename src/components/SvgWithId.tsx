import { FC } from 'react';

interface SvgWithIdProps {
  path: string;
  id?: string;
}
/**
 * \@mdi/react/Icon does not pass the `id` prop through to the svg element.
 */
export const SvgWithId: FC<SvgWithIdProps> = ({ path, id }) => (
  <svg viewBox='0 0 24 24' role='presentation' id={id}>
    <path style={{ fill: 'currentcolor' }} d={path} />
  </svg>
)
