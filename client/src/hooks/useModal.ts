import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../components/ModalRoot";
import { useGlobalId } from "./useGlobalId";

/**
 * React hook to use modals in stateless components
 */
export const useModal = (Component: React.ComponentType<any>) => {
  const key = useGlobalId();
  const [shown, setShown] = useState(false);
  const { showModal, hideModal } = useContext(ModalContext);

  useEffect(
    () => {
      if (shown) {
        showModal(key, Component);
      } else {
        hideModal(key);
      }

      // Hide modal on parent component unmount
      return () => hideModal(key);
    },
    [shown]
  );

  return [() => setShown(true), () => setShown(false)];
};
