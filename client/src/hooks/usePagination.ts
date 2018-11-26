import React, { useState, useCallback } from "react";
import { useModal } from "../components/ModalRoot";

/**
 * Shows modal which closes when the second argument becomes true.
 */
export const usePagination = (
  initialPage: number
): [number, () => void, () => void] => {
  const [page, setPage] = useState(initialPage);
  const prevPage = useCallback(() => setPage(page => page - 1), []);
  const nextPage = useCallback(() => setPage(page => page + 1), []);

  return [page, prevPage, nextPage];
};
