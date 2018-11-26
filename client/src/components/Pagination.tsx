import { List as MaterialList } from "@material-ui/core";
import React from "react";
import { Button } from "./Button";

/**
 * Component props
 */
interface Props<T> {
  /**
   * Whether previous page exists
   */
  hasPrev: boolean;

  /**
   * Whether next page exists
   */
  hasNext: boolean;

  /**
   * Previous page button callback
   */
  onPrev: () => void;

  /**
   * Next page button callback
   */
  onNext: () => void;

  /**
   * Array of items to render
   */
  items: T[];

  /**
   * Renderer for each item
   */
  renderItem: (value: T) => React.ReactNode;
}

/**
 * Pagination Component
 *
 * Renders items using specified renderer and pagination controls.
 */
export function Pagination<T>({
  items,
  renderItem,
  hasPrev,
  hasNext,
  onNext,
  onPrev
}: Props<T>) {
  return (
    <React.Fragment>
      <MaterialList>{items.map(renderItem)}</MaterialList>
      <Button disabled={!hasPrev} onClick={onPrev}>
        Prev
      </Button>
      <Button disabled={!hasNext} onClick={onNext}>
        Next
      </Button>
    </React.Fragment>
  );
}
