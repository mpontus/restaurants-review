import { Button as MaterialButton } from "@material-ui/core";
import * as React from "react";
import { Route } from "react-router";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  /**
   * Shortcut for using button as a link
   */
  link?: string;

  /**
   * Specifies that request is in progress and the button should be disabled
   */
  loading?: boolean;
}

/**
 * Generic button
 */
export const Button: React.SFC<Props> = props => {
  // Shortcut for creating a link as a button
  if (props.link) {
    const { link, ...rest } = props;

    return (
      <Route>
        {({ history }) =>
          Button({ ...rest, onClick: () => history.push(link) })
        }
      </Route>
    );
  } else {
    const { loading, className, ..._rest } = props;

    return <MaterialButton />;
  }
};
