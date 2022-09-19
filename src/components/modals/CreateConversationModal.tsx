import React, { createRef, Dispatch, KeyboardEvent, useEffect } from "react";
import { CreateConversationForm } from "../forms/CreateConversationForm";

type CreateConversationModalProps = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

export const CreateConversationModal = ({
  setShowModal,
}: CreateConversationModalProps) => {
  const createConversationModalRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const handleKeyDown = ({ key }: globalThis.KeyboardEvent): void => {
      if (key === "Escape") setShowModal(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { current } = createConversationModalRef;
    if (current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <div
      className="fixed z-[99] flex h-screen w-full flex-col items-center justify-center bg-black/10"
      ref={createConversationModalRef}
      onClick={handleOverlayClick}
    >
      <CreateConversationForm setShowModal={setShowModal} />
    </div>
  );
};
