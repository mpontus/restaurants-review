import { ListSubheader } from "@material-ui/core";
import React from "react";

/**
 * Component props
 */
interface Props {
  /**
   * ID of the section header
   */
  id?: string;

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
export const Section: React.SFC<Props> = ({ id, title, children }) => (
  <div aria-labelledby={id}>
    <ListSubheader disableSticky={true} id={id}>
      {title}
    </ListSubheader>
    {children}
  </div>
);
