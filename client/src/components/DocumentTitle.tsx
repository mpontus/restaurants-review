import React from "react";
import ReactDocumentTitle from "react-document-title";

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
  <ReactDocumentTitle
    title={title ? `${title} | Restaurant Reviews` : "Restaurant Reviews"}
  >
    <React.Fragment>{children}</React.Fragment>
  </ReactDocumentTitle>
);
