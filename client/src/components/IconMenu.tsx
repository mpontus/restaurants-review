import { IconButton, Menu } from "@material-ui/core";
import React from "react";
import { useCallback, useState } from "react";
import { useGlobalId } from "../hooks/useGlobalId";

/**
 * Icon menu props
 */
interface Props {
  /**
   * Icon to toggle the menu open
   */
  icon: React.ReactNode;
}

/**
 * Icon Menu
 *
 * Displays the popup menu when icon is clicked.
 *
 * Should contain several MenuItem elements.
 */
export const IconMenu: React.SFC<Props> = ({ icon, children, ...rest }) => {
  const id = useGlobalId();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const toggle = useCallback((e: React.MouseEvent) => {
    const el = e.target as HTMLElement;

    setAnchorEl(isOpen => (isOpen ? null : el));
  }, []);

  return (
    <React.Fragment>
      <IconButton
        {...rest}
        aria-owns={anchorEl ? id : undefined}
        aria-haspopup="true"
        onClick={toggle}
      >
        {icon}
      </IconButton>
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={anchorEl !== null}
        onClick={toggle}
        PaperProps={{
          style: {
            width: 200
          }
        }}
      >
        {children}
      </Menu>
    </React.Fragment>
  );
};
