import * as React from "react";
import Helmet from "react-helmet";

interface Props {
  title?: string;
}

export const DocumentTitle: React.SFC<Props> = ({ title, children }) => (
  <React.Fragment>
    <Helmet
      defaultTitle="Auth Boilerplate"
      titleTemplate="%s | Auth Boilerplate"
    >
      {title && <title>{title}</title>}
    </Helmet>
    {children}
  </React.Fragment>
);
