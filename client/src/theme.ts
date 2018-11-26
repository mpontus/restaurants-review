import { createMuiTheme } from "@material-ui/core";
import orange from "@material-ui/core/colors/orange";

/**
 * Material UI theme
 */
export const theme = createMuiTheme({
  palette: {
    type: "light",
    secondary: orange,
    background: {
      default: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  }
});
