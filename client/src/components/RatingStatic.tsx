import { Typography, withStyles, WithStyles } from "@material-ui/core";
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
   * Current value
   */
  value: any;

  /**
   * Caption
   */
  caption?: React.ReactNode;

  /**
   * Container Component
   *
   * Controls the root component used in rendering.
   */
  containerComponent?: React.ComponentType<{
    className?: string;
  }>;

  /**
   * Container Component
   *
   * Controls the component used to render the caption.
   */
  captionComponent?: React.ComponentType<{
    className?: string;
    variant?: string;
    align?: string;
  }>;

  /**
   * Row Component
   *
   * Controls the component used to render the container for stars.
   */
  rowComponent?: React.ComponentType<{
    className?: string;
  }>;

  /**
   * Container Component
   *
   * Controls the component used to render each individual star.
   */
  starComponent?: React.ComponentType<{
    value: number;
    className?: string;
  }>;
}

/**
 * Styling enhancer for rating component
 */
const enhance = withStyles<ClassKey>(theme => ({
  root: {
    display: "inline-block",
    padding: theme.spacing.unit
  },
  row: {
    display: "flex",
    flexWrap: "nowrap"
  },
  star: {
    color: theme.palette.secondary.main
  },
  caption: {
    marginTop: theme.spacing.unit
  }
}));

/**
 * Static Rating Component
 *
 * Rendering rating component is critical for performance, as there
 * could be multiple of those components on a single page.
 *
 * To optimize the performance, the layout of rating component was
 * extracted into this component which uses the minimum of material-ui
 * features, and exposes props which allow rating input to reuse
 * star-rating layout while substituting its own dynamic components.
 *
 * See RatingInput component for details.
 */
class BaseRatingStatic extends React.PureComponent<Props> {
  /**
   * Get N-th star icon
   */
  public getIcon = (value: number): React.ReactNode => {
    const filled = this.props.value - value + 1;

    if (filled < 0.25) {
      return <StarBorderIcon color="inherit" />;
    }

    if (filled < 0.75) {
      return <StarHalfIcon color="inherit" />;
    }

    return <StarIcon color="inherit" />;
  };

  /**
   * Render component
   */
  public render() {
    const {
      classes,
      caption,
      containerComponent: ContainerComponent = "div",
      captionComponent: CaptionComponent = Typography,
      rowComponent: RowComponent = "div",
      starComponent: StarComponent = "span"
    } = this.props;

    return (
      <ContainerComponent className={classes.root}>
        <RowComponent className={classes.row}>
          <StarComponent
            className={classes.star}
            value={1}
            children={this.getIcon(1)}
          />
          <StarComponent
            className={classes.star}
            value={2}
            children={this.getIcon(2)}
          />
          <StarComponent
            className={classes.star}
            value={3}
            children={this.getIcon(3)}
          />
          <StarComponent
            className={classes.star}
            value={4}
            children={this.getIcon(4)}
          />
          <StarComponent
            className={classes.star}
            value={5}
            children={this.getIcon(5)}
          />
        </RowComponent>
        <CaptionComponent
          variant="caption"
          align="center"
          className={classes.caption}
        >
          {caption}
        </CaptionComponent>
      </ContainerComponent>
    );
  }
}

/**
 * Export styled rating component
 */
export const RatingStatic = enhance(BaseRatingStatic);
