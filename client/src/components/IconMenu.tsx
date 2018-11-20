import { IconButton, Menu } from "@material-ui/core";
import React from "react";
import { useCallback, useRef, useState } from "react";

/**
 * Icon Menu
 *
 * Displays the popup menu when icon is clicked.
 */
export const IconMenu = ({ icon, children }: any) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const toggle = useCallback((e: React.MouseEvent) => {
    const el = e.target as HTMLElement;

    setAnchorEl(isOpen => (isOpen ? null : el));
  }, []);

  return (
    <React.Fragment>
      <IconButton
        aria-label="More"
        aria-owns={open ? "long-menu" : undefined}
        aria-haspopup="true"
        onClick={toggle}
      >
        {icon}
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={anchorEl !== null}
        onClick={toggle}
        PaperProps={{
          // TODO: refactor
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
