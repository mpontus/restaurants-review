import { ListSubheader } from "@material-ui/core";
import React from "react";

/**
 * Component props
 */
interface Props {
  /**
   * Section title
   */
  title: React.ReactNode;
}

/**
 * Section Component
 *
 * Helps split the page into distinct sections.
 */
export const Section: React.SFC<Props> = ({ title, children }) => (
  <div>
    <ListSubheader disableSticky={true}>{title}</ListSubheader>
    {children}
  </div>
);
