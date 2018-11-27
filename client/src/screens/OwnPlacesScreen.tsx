import React from "react";
import { Action } from "../components/Action";
import { DocumentTitle } from "../components/DocumentTitle";
import { Heading } from "../components/Heading";
import { Loading } from "../components/Loading";
import { Pagination } from "../components/Pagination";
import { Subheading } from "../components/Subheading";
import { PlaceContainer } from "../containers/PlaceContainer";
import { PlaceFormModalContainer } from "../containers/PlaceFormModalContainer";
import { PlaceListProvider } from "../containers/PlaceListProvider";
import { useModal } from "../hooks/useModal";
import { usePagination } from "../hooks/usePagination";

/**
 * Own Places Screen
 *
 * Displays a list of user's own restaurants.
 */
export const OwnPlacesScreen = () => {
  const [currentPage, onPrevPage, onNextPage] = usePagination(0);
  const [showCreateModal, hideCreateModal] = useModal(() => (
    <PlaceFormModalContainer onCancel={hideCreateModal} />
  ));

  return (
    <DocumentTitle title="Restaurant Management">
      <Heading>Restaurant Management</Heading>
      <Subheading>
        This page lists your own restaurants. You can create new restaurants
        from this page.
      </Subheading>
      <Action onClick={showCreateModal}>Create Restaurant</Action>
      <PlaceListProvider
        own={true}
        currentPage={currentPage}
        loadingPlaceholder={<Loading />}
      >
        {({ ids, hasNextPage, hasPrevPage }) => (
          <Pagination
            items={ids}
            renderItem={id => (
              <PlaceContainer key={id} showActions={true} id={id} />
            )}
            hasNext={hasNextPage}
            hasPrev={hasPrevPage}
            onNext={onNextPage}
            onPrev={onPrevPage}
          />
        )}
      </PlaceListProvider>
    </DocumentTitle>
  );
};
