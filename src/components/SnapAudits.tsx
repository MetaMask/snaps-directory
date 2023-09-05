import { Box, Link, Text } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';
import { useMemo } from 'react';

import { ExternalLink } from './ExternalLink';
import type { Fields } from '../utils';

export type SnapAuditsProps = {
  audits: Fields<Queries.SnapAudits, 'auditor' | 'report'>[];
};

type GroupedAudits = {
  [auditor: string]: string[];
};

/**
 * Group the audits by auditor. This is useful for displaying the audits in
 * groups.
 *
 * @param audits - The audits to group.
 * @returns The grouped audits.
 */
function getAudits(audits: Fields<Queries.SnapAudits, 'auditor' | 'report'>[]) {
  return audits.reduce<GroupedAudits>((result, { auditor, report }) => {
    const current = result[auditor];
    if (current) {
      return {
        ...result,
        [auditor]: [...current, report],
      };
    }

    return {
      ...result,
      [auditor]: [report],
    };
  }, {});
}

export const SnapAudits: FunctionComponent<SnapAuditsProps> = ({ audits }) => {
  const groupedAudits = useMemo(() => getAudits(audits), [audits]);

  return (
    <Box>
      {Object.entries(groupedAudits).map(([auditor, reports]) => {
        if (reports.length === 1) {
          return (
            <ExternalLink key={`auditor-${auditor}`} href={reports[0]}>
              {auditor}
            </ExternalLink>
          );
        }

        return (
          <Text key={`auditor-${auditor}`}>
            {auditor}
            {reports.map((report, index) => (
              <>
                {' '}
                <Link isExternal={true} key={`audit-report-${auditor}-${report}`} href={report}>
                  [{index + 1}]
                </Link>
              </>
            ))}
          </Text>
        );
      })}
    </Box>
  );
};
