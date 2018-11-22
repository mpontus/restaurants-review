import React from "react";
import { Button } from "./Button";

/**
 * Component Props
 */
interface Props {
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
}

/**
 * Pagination Controls component
 */
export const PaginationControls = ({
  hasPrev,
  hasNext,
  onNext,
  onPrev
}: Props) => (
  <React.Fragment>
    <Button disabled={!hasPrev} onClick={onPrev}>
      Prev
    </Button>
    <Button disabled={!hasNext} onClick={onNext}>
      Next
    </Button>
  </React.Fragment>
);
