import React from "react";

/**
 * Rating component props
 */
interface Props {
  /**
   * Rating value
   */
  value: number;
}

/**
 * Displays star rating
 */
export const Rating = ({ value }: Props) => <div>Rating: {value}</div>;
