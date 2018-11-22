import { List as MaterialList } from "@material-ui/core";
import React from "react";

/**
 * Component props
 */
interface Props<T> {
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
 * List Component
 *
 * Allows item renderer to be injected from parent component.
 */
export function List<T>({ items, renderItem }: Props<T>) {
  return <MaterialList>{items.map(renderItem)}</MaterialList>;
}
