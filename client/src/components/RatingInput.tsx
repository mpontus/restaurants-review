import {
  FormGroup,
  FormHelperText,
  Radio,
  RadioGroup,
  withStyles,
  WithStyles
} from "@material-ui/core";
import React from "react";
import { RatingStatic } from "./RatingStatic";

/**
 * Custom class names
 */
type ClassKey = "root" | "row" | "radio";

/**
 * Rating Component Props
 */
interface Props extends WithStyles<ClassKey> {
  /**
   * Element id
   */
  id?: string;

  /**
   * Input name
   */
  name?: string;

  /**
   * Current value
   */
  value: any;

  /**
   * Caption
   */
  caption?: React.ReactNode;

  /**
   * Form error
   */
  error?: React.ReactNode;

  /**
   * Blur callback
   */
  onBlur?: (e: any) => void;

  /**
   * Change callback
   */
  onChange?: (e: React.ChangeEvent<any>) => void;
}

/**
 * Styling enhancer for rating component
 */
const enhance = withStyles<ClassKey>(theme => ({
  root: {
    padding: `${theme.spacing.unit}px 0`
  },
  row: {
    flexWrap: "nowrap"
  },
  radio: {
    color: theme.palette.secondary.main,
    padding: 0
  }
}));

/**
 * Rating Input Component
 *
 * This component several material-ui elements to make rating input
 * accessible and interactive. It does however make this component
 * very slow to render.
 *
 * To optimize rendering performance where interactivity is not
 * needed, the layout part of this component was extracted into
 * RatingStatic, which exposes customization props to enable its use
 * as an input component.
 */
class BaseRatingInput extends React.PureComponent<Props> {
  /**
   * Render root component
   *
   * This is a form group that may contain form error.
   */
  public renderContainer: React.SFC = ({ children }) => (
    <FormGroup className={this.props.classes.root}>{children}</FormGroup>
  );

  /**
   * Render caption
   *
   * If caption is rendered, then it is an error. Use standard form
   * error component from material-ui.
   */
  public renderCaption: React.SFC = ({ children }) => (
    <FormHelperText error={true}>{children}</FormHelperText>
  );

  /**
   * Render container for stars
   */
  public renderRow: React.SFC = ({ children }) => (
    <RadioGroup
      row={true}
      className={this.props.classes.row}
      id={this.props.id}
      name={this.props.name}
      onChange={this.props.onChange}
    >
      {children}
    </RadioGroup>
  );

  /**
   * Render individual star
   *
   * RadioGroup expects its children to be Radio buttons and injects
   * the props necessary to forward onChange calls to its consumer.
   *
   * We expect the injected props to be all that remains after we
   * extract the known props.
   */
  public renderStar: React.SFC<{
    value: number;
  }> = ({ value, children, ...rest }) => {
    return (
      <Radio
        {...rest}
        className={this.props.classes.radio}
        name={this.props.name}
        value={value}
        icon={children}
        aria-label={`${value} stars`}
      />
    );
  };

  /**
   * Render component
   */
  public render() {
    return (
      <RatingStatic
        containerComponent={this.renderContainer}
        captionComponent={this.renderCaption}
        rowComponent={this.renderRow}
        starComponent={this.renderStar}
        value={this.props.value}
        caption={this.props.error}
      />
    );
  }
}

/**
 * Export styled rating component
 */
export const RatingInput = enhance(BaseRatingInput);
