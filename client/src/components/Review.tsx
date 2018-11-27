import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  WithStyles,
  withStyles
} from "@material-ui/core";
import classnames from "classnames";
import dayjs from "dayjs";
import React from "react";
import { Review as ReviewModel } from "../models/Review";
import { RatingStatic } from "./RatingStatic";

/**
 * Custom class names
 */
type ClassKey =
  | "root"
  | "header"
  | "actions"
  | "positive"
  | "negative"
  | "neutral";

/**
 * Component props
 */
interface Props extends WithStyles<ClassKey> {
  /**
   * Review object
   */
  review: ReviewModel;

  /**
   * Action buttons to interact with the review
   */
  actions?: React.ReactNode;
}

/**
 * Component enhancer to apply custom styles
 */
const enhance = withStyles<ClassKey>(theme => ({
  root: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  positive: {
    borderTop: `4px solid #81c784`
  },
  negative: {
    borderTop: `4px solid #e57373`
  },
  neutral: {
    borderTop: `4px solid #e0e0e0`
  },
  header: {
    backgroundColor: theme.palette.grey[50]
  },
  actions: {
    justifyContent: "flex-end",
    borderTop: `1px solid ${theme.palette.grey[200]}`
  }
}));

/**
 * Review Component
 *
 * Displays single review as a Card.
 */
export const BaseReview = ({ classes, review, actions }: Props) => {
  return (
    <Card className={classes.root}>
      <CardHeader
        disableTypography={true}
        className={classnames(classes.header, {
          [classes.positive]: review.rating > 3,
          [classes.negative]: review.rating < 3,
          [classes.neutral]: review.rating === 3
        })}
        action={
          <RatingStatic
            value={review.rating}
            caption={`Rating: ${review.rating}`}
          />
        }
        title={
          <Typography component="span" variant="body2">
            {review.author.name}
          </Typography>
        }
        subheader={
          <Typography component="span" variant="body2" color="textSecondary">
            {dayjs(review.dateVisitted).format("DD/MM/YYYY")}
          </Typography>
        }
      />
      <CardContent>
        <Typography component="p">{review.comment}</Typography>
      </CardContent>
      {review.reply && (
        <CardContent>
          <Typography variant="subtitle2">Owner Replied:</Typography>
          <Typography component="p">{review.reply}</Typography>
        </CardContent>
      )}
      {actions && (
        <CardActions disableActionSpacing={true} className={classes.actions}>
          {actions}
        </CardActions>
      )}
    </Card>
  );
};

/**
 * Export enhanced component
 */
export const Review = enhance(BaseReview);
