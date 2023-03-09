import React, { useCallback, useState } from "react";
import { AlphaStack, Modal } from "@shopify/polaris";
import { useAuthenticatedFetch } from "../hooks";

export interface DeleteMessagesModalProps {
  selectedMessages: string[];
  onClose?(isDeleting: boolean): void;
  onDeleted?(success: boolean): void;
  open: boolean;
}
export const DeleteMessagesModal = (
  props: DeleteMessagesModalProps
): JSX.Element => {
  const { selectedMessages, onClose, onDeleted, open } = props;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const fetch = useAuthenticatedFetch();

  const deleteMessages = useCallback(() => {
    setIsDeleting(true);
    (async () => {
      const { ok } = await fetch("/api/messages", {
        method: "DELETE",
        body: JSON.stringify({ ids: selectedMessages.map((id) => +id) }),
        headers: { "Content-Type": "application/json" },
      });
      setIsDeleting(false);
      onClose?.(isDeleting);
      onDeleted?.(ok);
    })();
  }, [selectedMessages]);

  const handleOnClose = useCallback(() => {
    onClose?.(isDeleting);
  }, [isDeleting]);

  return (
    <Modal
      open={open}
      onClose={handleOnClose}
      title={`Delete ${selectedMessages.length} messages`}
      primaryAction={{
        content: "Delete",
        destructive: true,
        loading: isDeleting,
        onAction: deleteMessages,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleOnClose,
        },
      ]}
    >
      <Modal.Section>
        <AlphaStack>
          <p>This can&apos;t be undone.</p>
        </AlphaStack>
      </Modal.Section>
    </Modal>
  );
};
