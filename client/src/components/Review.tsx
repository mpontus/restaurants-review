import {
  Button,
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
import { Rating } from "./Rating";

type ClassKey =
  | "root"
  | "header"
  | "actions"
  | "positive"
  | "negative"
  | "neutral";

interface Props extends WithStyles<ClassKey> {
  canReply?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  date: string;
  author: string;
  rating: number;
  comment: string;
  reply?: string;
  onReply?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const enhance = withStyles<ClassKey>(theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
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

export const BaseReview = (props: Props) => {
  const {
    classes,
    canReply = false,
    canEdit = false,
    canDelete = false,
    date,
    author,
    rating,
    comment,
    reply,
    onReply,
    onEdit,
    onDelete
  } = props;

  return (
    <Card className={classes.root}>
      <CardHeader
        disableTypography={true}
        className={classnames(props.classes.header, {
          [props.classes.positive]: props.rating > 3,
          [props.classes.negative]: props.rating < 3,
          [props.classes.neutral]: props.rating === 3
        })}
        action={<Rating value={rating} />}
        title={
          <Typography component="span" variant="body2">
            {author}
          </Typography>
        }
        subheader={
          <Typography component="span" variant="body2" color="textSecondary">
            {dayjs(date).format("DD/MM/YYYY")}
          </Typography>
        }
      />
      <CardContent>
        <Typography component="p">{comment}</Typography>
      </CardContent>
      {reply && (
        <CardContent>
          <Typography variant="subtitle2">Owner Replied:</Typography>
          <Typography component="p">{reply}</Typography>
        </CardContent>
      )}
      {(canReply || canEdit || canDelete) && (
        <CardActions disableActionSpacing={true} className={classes.actions}>
          {canReply && (
            <Button color="primary" onClick={onReply}>
              Reply
            </Button>
          )}
          {canEdit && (
            <Button color="primary" onClick={onEdit}>
              Edit
            </Button>
          )}
          {canDelete && (
            <Button color="primary" onClick={onDelete}>
              Delete
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

/**
 * Review Component with injected classes
 */
export const Review = enhance(BaseReview);
