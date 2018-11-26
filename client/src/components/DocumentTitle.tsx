import * as React from "react";
import Helmet from "react-helmet";

/**
 * Component Props
 */
interface Props {
  /**
   * Title text
   *
   * Can be left undefined to revert to default title.
   */
  title?: string;
}

/**
 * Document Title Component
 *
 * Updates document title when rendered
 */
export const DocumentTitle: React.SFC<Props> = ({ title, children }) => (
  <React.Fragment>
    <Helmet
      defaultTitle="Restaurant Reviews"
      titleTemplate="%s | Restaurant Reviews"
    >
      {title && <title>{title}</title>}
    </Helmet>
    {children}
  </React.Fragment>
);
