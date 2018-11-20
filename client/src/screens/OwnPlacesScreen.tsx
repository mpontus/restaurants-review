import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem
} from "@material-ui/core";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon
} from "@material-ui/icons";
import React from "react";
import { ConfirmModal } from "../components/ConfirmModal";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { IconMenu } from "../components/IconMenu";
import { useModal } from "../components/ModalRoot";
import { PlaceFormModal } from "../components/PlaceFormModal";

// prettier-ignore
const places = [
  ["d3973942-133b-55e4-920e-7b0033ab9d38", "The Noodle Farmer", "1187 Weskut Ridge", 3.75],
  ["55b62c9d-d3f6-5973-80cc-ca2744b0c1a6", "The Honor Goat", "375 Uciwa Loop", 3.42],
  ["821ea0ca-77af-5dd5-a15f-176fd4ce23a2", "The Dairy Laguna", "332 Ruvow Path", 3.12],
  ["381424b3-ba66-5444-8d7a-a452071dc3b3", "The Bitter Window", "1253 Pusi Road", 1.29]
].map(([id, title, address, rating]) => ({  id,   title,  address,  rating: rating as number }));

export const PlaceListItem = ({ place, onDelete }: any) => {
  const [showConfirmModal, hideConfirmModal] = useModal(() => (
    <ConfirmModal
      title="Delete place?"
      confirmLabel="Delete place"
      onConfirm={hideConfirmModal}
      onCancel={hideConfirmModal}
    >
      Do you really want to delete <strong>{place.title}</strong>?
    </ConfirmModal>
  ));

  const initialValues = {
    title: place.title,
    address: place.address
  };

  const [showEditModal, hideEditModal] = useModal(() => (
    <PlaceFormModal
      title="Update Place"
      subtitle={
        <>
          Change <strong>{place.title}</strong> details.
        </>
      }
      initialValues={initialValues}
      submitLabel="Save Place"
      onSubmit={hideEditModal}
      onCancel={hideEditModal}
    />
  ));

  return (
    <ListItem key={place.id}>
      <ListItemText primary={place.title} secondary={place.address} />
      <ListItemSecondaryAction>
        <IconMenu icon={<MoreVertIcon />}>
          <MenuItem onClick={showEditModal}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText inset={true} primary="Edit" />
          </MenuItem>
          <MenuItem onClick={showConfirmModal}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText inset={true} primary="Delete" />
          </MenuItem>
        </IconMenu>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export const OwnPlacesScreen = () => {
  const [showCreateModal, hideCreateModal] = useModal(() => (
    <PlaceFormModal
      autoFocus={true}
      title="Add Restaurant"
      subtitle={<>Enter new place details.</>}
      submitLabel="Save Place"
      onSubmit={hideCreateModal}
      onCancel={hideCreateModal}
    />
  ));

  return (
    <React.Fragment>
      <List>
        {places.map(place => (
          <PlaceListItem key={place.id} place={place} />
        ))}
      </List>
      <FloatingActionButton
        icon={<AddIcon />}
        aria-label="Add Restaurant"
        onClick={showCreateModal}
      />
    </React.Fragment>
  );
};
