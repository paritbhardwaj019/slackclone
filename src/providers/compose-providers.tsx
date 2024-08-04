import React from 'react';
import _ from 'lodash';

/**
 * Provided that a list of providers [{ component: P1, props: props1 }, { component: P2, props: props2 } is passed as props, it renders
 *
 *    <P1 {...props1}>
        <P2 {...props2}>
          <P3 {...props3}>
            <P4 {...props4}>
              {children}
            </P4>
          </P3>
        </P2>
      </P1>
 *
 * Each provider component can receive its respective props, enabling customization of the wrapped components.
 */

interface ComposeProvidersProps {
  Providers: Array<{
    component: React.JSXElementConstructor<any>;
    props?: object;
  }>;
  children: React.ReactNode;
}

export default function ComposeProviders({
  Providers,
  children,
}: ComposeProvidersProps) {
  if (_.isEmpty(Providers)) return children;

  return _.reverse(Providers).reduce((acc, { component: Provider, props }) => {
    return <Provider {...props}>{acc}</Provider>;
  }, children);
}
