import dayjs from "dayjs";
import React from "react";
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  IconButton,
  Avatar,
  Typography,
  Button,
  WithStyles,
  withStyles
} from "@material-ui/core";
import { Rating } from "./Rating";

type ClassKey = "root" | "header" | "actions";

interface Props extends WithStyles<ClassKey> {
  canReply?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  date: string;
  author: string;
  rating: number;
  comment: string;
  reply: string;
  onReplyClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

const enhance = withStyles<ClassKey>(theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  header: {
    paddingBottom: 0
  },
  actions: {
    justifyContent: "flex-end",
    borderTop: `1px solid ${theme.palette.grey[200]}`
  }
}));

export const Review = enhance(
  ({
    classes,
    canReply = false,
    canEdit = false,
    canDelete = false,
    date,
    author,
    rating,
    comment,
    reply
  }: Props) => (
    <Card className={classes.root}>
      <CardHeader
        disableTypography={true}
        className={classes.header}
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
      {(canReply || canEdit || canDelete) && (
        <React.Fragment>
          {canReply && (
            <CardActions
              disableActionSpacing={true}
              className={classes.actions}
            >
              <Button color="primary">Reply</Button>
            </CardActions>
          )}
          {canEdit && (
            <CardActions
              disableActionSpacing={true}
              className={classes.actions}
            >
              <Button color="primary">Edit</Button>
            </CardActions>
          )}
          {canDelete && (
            <CardActions
              disableActionSpacing={true}
              className={classes.actions}
            >
              <Button color="primary">Delete</Button>
            </CardActions>
          )}
        </React.Fragment>
      )}
    </Card>
  )
);
