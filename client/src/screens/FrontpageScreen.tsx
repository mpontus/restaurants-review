import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { formatRoute } from "react-router-named-routes";
import { Rating } from "../components/Rating";
import * as routes from "../routes";

const items = [
  [
    "d3973942-133b-55e4-920e-7b0033ab9d38",
    "The Noodle Farmer",
    "1187 Weskut Ridge",
    3.75
  ],
  [
    "55b62c9d-d3f6-5973-80cc-ca2744b0c1a6",
    "The Honor Goat",
    "375 Uciwa Loop",
    3.42
  ],
  [
    "821ea0ca-77af-5dd5-a15f-176fd4ce23a2",
    "The Dairy Laguna",
    "332 Ruvow Path",
    3.12
  ],
  [
    "381424b3-ba66-5444-8d7a-a452071dc3b3",
    "The Bitter Window",
    "1253 Pusi Road",
    0.29
  ]
].map(([id, title, address, rating]) => ({
  id,
  title,
  address,
  rating: rating as number
}));

export const FrontpageScreen = () => {
  return (
    <List>
      {items.map(item => (
        <ListItem
          button={true}
          key={item.id}
          component={({ innerRef, ...rest }) => (
            <Link
              to={formatRoute(routes.PLACE_DETAILS, { id: item.id })}
              {...rest}
            />
          )}
        >
          <ListItemText primary={item.title} secondary={item.address} />
          <Rating value={item.rating} />
        </ListItem>
      ))}
    </List>
  );
};
