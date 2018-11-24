import {
  FormGroup,
  FormHelperText,
  Radio,
  RadioGroup,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  StarHalf as StarHalfIcon
} from "@material-ui/icons";
import React from "react";

/**
 * Custom class names
 */
type ClassKey = "root" | "row" | "star" | "caption";

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
    padding: theme.spacing.unit,
    paddingLeft: 0
  },
  row: {
    flexWrap: "nowrap"
  },
  star: {
    padding: 0
  },
  caption: {
    marginTop: theme.spacing.unit
  }
}));

/**
 * Star Rating Component
 *
 * Displays star rating and acts as an input.
 */
class BaseRating extends React.PureComponent<Props> {
  /**
   * Get N-th star icon
   */
  public getIcon = (n: number): React.ReactNode => {
    const filled = this.props.value - n + 1;

    if (filled < 0.25) {
      return <StarBorderIcon color="inherit" />;
    }

    if (filled < 0.75) {
      return <StarHalfIcon color="inherit" />;
    }

    return <StarIcon color="inherit" />;
  };

  /**
   * Render N-th star
   */
  public renderStar = (n: number): React.ReactNode => {
    const { classes, name } = this.props;

    return (
      <Radio
        className={classes.star}
        style={{
          // Overrides disabled color.
          color: "#FF9800"
        }}
        name={name}
        value={n}
        icon={this.getIcon(n)}
        disabled={this.props.onChange === undefined}
      />
    );
  };

  /**
   * Render component
   */
  public render() {
    const { classes, id, name, error, caption, onChange } = this.props;

    return (
      <FormGroup className={classes.root}>
        <RadioGroup
          className={classes.row}
          row={true}
          id={id}
          name={name}
          onChange={onChange}
        >
          {this.renderStar(1)}
          {this.renderStar(2)}
          {this.renderStar(3)}
          {this.renderStar(4)}
          {this.renderStar(5)}
        </RadioGroup>
        {caption && (
          <Typography
            variant="caption"
            align="center"
            className={classes.caption}
          >
            {caption}
          </Typography>
        )}
        {error && <FormHelperText error={true}>{error}</FormHelperText>}
      </FormGroup>
    );
  }
}

/**
 * Export styled rating component
 */
export const Rating = enhance(BaseRating);
