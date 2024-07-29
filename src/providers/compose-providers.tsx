import React from 'react';
import _ from 'lodash';

/**
 * Provided that a list of providers [P1, P2, P3, P4] is passed as props,
 * it renders
 *
 *    <P1>
        <P2>
          <P3>
            <P4>
              {children}
            </P4>
          </P3>
        </P2>
      </P1>
 *
 */

interface ComposeProvidersProps {
  Providers: Array<React.JSXElementConstructor<any>>;
  children: React.ReactNode;
}

export default function ComposeProviders({
  Providers,
  children,
}: ComposeProvidersProps) {
  if (_.isEmpty(Providers)) return children;

  return _.reverse(Providers).reduce((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, children);
}
