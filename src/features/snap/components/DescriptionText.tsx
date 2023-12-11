import type { TextProps } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import Linkify from 'linkify-react';
import type { IntermediateRepresentation } from 'linkifyjs';
import type { FunctionComponent } from 'react';

import { ExternalLink } from '../../../components';
import type { Fields } from '../../../utils';
import { getLinkText } from '../../../utils';

export type SnapDescriptionProps = TextProps & {
  description: Fields<Queries.SnapDescription, 'description' | 'trusted'>;
  allowLinks?: boolean;
};

/**
 * Render a link using the {@link ExternalLink} component.
 *
 * @param options - The options to render the link with.
 * @param options.attributes - The attributes of the link.
 * @param options.content - The content of the link.
 * @returns The rendered link.
 */
function render({ attributes, content }: IntermediateRepresentation) {
  const { href } = attributes;
  return <ExternalLink href={href}>{getLinkText(content)}</ExternalLink>;
}

export const DescriptionText: FunctionComponent<SnapDescriptionProps> = ({
  description,
  allowLinks = description.trusted,
  ...props
}) => {
  if (allowLinks) {
    return (
      <Linkify as={Text} options={{ render }} {...props}>
        {description.description}
      </Linkify>
    );
  }

  return (
    <Text whiteSpace="pre-wrap" {...props}>
      {description.description}
    </Text>
  );
};
